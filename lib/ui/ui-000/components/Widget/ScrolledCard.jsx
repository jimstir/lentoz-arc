import React from "react";

function ScrolledCard({ data, ...props }) {
  return (
    <div className={`scrolledCard ${data.color} text-slate-50 flex flex-col`}>
      <h1 className="pb-3 text-2xl font-bold">{data.title}</h1>
		  
      <div className="text-lg">{data.des} </div>
      <div className="flex flex-row justify-between items-center gap-3">
        
      </div>
    </div>
  );
}

export default ScrolledCard;
