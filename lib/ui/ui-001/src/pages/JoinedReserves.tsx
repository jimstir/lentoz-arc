import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Mock data for reserves
const reservesData = [
  {
    id: 1,
    name: 'AAVE Reserve',
    amount: '100.50',
    symbol: 'AAVE',
    status: 'Active',
    date: '2023-06-09',
    apr: '3.25%'
  },
  {
    id: 2,
    name: 'USDC Reserve',
    amount: '5,000.00',
    symbol: 'USDC',
    status: 'Active',
    date: '2023-06-08',
    apr: '5.50%'
  },
  {
    id: 3,
    name: 'ETH Reserve',
    amount: '2.5',
    symbol: 'ETH',
    status: 'Active',
    date: '2023-06-07',
    apr: '4.20%'
  },
  // Add more mock data as needed
];

const JoinedReserves = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <button 
            onClick={() => navigate(-1)} 
            className="back-button"
            aria-label="Go back"
          >
            <span className="material-icons">arrow_back</span>
          </button>
          <h1>My Joined Reserves</h1>
        </div>
      </div>
      
      <div className="reserves-container">
        <div className="reserves-widget">
          <div className="reserves-header">
            <h2>Your Reserves</h2>
            <div className="reserves-count">{reservesData.length} reserves</div>
          </div>
          
          <div className="reserves-list">
            {reservesData.map((reserve) => (
              <div key={reserve.id} className="reserve-item">
                <div className="reserve-icon">
                  <span className="material-icons">account_balance_wallet</span>
                </div>
                <div className="reserve-details">
                  <div className="reserve-name">
                    {reserve.name}
                    <span className={`status-badge ${reserve.status.toLowerCase()}`}>
                      {reserve.status}
                    </span>
                  </div>
                  <div className="reserve-meta">
                    <span>Amount: {reserve.amount} {reserve.symbol}</span>
                    <span>APR: {reserve.apr}</span>
                    <span>Joined: {reserve.date}</span>
                  </div>
                </div>
                <div className="reserve-actions">
                  <button className="btn small">View</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="reserves-footer">
            <button className="btn secondary">View All Transactions</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinedReserves;
