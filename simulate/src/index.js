var PrivateKeyProvider = require("truffle-privatekey-provider");
const Box = window.Box

const pinningServer = ' '
const addressServer = ''
const numProfiles = 1
let numProfilesCreate = 1
const numAdds = 20
let keyvals = 1

const OPS = ['OPEN', 'ADD', 'CHANGE', 'LOGOUT', 'RESET']

const ganacheHost = "http://localhost:8545"
var privKeyRand = "11111111111111111111111111111111111111111111111111111111111111";

const createKeyProvider = () => {
  console.log(numProfilesCreate)
  const keynum = numProfilesCreate.toString()
  numProfilesCreate = numProfilesCreate + 1
  console.log(keynum)
  let keyID = keynum.length === 1 ? '0' + keynum : keynum
  const privKey  = keyID + privKeyRand
  var provider = new PrivateKeyProvider(privKey, ganacheHost)
  return provider
}

const keyval = () => {
  console.log('setting ' + keyvals)
  return Array(2).fill((keyvals++).toString())
}

const getBox = async (provider) =>  { //await Box.openBox(provider.address,  provider, {})
  console.time("open Box");
  const box =  await Box.openBox(provider.address,  provider, {})
  console.timeEnd("open Box")
  return box
}

// const boxArray = Array(numProfiles).fill().map(() => { getBox(createKeyProvider())})
// Promise.all(BoxArray).then(boxes => Promise.all(boxes.map(box => Promise.All(Array(numAdds).map(() => box.public.set(...keyval())))))


startButton.addEventListener('click', () => {

  const run = async () => {
    const boxPromiseArray = Array(numProfiles).fill().map(() => getBox(createKeyProvider()))
    const boxes = await Promise.all(boxPromiseArray)
    window.boxes = boxes
    const boxAddPromiseArray = (box) => {
      const addArray = Array(numAdds).fill().map(() => box.public.set(...keyval()))
      return Promise.all(addArray)
    }
    const boxesAdding = await Promise.all(boxes.map(boxAddPromiseArray))
    console.log('All Done')
  }

  run()

})
