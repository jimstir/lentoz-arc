import detectEthereumProvider from "@metamask/detect-provider";
import { useSDK } from '@metamask/sdk-react';
import { useState, useEffect } from "react";
import { Button, Alert } from 'flowbite-react';
import { Link } from "react-router-dom";

function Wallet() {
	 const [hasProvider, setHasProvider] = useState(null);
	 const initState = { accounts: [], balance: "", chainId: ""};
	 const [wallet, setWallet] = useState(initState);
	 const [toAddress, settoAddress] = useState("");
	 const [txResult, setTxResult] = useState("");
	 
	const [metaButton, setMeta] = useState("Connect Wallet")
	 const [isVisible, setIsVisible] = useState(false);
	 const [isConnecting, setIsConnecting] = useState(false);
	 const [error, setError] = useState(false);
	 const [errorMessage, setErrorMessage] = useState("");
	
	
	useEffect(() => {
		const refreshAccounts = (accounts: any) => {
			if(accounts.length > 0) {
				updateWallet(accounts);
			} else {
				setWallet(initState);
			}
		};
		
		const refreshChain = (chainId: any) => {
			setWallet((wallet) => ({...wallet, chainId}));
		};
		
		const getProvider = async () => {
			const provider = await detectEthereumProvider({ silent: true});
			setHasProvider(Boolean(provider));
			
			if(hasProvider) {
				const accounts = await window.ethereum.request({
					method: "eth_accounts",
				});
				refreshAccounts(accounts);
				window.ethereum.on("accountsChanged", refreshAccounts);
				window.ethereum.on("chainChanged", refreshChain);
			}
		};
		
		getProvider();
		
		return () => {
			window.ethereum?.removeListener("accountChanged", refreshAccounts);
			window.ethereum?.removeListener("chainChanged", refreshChain);
		};
	}, []);
	
	
	const updateWallet = async (accounts: any) => {
		const balance = await window.ethereum.request({
			method: "eth_getBalance",
			params: [accounts[0], "latest"],
		});
		const chainId = await window.ethereum.request({
			method: "eth_chainId",
		});
		setWallet({ accounts, balance, chainId});
	};
	
	const handleConnect = async () => {
		
		await window.ethereum.request({
			method: "eth_requestAccounts",
		}).then((accounts: []) => {
			setIsConnecting(true);
			setError(false);
			updateWallet(accounts);
			if(accounts.length > 0){
				setMeta("Wallet Connected");
			}
		}).catch((err: any) => {
			setError(true);
			setErrorMessage(err.message);
			setIsVisible(true);
		});
		setIsConnecting(false);
	}
			
	const disableButton = Boolean(wallet) && isConnecting;
	
	 
			//disabled={disableButton}
			// const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(4);
			// formatChanasNum = const chainIdNum = parseInt(chainIdHex)
//---------------------------------------------
           
    return(
			<div className="Wallet">
            {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
			 		<Button disabled={disableButton} gradientMonochrome="teal" onClick={handleConnect}>{metaButton} </Button>
			 	)}
			 
				 
        
        </div>
      );
    
}

export default Wallet;