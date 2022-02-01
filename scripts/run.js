const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("Guestbook");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract address:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  // Set a variable for wave count
  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  // Wave
  let waveTxn = await waveContract.wave("gm");
  await waveTxn.wait();

  // Wave from a random address
  waveTxn = await waveContract.connect(randomPerson).wave("gm");
  await waveTxn.wait();

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
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