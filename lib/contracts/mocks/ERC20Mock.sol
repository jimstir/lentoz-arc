// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is ERC20 {
    address public owner;

    constructor(
        string memory name,
        string memory symbol,
        address initialAccount,
        uint256 initialBalance
    ) ERC20(name, symbol) {
        owner = msg.sender;
        _mint(initialAccount, initialBalance);
    }

    function mint(address account, uint256 amount) public {
        require(msg.sender == owner, "ERC20Mock: Only owner can mint");
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) public {
        require(msg.sender == owner, "ERC20Mock: Only owner can burn");
        _burn(account, amount);
    }
}
