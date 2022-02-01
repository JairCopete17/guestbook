import { ethers } from 'ethers'
import { useState, useEffect } from 'react'

import abi from './utils/Guestbook.json'

import Header from './components/Header'
import Message from './components/Message'
import Button from './components/Button'
import Wavelist from './components/Wavelist'

export default function App () {
  const [currentAccount, setCurrentAccount] = useState('')
  const [allWaves, setAllWaves] = useState([])
  const [count, setCount] = useState(0)

  const contractAddress = '0xD7265A913D8a72CEB695De3204f0805b8585496f'
  const contractABI = abi.abi

  const getAllWaves = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const guestbookContract = new ethers.Contract(contractAddress, contractABI, signer)

        const waves = await guestbookContract.getAllWaves()

        let wavesCleaned = []
        waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          })
        })

        setAllWaves(wavesCleaned)
      } else console.log('Ethereum object does not exist')
    } catch (error) {
      console.log(error)
    }
  }

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
        getAllWaves()
      } else
        console.log('No authorized account found')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
    getAllWaves()
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

        const waveTxn = await guestbookContract.wave('gm', { gasLimit: 300000 })
        console.log('⛏ Mining', waveTxn.hash)
        await waveTxn.wait()
        console.log('⚒ Mined', waveTxn.hash)

        count = await guestbookContract.getTotalWaves()
        setCount(count.toNumber())
        console.log('Retrieved total wave count: ', count.toNumber())
        getAllWaves()
      } else console.log('Ethereum object does not exist')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="max-w-3xl min-h-screen mx-auto grid content-center py-4">
      <Header />
      <Message count={count} />
      <Button
        currentAccount={currentAccount}
        wave={wave}
        connectWallet={connectWallet}
      />
      <Wavelist allWaves={allWaves} />
    </main>
  )
}