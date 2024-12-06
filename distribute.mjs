import {
  BlockfrostProvider as e,
  MeshWallet as t,
  Transaction as o,
} from "@meshsdk/core";
import r from "node:fs";
import path from "node:path";
import 'dotenv/config';

const recipients = ["bidder1", "bidder2"];
const amount = "1000000";
const delay = 5000; // There must be a delay of 1 min+ for the transaction to register in the blockchain for the sender before issuing another transaction! Delay in milliseconds (e.g., 5000ms = 5 seconds)

const dir = path.join(process.cwd(), "keys");

const sendLovelaceWithDelay = async (recipient, delay) => {
  const i = new e(process.env.BlockFrostProjectId);
  const n = r.readFileSync(`${path.join(dir, `${recipient}.addr`)}`).toString();
  const s = new t({
    networkId: 0, // 0 = testnet, 1 = mainnet https://meshjs.dev/apis/wallets/meshwallet
    fetcher: i,
    submitter: i,
    key: {
      type: "root",
      bech32: r.readFileSync(`${path.join(dir, 'seller.skey')}`).toString().trim(),
    },
  });

  try {
    const a = await new o({ initiator: s }).sendLovelace(n, amount).build();
    const c = s.signTx(a);
    const d = await s.submitTx(c);

    console.log(`${amount / 1000000} Ada sent. Recipient: ${n}, Tx hash: ${d}`);
  } catch (error) {
    console.error(`Failed to send Ada to ${n}:`, error);
  }

  return new Promise(resolve => setTimeout(resolve, delay));
};

const processFiles = async () => {
  for (const recipient of recipients) {
    await sendLovelaceWithDelay(recipient, delay);
  }
};

processFiles();
