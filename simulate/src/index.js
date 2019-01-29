var PrivateKeyProvider = require("truffle-privatekey-provider");
// const Box = require('3box')
const Box = window.Box
// console.log(Box)
// console.log(Box2)



const pinningServer = ' '
const addressServer = ''
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
