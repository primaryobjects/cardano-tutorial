Cardano Beginner Tutorial
=========================

An easy tutorial for developing with the Cardano blockchain, creating a wallet, sending and receiving ADA.

## Quick Start

1. Clone the [Plutus](https://github.com/IntersectMBO/plutus-tx-template.git) project to setup the code.

    ```bash
    git clone https://github.com/IntersectMBO/plutus-tx-template.git
    ```
2. Create a new directory `off-chain` and add required node js modules.

    ```bash
    mkdir off-chain
    cd off-chain
    npm add @meshsdk/core
    npm add cbor
    ```
3. Create an account on [BlockFrost](https://blockfrost.io/dashboard) to avoid needing to run your own local blockchain node.
4. Create a BlockFrost project named **hello-world** on the **Cardano preview** network.
5. Create a local wallet by running the file [generate-keys.mjs](generate-keys.mjs).

    ```bash
    node generate-keys.mjs
    ```

    You should see output similar to the following:

    ```
    Generated key: <WALLET_SECRET_KEY>
    generate-keys.mjs:8
    Wallet instance created: MeshWallet {_wallet: EmbeddedWallet, _accountIndex: 0, _keyIndex: 0, _fetcher: undefined, _submitter: undefined, …}
    generate-keys.mjs:12
    Unused addresses: (1) ['<WALLET_ADDRESS>']
    generate-keys.mjs:16
    Generated address: addr_test1<WALLET_ADDRESS>
    generate-keys.mjs:25
    Public key hash: <WALLET_PUBLIC_KEY>
    generate-keys.mjs:29
    Creating seller.
    generate-keys.mjs:42
    Creating bidder1.
    generate-keys.mjs:42
    Creating bidder2.
    ```
6. Get free ADA for the new wallet by using the Cardano [Faucet](https://docs.cardano.org/cardano-testnets/tools/faucet/) on **Preview Testnet**. Enter the seller's **Address** from `keys/seller.addr` *(for example, `addr_test1<WALLET_ADDRESS>`)*.

    You should see output similar to the following:

    ```
    Success
    Your transaction has been successful and test funds have been sent to addr_test1<WALLET_ADDRESS>.
    
    Please verify the following transaction hash: <TRANSACTION_HASH>
    ```
7. Verify the transaction for receiving ADA at [Cardanoscan](https://preview.cardanoscan.io). Paste in the transaction hash and click on the **UTXO** tab to see the ADA transferred to the wallet. *Return tokens after use to `addr_test1vqeux7xwusdju9dvsj8h7mca9aup2k439kfmwy773xxc2hcu7zy99`.*
8. Send ADA to another wallet by using [send-lovelace.mjs](send-lovelace.mjs). *Note, amount is in **lovelace**, where 1 ADA = 1,000,000 lovelace.*

    ```bash
    node send-lovelace.mjs <from_secret> <to_address> <amount>
    ```

    You should see output similar to the following, which may also be confirmed on [Cardanoscan](https://preview.cardanoscan.io):

    ```
    Ada sent. Recipient: addr_test<TO_ADDRESS>, Tx hash: <TRANSACTION_HASH>
    ```
9. Verify the transaction for sending ADA at [Cardanoscan](https://preview.cardanoscan.io). Paste in the transaction hash and click on the **UTXO** tab to see the ADA transferred to the wallet. *Return tokens after use to `addr_test1vqeux7xwusdju9dvsj8h7mca9aup2k439kfmwy773xxc2hcu7zy99`.*
10. Check the balance of any of the generated wallets using [balance.mjs](balance.mjs):

    ```bash
    node balance.mjs addr_test1<WALLET_ADDRESS>
    ```

    You should see output similar to the following:

    ```
    Assets: {lovelace: '1000000'}
    Balance for address addr_test<WALLET_ADDRESS>: 1 ADA
    ```
11. Confirm the wallet balance at [Cardanoscan](https://preview.cardanoscan.io) by entering the wallet address *(instead of a transaction hash)*.

## License

MIT

## Author

Kory Becker
http://primaryobjects.com
