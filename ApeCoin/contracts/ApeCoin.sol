// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.2/token/ERC20/ERC20.sol";

contract ApeCoin is ERC20 {
    // Constructor
    constructor() ERC20("ApeCoin", "APE") {
        _mint(msg.sender, 1000000000 * 10 ** 18);
    }
}
