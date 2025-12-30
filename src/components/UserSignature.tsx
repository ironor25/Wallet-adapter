import { useWallet } from "@solana/wallet-adapter-react";
import { ed25519 } from '@noble/curves/ed25519';
import bs58 from "bs58";
import { useState } from "react";


export function UserSignature(){
    const {publicKey, signMessage} = useWallet()
    const [message, setMessage] = useState(String)
    const [endcoded_msg,setEncoded_msg] = useState(String)
    const [enable, setEnable] = useState(false)
    const handleUserSignature = async () => {
        if (!publicKey) return Error("Wallet not connected!")
        if (!signMessage) return Error("signMessage not supported.")
        setEnable(false)
        const encode_msg = new TextEncoder().encode(message)
        const signature = await signMessage(encode_msg)
        const verification = ed25519.verify(signature,encode_msg,publicKey.toBytes())

        if (!verification) throw new Error("message not veriffied.")
        setEncoded_msg(bs58.encode(signature))
        setEnable(true)
    
    }
    return(
        <div className="p-4">
            <input type="text" 
            className="border-2 rounded-2xl p-2 mr-2"
            onChange={(e)=>{
                setMessage(e.target.value)
            }}>
            </input>
            <button onClick={handleUserSignature} 
            className="text-white bg-purple-400 rounded-2xl p-3 hover:bg-purple-500 cursor-pointer ">
            Sign Message
            </button>
            <div>
                {enable?(<span>Verified Successfuly , Message Signature: {endcoded_msg}</span>):(<span></span>)}
            </div>
            
        </div>
    )
}