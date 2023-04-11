// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.2/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.8.2/access/AccessControl.sol";
import "@openzeppelin/contracts@4.8.2/security/Pausable.sol";

contract IoTeXNetwork is ERC20, AccessControl, Pausable {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    // Constructor
    constructor() ERC20("IoTeXNetwork", "IOTX") {
        _mint(msg.sender, 10000000000 * 10 ** 18);

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        _grantRole(PAUSER_ROLE, msg.sender);
    }

    // Functions

    // The following functions are overrides required by Solidity.
    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
