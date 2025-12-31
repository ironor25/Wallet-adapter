import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useState } from "react";
import { Transaction,SystemProgram, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";


export function SendTransaction(){
    const {connection} = useConnection();
    const {publicKey,sendTransaction} = useWallet();
    const [enable, setEnable] = useState(false)
    const [message, setMessage] = useState(String)
    const [receiver_address , setReceiver_address ] = useState(String)
    const [sol_amount , setSol_amount] = useState(String)
    const handle_send_trxn = useCallback( async ()=> {

        try{

            const {blockhash,lastValidBlockHeight} =  await connection.getLatestBlockhash()
            if (!publicKey || !receiver_address) throw new Error("Info not available!")
            const trxn = new Transaction().add(
                            SystemProgram.transfer({
                                    fromPubkey:publicKey,
                                    toPubkey:new PublicKey(receiver_address),
                                    lamports: Number(sol_amount)* LAMPORTS_PER_SOL,
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
    },[publicKey])
    


    return(
        <div className="p-4 flex">
            <div className="flex flex-col">
            <span>Address</span>
            <input type="text" 
            className="border-2 rounded-2xl p-2 mr-2"
            onChange={(e)=>{
                setReceiver_address(e.target.value)
            }} />
            </div>
            <div className="flex flex-col">
            <span>Amount</span>
            <input type="text" 
            className="border-2 rounded-2xl p-2 mr-2"
            onChange={(e)=>{
                setSol_amount(e.target.value)
            }} />
            </div>
            <button onClick={handle_send_trxn} 
            className="text-white bg-purple-400 rounded-2xl  mt-6 hover:bg-purple-500 cursor-pointer w-30">
            Send
            </button>
            <div>
                {enable?(<span>Verified Successfuly , Message Signature: ${message}</span>):(<span></span>)}
            </div>
            
        </div>
    )
    }
    
