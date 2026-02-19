<html lang="en">
<head>
  <meta charset="utf8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Unofficial Pool Funding Web3 Tools</title>
  <meta name="description" content="Community built Web3 tools to streamline Pool Funding wallet setup and management.">
  <meta property="og:image" content="https://pmlcoin.app/assets/logo-D04mbZJF.png">
  <script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>

  <style>
    :root {
      --primary: #007bff;
      --primary-hover: #0056b3;
      --background: #f4f6f8;
      --text: #333;
      --card-bg: #fff;
      --border: #e1e4e8;
      --radius: 12px;
      --shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .card.highlight {
  border: 2px solid var(--primary);
  box-shadow: 0 6px 24px rgba(0, 123, 255, 0.25);
  background: linear-gradient(
    0deg,
    var(--card-bg),
    var(--card-bg)
  ), linear-gradient(
    180deg,
    rgba(0, 123, 255, 0.08),
    rgba(0, 123, 255, 0.02)
  );
}

:root.dark .card.highlight {
  box-shadow: 0 6px 28px rgba(77, 163, 255, 0.35);
}


    :root.dark {
      --primary: #4da3ff;
      --primary-hover: #2f7fd6;
      --background: #0f141a;
      --text: #e6eaf0;
      --card-bg: #151b23;
      --border: #273142;
      --shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
    }

    body {
      font-family: Inter, system-ui, Arial, sans-serif;
      background-color: var(--background);
      color: var(--text);
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }

    main { width: 100%; max-width: 720px; margin: 2rem; }
    h1, h2 { color: #111; }
    :root.dark h1,
    :root.dark h2 { color: #fff; }

    .card {
      background-color: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: var(--shadow);
    }

    button {
      background-color: var(--primary);
      color: white;
      border: none;
      border-radius: var(--radius);
      padding: 0.75rem 1.25rem;
      cursor: pointer;
    }

    button:hover { background-color: var(--primary-hover); }

    .rpc-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .donate-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    #donateBNB { background-color: #f3ba2f; color: #000; }
    #donateUSDT { background-color: #26a17b; }
    #donatePML { background-color: #008cff; }

    .donate-more {
      background-color: transparent;
      border: 1px solid var(--border);
      color: var(--text);
    }

    .donate-more:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    :root.dark .donate-more:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }

    #wallet-connect {
      position: fixed;
      top: 10px;
      left: 10px;
      display: flex;
      gap: 12px;
      z-index: 9999;
      flex-wrap: wrap;
    }

    footer {
      text-align: center;
      color: #777;
      font-size: 0.9rem;
      margin: 2rem 0;
    }

    #priceDisplay { font-size: 0.85rem; color: #555; }
    :root.dark #priceDisplay { color: #aaa; }

    .notify {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--card-bg);
      border: 1px solid var(--border);
      padding: 0.75rem 1.25rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      z-index: 99999;
    }

    .doc-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .banner-center {
      display: flex;
      justify-content: center;
    }

    html {
  scroll-behavior: smooth;
}

  </style>
</head>

<body>
  <div id="wallet-connect">
    <button id="connectWallet">Connect Wallet</button>
    <button id="themeToggle">Dark mode</button>
    <div id="priceDisplay">
      <strong>BNB:</strong> <span id="bnbPrice">--</span> USD |
      <strong>PML:</strong> <span id="pmlPrice">--</span> USD
    </div>
  </div>

  <main>
<section class="card" id="home">
      <h1>Unofficial Pool Funding Web3 Tools</h1>
      <p>Use these tools to streamline wallet setup and operation for Pool Funding tokens.</p>
      <p>Maintained by <strong>Hunter Rodriguez</strong> for the Pool Funding community.</p>
      <p>This page and the supporting documents are the result of many hours of independent effort. If you believe in the value of community built tools, consider supporting upkeep through a small donation.</p>
    </section>

