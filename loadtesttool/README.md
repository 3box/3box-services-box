# load test tool
Run multiple 3box clients simultaneously using puppeteer.

## Usage
Install dependencies:
```
$ cd loadtesttool
$ npm ci
```

Run the tool:
```
$ ./src/cli.js

This tool starts a number of clients that open threads and post to them. Half of the clients will post to threads and half will just open them.

Usage: $ cli.js [num clients] [num clients posting] [num spaces] [num thread posts]

* num clients - the number of 3box-js clients
* num clients posting - the number of 3box-js clients that will post in threads
* num spaces - the number different spaces (and threads) to use
* num thread posts - the number posts clients should make in threads they open
```


```
$ ./src/cli.js 20 7 3 20
```
