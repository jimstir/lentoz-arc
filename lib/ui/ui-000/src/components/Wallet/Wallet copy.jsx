import detectEthereumProvider from '@metamask/sdk';
import { useSDK } from '@metamask/sdk-react';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Contract, Web3} from "web3";
//var Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
//var web3 = new Web3('http://localhost:8545');
//var Contract = require('web3-eth-contract');
//Contract.setProvider('ws://localhost:8546');
const objA = require('./ERC20Abi.json');
const objB = require('./ReserveAbi.json')



function Wallet() {
    let currentAccount, count = null;
	 let mapper = 100;
	 var owner, authorizer, proposal, amount, userA, i;
    const [account, setAccount, chainId] = useState("");
    const { sdk, connected, connecting } = useSDK();
    
    
    function handleChainChanged(chainId){
        window.location.reload();
    }
    
    window.ethereum.request({ method: 'eth_accounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
    console.error(err);
    });

	 window.ethereum.on('chainChanged', handleChainChanged);
	 
    window.ethereum.on('accountsChanged', handleAccountsChanged);
	 
    function handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
      }else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        console.log(currentAccount);
      }
    }
	 
	 
		const contractA = new web3.eth.Contract(objA, '0x1e4C1a428e77B5800d342a1fF28c413535275a92');
		  
		const contractB = new web3.eth.Contract(objB, '0x54fe5150b971fcEC1c9d5E0C0EfAc3406607c3a6');
		
		//const holder = "0x82386264D57d65B88D6753354706717A0885849F";
		
	 
	 
    /*
	----------------------------------------------
				  <script>
				fetch('http://httpbin.org/ip')
					 .then(res => res.json())
					 .then((data) => {
						  console.log(data);
					 }).catch(err => console.error(err));
		  </script>
	--------------------------------------------------------
    
    const provider = await detectEthereumProvider();
          
    if(provider){
        console.log("good");
        console.log(provider);
        startApp(provider);
          
    }else{
        console.log("download");
    }
    
    function startApp(provider) {
        if(provider !== window.ethereum){
            console.error('Multi wallets installed');
        }
    }
          
    detectEthereumProvider().then((provider) => {
        if (provider && provider.isMetaMask) {
            provider.on('accountsChanged', handleAccountsChanged);
            // connect btn is initially disabled
            //$('#connect-btn').addEventListener('click', connect);
            checkConnection();
        } else {
            console.log('Please install MetaMask!');
        }
    });
    
    function checkConnection() {
        window.ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch(console.error);
    }
    
    function handleAccountsChanged(accounts) {
      console.log(accounts);

      if (accounts.length === 0) {
        console.log ("You're not connected to MetaMask");
        //hide button$('#connect-btn').disabled = false;
      } else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        console.log( `Address: ${currentAccount}`);
        //$('#connect-btn').disabled = true;
      }
    }
	 
	 ----
	 var accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
		  .catch((err) => {
				if (err.code === 4001) {
				console.log('Please connect');
		  } else{
					console.error(err);
	 		}
		});
		  gg = accounts[0];
		 console.log(gg);
     */
	 
	
	 
	const getAccount = async () => {
		  await window.ethereum.request({ method: 'eth_requestAccounts'})
		  .then((result, error) => {
				console.log(result[0], "Account");
				userA = result[0];
				//console.log(gg);
				
		  }).catch(error =>{
				console.log("Error Accoccunt, None");
		  }); 
		
		  
	 }
	 
    const connect = async () => {
        try{
            const accounts = await sdk?.connect();
            setAccount(accounts?.[0]);
            
        }catch(err){
            console.warn(`failed to connect..`, err);
        }
				
		
		if(typeof window !== "undefined"){
        console.log("Yup");
		}else{
				console.log("op");
		  }

		  //This detects the provider
		  if(typeof window.ethereum !== 'undefined') {
				console.log('installed');
		  }

		  const chain = async () => { 
				chainId = await window.ethereum.request({ method: 'eth_chainId' });
				console.log(chainId);
			}


	 	}