<section class="card highlight" id="donate">
<h2><a href="#donate" style="text-decoration:none; color:inherit;">Support Community Development</a></h2>
  <p>Over the past two years, these tools and resources have been built and shared with the community at no cost.</p>
  <p>They are used daily by many members and continue to grow and improve.</p>
  <p>If you find them useful, your support helps keep them running, improving, and available to everyone. Your contribution directly supports development and maintenance of the project.</p>

  <div class="donate-group">
    <button id="donateBNB">Donate BNB</button>
    <button id="donateUSDT">Donate USDT</button>
   <button class="donate-more"
          onclick="window.location.href='https://hrweb3buttons.github.io/pfbuttons/donations.html'">
          View more donation options
        </button>
  </div>
</section>


<section class="card" id="add-tokens">
<h2><a href="#add-tokens" style="text-decoration:none; color:inherit;">Add Tokens to MetaMask</a></h2>
      <button id="addTokens">Add All Tokens</button>
    </section>

<section class="card" id="rpc">
  <h2>
    <a href="#rpc" style="text-decoration:none; color:inherit;">
      Switch Binance Smart Chain RPC
    </a>
  </h2>
      <p>Use this only when you are having issues making payments. When you tap one of the buttons below, MetaMask should prompt you to update BNB Chain.</p>
      <p>Note: The Chainstack RPC Node is no longer available due to technical problems.</p>

      <div style="margin-top: 12px; padding: 12px; border: 1px solid var(--border); border-radius: var(--radius); font-size: 0.95rem;">
  <strong>Important:</strong><br>
  Due to MetaMask limitations, this tool cannot automatically activate the new RPC.<br><br>
  Step 1: Tap one of the buttons below and approve the MetaMask prompt.<br>
  Step 2: Open MetaMask's home screen, tap BNB Chain under Tokens, tap the RPC dropdown under BNB Chain, and select the new RPC you just added.
</div>


      <h3>Standard RPC Options</h3>
      <div class="rpc-buttons">
        <button id="rpcLlamarpc">Llamarpc</button>
        <button id="rpcPublicNode">PublicNode</button>
        <button id="rpcBlockrazor">Blockrazor</button>
      </div>

      <h3>Cloudflare Free RPC Options</h3>
      <div class="rpc-buttons">
        <button id="rpcBLXR">BLXR</button>
        <button id="rpcDRPC">dRPC</button>
      </div>

      <h3>AWS Free RPC Options</h3>
      <div class="rpc-buttons">
        <button id="rpcPublicNodies">PublicNodies</button>
      </div>

            <h3>Azure Free RPC Options</h3>
      <div class="rpc-buttons">
        <button id="rpc1rpc">1rpc</button>
        <button id="rpcSubQuery">SubQuery</button>
        <button id="rpcNowNodes">NowNodes</button>
      </div>


      
    </section>
<section class="card" id="charts">
    <a href="#charts" style="text-decoration:none; color:inherit;">
  <h2>Token Charts</h2> </a>
  <p>View real time charts for Pool Funding tokens on ApeSpace.</p>

  <div class="doc-buttons">
    <button onclick="window.open('https://apespace.io/bsc/0x94af08340ad9817d1e82a24b74fed9ebc87bfb63','_blank')">
      PFI Chart
    </button>

    <button onclick="window.open('https://apespace.io/bsc/0x9e0bdbb2db5a2dc47f7d9db6a58b21d296d44313','_blank')">
      PFB Chart
    </button>

    <button onclick="window.open('https://apespace.io/bsc/0xfa01cb55a68380e2d5c66a70e4e728fc6277feb2','_blank')">
      PFS Chart
    </button>

    <button onclick="window.open('https://apespace.io/bsc/0xd36fa2412cae6db25dfbc6348d5e4cdd9665ad4b','_blank')">
      PFG Chart
    </button>

    <button onclick="window.open('https://apespace.io/bsc/0xbc71c602fbf4dc37d5cad1169fb7de494e4d73a4','_blank')">
      PML Chart
    </button>
  </div>
