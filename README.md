<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pool Funding Utility Tools</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 2rem auto;
        padding: 1rem;
        line-height: 1.6;
        text-align: center;
        background-color: #fafafa;
        color: #333;
      }
      h1 {
        color: #333;
        margin-top: 1.5rem;
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
        transition: background 0.25s, transform 0.1s;
      }
      button:hover {
        background: #0056b3;
        transform: translateY(-1px);
      }
      button:active {
        transform: translateY(1px);
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
      .rpc-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        margin-top: 1rem;
      }
      .rpc-buttons button {
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 16px;
        font-size: 15px;
        cursor: pointer;
        transition: background-color 0.25s, transform 0.1s;
      }
      .rpc-buttons button:hover {
        background-color: #218838;
      }
      #donation-buttons {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-family: sans-serif;
      }
      #donation-buttons button {
        padding: 6px 10px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        color: white;
      }
      #donation-buttons button:first-child {
        background-color: #f3ba2f;
        color: black;
      }
      #donation-buttons button:nth-child(2) {
        background-color: #26a17b;
      }
      #donation-buttons button:nth-child(3) {
        background-color: #008cff;
      }
    </style>
  </head>

  <body>
    <h1>Welcome!</h1>
    <p>
      Use the buttons below to help streamline wallet operation.<br />
      This page is operated by <strong>Hunter Rodriguez</strong> to assist
      Pool Funding users.<br />
      Donations using the above buttons are greatly appreciated!
    </p>

    <hr style="margin: 2rem 0;" />

    <!-- Add Tokens Section -->
    <h1>Add All Tokens to MetaMask</h1>
    <p>
      This button helps you easily add the Pool Funding custom tokens to your MetaMask wallet in just a few clicks.
    </p>
    <ol>
      <li>Ensure the <strong>MetaMask extension</strong> or mobile app is installed.</li>
      <li>Confirm that you are connected to <strong>Binance Smart Chain</strong>.</li>
      <li>Click the button below to start adding tokens.</li>
      <li>MetaMask will show a prompt — approve it to add all tokens.</li>
    </ol>
    <button id="addTokens">Add All Tokens to MetaMask</button>

    <hr style="margin: 2rem 0;" />

    <!-- RPC Switch Section -->
    <h1>Switch to Different RPC URLs</h1>
    <p>
      These buttons let you quickly update MetaMask on the
      <strong>Binance Smart Chain</strong> network to use different public RPC endpoints.
    </p>
    <p>
      Use this if MetaMask shows only your BNB balance, a zero balance, or fails to send transactions.
    </p>
    <ol>
      <li>Make sure MetaMask is installed.</li>
      <li>If prompted, approve MetaMask’s request to add or switch to BSC.</li>
      <li>Try a different RPC endpoint if one is slow or unresponsive.</li>
    </ol>
    <p>Select your preferred RPC provider:</p>

    <div class="rpc-buttons">
      <button id="switchLlamarpc">Llamarpc</button>
      <button id="switchPublicNode">PublicNode</button>
      <button id="switchBlockrazor">Blockrazor</button>
      <button id="switchBLXR">BLXR</button>
    </div>

    <!-- Donation Buttons -->
    <div id="donation-buttons">
      <button onclick="donateBNB()">Donate BNB</button>
      <button onclick="donateUSDT()">Donate USDT</button>
      <button onclick="donatePML()">Donate PML</button>
    </div>

    <script>
      /* -----------------------------
         Add Tokens to MetaMask
      ----------------------------- */
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
          image: "https://pmlcoin.app/assets/pfb64-Boh4Kv0
