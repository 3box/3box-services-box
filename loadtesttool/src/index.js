import Box from '3box'
import IdentityWallet from 'identity-wallet'
import { randomBytes } from 'tweetnacl'

const config = {
  disableRendezvous: true,
  pinningNode: '/dnsaddr/ipfs-dev.3box.io/tcp/443/wss/ipfs/QmZipMZjcYTjnyk4WQuV1HB5XUM98hBy3MpJmPTsVoMvW8',
  addressServer: 'https://rveke74nqg.execute-api.us-west-2.amazonaws.com/develop/'
}

const randSeed = () => '0x' + Buffer.from(randomBytes(32)).toString('hex')
const randMsg = length => {
   var result           = ''
   var characters       = '  ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   var charactersLength = characters.length
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
   }
   return result
}

const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    space: params.get('space'),
    thread: params.get('thread'),
    numPosts: params.get('numPosts'),
  }
}

const threadAction = async (box, { space, thread, numPosts }) => {
  if (space && thread && numPosts) {
    await box.auth([space])
    console.log('authed')
    const t = await box.openThread(space, thread, {
      firstModerator: 'did:3:bafyreigbyazm6pk24iwejjiltxrgmmjgfpdnzl7gbbr2oqu2272xo477te'
    })
    window.thread = t
    console.log('thread opened')
    for (let i = 0; i < numPosts; i++) {
      await t.post({ msg: randMsg(80) })
    }
    console.log('posted in thread')
  } else {
    console.log('please set options!')
  }
}

const start = async () => {
  const idw = new IdentityWallet(() => true, { seed: randSeed() })
  window.idw = idw
  const box = await Box.create(idw.get3idProvider(), config)
  window.box = box

  threadAction(box, getParams())
}

start()
