import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .desktop-only { display: none; }
        .mobile-only { display: flex; }
        .mobile-menu-container {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: rgba(5, 5, 5, 0.98);
          border-bottom: 1px solid rgba(198, 166, 101, 0.2);
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .mobile-menu-open { max-height: 300px; padding: 1.5rem 0; opacity: 1; }
        .mobile-menu-closed { max-height: 0; padding: 0; opacity: 0; }
        
        .desktop-nav-link {
            font-size: 0.75rem;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            font-weight: 600;
            color: #9ca3af;
            text-decoration: none;
            transition: color 0.3s;
        }
        .desktop-nav-link:hover { color: #c6a665; }
        
        @media (min-width: 768px) {
          .desktop-only { display: flex; }
          .mobile-only { display: none; }
          .mobile-menu-container { display: none !important; }
        }
      `}</style>
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
            padding: '1.25rem 1.5rem',
            backgroundColor: scrolled ? '#050505' : 'rgba(5, 5, 5, 0.8)',
            borderBottom: scrolled ? '1px solid rgba(198, 166, 101, 0.2)' : '1px solid transparent',
            backdropFilter: 'blur(8px)'
        }}
        id="navbar"
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="border border-gold rotate-45 flex items-center justify-center" style={{ width: '2rem', height: '2rem' }}>
              <div className="rotate-0" style={{ width: '1rem', height: '1rem', backgroundColor: 'rgba(198, 166, 101, 0.5)' }}></div>
            </div>
            <div className="ml-4 text-white font-bold font-heading" style={{ fontSize: '1.25rem', letterSpacing: '0.2em' }}>
              SADIT <span style={{ color: '#c6a665' }}>ADITYA</span>
            </div>
          </div>

          <div className="desktop-only items-center gap-10 animate-fade-in delay-200">
            <Link to="/" className="desktop-nav-link" style={{ color: 'white' }}>Home</Link>
            <Link to="/projects" className="desktop-nav-link">Projects</Link>
            <a href="#profile" className="desktop-nav-link">About</a>
            <a href="#contact" className="desktop-nav-link">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="desktop-only btn-gothic-outline font-bold animate-fade-in delay-400" style={{ fontSize: '0.75rem' }}>
              Hire Me
            </button>
            
            <button 
              className="mobile-only animate-fade-in delay-400 focus:outline-none"
              style={{ color: '#c6a665', fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        <div className={`mobile-menu-container flex flex-col items-center gap-6 ${isMobileMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}>
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="desktop-nav-link" style={{ color: 'white' }}>Home</Link>
          <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)} className="desktop-nav-link">Projects</Link>
          <a href="#profile" onClick={() => setIsMobileMenuOpen(false)} className="desktop-nav-link">About</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="desktop-nav-link">Contact</a>
        </div>
      </nav>
    </>
  );
};

export default Header;