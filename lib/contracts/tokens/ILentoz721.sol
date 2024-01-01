// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

interface ITokenA is IERC721{

    function mintWithURI(address to, string memory URI ) external returns(bool);

    function transferFrom( address from, address to, uint256 tokenId) external view ;

    function safeTransferFrom( address from, address to, uint256 tokenId) external view;

    function safeTransferFrom( address from, address to, uint256 tokenId, bytes memory data) external view;
      
    

}
