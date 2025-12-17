// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.19;  
  
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";  
import "@openzeppelin/contracts/access/Ownable.sol";  
  
contract TokenizedAsset is ERC20, Ownable {  
    string public assetType;  
    string public realWorldAsset;  
    uint256 public pricePerToken;  
      
    constructor(  
        string memory _name,  
        string memory _symbol,  
        string memory _assetType,  
        string memory _realWorldAsset,  
        uint256 _initialSupply,  
        uint256 _pricePerToken  
    ) ERC20(_name, _symbol) {  
        assetType = _assetType;  
        realWorldAsset = _realWorldAsset;  
        pricePerToken = _pricePerToken;  
        _mint(msg.sender, _initialSupply * 10**decimals());  
    }  
      
    function updatePrice(uint256 newPrice) external onlyOwner {  
        pricePerToken = newPrice;  
    }  
      
    function mint(address to, uint256 amount) external onlyOwner {  
        _mint(to, amount);  
    }  
      
    function burn(uint256 amount) external {  
        _burn(msg.sender, amount);  
    }  
}