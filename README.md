<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Unofficial Pool Funding Web3 Tools</title>
  <style>
    /* --- Base Styles --- */
    :root {
      --primary: #007bff;
      --primary-hover: #0056b3;
      --success: #28a745;
      --background: #f4f6f8;
      --text: #333;
      --card-bg: #fff;
      --border: #e1e4e8;
      --radius: 12px;
      --shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    body {
      font-family: "Inter", system-ui, Arial, sans-serif;
      background-color: var(--background);
      color: var(--text);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      min-height: 100vh;
    }

    main {
      width: 100%;
      max-width: 720px;
      margin: 2rem;
    }

    h1, h2 {
      color: #111;
      margin-bottom: 0.75rem;
    }

    p {
      margin-bottom: 1rem;
    }

    /* --- Card Layout --- */
    .card {
      background-color: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: var(--shadow);
    }

    .card h2 {
      margin-top: 0;
      font-size: 1.25rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.5rem;
    }

    /* --- Buttons --- */
    button {
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: var(--radius);
      padding: 0.75rem 1.25rem;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.25s, transform 0.1s;
    }

    button:hover {
      background-color: var(--primary-hover);
      transform: translateY(-1px);
    }

    button:active {
      transform: translateY(1px);
    }

    /* --- RPC Button Layout --- */
    .rpc-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      justify-content: center;
      margin-top: 1rem;
    }

    ol {
      text-align: left;
      margin: 1rem auto;
      display: inline-block;
    }

    /* --- Donation Buttons --- */
    #donation-buttons {
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    #donation-buttons button {
      padding: 8px 12px;
      font-size: 0.9rem;
      border-radius: 8px;
      border: none;
      font-weight: 600;
      color: white;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
    }

    #donateBNB { background-color: #f3ba2f; color: #000; }
    #donateUSDT { background-color: #26a17b; }
    #donatePML { background-color: #008cff; }

    /* --- Wallet Connect Button --- */
    #wallet-connect {
      position: fixed;
      top: 10px;
      left: 10px;
      z-index: 9999;
    }

    #wallet-connect button {
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
      transition: background-color 0.25s;
    }

    #wallet-connect button:hover {
      background-color: var(--primary-hover);
    }

    footer {
      text-align: center;
      color: #777;
      font-size: 0.9rem;
      margin-top: 2rem;
    }

    footer a {
      color: var(--primary);
      text-decoration: none;
    }

    footer a:hover {
      text-decoration: underline;
    }

    /* --- Responsive --- */
    @media (max-width: 600px) {
      main { margin: 1rem; }
      .rpc-buttons { flex-direction: column; }
    }
  </style>
</head>

