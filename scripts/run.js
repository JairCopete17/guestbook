const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("Guestbook");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  // Set a variable for wave count
  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  // Wave
  let waveTxn = await waveContract.wave();
  await waveTxn.wait();

  // Wave from a random address
  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();

  // Store the address who waved to the contract
  let addresses = [];
  addresses.push(randomPerson.address);

  // Get the new wave count and the new address who waved
  waveCount = await waveContract.getTotalWaves();
  console.log(addresses);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();