import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/projects', label: 'Проекты' },
    { path: '/contact', label: 'Контакты' },
  ];

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <div className="logo">
            <Link to="/" className="logo-link">
              <span className="neon-text">Darina Romanovskaya</span>
              <span className="tagline">Full-Stack Developer</span>
            </Link>
          </div>
          <nav className="nav">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="main">
        {children}
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2026 Darina Romanovskaya</p>
          <p>React · PHP · MySQL · Docker</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;