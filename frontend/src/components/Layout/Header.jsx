import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header style={styles.header(scrolled)}>
      <div style={styles.container}>
        <div style={styles.headerContent}>
          <Link to="/" style={styles.logo}>
            <span style={styles.logoName}>Darina Romanovskaya</span>
            <span style={styles.logoSubtitle}>Full-Stack Developer</span>
          </Link>

          <nav style={styles.nav}>
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={styles.navLink(isActive)}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  {isActive && <div style={styles.activeIndicator} />}
                </Link>
              );
            })}
          </nav>

          <button 
            style={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span style={styles.menuLine(menuOpen, 1)} />
            <span style={styles.menuLine(menuOpen, 2)} />
            <span style={styles.menuLine(menuOpen, 3)} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          nav {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: #0a0a0f;
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            border-bottom: 1px solid #2a2a3a;
          }
          
          nav.open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }
          
          button {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};

const styles = {
  header: (scrolled) => ({
    background: 'rgba(10, 10, 15, 0.9)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: scrolled ? '1px solid #2a2a3a' : '1px solid transparent',
    transition: 'all 0.3s ease'
  }),
  
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  
  logo: {
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none'
  },
  
  logoName: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ff00ff'
  },
  
  logoSubtitle: {
    fontSize: '0.9rem',
    color: '#a0a0b0',
    marginTop: '0.25rem'
  },
  
  nav: {
    display: 'flex',
    gap: '2rem'
  },
  
  navLink: (isActive) => ({
    color: isActive ? '#ff00ff' : '#a0a0b0',
    padding: '0.5rem 0',
    position: 'relative',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500'
  }),
  
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: '#ff00ff'
  },
  
  menuToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem'
  },
  
  menuLine: (isOpen, lineNumber) => {
    const baseStyle = {
      display: 'block',
      width: '24px',
      height: '2px',
      background: '#ffffff',
      margin: '4px 0',
      transition: '0.3s ease',
      borderRadius: '1px'
    };
    
    if (isOpen) {
      if (lineNumber === 1) {
        return { ...baseStyle, transform: 'rotate(45deg) translate(5px, 5px)' };
      }
      if (lineNumber === 2) {
        return { ...baseStyle, opacity: 0 };
      }
      if (lineNumber === 3) {
        return { ...baseStyle, transform: 'rotate(-45deg) translate(7px, -6px)' };
      }
    }
    
    return baseStyle;
  }
};

export default Header;
