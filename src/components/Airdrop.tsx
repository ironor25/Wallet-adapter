import React, { useState } from "react";

import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
export function  Airdrop(){
    const [amount,setAmount] = useState(String)
    //useWallet provides all the variable inside of the airdrop component.
    const wallet = useWallet()
    const {connection} = useConnection()
    
    const  handleSendAirdrop = async ()=>{
            if (!wallet.publicKey || Number(amount) === 0)  return
        // Number(amount)*Math.pow(10,9)
            await connection.requestAirdrop(wallet.publicKey, Number(amount)*LAMPORTS_PER_SOL)
            alert("wallet airdropped")
    }

    return(
        <div className="flex justify-between p-2">
            <div>
               
            <label className="p-2">Amount</label>
            <div className="flex p-2 gap-2"> 
            <input placeholder="Enter SOL amount" type="number" className="border-2 border-amber-400 rounded-2xl p-2"
             onChange={(e)=>{
                setAmount(e.target.value)
            }}></input>
            <button  
            className="p-2 bg-purple-400 rounded-xl text-amber-50 cursor-pointer hover:bg-purple-500" 
            onClick={handleSendAirdrop}>Send Airdrop</button>
            </div>
            </div>
            <div className="p-4">

                {wallet.publicKey ? (
                    <div className="flex gap-3">
                    <span className="pt-3">{wallet.publicKey.toString()}</span>
                    <WalletDisconnectButton></WalletDisconnectButton>
                    </div>
                ):
                (<WalletMultiButton>
                </WalletMultiButton>)
                }
                
            
        </div>
        </div>
    )
}