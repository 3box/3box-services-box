#!/bin/sh
set -e

# Run base to init before adding config
/usr/local/bin/start_ipfs version

# Clean up in case shut down incorrectly
rm -f $IPFS_PATH/api

ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:30000", "https://webui.ipfs.io"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'

exec ipfs "$@"
