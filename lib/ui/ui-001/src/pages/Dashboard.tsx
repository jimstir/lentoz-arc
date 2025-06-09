import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      
      <main className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="dashboard-actions">
            <button className="btn primary">Find an Reserve</button>
          </div>
        </div>
        
        <div className="dashboard-grid">
          {/* Balance Card */}
          <div className="widget balance-card">
            <h3>Total Balance</h3>
            <div className="balance-amount">$0.00</div>
          </div>
          
          {/* Active Loans */}
          <div className="widget active-loans">
            <h3>Active Reserves</h3>
            <div className="loans-count">0</div>
            <div className="loans-amount">$0.00</div>
          </div>
          
          {/* APR Rates */}
          <div className="widget apr-rates">
            <h3>Current Rates</h3>
            <div className="rate">
              <span>AAVE</span>
              <span>5.75%</span>
            </div>
            <div className="rate">
              <span>USDC</span>
              <span>7.25%</span>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="widget recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon deposit">D</div>
                <div className="activity-details">
                  <div className="activity-title">Deposit</div>
                  <div className="activity-amount">+10.00</div>
                  <div className="activity-time">1 hours ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon loan">D</div>
                <div className="activity-details">
                  <div className="activity-title">Proposal</div>
                  <div className="activity-amount">$50.00</div>
                  <div className="activity-time">1 day ago</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Market Overview */}
          <div className="widget market-overview">
            <h3>Market Overview</h3>
            <div className="market-stats">
              <div className="stat">
                <div className="stat-label"></div>
                <div className="stat-value"></div>
              </div>
              <div className="stat">
                <div className="stat-label"></div>
                <div className="stat-value"></div>
              </div>
              <div className="stat">
                <div className="stat-label"></div>
                <div className="stat-value"></div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="widget quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <Link to="/reserves/joined" className="btn secondary">Joined Reserves</Link>
              <button className="btn secondary">Create A Reserve</button>
              <button className="btn secondary">Borrow</button>
              <button className="btn secondary">Repay Loan</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