<h3 style="margin-top: 1.5rem;">View Token on BscScan</h3>

<div class="doc-buttons">
  <button onclick="window.open('https://bscscan.com/token/0xf623c5aec3abe5bfd1f46c7108faad5a6f1c4eff','_blank')">
    PFI
  </button>

  <button onclick="window.open('https://bscscan.com/token/0xb67a0b57703a43e7e2dc5dbf9754979652916f17','_blank')">
    PFB
  </button>

  <button onclick="window.open('https://bscscan.com/token/0x25895b6dfd4fbcfcb8ad9b4cb9d9d9c25d7397ccda','_blank')">
    PFS
  </button>

  <button onclick="window.open('https://bscscan.com/token/0x8024ac11de24abbac2bd860cc59e3b2e940da87e','_blank')">
    PFG
  </button>

  <button onclick="window.open('https://bscscan.com/token/0x69dd5e051abb0109a609ee0b78187c3ee0326fbd','_blank')">
    PML
  </button>
</div>  
</section>

      <section class="card" id="calculator">
    <a href="#calculator" style="text-decoration:none; color:inherit;"> </a>
  <h2>Token Value Calculator</h2>
  <p>Calculate the USD value of an amount of our tokens using either the current price or their price target.</p>

  <div style="margin-bottom: 1rem;">
    <strong>Mode</strong><br>
    <label>
      <input type="radio" name="calcMode" value="current" checked>
      Current Price
    </label><br>
    <label>
      <input type="radio" name="calcMode" value="target">
      Price Target
    </label>
  </div>

  <div id="targetSelector" style="display: none; margin-bottom: 1rem;">
    <strong>Token Price Target</strong><br>
    <label><input type="radio" name="targetToken" value="PFI"> PFI</label><br>
    <label><input type="radio" name="targetToken" value="PFB"> PFB</label><br>
    <label><input type="radio" name="targetToken" value="PFS"> PFS</label><br>
    <label><input type="radio" name="targetToken" value="PFG"> PFG</label><br>
    <label><input type="radio" name="targetToken" value="PML"> PML</label>
  </div>

  <div style="margin-bottom: 1rem;">
    <label>
      <strong>Price USD</strong><br>
      <input id="calcPrice" type="number" step="any" style="width: 100%; padding: 0.5rem;">
    </label>
  </div>

  <div style="margin-bottom: 1rem;">
    <label>
      <strong>Token Amount</strong><br>
      <input id="calcAmount" type="number" step="any" style="width: 100%; padding: 0.5rem;">
    </label>
  </div>

<div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
  <button id="calcButton">Calculate</button>
  <button id="calcReset" class="donate-more">Reset</button>
</div>

  <div id="calcAlert" style="margin-top: 1rem; display: none; color: #c0392b;"></div>
  <div id="calcResult" style="margin-top: 1rem; font-weight: bold;"></div>
</section>

