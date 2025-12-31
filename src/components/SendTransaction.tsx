import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useState } from "react";
import { Transaction,SystemProgram, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";



export function SendTransaction(){
    const {connection} = useConnection();
    const {publicKey,sendTransaction} = useWallet();
    const [enable, setEnable] = useState(false)
    const [message, setMessage] = useState("")
    const [receiver_address , setReceiver_address ] = useState("")
    const [sol_amount , setSol_amount] = useState(Number)
    const handle_send_trxn = useCallback( async ()=> {

        try{

            const {blockhash,lastValidBlockHeight} =  await connection.getLatestBlockhash()
            
            if (!publicKey || !receiver_address) throw new Error("Info not available!")
            if (!sol_amount || isNaN(sol_amount ) || sol_amount===0) throw new Error("Invalid amount")
                
            const trxn = new Transaction().add(
                            SystemProgram.transfer({
                                    fromPubkey:publicKey,
                                    toPubkey:new PublicKey(receiver_address),
                                    lamports: sol_amount* LAMPORTS_PER_SOL,
                            }))

            const signature = await sendTransaction(trxn,connection)
            setEnable(true)
            setMessage(`SOL sent! ${signature}`)
            await connection.confirmTransaction({blockhash,lastValidBlockHeight,signature})
            setMessage("transfer completed Successfuly")
            
        }
        catch{
            throw new Error("Transaction failed X")
        }
    },[publicKey,receiver_address,sol_amount,connection,sendTransaction])
    


    return(
        <div className="p-4 flex-col">
            <div className="flex">
            <div className="flex flex-col">
            <span>Address</span>
            <input type="text"
            value={receiver_address} 
            className="border-2 rounded-2xl p-2 mr-2"
            onChange={(e)=>{
                setReceiver_address(e.target.value)
            }} />
            </div>
            <div className="flex flex-col">
            <span>Amount</span>
            <input type="number"
            
            value={sol_amount} 
            className="border-2 rounded-2xl p-2 mr-2 scroll-m-0"
            onChange={(e)=>{
                setSol_amount(e.target.value)
            }} />
            </div>
            <button onClick={handle_send_trxn} 
            className="text-white bg-purple-400 rounded-2xl  mt-6 hover:bg-purple-500 cursor-pointer w-30">
            Send
            </button>
            </div>
            <div>
                {enable?(<span>{sol_amount} {message}</span>):(<span></span>)}
            </div>
            
        </div>
    )
    }
    
