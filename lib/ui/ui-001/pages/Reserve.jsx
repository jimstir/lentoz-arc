import React from "react";
import Navbar from "../components/Navbar/Index";
import { useOutletContext } from "react-router-dom";
import { Button } from 'flowbite-react';
import ScrolledCard from "../components/Widget/ScrolledCard.jsx";

function Blank() {
  const [sidebarToggle] = useOutletContext();
  
	const infoRes = [
	  {
		  title: "View Revserve Balance",
		  color: "cardInfo",
		  /*balance of user undlying token holdings + convert to value, user reserve tokens*/
	  },
	  {
		  title: "Owner of Reseve Address",
		  color: "cardInfo",
		  /*whosOwner*/
	  },
	  {
		  title: "Number of Opened Policies ",
		  color: "cardInfo",
		  /* propsalCheck(), get total number*/
	  },
	  
  ];
	
	const infoRes2 = [
	  {
		  title: "Number of Policies Participating in",
		  color: "cardInfo",
		  /* userDeposit() */
	  },
	  {
		  title: "Number of tokens issued by reserve + value, number of tokens in policies",
		  color: "cardInfo",
		  /*reserveIssued() + total minted ERC20 + total erc721 minted */
	  },
	  {
		  title: "Number of Policies ",
		  color: "cardInfo",
		  
	  },
	  
  ];
	
	return (
    <>
      <main className="h-full">
        <Navbar toggle={sidebarToggle} />

        {/* Main Content */}
        <div className="mainCard ">
			  
			  Reserve Dashboard
		  
		  <div className=" text-xl overflow-hidden md:grid grid md:grid-cols-1 m-16 mt-10 mx:auto ">
		  	Welcome to your reserve dashboard, here you will find all the reserves you have joined along with the acciosited data. Policy transaction can be made here.(make sure you are certain of the policy you are transacting to.)  
		  </div>
			  
			<div className="overflow-hidden md:grid grid md:grid-cols-1 m-10 mt-10 mx:auto">
				
				<div className="flex flex-row gap-x-3 overflow-hidden overflow-x-auto justify-between no-scrollbar">
					{infoRes?.map((data, index) => (
              <ScrolledCard key={index} data={data} />
            ))}
				
			</div>
				
				<div className="overflow-hidden md:grid grid md:grid-cols-1 m-10 mt-10 mx:auto">
				
				<div className="flex flex-row gap-x-3 overflow-hidden overflow-x-auto justify-between no-scrollbar">
					{infoRes2?.map((data, index) => (
              <ScrolledCard key={index} data={data} />
            ))}
				
			</div>
				
			  
			</div>
				{/* ADD SEARCH FEATURE for each */}
					<div className="m-9">
						{/* on-chain Txns, in modal add= number + value of selcetTokens sent to contract(ex. USDC,USDT), */}
						<Button className="m-9" gradientMonochrome="teal">
							Reserve Txns
						</Button>
		  
						{/* accountCheck(), in modal add= ownerDeposit() + dates, tokenDeposit(),  */}
						<Button className="m-9" gradientMonochrome="teal">
							Owner Txns
						</Button>
						
						{/* User proposal activites, in modal add= userWithdrew(), list proposals of 1 to proposalCheck(), display propsalToken(), proposalPastDeposits(), proposalWithdrew, proposalShares() proposalClosed(), makeNewProposalDeposit(), ownerCloseProposal(),  proposalWithdrawal()*/}
						<Button className="m-9" gradientMonochrome="teal">
							Proposal Txns
						</Button>
						
					</div>	
		  	
			</div>
		  </div>
      </main>
    </>
  );
}

export default Blank;
