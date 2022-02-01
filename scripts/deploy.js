const main = async () => {
  const [deployer] = await hre.ethers.getSigners()
  const accountBalance = await deployer.getBalance()

  console.log("Deploying contracts with account: ", deployer.address)
  console.log("Account balance: ", accountBalance.toString())

  const waveContractFactory = await hre.ethers.getContractFactory("Guestbook")
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1")
  })

  await waveContract.deployed()

  // Show the address of the deployed contract
  console.log("Guestbook address: ", waveContract.address)
};

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