const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners()
  const waveContractFactory = await hre.ethers.getContractFactory("Guestbook")
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1")
  })
  await waveContract.deployed()

  console.log("Contract address:", waveContract.address)
  console.log("Contract deployed by:", owner.address)

  // Get balance
  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
  console.log("Contract balance", hre.ethers.utils.formatEther(contractBalance))

  // Set a variable for wave count
  let waveCount
  waveCount = await waveContract.getTotalWaves()

  // Wave
  let waveTxn = await waveContract.wave("gm")
  await waveTxn.wait()

  // Wave from a random address
  waveTxn = await waveContract.connect(randomPerson).wave("gm")
  await waveTxn.wait()

  // Get new balance
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address)
  console.log("Contract balance", hre.ethers.utils.formatEther(contractBalance))

  let allWaves = await waveContract.getAllWaves()
  console.log(allWaves)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()