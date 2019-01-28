const PrivateKeyProvider = require("truffle-privatekey-provider");
const Box = window.Box

// To run many instances of 3box and many actions, this will turn in a to TEST
// data struct that can be given or generative. Array of box instances, each with
// an array of actions to perform in order of that box. Output will be another count_database
// struct to visualize results. But should also be able to use test suite over. May
// also want to allow timers or ways to simulate network latency and offline/online disconnects.


// Could have configs, right now uses all docker containers
// const pinningServer = ' '
// const addressServer = ''


// Simple try using privatekeyprovider to deterministically create test accounts

const numProfiles = 3
let numProfilesCreate = 1

const ganacheHost = "http://localhost:8545"
var privKeyRand = "11111111111111111111111111111111111111111111111111111111111111";

const createKeyProvider = () => {
  const keynum = numProfilesCreate.toString()
  numProfilesCreate++
  console.log(keynum)
  console.log(keynum.length)
  let keyID = keynum.length === 1 ? '0' + keynum : keynum
  numProfilesCreate++
  const privKey  = keyID + privKeyRand
  var provider = new PrivateKeyProvider(privKey, ganacheHost)
  return provider
}


startButton.addEventListener('click', () => {


const run = async () => {

  for( let i=numProfiles; i--; ){
    const provider = createKeyProvider()
    console.log(provider.address)
    const box = await Box.openBox(provider.address,  provider, {})
    console.log(box)
    await box.public.set('key', 'value!')
    const value = await box.public.get('key')
    console.log(value)
  }

}

  run()
})