<section class="card" id="documents">
    <a href="#documents" style="text-decoration:none; color:inherit;">
      <h2>Community Documents</h2> </a>
      <button onclick="window.open('https://drive.google.com/drive/u/0/folders/1QMpDLyxwV5ZqUR7TFxfyh5HqTLr0A4ty','_blank')">Open Shared Folder</button>
      <div class="doc-buttons">
        <button onclick="window.open('https://drive.google.com/file/d/1H3aSw6LAcxw7BRMm7QjD1yVYjTMGWWR6/view','_blank')">Common Problems Guide</button>
        <button onclick="window.open('https://drive.google.com/file/d/1zsqY3QDiY2r1BgNwID0cEP5xYsOjlFHN/view','_blank')">$777 Newbies Guide</button>
        <button onclick="window.open('https://drive.google.com/file/d/1nNY7cih0Yc-UPsKq0wucCVRI1gcoJC9Z/view','_blank')">General Newbies Guide</button>
      </div>
    </section>
  </main>

  <footer>
    © 2026 Hunter Rodriguez, not affiliated with MetaMask or Binance Smart Chain.<br>
    <a href="https://github.com/hrweb3buttons/pfbuttons" target="_blank" rel="noopener">
      View on GitHub <a href="terms.html">Terms of Use</a>
    </a> | v1.1.14
  </footer>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const root = document.documentElement;
      const themeToggle = document.getElementById("themeToggle");

      if (localStorage.getItem("theme") === "dark") {
        root.classList.add("dark");
        themeToggle.textContent = "Light mode";
        
      }

      themeToggle.onclick = () => {
        root.classList.toggle("dark");
        const dark = root.classList.contains("dark");
        localStorage.setItem("theme", dark ? "dark" : "light");
        themeToggle.textContent = dark ? "Light mode" : "Dark mode";
      };

      const walletAddress = "0x00B28158d85a7a022aa978d5Ef08eC58dDb9e795";
      const usdtContract = "0x55d398326f99059fF775485246999027B3197955";
      const pmlContract = "0x69dD5e051AbB0109A609eE0B78187c3EE0326FbD";

      const tokens = [
        { address: usdtContract, symbol: "USDT", decimals: 18, image: "https://cryptologos.cc/logos/tether-usdt-logo.png" },
        { address: "0xB67a0b57703a43E7e2dC5dBf9754979652916F17", symbol: "PFB", decimals: 18, image: "https://pmlcoin.app/assets/pfb64-Boh4Kv01.png" },
        { address: "0xf623C5aec3ABE5BFd1F46C7108FaAd5a6F1C4efF", symbol: "PFI", decimals: 18, image: "https://pmlcoin.app/assets/pfi64-Bq4RLVgI.png" },
        { address: "0x25895B6DfD4FBcfCb8aD9b4cB9d9C25d7397ccDa", symbol: "PFS", decimals: 18, image: "https://pmlcoin.app/assets/pfs64-Cp73hc2m.png" },
        { address: "0x8024aC11de24aBBaC2bD860CC59E3b2E940dA87e", symbol: "PFG", decimals: 18, image: "https://pmlcoin.app/assets/pfg64-aUOZ9Zqz.png" },
        { address: pmlContract, symbol: "PML", decimals: 18, image: "https://pmlcoin.app/assets/logo-D04mbZJF.png" }
      ];

      const notify = msg => {
        const n = document.createElement("div");
        n.className = "notify";
        n.textContent = msg;
        document.body.appendChild(n);
        setTimeout(() => n.remove(), 4000);
      };

      async function connectWallet() {
        if (!window.ethereum) return notify("MetaMask not detected");
        const accs = await ethereum.request({ method: "eth_requestAccounts" });
        const btn = document.getElementById("connectWallet");
        btn.textContent = accs[0].slice(0,6) + "..." + accs[0].slice(-4);
        btn.disabled = true;
      }

   

                                 async function addAllTokens() {
        if (!confirm("Add all Pool Funding tokens to MetaMask? Tap Add Token when MetaMask appears.")) return;
        const requests = tokens.map(t =>
          ethereum.request({
            method: "wallet_watchAsset",
            params: { type: "ERC20", options: t }
          }).catch(() => null)
        );
        await Promise.allSettled(requests);
        notify("Finished suggesting tokens");
      }

