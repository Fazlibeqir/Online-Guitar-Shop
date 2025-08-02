'use client';

import Link from 'next/link';

interface HeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ showBackButton = false }) => {

  return (
    <header className="header">
      <div className="header-content">
        <div className="d-flex align-items-center">
          {showBackButton && (
            <Link 
              href="/"
              className="back-link me-4"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back To Home</span>
            </Link>
          )}
          
          <Link href="/" className="logo">
            <div className="logo-icon">
              <span>V</span>
            </div>
            <span className="logo-text">VibeStrings</span>
          </Link>
        </div>
        
        <nav className="nav-links">
          <Link 
            href="/" 
            className="nav-link"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}; 