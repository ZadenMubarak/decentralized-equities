// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.19;  
  
import "@openzeppelin/contracts/access/Ownable.sol";  
import "./TokenizedAsset.sol";  
  
contract AssetRegistry is Ownable {  
    struct AssetInfo {  
        address tokenAddress;  
        string name;  
        string symbol;  
        string assetType;  
        bool isActive;  
        uint256 createdAt;  
    }  
      
    mapping(address => AssetInfo) public assets;  
    address[] public assetAddresses;  
    mapping(string => bool) public symbolExists;  
      
    event AssetRegistered(address indexed tokenAddress, string symbol, string assetType);  
    event AssetDeactivated(address indexed tokenAddress);  
      
    function registerAsset(  
        address _tokenAddress,  
        string memory _name,  
        string memory _symbol,  
        string memory _assetType  
    ) external onlyOwner {  
        require(_tokenAddress != address(0), "Invalid token address");  
        require(!symbolExists[_symbol], "Symbol already exists");  
        require(!assets[_tokenAddress].isActive, "Asset already registered");  
          
        assets[_tokenAddress] = AssetInfo({  
            tokenAddress: _tokenAddress,  
            name: _name,  
            symbol: _symbol,  
            assetType: _assetType,  
            isActive: true,  
            createdAt: block.timestamp  
        });  
          
        assetAddresses.push(_tokenAddress);  
        symbolExists[_symbol] = true;  
          
        emit AssetRegistered(_tokenAddress, _symbol, _assetType);  
    }  
      
    function deactivateAsset(address _tokenAddress) external onlyOwner {  
        require(assets[_tokenAddress].isActive, "Asset not active");  
        assets[_tokenAddress].isActive = false;  
        emit AssetDeactivated(_tokenAddress);  
    }  
      
    function getActiveAssets() external view returns (AssetInfo[] memory) {  
        uint256 activeCount = 0;  
        for (uint256 i = 0; i < assetAddresses.length; i++) {  
            if (assets[assetAddresses[i]].isActive) {  
                activeCount++;  
            }  
        }  
          
        AssetInfo[] memory activeAssets = new AssetInfo[](activeCount);  
        uint256 index = 0;  
        for (uint256 i = 0; i < assetAddresses.length; i++) {  
            if (assets[assetAddresses[i]].isActive) {  
                activeAssets[index] = assets[assetAddresses[i]];  
                index++;  
            }  
        }  
          
        return activeAssets;  
    }  
      
    function getAssetCount() external view returns (uint256) {  
        return assetAddresses.length;  
    }  
}