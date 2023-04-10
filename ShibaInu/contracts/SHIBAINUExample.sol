// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.2/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.8.2/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts@4.8.2/token/ERC20/extensions/ERC20Capped.sol";

contract SHIBAINUExample is ERC20, ERC20Burnable, ERC20Capped {
    // Roles

    // Constructor
    constructor()
        ERC20("SHIBAINUExample", "SHIB")
        ERC20Capped(1000000000000000 * 10 ** 18)
    {
        _mint(msg.sender, 1000000000000000 * 10 ** 18);
    }

    // Functions

    /**
     * @dev Override of the &#39;_mint&#39; function to call both base class implementations.
     * This function is called internally by the &#39;mint&#39; function.
     */
    function _mint(
        address account,
        uint256 amount
    ) internal override(ERC20, ERC20Capped) {
        super._mint(account, amount);
    }
}
