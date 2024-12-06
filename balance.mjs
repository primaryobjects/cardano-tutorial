import { BlockfrostProvider as e } from "@meshsdk/core";
import 'dotenv/config';

// Get the wallet address from the command line arguments
const walletAddress = process.argv[2];

if (!walletAddress) {
  console.error("Please provide a wallet address.");
  process.exit(1);
}

// Initialize the Blockfrost provider
const provider = new e(process.env.BlockFrostProjectId);

(async () => {
  try {
    // Fetch the assets for the wallet address
    const assets = await provider.fetchAddressAssets(walletAddress);
    console.log("Assets:", assets);

    // Get the balance in lovelace
    const balance = assets.lovelace ? parseInt(assets.lovelace) : 0;

    console.log(`Balance for address ${walletAddress}: ${balance / 1000000} ADA`);
  } catch (error) {
    console.error("Failed to fetch balance:", error);
  }
})();
