import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Decentralized Lending for the Modern World</h1>
          <p className="hero-subtitle">Earn interest on your crypto assets or get a loan with competitive rates. No middlemen, just smart contracts.</p>
          <div className="hero-buttons">
            <Link to="/dashboard" className="btn primary">Launch App</Link>
            <a href="#how-it-works" className="btn secondary">Learn More</a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">$12.4M+</div>
              <div className="stat-label">Total Value Locked</div>
            </div>
            <div className="stat">
              <div className="stat-value">5.75%</div>
              <div className="stat-label">Average APY</div>
            </div>
            <div className="stat">
              <div className="stat-value">1,245+</div>
              <div className="stat-label">Active Users</div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card">
            <div className="card-content">
              <div className="card-header">
                <span>Your Portfolio</span>
                <span className="card-badge">Connected</span>
              </div>
              <div className="card-balance">$12,450.00</div>
              <div className="card-details">
                <div className="detail">
                  <span>Earnings (24h)</span>
                  <span className="positive">+$24.50</span>
                </div>
                <div className="detail">
                  <span>Active Loans</span>
                  <span>3</span>
                </div>
              </div>
              <Link to="/dashboard" className="card-button">View Dashboard</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Start earning or borrowing in just a few simple steps</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Connect Your Wallet</h3>
            <p>Connect your preferred Web3 wallet like MetaMask to get started with Lentoz.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Deposit or Borrow</h3>
            <p>Supply assets to earn interest or take out a loan against your crypto collateral.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Earn or Access Liquidity</h3>
            <p>Start earning passive income or access the liquidity you need instantly.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Why Choose Lentoz?</h2>
          <p>Experience the future of decentralized finance</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Non-Custodial</h3>
            <p>You maintain control of your assets at all times with our non-custodial solution.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💱</div>
            <h3>Competitive Rates</h3>
            <p>Earn higher yields and borrow at lower rates compared to traditional finance.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Settlements</h3>
            <p>Transactions are processed instantly on the blockchain without delays.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Global Access</h3>
            <p>Access financial services from anywhere in the world with an internet connection.</p>
          </div>
        </div>
        <div className="cta-section">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of users already using Lentoz to grow their crypto assets</p>
          <Link to="/dashboard" className="btn primary large">Launch App</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
