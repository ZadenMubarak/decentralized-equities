import { RequestHandler } from "express";  
import { ContractService } from "../services/contractService";  
  
const contractService = new ContractService(  
  process.env.RPC_URL || "http://localhost:8545",  
  process.env.EXCHANGE_ADDRESS || ""  
);  
  
export const placeOrder: RequestHandler = async (req, res) => {  
  try {  
    const { tokenAddress, isBuy, amount, price, privateKey } = req.body;  
      
    const signer = new ethers.Wallet(privateKey, contractService.provider);  
    const tx = await contractService.placeOrder(tokenAddress, isBuy, amount, price, signer);  
      
    // Save transaction to database  
    await db.transaction.create({  
      data: {  
        type: isBuy ? 'buy' : 'sell',  
        tokenAddress,  
        amount,  
        price,  
        txHash: tx.hash,  
        userAddress: signer.address,  
        status: 'pending',  
        createdAt: new Date()  
      }  
    });  
      
    res.json({ txHash: tx.hash, status: 'pending' });  
  } catch (error) {  
    console.error('Error placing order:', error);  
    res.status(500).json({ error: 'Failed to place order' });  
  }  
};  
  
export const getUserOrders: RequestHandler = async (req, res) => {  
  try {  
    const { address } = req.params;  
    const orders = await contractService.getUserOrders(address);  
      
    // Get transaction details from database  
    const ordersWithDetails = await Promise.all(  
      orders.map(async (order) => {  
        const transaction = await db.transaction.findFirst({  
          where: { tokenAddress: order.tokenAddress, userAddress: order.trader }  
        });  
          
        return {  
          ...order,  
          transaction,  
          asset: await db.asset.findFirst({  
            where: { contractAddress: order.tokenAddress }  
          })  
        };  
      })  
    );  
      
    res.json(ordersWithDetails);  
  } catch (error) {  
    console.error('Error fetching orders:', error);  
    res.status(500).json({ error: 'Failed to fetch orders' });  
  }  
};