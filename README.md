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
