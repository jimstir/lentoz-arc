// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
//import "contracts/ITokenA.sol";

contract TokenA is ERC721URIStorage {
    

    uint256 public supply;
    address public owner;
    constructor() ERC721("SnailTxns", "SNTX") {
        supply = 1;
        owner = msg.sender;
        _safeMint(owner, supply);
        _setTokenURI(supply, "Jimmy");
    }

    function mintWithURI(address to, string memory URI, address minter ) external returns(bool) {
        require(minter == owner);

        supply += 1 ;
        _safeMint(to, supply);
        _setTokenURI(supply, URI);
        return true; 
         
    }

    function transferFrom( address from, address to, uint256 tokenId) public view override{
        //require(msg.sender == address(this));
        
    }

    function safeTransferFrom( address from, address to, uint256 tokenId) public view override{
        //require(msg.sender == address(this));
        
    }

    function safeTransferFrom( address from, address to, uint256 tokenId, bytes memory data) public view override{
        //require(msg.sender == address(this));
        
    }

    
}
