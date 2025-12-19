// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.19;  
  
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";  
import "@openzeppelin/contracts/access/Ownable.sol";  
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";  
  
contract TokenizedAsset is ERC20, ERC20Permit, Ownable {  
    string public assetType;  
    string public realWorldAsset;  
    uint256 public pricePerToken;  
    uint256 public totalCollateralValue;  
      
    event AssetPriceUpdated(uint256 newPrice);  
    event TokensMinted(address to, uint256 amount);  
    event TokensBurned(address from, uint256 amount);  
      
    constructor(  
        string memory _name,  
        string memory _symbol,  
        string memory _assetType,  
        string memory _realWorldAsset,  
        uint256 _initialSupply,  
        uint256 _pricePerToken  
    ) ERC20(_name, _symbol) ERC20Permit(_name) {  
        assetType = _assetType;  
        realWorldAsset = _realWorldAsset;  
        pricePerToken = _pricePerToken;  
        totalCollateralValue = _initialSupply * _pricePerToken;  
        _mint(msg.sender, _initialSupply * 10**decimals());  
    }  
      
    function updatePrice(uint256 newPrice) external onlyOwner {  
        require(newPrice > 0, "Price must be greater than 0");  
        pricePerToken = newPrice;  
        emit AssetPriceUpdated(newPrice);  
    }  
      
    function mint(address to, uint256 amount) external onlyOwner {  
        require(to != address(0), "Cannot mint to zero address");  
        _mint(to, amount);  
        totalCollateralValue += amount * pricePerToken;  
        emit TokensMinted(to, amount);  
    }  
      
    function burn(uint256 amount) external {  
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");  
        _burn(msg.sender, amount);  
        totalCollateralValue -= amount * pricePerToken;  
        emit TokensBurned(msg.sender, amount);  
    }  
      
    function getAssetInfo() external view returns (  
        string memory,  
        string memory,  
        uint256,  
        uint256,  
        uint256  
    ) {  
        return (  
            assetType,  
            realWorldAsset,  
            pricePerToken,  
            totalSupply(),  
            totalCollateralValue  
        );  
    }  
}