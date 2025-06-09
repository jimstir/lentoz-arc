import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Logo({ icon, text, isMain }) {
  
  	const sideLogo = 'relative flex flex-row font-semibold text-3xl md:items-center md:mx-auto text-green-700 mb-28 p-4 justify-between';
	
  	const mainLogo = 'relative flex flex-row font-semibold text-8xl md:items-center md:mx-auto text-green-700 mt-36 mb-5 p-4 justify-between';
	

  return (
    <div className= {isMain ? `${mainLogo}` : `${sideLogo}`} >
      <Link to="/">
        <FontAwesomeIcon icon={icon}></FontAwesomeIcon> {text}
      </Link>
      
    </div>
  );
}

export default Logo;
