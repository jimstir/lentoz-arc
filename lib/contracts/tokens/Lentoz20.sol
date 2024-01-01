// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "contracts/TokenA.sol";

contract MyToken is ERC20 {
    //using ITokenA for ITokenA.mintWithURI;
    address public owner;
    mapping(uint256 => address) public snailERC721;
    uint256 public numOf721;
    constructor() ERC20("Snail", "SNL") {
        owner = msg.sender;
        numOf721 = 0;
        _mint(msg.sender, 2000 * 10 ** decimals());
    }

    //Only owner allowed to mint. New mint of SnailERC721
    function mintA (address to, uint256 amount, string memory URI ) public {
        TokenA con = TokenA(snailERC721[numOf721]);
        require(msg.sender == owner);
        //require mint function on erc721 contract with success else return
        require(con.mintWithURI(to, URI, msg.sender));

        _mint(to, amount);

    }

    // Register a new on-chain erc721 contract. Only erc20 owner allowed
    function registerSnail721 (address sContract) external returns(bool) {
        require(msg.sender == owner);

        numOf721 += 1;
        snailERC721[numOf721] = sContract;
        return true;
    }

}

