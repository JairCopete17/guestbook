export default function Button ({ currentAccount, wave, connectWallet }) {
  return (
    currentAccount
      ? <button
          className="flex items-center justify-center text-lg px-12 py-3 m-4 rounded-lg bg-gradient-to-r from-pink-600 to-yellow-600 hover:from-blue-600 hover:to-green-600 active:scale-75"
          onClick={wave}
        >
          gm
        </button>
      : <button
          className="flex items-center justify-center text-lg px-12 py-3 m-4 rounded-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-pink-600 hover:to-yellow-600 active:scale-75"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
  )
}