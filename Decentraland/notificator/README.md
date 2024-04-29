# Notificator server

This is a simple server that implements monitors important events (such as 
transactions in the blockchain, bids in the auction, etc) and generates 
notifications for users.

# Running the server

## For development

For development purposes, just clone this repository, build the project and run:

```bash
git clone https://github.com/decentraland/notificator.git
yarn
yarn build
yarn start
```

There should be a server running on port 3000.

## For production

For running a production server, it is recommended to use the docker image
published by this repository. It is important to provide proper values for
LiveKit configuration using `--env` CLI options, as follows:

```bash
docker pull quay.io/decentraland/notificator
docker run --name notificator -p 3000:3000 quay.io/decentraland/notificator
```
