import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-6 py-5 flex justify-between items-center transition-all duration-300 ${scrolled
        ? 'bg-black border-b border-gray-800'
        : 'bg-gradient-to-b from-black/90 to-transparent'
        }`}
      id="navbar"
    >
      <div className="flex items-center gap-2 animate-fade-in">
        <div className="w-8 h-8 border border-gold rotate-45 flex items-center justify-center">
          <div className="w-4 h-4 bg-gold/50 rotate-0"></div>
        </div>
        <div className="ml-4 text-white text-xl font-bold tracking-[0.2em] font-heading">
          SADIT <span className="text-gold">ADITYA</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-10 animate-fade-in delay-200">
        <Link
          to="/"
          className="text-xs tracking-[0.2em] text-white hover:text-gold transition-colors uppercase font-semibold relative group"
        >
          Home
          <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
        </Link>
        <Link
          to="/projects"
          className="text-xs tracking-[0.2em] text-gray-400 hover:text-gold transition-colors uppercase font-semibold"
        >
          Projects
        </Link>
        <a
          href="/#profile"
          className="text-xs tracking-[0.2em] text-gray-400 hover:text-gold transition-colors uppercase font-semibold"
        >
          About
        </a>
        <a
          href="/#contact"
          className="text-xs tracking-[0.2em] text-gray-400 hover:text-gold transition-colors uppercase font-semibold"
        >
          Contact
        </a>
      </div>

      <Link to="#" className="btn-gothic-outline text-[10px] md:text-xs font-bold animate-fade-in delay-400">
        Hire Me
      </Link>
    </nav>
  );
};

export default Header;