async function switchRPC(url, name) {
  if (!window.ethereum) {
    notify("MetaMask not detected");
    return;
  }

  const chainId = "0x38";

  try {
    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
        chainId: chainId,
        chainName: "Binance Smart Chain (" + name + ")",
        nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
        rpcUrls: [url],
        blockExplorerUrls: ["https://bscscan.com"]
      }]
    });

    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }]
    });

    notify("RPC switched to " + name);
  } catch (e) {
    notify("RPC change rejected");
  }
}




      async function donateBNB() {
        const amt = parseFloat(prompt("Enter BNB amount"));
        if (!amt) return;
        const [from] = await ethereum.request({ method: "eth_requestAccounts" });
        const value = "0x" + BigInt(Math.floor(amt * 1e18)).toString(16);
        await ethereum.request({ method: "eth_sendTransaction", params: [{ from, to: walletAddress, value }] });
        notify("BNB donation sent");
      }

      async function donateToken(contract, symbol) {
        const amt = parseFloat(prompt(`Enter ${symbol} amount`));
        if (!amt) return;
        const [from] = await ethereum.request({ method: "eth_requestAccounts" });
        const value = BigInt(Math.floor(amt * 1e18)).toString(16).padStart(64,"0");
        const data = "0xa9059cbb" + walletAddress.replace("0x","").padStart(64,"0") + value;
        await ethereum.request({ method: "eth_sendTransaction", params: [{ from, to: contract, data }] });
        notify(symbol + " donation sent");
      }

      async function fetchPrices() {
        try {
          const bnb = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd").then(r => r.json());
          document.getElementById("bnbPrice").textContent = bnb.binancecoin.usd.toFixed(2);
        } catch {}

        try {
          const pml = await fetch("https://api.geckoterminal.com/api/v2/networks/bsc/pools/0xbc71c602fbf4dc37d5cad1169fb7de494e4d73a4").then(r => r.json());
          document.getElementById("pmlPrice").textContent =
            parseFloat(pml.data.attributes.base_token_price_usd).toFixed(2);
        } catch {}
      }

      document.getElementById("connectWallet").onclick = connectWallet;
      document.getElementById("addTokens").onclick = addAllTokens;

document.getElementById("rpcLlamarpc").onclick = () => switchRPC("https://binance.llamarpc.com", "LlamaRPC");
document.getElementById("rpcPublicNode").onclick = () => switchRPC("https://bsc-rpc.publicnode.com", "PublicNode");
document.getElementById("rpcBlockrazor").onclick = () => switchRPC("https://bsc.blockrazor.xyz", "Blockrazor");
document.getElementById("rpcBLXR").onclick = () => switchRPC("https://bsc.rpc.blxrbdn.com", "BLXR");
document.getElementById("rpcDRPC").onclick = () => switchRPC("https://bsc.drpc.org", "dRPC");
document.getElementById("rpcPublicNodies").onclick = () => switchRPC("https://binance-smart-chain-public.nodies.app", "PublicNodies");
document.getElementById("rpc1rpc").onclick = () => switchRPC("https://1rpc.io/bnb", "1RPC");
document.getElementById("rpcSubQuery").onclick = () => switchRPC("https://bnb.rpc.subquery.network/public", "SubQuery");
document.getElementById("rpcNowNodes").onclick = () => switchRPC("https://public-bsc.nownodes.io", "NowNodes");




      document.getElementById("donateBNB").onclick = donateBNB;
     document.getElementById("donateUSDT").onclick = () => donateToken(usdtContract,"USDT");

fetchPrices();

/* ===== MOBILE FALLBACK GOES HERE ===== */

function isMetaMaskMobile() {
  return (
    typeof window.ethereum !== "undefined" &&
    window.ethereum.isMetaMask &&
    /MetaMaskMobile/i.test(navigator.userAgent)
  );
}

