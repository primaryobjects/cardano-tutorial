#
# Sends ADA to a recipient with the message "Hello World" in the blockchain transaction metadata.
#
import os
import json
from blockfrost import ApiUrls
from pycardano import *

# Use testnet
network = Network.TESTNET

# Load environment variables
blockfrost_project_id = os.getenv("BlockFrostProjectId")
skey_path_name = os.getenv("SenderSecretPathName")

# Load the signing key using pycardano
with open(skey_path_name, "r") as f:
    skey_data = json.load(f)
    psk = PaymentSigningKey.from_primitive(bytes.fromhex(skey_data["cborHex"]))

# Create the signing key from the secret key
pvk = PaymentVerificationKey.from_signing_key(psk)

# Derive an address
address = Address(pvk.hash(), network=network)

# Create a BlockFrost chain context
context = BlockFrostChainContext(blockfrost_project_id, base_url=ApiUrls.preview.value)

# Create a transaction builder
builder = TransactionBuilder(context)

# Add input address
builder.add_input_address(address)

# Get all UTxOs at this address
utxos = context.utxos(address)

# Add a specific UTxO to the transaction
builder.add_input(utxos[0])

# Add an output without a datum hash
builder.add_output(
    TransactionOutput(
        Address.from_primitive(os.getenv("RecipientAddress")),
        Value.from_primitive([1000000])
    )
)

# Build the transaction
tx = builder.build()

# Create metadata with the message "Hello World"
metadata = Metadata()
metadata[1] = "Hello World"

# Create auxiliary data with the metadata
auxiliary_data = AuxiliaryData(data=metadata)

# Add auxiliary data to the transaction builder
builder.auxiliary_data = auxiliary_data

# Sign and submit the transaction
signed_tx = builder.build_and_sign([psk], change_address=address)
context.submit_tx(signed_tx)

# Print the transaction hash. "Hello World" will be visible on the Metadata tab. https://preview.cardanoscan.io/transaction/079112f6a5192c6eeae57de0607d61e07dea864efc2bbad7aa953795a5c56aae?tab=metadata
print(f"Transaction submitted with hash: {signed_tx.id}")