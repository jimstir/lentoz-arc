import React from "react";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import DashboardHeader from "../components/Other/DashboardHeader.jsx";
import ScrolledCard from "../components/Widget/ScrolledCard.jsx";
import Wallet from "../components/Wallet/connectWallets.jsx";
import Navbar from "../components/Navbar/Index";
import Logo from "../components/Sidebar/Logo.jsx";
import { useOutletContext } from "react-router-dom";


function Dashboard() {
  
  const dataOS = [
    {
      title: "About",
      des: "Learn more about the Lentož Application",
      color: "cardInfo",
    },
    {
      title: "anyCup",
      des: "Visit the first shop to use Lentož",
      color: "cardWarning",
    },
    {
      title: "Contribute",
      des: "Learn how to contribute to the codebase",
      color: "cardDanger",
    },
    {
      title: "Kredit UMKM",
      date: "12/Mei/2023",
      os: "2,938",
      gs: "2,900",
      percentage: 100.01,
      color: "cardSuccess",
    },
    
  ];

  const [sidebarToggle] = useOutletContext();

  return (
    <>
      <main className="h-full">
        {/* Welcome Header */}
        <Navbar toggle={sidebarToggle} />

		  {/* <Wallet /> */}
		  <div className="w-full overflow-hidden md:grid grid md:grid-cols-1 mx:auto ">
		  	<Logo isMain={true} icon={faFloppyDisk} text="Lentož" />
		  </div>
		  
		  <div className=" text-2xl overflow-hidden md:grid grid md:grid-cols-1 m-16 mt-10 mx:auto ">
		  	Allow your customers to engage with your service with the help of blockchains. Increase loyalty, engagement and utilize a new revenue stream with Lentož. 
		  </div>
		  
		  <div className="">
		  	
		  </div>
        

        {/* OS Kredit */}
        <div className="px-2 mx-auto mainCard">
          <h1 className="text-slate-500 pb-3 text-base md:text-lg">
            Check out these resource!
          </h1>

          <div className="flex flex-row gap-x-5 overflow-hidden overflow-x-auto justify-between no-scrollbar">
            {dataOS?.map((data, index) => (
              <ScrolledCard key={index} data={data} />
            ))}
          </div>

          <div className="lg:w-full w-[1024px] overflow-hidden flex flex-row justify-between text-slate-700 gap-2 lg:max-h-screen overflow-x-auto whitespace-nowrap"></div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
