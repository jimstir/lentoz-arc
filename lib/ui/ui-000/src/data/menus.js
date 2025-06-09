import { faPage4, faWindows } from "@fortawesome/free-brands-svg-icons";
import {
  faWallet,
  faHome
} from "@fortawesome/free-solid-svg-icons";

const initMenu = [
  {
    label: "Home",
    path: "/",
    icon: faHome,
  },
  {
    label: "Wallet",
    path: "/reserve",
    icon: faWallet,
  },
  {
    label: "Info",
    path: "/auth/login",
	 fontFamily: '90px', 
    
  },
  {
    label: "Register",
    path: "/auth/register",
    
  },
  {
    label: "Table",
    path: "/table",
    
  },
];

export default initMenu