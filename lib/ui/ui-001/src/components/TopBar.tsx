import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import WalletModal from './WalletModal';
import '../App.css';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const checkIfWalletIsConnected = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const account = accounts[0];
          setWalletAddress(account);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Error checking connected accounts:', error);
      }
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    // Listen for account changes
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setWalletAddress('');
          setIsConnected(false);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      window.open('https://metamask.io/download.html', '_blank');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        const account = accounts[0];
        setWalletAddress(account);
        setIsConnected(true);
        setIsModalOpen(false);
        // Redirect to dashboard after successful connection
        if (location.pathname === '/') {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

  const handleConnectClick = () => {
    if (isConnected) return;
    setIsModalOpen(true);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-left">
            <button 
              className="menu-toggle" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span className="material-icons-round">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
            <Link to="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
              <img src="/logo.svg" alt="Lentoz" className="logo" />
              <span>Lentoz</span>
            </Link>
          </div>
          
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>
              Dashboard
            </Link>
            <Link to="/lend" className={`nav-link ${isActive('/lend')}`}>
              Lend
            </Link>
            <Link to="/borrow" className={`nav-link ${isActive('/borrow')}`}>
              Borrow
            </Link>
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>
              About
            </Link>
          </div>
          
          <div className="nav-actions">
            <button 
              className={`wallet-button ${isConnected ? 'connected' : ''}`}
              onClick={handleConnectClick}
              aria-label={isConnected ? 'Connected wallet' : 'Connect wallet'}
            >
              {isConnected ? (
                <span className="wallet-address">{formatAddress(walletAddress)}</span>
              ) : (
                <>
                  <span className="material-icons-round" style={{ marginRight: '6px', fontSize: '1.25rem' }}>account_balance_wallet</span>
                  Connect Wallet
                </>
              )}
              {isConnected && <span className="connection-dot"></span>}
            </button>
          </div>
        </div>
      </nav>
      
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      <WalletModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onConnect={connectWallet}
      />
      

    </>
  );
};

export default TopBar;
