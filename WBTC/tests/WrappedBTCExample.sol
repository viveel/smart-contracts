// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WrappedBTCExample is ERC20Pausable, Ownable {
    using SafeERC20 for IERC20;

    constructor() ERC20("WrappedBTCExample", "WBTC") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Override to set token decimals to 8
     */
    function decimals() public view virtual override returns (uint8) {
        return 8;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }

    /**
     * @dev Override to make approvals comply with pauses
     */
    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal override whenNotPaused {
        super._approve(owner, spender, amount);
    }

    /**
     * @notice Burn function for owner
     */
    function burn(uint256 amount) public onlyOwner {
        _burn(_msgSender(), amount);
    }

    /**
     * @dev Disable renounce ownership
     */
    function renounceOwnership() public view override onlyOwner {
        revert("renouncing ownership is blocked");
    }

    /**
     * @notice Transfers any stuck tokens to owner
     * @param _token Address of token to retrieve
     */
    function reclaimToken(address _token) external onlyOwner {
        uint256 balance = IERC20(_token).balanceOf(address(this));
        IERC20(_token).safeTransfer(owner(), balance);
    }
}