<body>
  <!-- Connect Wallet Button -->
  <div id="wallet-connect">
    <button id="connectWallet">Connect Wallet</button>
  </div>

  <main>
    <header class="card">
      <h1>Unofficial Pool Funding Web3 Tools</h1>
      <p>
        Welcome! Use the tools below to streamline wallet setup and operation for Pool Funding tokens.
        This page is maintained by <strong>Hunter Rodriguez</strong> for the Pool Funding community.
      </p>
      <p>Donations using the buttons above are always appreciated.</p>
    </header>

    <section class="card" id="tokens">
      <h2>Add Tokens to MetaMask</h2>
      <p>This button lets you add all Pool Funding tokens to your MetaMask wallet in a few clicks.</p>
      <ol>
        <li>Ensure you have MetaMask installed.</li>
        <li>Connect to <strong>Binance Smart Chain</strong>.</li>
        <li>Click below and approve each prompt to add tokens.</li>
      </ol>
      <button id="addTokens">Add All Tokens to MetaMask</button>
    </section>

    <section class="card" id="rpc">
      <h2>Switch Binance Smart Chain RPC</h2>
      <p>
        If MetaMask shows the wrong balance or fails to send transactions, switch to a different public RPC endpoint.
      </p>
      <div class="rpc-buttons">
        <button id="switchLlamarpc">Switch to Llamarpc</button>
        <button id="switchPublicNode">Switch to PublicNode</button>
        <button id="switchBlockrazor">Switch to Blockrazor</button>
        <button id="switchBLXR">Switch to BLXR</button>
        <button id="switchInfura">Switch to Infura (MetaMask Default)</button>
      </div>
    </section>

    <footer>
      &copy; 2025 Hunter Rodriguez. Not affiliated with MetaMask or Binance Smart Chain.<br />
      <a href="https://github.com" target="_blank" rel="noopener">View on GitHub</a>
    </footer>
  </main>

  <!-- Donation Buttons -->
  <div id="donation-buttons">
    <button id="donateBNB">Donate BNB</button>
    <button id="donateUSDT">Donate USDT</button>
    <button id="donatePML">Donate PML</button>
  </div>

  <script>
    // ---------- MetaMask Connect ----------
    async function connectWallet() {
      if (!window.ethereum) {
        alert("MetaMask not detected. Please install it first.");
        return;
      }

      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        updateWalletButton(accounts[0]);
      } catch (err) {
        console.error("User rejected connection or error occurred:", err);
      }
    }

    function updateWalletButton(account) {
      const btn = document.getElementById("connectWallet");
      const shortAccount = `${account.slice(0, 6)}...${account.slice(-4)}`;
      btn.textContent = shortAccount;
      btn.disabled = true;
      btn.style.opacity = "0.8";
    }

    async function checkConnection() {
      if (!window.ethereum) return;
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        updateWalletButton(accounts[0]);
      }
    }

    window.addEventListener("load", checkConnection);
    document.getElementById("connectWallet").onclick = connectWallet;


    // ---------- Token Addition ----------
    const tokens = [
      {
        address: "0x55d398326f99059fF775485246999027B3197955", // USDT on BSC
        symbol: "USDT",
        decimals: 18,
        image: "https://cryptologos.cc/logos/tether-usdt-logo.png"
      },
      {
        address: "0xB67a0b57703a43E7e2dC5dBf9754979652916F17",
        symbol: "PFB",
        decimals: 18,
        image: "https://pmlcoin.app/assets/pfb64-Boh4Kv01.png"
      },
      {
        address: "0xf623C5aec3ABE5BFd1F46C7108FaAd5a6F1C4efF",
        symbol: "PFI",
        decimals: 18,
        image: "https://pmlcoin.app/assets/pfi64-Bq4RLVgI.png"
      },
      {
        address: "0x25895B6DfD4FBcfCb8aD9b4cB9d9C25d7397ccDa",
        symbol: "PFS",
        decimals: 18,
        image: "https://pmlcoin.app/assets/pfs64-Cp73hc2m.png"
      },
      {
        address: "0x8024aC11de24aBBaC2bD860CC59E3b2E940dA87e",
        symbol: "PFG",
        decimals: 18,
        image: "https://pmlcoin.app/assets/pfg64-aUOZ9Zqz.png"
      },
      {
        address: "0x69dD5e051AbB0109A609eE0B78187c3EE0326FbD",
        symbol: "PML",
        decimals: 18,
        image: "https://pmlcoin.app/assets/logo-D04mbZJF.png"
      }
    ];

    document.getElementById("addTokens").addEventListener("click", async () => {
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return;
      }

      try {
        // Step 1: Suggest USDT first
        const usdt = tokens[0];
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: usdt,
          },
        });

        // Step 2: Suggest remaining tokens
        const otherTokens = tokens.slice(1);
        const requests = otherTokens.map(token =>
          window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: token,
            },
          }).catch(console.error)
        );

        await Promise.allSettled(requests);
        alert("Finished suggesting all tokens to MetaMask!");
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    });


    // ---------- RPC Switcher ----------
    async function switchToBSC(rpcUrl) {
      if (!window.ethereum) return alert("MetaMask is not installed.");
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0x38",
            chainName: "Binance Smart Chain",
            nativeCurrency: { name: "Binance Coin", symbol: "BNB", decimals: 18 },
            rpcUrls: [rpcUrl],
            blockExplorerUrls: ["https://bscscan.com/"],
          }],
        });
      } catch (error) {
        console.error("Error switching network:", error);
        alert("Failed to switch RPC. Check console for details.");
      }
    }

    document.getElementById("switchLlamarpc").onclick = () => switchToBSC("https://binance.llamarpc.com");
    document.getElementById("switchPublicNode").onclick = () => switchToBSC("https://bsc-rpc.publicnode.com/");
    document.getElementById("switchBlockrazor").onclick = () => switchToBSC("https://bsc.blockrazor.xyz/");
    document.getElementById("switchBLXR").onclick = () => switchToBSC("https://bsc.rpc.blxrbdn.com/");
    document.getElementById("switchInfura").onclick = () => switchToBSC("https://bsc-mainnet.infura.io/v3/");


    // ---------- Donations ----------
    const walletAddress = "0x00B28158d85a7a022aa978d5Ef08eC58dDb9e795";
    const usdtContract = "0x55d398326f99059fF775485246999027B3197955";
    const pmlContract = "0x69dD5e051AbB0109A609eE0B78187c3EE0326FbD";

    async function donateBNB() {
      if (!window.ethereum) return alert("MetaMask not detected.");
      const amount = prompt("Enter BNB amount to donate:");
      if (!amount || isNaN(amount) || amount <= 0) return;
      const valueHex = "0x" + BigInt(Math.floor(amount * 1e18)).toString(16);
      const from = (await ethereum.request({ method: "eth_requestAccounts" }))[0];
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{ from, to: walletAddress, value: valueHex }],
      });
    }

    async function donateToken(contractAddress, decimals, symbol) {
      if (!window.ethereum) return alert("MetaMask not detected.");
      const amount = prompt(`Enter ${symbol} amount to donate:`);
      if (!amount || isNaN(amount) || amount <= 0) return;
      const from = (await ethereum.request({ method: "eth_requestAccounts" }))[0];
      const amountHex = BigInt(Math.floor(amount * 10 ** decimals)).toString(16).padStart(64, "0");
      const data = "0xa9059cbb" + walletAddress.replace("0x", "").padStart(64, "0") + amountHex;
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{ from, to: contractAddress, data }],
      });
    }

    document.getElementById("donateBNB").onclick = donateBNB;
    document.getElementById("donateUSDT").onclick = () => donateToken(usdtContract, 18, "USDT");
    document.getElementById("donatePML").onclick = () => donateToken(pmlContract, 18, "PML");
  </script>
</body>
</html>
