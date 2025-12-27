import React, {useMemo} from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import '@solana/wallet-adapter-react-ui/styles.css'


import './App.css'
import { Airdrop } from './components/Airdrop'

function App() {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(()=> clusterApiUrl(network),[network])

  return (
    // endpoint is : rpc url or rpc endpoint.
    <ConnectionProvider endpoint= {endpoint}> 
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className='h-screen w-screen bg-gray-200 p-2 '>
            <div className='rounded-2xl w-full h-full bg-amber-100'>
              <Airdrop></Airdrop>
            </div>
          </div>
          
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider> 
      
    
  )
}

export default App;
