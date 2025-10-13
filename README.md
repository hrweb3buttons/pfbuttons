Welcome! Use the buttons below to help streamline wallet operation.
This page is operated by me, Hunter Rodriguez. I've made this space to help Pool Funding users.
Donations using the above buttons are greatly appreciated!


<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Add Tokens to MetaMask</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 2rem auto;
        padding: 1rem;
        line-height: 1.6;
        text-align: center;
      }
      h1 {
        color: #333;
      }
      button {
        background: #007bff;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 1rem;
      }
      button:hover {
        background: #0056b3;
      }
      ol {
        text-align: left;
        display: inline-block;
        margin-top: 1rem;
      }
    </style>
  </head>
  <body>
    <h1>Add All Tokens to MetaMask</h1>
    <p>
      This button helps you easily add the Pool Funding custom tokens to your MetaMask wallet in just a few clicks.
      Please follow these steps:
    </p>

    <ol>
      <li>Make sure the <strong>MetaMask extension</strong> or mobile app is installed.</li>
      <li>Confirm that you are connected to the correct network (for example, <strong>Binance Smart Chain</strong>).</li>
      <li>Click the button below to start adding tokens.</li>
      <li>MetaMask will show a prompt for each token. Approve each one to add it to your wallet.</li>
    </ol>

    <button id="addTokens">Add All Tokens to MetaMask</button>

    <script>
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
          image: "https://yourdomain.com/pfb-logo.png"
        },
        {
          address: "0xf623C5aec3ABE5BFd1F46C7108FaAd5a6F1C4efF",
          symbol: "PFI",
          decimals: 18,
          image: "https://yourdomain.com/pfi-logo.png"
        },
        {
          address: "0x25895B6DfD4FBcfCb8aD9b4cB9d9C25d7397ccDa",
          symbol: "PFS",
          decimals: 18,
          image: "https://yourdomain.com/pfs-logo.png"
        },
        {
          address: "0x8024aC11de24aBBaC2bD860CC59E3b2E940dA87e",
          symbol: "PFG",
          decimals: 18,
          image: "https://yourdomain.com/pfg-logo.png"
        },
        {
          address: "0x69dD5e051AbB0109A609eE0B78187c3EE0326FbD",
          symbol: "PML",
          decimals: 18,
          image: "https://yourdomain.com/pml-logo.png"
        }
      ];

      document.getElementById("addTokens").addEventListener("click", async () => {
        if (window.ethereum) {
          try {
            const usdt = tokens[0];
            const usdtAdded = await window.ethereum.request({
              method: "wallet_watchAsset",
              params: {
                type: "ERC20",
                options: {
                  address: usdt.address,
                  symbol: usdt.symbol,
                  decimals: usdt.decimals,
                  image: usdt.image,
                },
              },
            });

            if (usdtAdded) {
              console.log("USDT added!");
            } else {
              console.log("User rejected adding USDT.");
            }

            const otherTokens = tokens.slice(1);
            const requests = otherTokens.map(token =>
              window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                  type: "ERC20",
                  options: {
                    address: token.address,
                    symbol: token.symbol,
                    decimals: token.decimals,
                    image: token.image,
                  },
                },
              })
                .then(wasAdded => {
                  if (wasAdded) {
                    console.log(`${token.symbol} added!`);
                  } else {
                    console.log(`User rejected adding ${token.symbol}.`);
                  }
                })
                .catch(error => {
                  console.error(`Error adding ${token.symbol}:`, error);
                })
            );

            await Promise.allSettled(requests);
            alert("Finished suggesting all tokens to MetaMask!");
          } catch (error) {
            console.error("Unexpected error:", error);
          }
        } else {
          alert("MetaMask is not installed!");
        }
      });
    </script>
  </body>
