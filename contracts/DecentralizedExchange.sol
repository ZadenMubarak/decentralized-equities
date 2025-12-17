// SPDX-License-Identifier: MIT  
pragma solidity ^0.8.19;  
  
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";  
import "@openzeppelin/contracts/access/Ownable.sol";  
  
contract DecentralizedExchange is Ownable {  
    struct Order {  
        address trader;  
        address tokenAddress;  
        bool isBuy;  
        uint256 amount;  
        uint256 price;  
        bool filled;  
    }  
      
    mapping(uint256 => Order) public orders;  
    mapping(address => mapping(address => uint256)) public balances;  
    uint256 public orderCounter;  
      
    event OrderPlaced(uint256 orderId, address trader, address token, bool isBuy, uint256 amount, uint256 price);  
    event OrderFilled(uint256 orderId, address filler, uint256 amount);  
      
    function placeOrder(address tokenAddress, bool isBuy, uint256 amount, uint256 price) external {  
        require(amount > 0, "Amount must be greater than 0");  
        require(price > 0, "Price must be greater than 0");  
          
        orders[orderCounter] = Order({  
            trader: msg.sender,  
            tokenAddress: tokenAddress,  
            isBuy: isBuy,  
            amount: amount,  
            price: price,  
            filled: false  
        });  
          
        emit OrderPlaced(orderCounter, msg.sender, tokenAddress, isBuy, amount, price);  
        orderCounter++;  
    }  
      
    function fillOrder(uint256 orderId, uint256 fillAmount) external {  
        Order storage order = orders[orderId];  
        require(!order.filled, "Order already filled");  
        require(fillAmount <= order.amount, "Fill amount exceeds order amount");  
          
        if (order.isBuy) {  
            // Buyer is sending ETH, receiving tokens  
            IERC20(order.tokenAddress).transferFrom(msg.sender, order.trader, fillAmount);  
        } else {  
            // Seller is sending tokens, receiving ETH  
            IERC20(order.tokenAddress).transferFrom(order.trader, msg.sender, fillAmount);  
        }  
          
        if (fillAmount == order.amount) {  
            order.filled = true;  
        }  
          
        emit OrderFilled(orderId, msg.sender, fillAmount);  
    }  
}