## 3box-iframe-browser-test

Use for testing simple assumptions about browser features. Currently tests using localstorage and indexedDB in an iframe with a differing origin.

### Usage

`iframe` folder includes code for a simple iframe. The js for the iframe is found in iframe.js and is built to dist/iframe.js. Server.js serves these files on port `3031`

Run and build iframe with:

```bash
npm run start:iframe
```

`primary` folder includes code for a simple webpage. There is index.html and index.js. Index.js is built to dist/index.js. Server.js serves these files on port `3030`

Run and build webpage with:

```bash
npm run start:primary
```

To easily test same-origin and cross-origin policies install and use ngrok to run tunnels for both. Then set the iframe domain const `IFRAME_URL` in `/primary/index.js`
