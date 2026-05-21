import { useState, useCallback } from "react";

const CHAINS = [
  { id: "bitcoin",   name: "Bitcoin",        symbol: "BTC",  color: "#F7931A", type: "bitcoin" },
  { id: "litecoin",  name: "Litecoin",        symbol: "LTC",  color: "#345D9D", type: "litecoin" },
  { id: "dogecoin",  name: "Dogecoin",        symbol: "DOGE", color: "#C2A633", type: "dogecoin" },
  { id: "tron",      name: "Tron",            symbol: "TRX",  color: "#EF0027", type: "tron" },
  { id: "solana",    name: "Solana",          symbol: "SOL",  color: "#9945FF", type: "solana" },
  { id: "ethereum",  name: "Ethereum",        symbol: "ETH",  color: "#627EEA", type: "evm", rpc: "https://ethereum.publicnode.com",       explorer: "https://etherscan.io/tx/" },
  { id: "bsc",       name: "BNB Chain",       symbol: "BNB",  color: "#F0B90B", type: "evm", rpc: "https://bsc.publicnode.com",            explorer: "https://bscscan.com/tx/" },
  { id: "polygon",   name: "Polygon",         symbol: "POL",  color: "#7B3FE4", type: "evm", rpc: "https://polygon-bor.publicnode.com",    explorer: "https://polygonscan.com/tx/" },
  { id: "arbitrum",  name: "Arbitrum",        symbol: "ARB",  color: "#28A0F0", type: "evm", rpc: "https://arbitrum-one.publicnode.com",   explorer: "https://arbiscan.io/tx/" },
  { id: "optimism",  name: "Optimism",        symbol: "OP",   color: "#FF0420", type: "evm", rpc: "https://optimism.publicnode.com",       explorer: "https://optimistic.etherscan.io/tx/" },
  { id: "base",      name: "Base",            symbol: "BASE", color: "#0052FF", type: "evm", rpc: "https://base.publicnode.com",           explorer: "https://basescan.org/tx/" },
  { id: "avalanche", name: "Avalanche C",     symbol: "AVAX", color: "#E84142", type: "evm", rpc: "https://avalanche-c-chain.publicnode.com", explorer: "https://snowtrace.io/tx/" },
  { id: "fantom",    name: "Fantom",          symbol: "FTM",  color: "#1969FF", type: "evm", rpc: "https://rpc.ankr.com/fantom",          explorer: "https://ftmscan.com/tx/" },
  { id: "cronos",    name: "Cronos",          symbol: "CRO",  color: "#002D74", type: "evm", rpc: "https://evm.cronos.org",               explorer: "https://cronoscan.com/tx/" },
];

const FIELD_LABELS = {
  blockHeight:   "Block height",
  blockNumber:   "Block number",
  confirmations: "Confirmations",
  fee:           "Fee",
  value:         "Amount",
  inputs:        "Inputs",
  outputs:       "Outputs",
  size:          "Size",
  slot:          "Slot",
  blockTime:     "Block time",
  signers:       "Accounts",
  status:        "Status",
  from:          "From",
  to:            "To",
  gasLimit:      "Gas limit",
  gasUsed:       "Gas used",
};

const MONO_FIELDS = new Set(["from", "to"]);

function abortSignal(ms) {
  const ctrl = new AbortController();
  setTimeout(() => ctrl.abort(), ms);
  return ctrl.signal;
}

async function searchBitcoin(hash) {
  const res = await fetch(`https://blockstream.info/api/tx/${hash}`, { signal: abortSignal(9000) });
  if (!res.ok) return null;
  const d = await res.json();
  const totalOut = d.vout.reduce((s, o) => s + o.value, 0);
  return {
    blockHeight:   d.status.block_height ?? "Pending",
    fee:           `${(d.fee / 1e8).toFixed(8)} BTC`,
    value:         `${(totalOut / 1e8).toFixed(8)} BTC`,
    inputs:        d.vin.length,
    outputs:       d.vout.length,
    size:          `${d.size} bytes`,
    explorerUrl:   `https://blockstream.info/tx/${hash}`,
    confirmed:     d.status.confirmed,
  };
}

async function searchBlockcypher(hash, coin, symbol, explorerBase) {
  const res = await fetch(`https://api.blockcypher.com/v1/${coin}/main/txs/${hash}`, { signal: abortSignal(9000) });
  if (!res.ok) return null;
  const d = await res.json();
  if (d.error) return null;
  return {
    confirmations: d.confirmations ?? 0,
    blockHeight:   d.block_height ?? "Pending",
    fee:           `${((d.fees ?? 0) / 1e8).toFixed(8)} ${symbol}`,
    value:         `${((d.total ?? 0) / 1e8).toFixed(8)} ${symbol}`,
    explorerUrl:   `${explorerBase}${hash}/`,
    confirmed:     (d.confirmations ?? 0) > 0,
  };
}

