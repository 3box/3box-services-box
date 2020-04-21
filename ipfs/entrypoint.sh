#!/bin/sh
set -e

# Run base to init repo if needed
/usr/local/bin/start_ipfs version

# Clean up in case shut down incorrectly
rm -f $IPFS_PATH/api

exec ipfs "$@"
