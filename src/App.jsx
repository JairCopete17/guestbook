import { ethers } from 'ethers'
import { useState, useEffect } from 'react'

import abi from './utils/Guestbook.json'

export default function App () {
  const [currentAccount, setCurrentAccount] = useState('')
  const [count, setCount] = useState(0)

  const contractAddress = '0x5253ddfDdbaFb752Ca940f6dc7108faae4BD1946'
  const contractABI = abi.abi

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window
      const accounts = await ethereum.request({ method: 'eth_accounts' })

      ethereum
        ? console.log('Wallet is connected', ethereum)
        : console.log('Verify your wallet is connected')

      if (accounts.length !== 0) {
        const account = accounts[0]
        console.log('Found an authorized account', account)
        setCurrentAccount(account)
      } else
        console.log('No authorized account found')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const connectWallet = async () => {
    try {
      const { ethereum } = window
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      if (!ethereum) {
        alert('Get Metamask')
        return
      }

      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const guestbookContract = new ethers.Contract(contractAddress, contractABI, signer)

        let count = await guestbookContract.getTotalWaves()
        setCount(count.toNumber())
        console.log('Retrieved total wave count: ', count.toNumber())

        const waveTxn = await guestbookContract.wave()
        console.log('⛏ Mining', waveTxn.hash)
        await waveTxn.wait()
        console.log('⚒ Mined', waveTxn.hash)

        count = await guestbookContract.getTotalWaves()
        setCount(count.toNumber())
        console.log('Retrieved total wave count: ', count.toNumber())
      } else console.log('Ethereum object does not exist')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="mx-auto max-w-2xl py-12 md:min-h-screen md:py-0 flex flex-col items-center justify-center gap-6">
      <header className="flex items-center gap-4">
        <img
          src="https://emojicdn.elk.sh/🌞?style=apple"
          alt="Sun with face emoji"
          className="w-10 h-10 md:w-16 md:h-16"
        />
        <h1 className="text-4xl font-bold">Guestbook</h1>
      </header>
      <p className="px-8">Hey there, here is the space where you can drop your gm.</p>
      {count > 1 && <p className="px-8">Already {count} ppl drop their gm in the <strong>Guestbook!</strong></p>}
      {currentAccount
        ? <button
            className="flex items-center justify-center text-lg px-12 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-blue-600 hover:to-green-600 active:scale-75"
            onClick={wave}
          >
            gm
          </button>
        : <button
            className="flex items-center justify-center text-lg px-12 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-green-600 hover:from-pink-600 hover:to-yellow-600 active:scale-75"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
      }
    </main>
  )
}