async function searchTron(hash) {
  const res = await fetch(`https://api.trongrid.io/v1/transactions/${hash}`, {
    headers: { Accept: "application/json" },
    signal: abortSignal(9000),
  });
  if (!res.ok) return null;
  const d = await res.json();
  if (!d.data || d.data.length === 0) return null;
  const tx = d.data[0];
  const contractRet = tx.ret?.[0]?.contractRet ?? "Unknown";
  return {
    status:      contractRet,
    blockNumber: tx.blockNumber ?? "N/A",
    fee:         tx.fee != null ? `${(tx.fee / 1e6).toFixed(6)} TRX` : "0 TRX",
    from:        tx.raw_data?.contract?.[0]?.parameter?.value?.owner_address ?? "N/A",
    explorerUrl: `https://tronscan.org/#/transaction/${hash}`,
    confirmed:   contractRet === "SUCCESS",
  };
}

async function searchSolana(hash) {
  const res = await fetch("https://api.mainnet-beta.solana.com", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ jsonrpc: "2.0", id: 1, method: "getTransaction", params: [hash, { encoding: "json", maxSupportedTransactionVersion: 0 }] }),
    signal:  abortSignal(12000),
  });
  const d = await res.json();
  if (!d.result) return null;
  const tx = d.result;
  return {
    slot:        tx.slot,
    blockTime:   tx.blockTime ? new Date(tx.blockTime * 1000).toLocaleString() : "N/A",
    fee:         `${((tx.meta?.fee ?? 0) / 1e9).toFixed(6)} SOL`,
    signers:     tx.transaction?.message?.accountKeys?.length ?? "N/A",
    explorerUrl: `https://solscan.io/tx/${hash}`,
    confirmed:   tx.meta?.err === null,
  };
}

async function searchEVM(hash, chain) {
  const body = (method, params, id) =>
    JSON.stringify({ jsonrpc: "2.0", id, method, params });

  const [txRes, rcpRes] = await Promise.all([
    fetch(chain.rpc, { method: "POST", headers: { "Content-Type": "application/json" }, body: body("eth_getTransactionByHash", [hash], 1), signal: abortSignal(9000) }),
    fetch(chain.rpc, { method: "POST", headers: { "Content-Type": "application/json" }, body: body("eth_getTransactionReceipt", [hash], 2), signal: abortSignal(9000) }),
  ]);

  const txData  = await txRes.json();
  const tx      = txData.result;
  if (!tx) return null;

  const rcpData = await rcpRes.json();
  const rcp     = rcpData.result;

  const valueEth = parseInt(tx.value ?? "0x0", 16) / 1e18;
  let feeStr = "N/A";
  if (rcp?.gasUsed && tx.gasPrice) {
    const fee = parseInt(rcp.gasUsed, 16) * parseInt(tx.gasPrice, 16);
    feeStr = `${(fee / 1e18).toFixed(8)} ${chain.symbol}`;
  }

  return {
    status:      rcp ? (rcp.status === "0x1" ? "Success" : "Failed") : "Pending",
    blockNumber: tx.blockNumber ? parseInt(tx.blockNumber, 16).toLocaleString() : "Pending",
    from:        tx.from,
    to:          tx.to ?? "Contract creation",
    value:       `${valueEth.toFixed(6)} ${chain.symbol}`,
    fee:         feeStr,
    gasLimit:    parseInt(tx.gas, 16).toLocaleString(),
    gasUsed:     rcp?.gasUsed ? parseInt(rcp.gasUsed, 16).toLocaleString() : "N/A",
    explorerUrl: chain.explorer + hash,
    confirmed:   rcp?.status === "0x1",
  };
}

function truncAddr(addr) {
  if (!addr || addr.length < 20) return addr;
  return `${addr.slice(0, 10)}...${addr.slice(-8)}`;
}

function hashHint(hash) {
  const h = hash.trim();
  if (h.startsWith("0x") && h.length === 66) return { label: "EVM / Tron format (0x…)", chains: "Ethereum, BSC, Polygon, Arbitrum, Optimism, Base, Avalanche, Fantom, Cronos, Tron" };
  if (/^[0-9a-fA-F]{64}$/.test(h))           return { label: "64-char hex (no 0x prefix)", chains: "Bitcoin, Litecoin, Dogecoin, Tron (some formats)" };
  if (h.length >= 43 && h.length <= 90 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(h)) return { label: "Base58 format", chains: "Solana" };
  return null;
}

