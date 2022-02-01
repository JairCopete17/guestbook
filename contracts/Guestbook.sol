//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Guestbook {
  uint256 totalWaves;
  uint256 private seed;

  event NewWave(
    address indexed from,
    uint256 timestamp,
    string message
  );

  struct Wave {
    address waver;
    string message;
    uint256 timestamp;
  }

  Wave[] waves;

  mapping(address => uint256) public lastWavedAt;

  constructor() payable {
    console.log("Ight, I'm working!");
    seed = (block.timestamp + block.difficulty) % 100;
  }

  function wave(string memory _message) public {
    totalWaves += 1;
    console.log("%s waved with message %s", msg.sender, _message);

    waves.push(Wave(msg.sender, _message, block.timestamp));

    // Set a 10min cooldown
    require(
      lastWavedAt[msg.sender] + 10 minutes < block.timestamp,
      "Wait 10 minutes"
    );
    lastWavedAt[msg.sender] = block.timestamp;

    // Create random number for prize percentage
    seed = (block.timestamp + block.difficulty + seed) % 100;
    console.log("Random number generated: %d", seed);

    // Set prize
    if (seed <= 50) {
      uint256 prizeAmount = 0.0005 ether;
      require(
        prizeAmount <= address(this).balance,
        "Trying to withdraw more money than the contract has."
      );
      (bool success, ) = (msg.sender).call{value: prizeAmount}("");
      require(success, "Failed to withdraw money from contract.");
    }

    emit NewWave(msg.sender, block.timestamp, _message);
  }

  function getAllWaves() public view returns (Wave[] memory){
    return waves;
  }

  function getTotalWaves() public view returns (uint256) {
    console.log("Guestbook have %d total waves!", totalWaves);
    return totalWaves;
  }
}
