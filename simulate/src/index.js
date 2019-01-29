var PrivateKeyProvider = require("truffle-privatekey-provider");
const Box = window.Box


// TODO add init functions or just make all these functions as buttons
//  Log keys funct
// Log keys numAdds
// Track key vals (all random lenght strings to be used with numbs ot tesst entry size )



const pinningServer = ' '
const addressServer = ''
const numProfiles = 1
let numProfilesCreate = 1
const numAdds = 20
let keyvals = 1

window.boxes = []
const OPS = ['OPEN', 'ADD', 'CHANGE', 'LOGOUT', 'RESET']

const ganacheHost = "http://localhost:8545"
var privKeyRand = "11111111111111111111111111111111111111111111111111111111111111";

const createKeyProvider = () => {
  // console.log(numProfilesCreate)
  const keynum = numProfilesCreate.toString()
  numProfilesCreate = numProfilesCreate + 1
  // console.log(keynum)
  let keyID = keynum.length === 1 ? '0' + keynum : keynum
  const privKey  = keyID + privKeyRand
  var provider = new PrivateKeyProvider(privKey, ganacheHost)
  provider.id = keynum
  return provider
}

const keyval = () => {
  console.log('setting ' + keyvals)
  return Array(2).fill((keyvals++).toString())
}

// Creates a box given a provider
const createBox = async (provider) =>  {
  console.log('creating box')
  console.log(provider.id)
  console.time("open Box " + provider.id);
  const box =  await Box.openBox(provider.address,  provider, {})
  box.onSyncDone(() => {
    console.log('onSyncDone Called for box ' + provider.id)
  })
  console.timeEnd("open Box " + provider.id)
  console.log(box)
  return box
}

// Creates 1 to num boxes and adds them to window.boxes
const addBox = async (num = 1) => {
  const boxPromiseArray = Array(num).fill().map(() => createBox(createKeyProvider()))
  console.log(boxPromiseArray )
  const boxes = await Promise.all(boxPromiseArray)
  window.boxes = window.boxes.concat(boxes)
}

window.addBox = addBox

// Adds n key/vals to a single box, or adds n key/values to each box in array
const addKey = async (boxes, num=1) => {
  boxes = Array.isArray(boxes) ? boxes : [boxes]
  const boxAddPromiseArray = (box) => {
    const addArray = Array(num).fill().map(() => box.public.set(...keyval()))
    return Promise.all(addArray)
  }
  const boxesAdding = await Promise.all(boxes.map(boxAddPromiseArray))
  return boxesAdding
}

window.addKey = addKey


startButton.addEventListener('click', () => {

  const run = async () => {
    const boxAdd = await addBox(2)
    console.log(boxAdd)
  }

  run()

})
