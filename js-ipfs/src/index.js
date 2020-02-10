#!/usr/bin/env node

const { ipfsRepo } = require('./s3')

const Daemon = require('./daemon')

const IPFS_PATH = process.env.IPFS_PATH

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const AWS_S3_ENDPOINT = process.env.AWS_S3_ENDPOINT
const AWS_S3_ADDRESSING_STYLE = process.env.AWS_S3_ADDRESSING_STYLE
const AWS_S3_SIGNATURE_VERSION = process.env.AWS_S3_SIGNATURE_VERSION

function prepareIPFSConfig () {
  let repo
  if (AWS_BUCKET_NAME) {
    if (!IPFS_PATH) {
      throw new Error('Invalid IPFS + s3 configuration')
    }

    repo = ipfsRepo({
      path: IPFS_PATH,
      bucket: AWS_BUCKET_NAME,
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      endpoint: AWS_S3_ENDPOINT,
      s3ForcePathStyle: AWS_S3_ADDRESSING_STYLE === 'path',
      signatureVersion: AWS_S3_SIGNATURE_VERSION
    })
  } else if (IPFS_PATH) {
    repo = IPFS_PATH
  }

  let swarmAddresses = [
    '/ip4/0.0.0.0/tcp/4002',
    '/ip4/127.0.0.1/tcp/4003/ws'
  ]
  if (process.env.RENDEZVOUS_ADDRESS) {
    swarmAddresses = [...swarmAddresses, process.env.RENDEZVOUS_ADDRESS]
  }

  const ipfsOpts = {
    repo,
    preload: { enabled: false },
    config: {
      Bootstrap: [],
      Addresses: {
        Swarm: swarmAddresses,
        API: '/ip4/0.0.0.0/tcp/5002',
        Gateway: '/ip4/0.0.0.0/tcp/9090'
      }
    }
  }

  return ipfsOpts
}

async function start () {
  const ipfsConfig = prepareIPFSConfig()
  daemon = new Daemon(ipfsConfig)
  return daemon.start()
}

start()
