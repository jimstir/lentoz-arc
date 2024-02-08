import detectEthereumProvider from '@metamask/sdk';
import { useSDK } from '@metamask/sdk-react';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Contract, Web3} from "web3";
//var Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const objA = require('./ERC20Abi.json');
const objB = require('./ReserveAbi.json')


function Wallet() {
    let currentAccount, count = null;
	 let mapper = 100;
	 var owner, authorizer, proposal, amount, userA, i;
    const [account, setAccount, chainId] = useState("");
    const { sdk, connected, connecting } = useSDK();
    
   
		const contractA = new web3.eth.Contract(objA, '0x1e4C1a428e77B5800d342a1fF28c413535275a92');
		  
		const contractB = new web3.eth.Contract(objB, '0x54fe5150b971fcEC1c9d5E0C0EfAc3406607c3a6');
		
		//const holder = "0x82386264D57d65B88D6753354706717A0885849F";

     
    function handleChainChanged(chainId){
        window.location.reload();
    }
    
	function handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
      }else if (accounts[0] !== currentAccount) {
        currentAccount = accounts[0];
        console.log(currentAccount);
      }
    }
	
    window.ethereum.request({ method: 'eth_accounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
    console.error(err);
    });

	 window.ethereum.on('chainChanged', handleChainChanged);
	 
    window.ethereum.on('accountsChanged', handleAccountsChanged);
	 
	
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
	// Get balance of deposits made by the Owner-to-Reserve
	// Starting flow of Owner-to-Reserve
	async function accountCheck(){
		  amount = null;
		  await contractB.methods.accountCheck().call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error accountOf");
		  });
	 }
	 
	 //Get amount deposited by the Owner-to-Reserve + dates(2)
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

//underlying tokens issued by reserve. should include call for ERC20 token and ERC721 tokens?
	 async function reserveIssued(proposal){}

//--------------------------------------------------
/*

	 * Txns to the reserve by user or owner
	 * Prob create a warning
*/

	 //Make a deposit to proposal creating new shares
	 // have input section for asset amount, grab proposal from user page
		//Allow user to deposit underlying token to proposal
		//Verfiy balance
	 async function proposalDeposit(assets, proposal){
		  
		  await contractB.methods.proposalDeposit(assets, userA, proposal).call().then((result, error) => {
				console.log(result);
		  }).catch(error => {
				console.log("Error proposalClosed");
				
		  });
	 }

	//Make a withdrawal out of closed proposal
	 async function proposalWithdrawal(){}
	
		// New deposit to reserve by owner
	  async function ownerNewDeposit(assets, proposal){}

	// new verified proposal?? Might not need(link to terms and privacy)
	async function ownerNewProposal(assets, proposal){}

	// Close opened proposal, owner
	async function closeProposal(assets, proposal){}

//---------------------------------------------
           
    return(
			<div className="Wallet">
         	<button style={{ padding: 10, margin: 10 }} onClick={connect}>
           Connect
        </button>   
        	
        </div>
		 
		 
      );
    
}

export default Wallet;