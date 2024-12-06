import { MeshWallet as e, deserializeAddress as r } from "@meshsdk/core";
import s from "node:fs";
import path from "node:path";

async function generateWallet(fileName, dir) {
  const o = e.brew(true);
  console.log("Generated key:", o);

  // Create a new wallet instance
  const wallet = new e({ networkId: 0, key: { type: "root", bech32: o } });
  console.log("Wallet instance created:", wallet);

  // Get unused addresses
  const unusedAddresses = await wallet.getUnusedAddresses();
  console.log("Unused addresses:", unusedAddresses);

  // Check if any addresses were generated
  if (!unusedAddresses || unusedAddresses.length === 0) {
    throw new Error("Failed to generate address.");
  }

  // Select the first unused address
  const t = unusedAddresses[0];
  console.log("Generated address:", t);

  // Deserialize the address to get the public key hash
  const d = r(t).pubKeyHash;
  console.log("Public key hash:", d);

  console.log(`Saving ${fileName}.`);
  s.writeFileSync(path.join(dir, `${fileName}.skey`), o);
  s.writeFileSync(path.join(dir, `${fileName}.addr`), t);
  s.writeFileSync(path.join(dir, `${fileName}.pkh`), d);
}

(async () => {
  // Define the directory and file names
  const dir = path.join(process.cwd(), "keys");
  const files = ["seller", "bidder1", "bidder2"];

  // Create the directory if it doesn't exist
  if (!s.existsSync(dir)) {
    s.mkdirSync(dir);
  }

  // Write the key, address, and public key hash to files
  files.forEach(async (fileName) => {
    // Generate the key
    await generateWallet(fileName, dir);
  });
})();