// ---------------------------------------
	 // balance of token amount for underlying token

	 async function reserveUserBalance(){
		  
		  //const holder = "0x82386264D57d65B88D6753354706717A0885849F";
		  const holder = userA;
		  contractA.methods.balanceOf(holder).call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error balanceOf");
		  });
		  //console.log(proposal);
	 }
	 async function whosOwner(){
		  await contractB.methods.whosOwner().call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error whosOwner");
		  });
		  
		  console.log(owner);
		  
	 }
	 // Check current total of opened proposals
	 async function proposalCheck(){
		  proposal = null;
		  proposal = await contractB.methods.proposalCheck().call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error proposalCheck");
		  });
	 }

	// ----------
	// Owner-to-Reserve Information share 
	// Get number of deposits made by the Owner-to-Reserve
	// Starting flow of Owner-to-Reserve
	async function accountCheck(){
		  amount = null;
		  await contractB.methods.accountCheck().call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error accountOf");
		  });
	 }
	 
	 //Get amount deposited by the Owner-to-Reserve(2)
	 async function ownerDeposit(){
		  
		  var i = 1;
		  //if(count != null);
		  /*
					for(i = 1; i <= mapper; i++){
						if(i === mapper){
							mapper = 100;
						}
						
					}// <- Wrap ammount = statement also
				*/
		  await contractB.methods.ownerDeposit(i).call().then((result, error) => {
				console.log(result);
				count = i;
		  }).catch(error => {
				console.log("Error ownerDeposit");
				i = mapper + 2;
				
		  });
	 }
	 // Token type deposited by the Owner-to-Reserve(3)
	 async function tokenDeposit(){
		  amount = null;
		  await contractB.methods.tokenDeposit(amount).call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error tokenDeposit");
				i = mapper + 2;
		  });
	 }

	 // Amount deposited for shares by the User-to-Proposal(Reserve)(1)
	 //Start of Flow for User-to-Proposal(Reserve)
	 async function userDeposit(){
		  amount = null;
		  //if(amount != null);
		  /*
					for(i = 1; i <= mapper; i++){
						if(i === mapper){
							mapper = 100;
						}
						
					}// <- Wrap ammount = statement also
				*/
		  await contractB.methods.userDeposit(userA, amount ).call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error userDeposit");
				i = mapper + 2;// might need better one
		  });
	 }

	 //Amount withdrawn from given proposal by the User-to-Proposal(Reserve)(2)
	 async function userWithdrew(){
		  
		  await contractB.methods.tokenWithdrew(userA, amount).call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error userWithdrew");
				i = mapper + 2;
		  });
	 }

	 //The total number of proposals joined by the user
	 //***NOT USER FLOW******?? use to get proposal
	 async function userNumOfProposal(){
		  
		  await contractB.methods.userNumOfProposal(userA).call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error userNumOfProposal");
				
		  });
	 }

	 //Token used for given Proposal(1)
	 // Beginning of Proposal-Flow
	 async function proposalToken(proposal){
		  
		  await contractB.methods.proposalToken(proposal).call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error proposalToken");
				
		  });
	 }

	 //Amount received for given Proposal(2)
	 async function proposalDeposit(proposal){
		  
		  await contractB.methods.proposalDeposit(proposal).call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error proposalToken");
				
		  });
	 }

	 //Amount received for given Proposal(3)
	 async function proposalWithdrew(proposal){
		  
		  await contractB.methods.proposalWithdrew(proposal).call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error proposalWithdrew");
				
		  });
	 }

	 //Check if proposal is closed(4)
	 async function proposalClosed(proposal){
		  
		  await contractB.methods.closedProposal(proposal).call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error proposalClosed");
				
		  });
	 }

	 //Total shares issued for a given proposal(5)
	 async function proposalShares(proposal){
		  
		  await contractB.methods.totalShares(proposal).call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error proposalClosed");
				
		  });
	 }

//--------------------------------------------------
/*

	 * Txns to the reserve by user or owner
	 * Prob create a warning
*/

	 //Make a deposit to proposal creating new shares
	 // have input section for asset amount, grab proposal from user page
	 async function proposalDeposit(assets, proposal){
		  
		  await contractB.methods.proposalDeposit(assets, userA, proposal).call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error proposalClosed");
				
		  });
	 }

	 

//---------------------------------------------
           
    return(
			<div className="Wallet">
            
        <button style={{ padding: 10, margin: 10 }} onClick={connect}>
           Connect
        </button>
			{connected && (
            <div>
              <ul>
                {chainId && `Connected chain: ${chainId}`}
                <p></p>
                {account && `Connected account: ${account}`}
					
              </ul>
            </div>
          )}
			
			<button style={{ padding: 10, margin: 10 }} onClick={getAccount}>
            Account
          </button>
			
			<button style={{ padding: 10, margin: 10 }} onClick={reserveUserBalance}>
            Balance
          </button>
          
			<button style={{ padding: 10, margin: 10 }} onClick={whosOwner}>
            ReserveBalance
          </button>
        </div>
      );
    
}

export default Wallet;