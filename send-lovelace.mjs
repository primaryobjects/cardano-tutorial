import {
  BlockfrostProvider as e,
  MeshWallet as t,
  Transaction as o,
} from "@meshsdk/core";
import r from "node:fs";
import 'dotenv/config';

const i = new e(process.env.BlockFrostProjectId);
const fromSecret = process.argv[2];
const toAddress = process.argv[3];
const amount = process.argv[4];

const s = new t({
  networkId: 0, // 0 = testnet, 1 = mainnet https://meshjs.dev/apis/wallets/meshwallet
  fetcher: i,
  submitter: i,
  key: {
    type: "root",
    bech32: fromSecret,
  },
});

(async () => {
  try {
    // Fetch UTXOs for the sender's address
    const utxos = await s.getUtxos();
    console.log("UTXOs:", utxos);

    // Ensure UTXOs are available
    if (!utxos || utxos.length === 0) {
      throw new Error("No UTXOs available for the sender's address.");
    }

    // Build the transaction
    const a = await new o({ initiator: s }).sendLovelace(toAddress, amount).build();
    const c = s.signTx(a);
    const d = await s.submitTx(c);

    console.log(`${amount / 1000000} Ada sent. Recipient: ${toAddress}, Tx hash: ${d}`);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
})();
