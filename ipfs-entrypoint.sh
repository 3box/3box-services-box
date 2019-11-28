#!/bin/sh
set -e

/usr/local/bin/start_ipfs version

ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://localhost:30000", "https://webui.ipfs.io"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'

exec ipfs "$@"
