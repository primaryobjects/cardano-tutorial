#
# Displays the metadata from a blockchain transaction.
#
import os
import sys
from blockfrost import BlockFrostApi, ApiUrls

# Load environment variables
blockfrost_project_id = os.getenv("BlockFrostProjectId")

# Get the transaction hash from the command line argument
if len(sys.argv) < 2:
    print("Usage: python your_script.py <transaction_hash>")
    sys.exit(1)

transaction_hash = sys.argv[1]

# Initialize the BlockFrost API
api = BlockFrostApi(project_id=blockfrost_project_id, base_url=ApiUrls.preview.value)

# Fetch the transaction metadata
metadata = api.transaction_metadata(transaction_hash)

# Print the metadata
print("Transaction Metadata:")
print(metadata)