function showMobileFallback() {
  const section = document.getElementById("add-tokens");
  const btn = document.getElementById("addTokens");

  btn.style.display = "none";

  const container = document.createElement("div");
  container.style.marginTop = "1rem";

  const title = document.createElement("h3");
  title.textContent = "Manual Token Add Required";
  container.appendChild(title);

  const instructions = document.createElement("p");
  instructions.textContent =
    "MetaMask mobile does not currently support automatic token suggestions. Please add tokens manually using the contract addresses below.";
  container.appendChild(instructions);
  const stepsTitle = document.createElement("h4");
stepsTitle.textContent = "How to Add Tokens in MetaMask Mobile";
stepsTitle.style.marginTop = "1rem";
container.appendChild(stepsTitle);

const stepsList = document.createElement("ol");
stepsList.style.paddingLeft = "1.25rem";

const steps = [
  "Copy the USDT token contract address.",
  "Tap the X in the top left corner.",
  "Tap Home in the bottom left corner.",
  "Tap the plus sign above BNB.",
  "Tap Custom token.",
  "Paste in the token contract address you just copied.",
  "Tap Next.",
  "Tap Import.",
  "Tap Explore and tap the 1 in the box near the top right corner.",
  "Tap on this site again.",
  "Repeat these steps for the rest of the tokens."
];

steps.forEach(text => {
  const li = document.createElement("li");
  li.textContent = text;
  li.style.marginBottom = "6px";
  stepsList.appendChild(li);
});

container.appendChild(stepsList);


  tokens.forEach(token => {
    const row = document.createElement("div");
    row.style.marginBottom = "8px";

    const label = document.createElement("strong");
    label.textContent = token.symbol + ": ";
    row.appendChild(label);

    const addr = document.createElement("span");
    addr.textContent = token.address;
    row.appendChild(addr);

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.style.marginLeft = "10px";
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(token.address);
      notify(token.symbol + " address copied");
    };

    row.appendChild(copyBtn);
    container.appendChild(row);
  });

  section.appendChild(container);
}

if (isMetaMaskMobile()) {
  showMobileFallback();
}

/* ===== END MOBILE FALLBACK ===== */
});


    const priceTargets = {
  PFI: 500000,
  PFB: 1000000,
  PFS: 2000000,
  PFG: 4000000,
  PML: 2000000
};

const modeRadios = document.querySelectorAll('input[name="calcMode"]');
const tokenRadios = document.querySelectorAll('input[name="targetToken"]');
const targetSelector = document.getElementById("targetSelector");
const priceInput = document.getElementById("calcPrice");
const amountInput = document.getElementById("calcAmount");
const calcButton = document.getElementById("calcButton");
const calcResult = document.getElementById("calcResult");
const calcAlert = document.getElementById("calcAlert");

function clearCalcOutput() {
  calcResult.textContent = "";
  calcAlert.style.display = "none";
  calcAlert.textContent = "";
}

function setMode(mode) {
  clearCalcOutput();
  priceInput.value = "";
  amountInput.value = "";

  if (mode === "target") {
    targetSelector.style.display = "block";
    priceInput.readOnly = true;
  } else {
    targetSelector.style.display = "none";
    priceInput.readOnly = false;
  }
}

modeRadios.forEach(radio => {
  radio.addEventListener("change", e => {
    setMode(e.target.value);
  });
});

tokenRadios.forEach(radio => {
  radio.addEventListener("change", e => {
    const price = priceTargets[e.target.value];
    priceInput.value = price;
    clearCalcOutput();
  });
});

calcButton.addEventListener("click", () => {
  clearCalcOutput();

  const price = parseFloat(priceInput.value);
  const amount = parseFloat(amountInput.value);

  if (!price || price <= 0) {
    calcAlert.textContent = "Please enter a valid price.";
    calcAlert.style.display = "block";
    return;
  }

  if (!amount || amount <= 0) {
    calcAlert.textContent = "Please enter a valid token amount.";
    calcAlert.style.display = "block";
    return;
  }

  const total = price * amount;

  calcResult.textContent =
    "Estimated value: $" +
    total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
    " USD";
});

const calcReset = document.getElementById("calcReset");

function resetCalculator() {
  clearCalcOutput();
  priceInput.value = "";
  amountInput.value = "";

  document.querySelector('input[name="calcMode"][value="current"]').checked = true;
  targetSelector.style.display = "none";
  priceInput.readOnly = false;

  tokenRadios.forEach(r => r.checked = false);
}

calcReset.addEventListener("click", resetCalculator);
  </script>
</body>
</html>