const STATUS = {
  idle:      { icon: "ti-circle",       color: "var(--color-text-tertiary)",  label: "Ready" },
  searching: { icon: "ti-loader-2",     color: "var(--color-text-warning)",   label: "Searching…" },
  found:     { icon: "ti-circle-check", color: "var(--color-text-success)",   label: "Found" },
  not_found: { icon: "ti-circle-x",     color: "var(--color-text-tertiary)",  label: "Not found" },
  error:     { icon: "ti-alert-circle", color: "var(--color-text-warning)",   label: "Unavailable" },
};

export default function TxLookup() {
  const [hash,        setHash]        = useState("");
  const [statuses,    setStatuses]    = useState({});
  const [results,     setResults]     = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [lastHash,    setLastHash]    = useState("");

  const updateChain = useCallback((id, status, result) => {
    setStatuses(prev => ({ ...prev, [id]: status }));
    if (result) setResults(prev => ({ ...prev, [id]: result }));
  }, []);

  const handleSearch = async () => {
    const trimmed = hash.trim();
    if (!trimmed || isSearching) return;
    setIsSearching(true);
    setResults({});
    setLastHash(trimmed);
    const init = {};
    CHAINS.forEach(c => { init[c.id] = "searching"; });
    setStatuses(init);

    const searches = CHAINS.map(async (chain) => {
      try {
        let result = null;
        if      (chain.type === "bitcoin")  result = await searchBitcoin(trimmed);
        else if (chain.type === "litecoin") result = await searchBlockcypher(trimmed, "ltc", "LTC", "https://live.blockcypher.com/ltc/tx/");
        else if (chain.type === "dogecoin") result = await searchBlockcypher(trimmed, "doge", "DOGE", "https://live.blockcypher.com/doge/tx/");
        else if (chain.type === "tron")     result = await searchTron(trimmed);
        else if (chain.type === "solana")   result = await searchSolana(trimmed);
        else if (chain.type === "evm")      result = await searchEVM(trimmed, chain);
        updateChain(chain.id, result ? "found" : "not_found", result);
      } catch {
        updateChain(chain.id, "error");
      }
    });

    await Promise.allSettled(searches);
    setIsSearching(false);
  };

  const hasSearched   = Object.keys(statuses).length > 0;
  const foundChains   = CHAINS.filter(c => statuses[c.id] === "found");
  const allDone       = hasSearched && !isSearching;
  const noneFound     = allDone && foundChains.length === 0;
  const hint          = hash.trim() ? hashHint(hash.trim()) : null;

  return (
    <div style={{ padding: "1rem 0", fontFamily: "var(--font-sans)" }}>
      <h2 style={{ margin: "0 0 0.25rem", fontSize: 18, fontWeight: 500, color: "var(--color-text-primary)", display: "flex", alignItems: "center", gap: 8 }}>
        <i className="ti ti-topology-ring-3" style={{ fontSize: 20 }} aria-hidden="true" />
        Transaction hash lookup
      </h2>
      <p style={{ margin: "0 0 1.25rem", fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
        Search {CHAINS.length} blockchains simultaneously — Bitcoin, Litecoin, Dogecoin, Tron, Solana, and all major EVM chains.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: hint ? 8 : "1.25rem" }}>
        <input
          type="text"
          value={hash}
          onChange={e => setHash(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
          placeholder="Paste transaction hash…"
          style={{ flex: 1, fontFamily: "var(--font-mono)", fontSize: 13 }}
        />
        <button onClick={handleSearch} disabled={!hash.trim() || isSearching} style={{ minWidth: 110 }}>
          {isSearching ? "Searching…" : "Search ↗"}
        </button>
      </div>

      {hint && (
        <div style={{ marginBottom: "1.25rem", fontSize: 12, color: "var(--color-text-secondary)", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "8px 12px", display: "flex", alignItems: "flex-start", gap: 6 }}>
          <i className="ti ti-info-circle" style={{ fontSize: 14, marginTop: 1, flexShrink: 0 }} aria-hidden="true" />
          <span><strong style={{ fontWeight: 500 }}>{hint.label}</strong> — likely: {hint.chains}</span>
        </div>
      )}

      {hasSearched && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))", gap: 6, marginBottom: "1.5rem" }}>
          {CHAINS.map(chain => {
            const status = statuses[chain.id] ?? "idle";
            const cfg    = STATUS[status];
            const found  = status === "found";
            return (
              <div key={chain.id} style={{
                background:    found ? "var(--color-background-success)" : "var(--color-background-primary)",
                border:        `0.5px solid ${found ? "var(--color-border-success)" : "var(--color-border-tertiary)"}`,
                borderRadius:  "var(--border-radius-md)",
                padding:       "8px 10px",
                display:       "flex",
                alignItems:    "center",
                gap:           8,
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                  background: chain.color + "18",
                  border: `1.5px solid ${chain.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 8, fontWeight: 700, color: chain.color, letterSpacing: "-0.02em",
                }}>
                  {chain.symbol.length > 3 ? chain.symbol.slice(0, 4) : chain.symbol}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {chain.name}
                  </div>
                  <div style={{ fontSize: 11, color: cfg.color, display: "flex", alignItems: "center", gap: 3 }}>
                    <i className={`ti ${cfg.icon}${status === "searching" ? " spin" : ""}`} style={{ fontSize: 11 }} aria-hidden="true" />
                    {cfg.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {foundChains.length > 0 && (
        <>
          <div style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.6rem", display: "flex", alignItems: "center", gap: 6 }}>
            <i className="ti ti-circle-check" style={{ color: "var(--color-text-success)", fontSize: 13 }} aria-hidden="true" />
            Match{foundChains.length > 1 ? "es" : ""} found on {foundChains.map(c => c.name).join(" · ")}
          </div>

          {foundChains.map(chain => {
            const result = results[chain.id];
            if (!result) return null;
            const detailFields = Object.entries(result).filter(([k]) => k !== "explorerUrl" && k !== "confirmed");

            return (
              <div key={chain.id} style={{
                background: "var(--color-background-primary)",
                border: "0.5px solid var(--color-border-tertiary)",
                borderRadius: "var(--border-radius-lg)",
                padding: "1rem 1.25rem",
                marginBottom: 10,
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%",
                      background: chain.color + "18",
                      border: `2px solid ${chain.color}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, fontWeight: 700, color: chain.color, letterSpacing: "-0.01em",
                    }}>
                      {chain.symbol.length > 3 ? chain.symbol.slice(0, 4) : chain.symbol}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 15, color: "var(--color-text-primary)" }}>{chain.name}</div>
                      <div style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 4, color: result.confirmed ? "var(--color-text-success)" : "var(--color-text-warning)" }}>
                        <i className={`ti ${result.confirmed ? "ti-circle-check" : "ti-clock"}`} style={{ fontSize: 12 }} aria-hidden="true" />
                        {result.confirmed ? "Confirmed" : "Pending / Unconfirmed"}
                      </div>
                    </div>
                  </div>
                  {result.explorerUrl && (
                    <a href={result.explorerUrl} style={{ fontSize: 12, color: "var(--color-text-info)", display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
                      Explorer <i className="ti ti-external-link" style={{ fontSize: 12 }} aria-hidden="true" />
                    </a>
                  )}
                </div>

                <div style={{ borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px 20px" }}>
                  {detailFields.map(([key, value]) => (
                    <div key={key}>
                      <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginBottom: 2 }}>
                        {FIELD_LABELS[key] ?? key}
                      </div>
                      <div style={{
                        fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)",
                        fontFamily: MONO_FIELDS.has(key) ? "var(--font-mono)" : "var(--font-sans)",
                        wordBreak: "break-all",
                        lineHeight: 1.4,
                      }}>
                        {MONO_FIELDS.has(key) ? truncAddr(String(value)) : String(value)}
                      </div>
                    </div>
                  ))}
                </div>

                {(result.from || result.to) && (
                  <div style={{ marginTop: 12, borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 12 }}>
                    <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginBottom: 6 }}>Full addresses</div>
                    {result.from && (
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", flexShrink: 0 }}>From</span>
                        <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)", wordBreak: "break-all" }}>{result.from}</span>
                      </div>
                    )}
                    {result.to && result.to !== "N/A" && (
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", flexShrink: 0, minWidth: 20 }}>To</span>
                        <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--color-text-secondary)", wordBreak: "break-all" }}>{result.to}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {noneFound && foundChains.length === 0 && (
        <div style={{
          textAlign: "center", padding: "2.5rem 1rem",
          background: "var(--color-background-secondary)",
          borderRadius: "var(--border-radius-lg)",
          border: "0.5px solid var(--color-border-tertiary)",
        }}>
          <i className="ti ti-search-off" style={{ fontSize: 36, color: "var(--color-text-tertiary)", display: "block", marginBottom: 10 }} aria-hidden="true" />
          <div style={{ fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 4 }}>No match found</div>
          <div style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
            This hash was not found on any of the {CHAINS.length} supported chains.
          </div>
          <div style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 6 }}>
            Some explorers may have been temporarily unavailable — try again if you expected a result.
          </div>
        </div>
      )}

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.spin{display:inline-block;animation:spin 1s linear infinite}`}</style>
    </div>
  );
}
