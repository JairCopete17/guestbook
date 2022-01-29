//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Guestbook {
  uint256 totalWaves;

  constructor() {
    console.log("Ight, I'm working!");
  }

  function wave() public {
    totalWaves += 1;
    console.log("%s has waved!", msg.sender);
  }

  function getTotalWaves() public view returns (uint256) {
    console.log("Guestbook have %d total waves!", totalWaves);
    return totalWaves;
  }
}
