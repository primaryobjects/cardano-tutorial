#
# Generates a wallet address using pycardano.
#
import json
from pycardano import PaymentSigningKey, PaymentVerificationKey, Address, Network

# Generate a new payment signing key
psk = PaymentSigningKey.generate()

# Derive the corresponding payment verification key
pvk = PaymentVerificationKey.from_signing_key(psk)

# Derive the address
address = Address(pvk.hash(), network=Network.TESTNET)

# Create the JSON structure for the secret key
skey_data = {
    "type": "PaymentSigningKeyShelley_ed25519",
    "description": "Payment Signing Key",
    "cborHex": psk.to_primitive().hex()
}

# Save the secret key to a file
with open("payment.skey", "w") as f:
    json.dump(skey_data, f, indent=2)

# Save the generated address to a file
with open("payment.addr", "w") as f:
    f.write(str(address))

# Print the generated address
print(f"Generated address: {address}")

# Print the secret key file path
print("Secret key saved to payment.skey")
print("Address saved to payment.addr")
