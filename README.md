[![Discord](https://img.shields.io/discord/484729862368526356.svg?style=for-the-badge)](https://discordapp.com/invite/Z3f3Cxy)
[![Twitter Follow](https://img.shields.io/twitter/follow/3boxdb.svg?style=for-the-badge&label=Twitter)](https://twitter.com/3boxdb)


[Intro](#intro) | [Usage](#usage) | [Details](#details)

# 3Box Services Box <a name="Intro">

> All 3box services and libraries containerized and connected to run together in one place.

Allows you to easily spin up and connect all 3Box clients and services with a single command. Useful as a 3Box development, testing and experimentation environment as all code is included as submodules for quick code access and for making changes across services. Can check out each service at any commit/branch to try different versions of services together. Running will start all services locally and connect them to each other so that they work out of the box. Most services and libaries have live rebuild/reloads and mounted volumes in their containers so that as you write code across services you can get live and instant feedback.

## <a name="usage"></a> Usage

First have Docker installed on your machine.

Clone repo with submodules:
```bash
$ git clone --recurse-submodules https://github.com/3box/3box-services-box.git
$ cd 3box-services-box
```

### Deployment Experiments

This particular branch of the services box is where different deployment architectures can be tested out. It includes:
- The current deployment setup in the main [`docker-compose.yml`](docker-compose.yml) file
- Additional compose files for different container orchestrations
- The [`dockprom`](https://github.com/stefanprodan/dockprom) repo as a submodule to run a Prometheus/Grafana monitoring stack locally
- The [`docker-elk`](https://github.com/deviantony/docker-elk) repo as a submodule to run an ELK logging stack locally

The logging/monitoring stacks should be run separately from the 3box orchestration, on their own docker networks, through their own compose files.

#### Setup notes

The multi-ipfs deployments rely on the rendezvous node for browser nodes to find backend ipfs nodes.

TLDR: If on OS X, add the following entry to your computer's `/etc/hosts` file: `127.0.0.1 host.docker.internal`. Otherwise, keep reading...

All peers finding each other through the rendezvous node must advertise on it **with the same multiaddress for the rendezvous node**. This is challenging with docker, because the browser is necessarily running on the host's network interface, while the IPFS nodes are on the docker network's interface, so they will have different IP addresses and hostnames for the rendezvous node. For Mac, this can be resolved by using the `host.docker.internal` hostname set automatically in each of the containers, but this entry must also be added to the docker host's hostname resolution (for example, in the `/etc/hosts` file). For other OSes, this will rely on alternative methods for setting a hostname to the host's ip inside a container, such as by using the `extra_hosts` attribute for each container in the compose file.

#### Multiple Pinning Nodes (Distinct Keystores)

This setup is described with 2 pinning nodes in [this compose file](docker-compose.2pin.yml)

#### Separate IPFS/orbit Nodes, Multiple IPFS Nodes (Distinct Keystores)

This setup uses pinning pubsub workers, and is described in [this compose file](docker-compose.2pin2ipfs.yml)

### Running a pinning node peer

A personal pinning node peer can be added to the 3box network by running the services in this repo. This pinning node will handle all (or a subset of, if desired) pinning requests sent to the 3box network.

Update the `.env` file in the root of this repo, under the "Personal Node" section:
`PIN_WHITELIST_DIDS`: An optional comma-separated (no whitespaces) list of root DIDs to be pinned when requsted
`PIN_WHITELIST_SPACES`: An optional comma-separated (no whitespaces) list of space names to be pinned when requested

For space, these parameters are used together such that both must be matched to be pinned - a space will only be pinned if its name is in the whitelist and its owner has a root DID in the whitelist.

For both of these parameters, if left blank, all DIDs/spaces will be pinned.

The other two entries in this section of the `.env` file set the authentication for minio, the object store container. These can be updated if desired, but the minio container is not exposed by default.


Start the pinning node peer:
```
docker-compose -p privnode -f docker-compose.privnode.yml up --build
```

(Here, a unique project name is set with the `-p` parameter so as to not conflict with the services box)

#### Trying out the pinning node peer

The pinning node includes the [3box REST API](https://github.com/3box/3box-api), which is served locally at `http://127.0.0.1:8082`. This can be used to fetch data that has been pinned to the peer. For example, to store a copy of your profile on your local machine, and then verify it through the API:

1. Make sure your DID is configured in the pinning peer's whitelist in the `.env` file
2. Start up the pinning node peer
3. Run the example 3box-js webapp to connect to the 3box network by running
    ```
    cd 3box-js
    npm i
    npm example:start
    ```
4. Authenticate
5. Wait a few seconds
6. Set some data on your profile on the example server
7. Fetch your profile from the local API with
    ```
    curl http://127.0.0.1:8082/profile?did=<your DID>
    ```

### Running the 3box network locally

Start all services:
```bash
$ docker-compose up
```

You can also start individual services, for example just start the pinning node to use else where.

```bash
$ docker-compose up pinning
```

## <a name="details"></a> Details

The following services are available to run here:

- `pinning` - [3box-pinning-server](https://github.com/3box/3box-pinning-server) as ipfs/orbitdb pinning pinning node
- `profile_api` and `redis` - [3box-api](https://github.com/3box/3box-api) as the getProfile API and redis cache.
- `3boxjs` - [3box-js](https://github.com/3box/3box-js) example dapp, server 3boxjs dist file configure for services here
- `graphql` - [3box-graphql](https://github.com/3box/3box-graphql) endpoint
- `address` and `address_db` - [3box-address-server](https://github.com/3box/3box-address-server) with POSTGRES database
- `simulate`- A WIP to run simulation tests with many 3Box instances
- `libp2p` - An instance of the libp2p websocket star router for peer discovery
- `minio` - An S3-compatible object store

To restart just one service instead of all
```bash
$ docker-compose restart pinning
```
