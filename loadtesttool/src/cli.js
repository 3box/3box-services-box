#!/usr/bin/env node
const puppeteer = require('puppeteer')

const delay = (maxSeconds) => {
  // delay for up to one minute
  const millisecs = (Math.floor(Math.random() * maxSeconds) + 1) * 1000
  return new Promise((resolve, reject) => { setTimeout(resolve, millisecs) })
}

const randMsg = length => {
   var result           = ''
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   var charactersLength = characters.length
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
   }
   return result
}

const genNameArray = num => {
  return new Array(num).fill(null).map(() => randMsg(10))
}

const startClient = async (browser, spaceName, threadName, numPosts) => {
  await delay(20)
  const url = `http://0.0.0.0:40000?space=${spaceName}&thread=${threadName}&numPosts=${numPosts}`
  console.log(url)
  const page = await browser.newPage()
  await page.goto(url)
  return page
}

const start = async (clients, clientsPosting, numSpaces, numPosts) => {
  console.log(clients, clientsPosting, numSpaces, numPosts)
  const browser = await puppeteer.launch({
     headless: true,
     args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const spaces = genNameArray(numSpaces)
  const threads = spaces.map(name => name + '-thread')
  for (let i = 0; i < clients; i++) {
    const numDesiredPosts = i < clientsPosting ? clientsPosting : 0
    startClient(browser, spaces[i % spaces.length], threads[i % spaces.length], numDesiredPosts)
  }
}


const args = process.argv
if (args.length < 6) {
  console.log('This tool starts a number of clients that open threads and post to them. Half of the clients will post to threads and half will just open them.\n')
  console.log('Usage: $ cli.js [num clients] [num clients posting] [num spaces] [num thread posts]\n')
  console.log('* num clients - the number of 3box-js clients')
  console.log('* num clients posting - the number of 3box-js clients that will post in threads')
  console.log('* num spaces - the number different spaces (and threads) to use')
  console.log('* num thread posts - the number posts clients should make in threads they open')
} else {
  const [a,b, clients, clientsPosting, numSpaces, numPosts] = args
  start(parseInt(clients), parseInt(clientsPosting), parseInt(numSpaces), parseInt(numPosts))
}