</html>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Switch to Different RPC URLs</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 2rem auto;
        padding: 1rem;
        line-height: 1.6;
        text-align: center;
      }
      h1 {
        color: #333;
      }
      button {
        background: #28a745;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        cursor: pointer;
        margin: 0.5rem;
      }
      button:hover {
        background: #218838;
      }
      ol {
        text-align: left;
        display: inline-block;
        margin-top: 1rem;
      }
      a {
        display: inline-block;
        margin-top: 2rem;
        text-decoration: none;
        color: #007bff;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>

  <body>
    <h1>Switch to Different RPC URLs</h1>
    <p>
      This buttons let you quickly update MetaMask on the
      <strong>Binance Smart Chain</strong> network to use different public RPC endpoints.
    </p>
    <p>
      Use this if your MetaMask is showing only your BNB balance, a zero balance, or isn't allowing you to make transactions.
    </p>

  <ol>
  <li>Make sure the <strong>MetaMask</strong> extension or app is installed.</li>
  <li>If prompted, approve MetaMask’s request to add or switch to BSC.</li>
  <li>You can try different RPC endpoints if one seems slow or unresponsive.</li>
</ol>

<p>Select your preferred RPC provider:</p>

<div class="rpc-buttons">
  <button id="switchLlamarpc">Switch to Llamarpc</button>
  <button id="switchPublicNode">Switch to PublicNode</button>
  <button id="switchBlockrazor">Switch to Blockrazor</button>
  <button id="switchBLXR">Switch to BLXR</button>
</div>

<style>
  body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    padding: 20px;
    background-color: #fafafa;
    color: #333;
  }

  ol {
    margin-bottom: 1em;
  }

  .rpc-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .rpc-buttons button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 15px;
    cursor: pointer;
    transition: background-color 0.25s, transform 0.1s;
  }

  .rpc-buttons button:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
  }

  .rpc-buttons button:active {
    transform: translateY(1px);
  }
</style>

<script>
  async function switchToBSC(rpcUrl) {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed. Please install it first.');
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x38', // 56 in hexadecimal
            chainName: 'Binance Smart Chain',
            nativeCurrency: {
              name: 'Binance Coin',
              symbol: 'BNB',
              decimals: 18,
            },
            rpcUrls: [rpcUrl],
            blockExplorerUrls: ['https://bscscan.com/'],
          },
        ],
      });
    } catch (error) {
      console.error('Error switching network:', error);
      alert('Failed to switch network. Check the console for details.');
    }
  }

  document
    .getElementById('switchLlamarpc')
    .addEventListener('click', () =>
      switchToBSC('https://binance.llamarpc.com')
    );

  document
    .getElementById('switchPublicNode')
    .addEventListener('click', () =>
      switchToBSC('https://bsc-rpc.publicnode.com/')
    );

  document
    .getElementById('switchBlockrazor')
    .addEventListener('click', () =>
      switchToBSC('https://bsc.blockrazor.xyz/')
    );

  document
    .getElementById('switchBLXR')
    .addEventListener('click', () =>
      switchToBSC('https://bsc.rpc.blxrbdn.com/')
    );
</script>


<!-- Donation Buttons (Top Right Corner) -->
<div id="donation-buttons" style="position:fixed; top:10px; right:10px; z-index:9999; display:flex; flex-direction:column; gap:6px; font-family:sans-serif;">
  <button onclick="donateBNB()" style="padding:6px 10px; background-color:#f3ba2f; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">Donate BNB</button>
  <button onclick="donateUSDT()" style="padding:6px 10px; background-color:#26a17b; border:none; border-radius:8px; cursor:pointer; font-weight:bold; color:white;">Donate USDT</button>
  <button onclick="donatePML()" style="padding:6px 10px; background-color:#008cff; border:none; border-radius:8px; cursor:pointer; font-weight:bold; color:white;">Donate PML</button>
</div>

<script type="text/javascript">
  const walletAddress = "0x00B28158d85a7a022aa978d5Ef08eC58dDb9e795";
  const usdtContract = "0x55d398326f99059fF775485246999027B3197955";
  const pmlContract = "0x69dD5e051AbB0109A609eE0B78187c3EE0326FbD";

  async function donateBNB() {
    if (!window.ethereum) return alert("MetaMask not detected.");
    const amount = prompt("Enter BNB amount to donate:");
    if (!amount || isNaN(amount) || amount <= 0) return;
    const value = (BigInt(Math.floor(amount * 1e18))).toString(16);
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [{
        from: (await ethereum.request({ method: "eth_requestAccounts" }))[0],
        to: walletAddress,
        value: "0x" + value,
      }],
    });
  }

  async function donateToken(contractAddress, decimals, symbol) {
    if (!window.ethereum) return alert("MetaMask not detected.");
    const amount = prompt(`Enter ${symbol} amount to donate:`);
    if (!amount || isNaN(amount) || amount <= 0) return;
    const amountHex = "0x" + BigInt(Math.floor(amount * 10 ** decimals)).toString(16);
    const from = (await ethereum.request({ method: "eth_requestAccounts" }))[0];

    const data = "0xa9059cbb" + 
      walletAddress.replace("0x", "").padStart(64, "0") +
      BigInt(Math.floor(amount * 10 ** decimals)).toString(16).padStart(64, "0");

    await ethereum.request({
      method: "eth_sendTransaction",
      params: [{
        from: from,
        to: contractAddress,
        data: data,
      }],
    });
  }

  function donateUSDT() { donateToken(usdtContract, 18, "USDT"); }
  function donatePML() { donateToken(pmlContract, 18, "PML"); }
</script>
