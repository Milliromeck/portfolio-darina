import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  };

  const projects = [
    {
      id: 1,
      title: 'Interactive Portfolio',
      description: 'Modern portfolio website with real-time animations, particle effects, and custom shaders. Features include floating hearts, interactive particles, and dynamic UI elements.',
      tech: ['React', 'Canvas API', 'CSS3', 'Vite', 'Framer Motion'],
      category: 'web',
      github: 'https://github.com/darina-romanovskaya/portfolio',
      live: 'https://darina.dev',
      featured: true,
      status: 'completed',
      year: '2024',
      color: '#ff00ff',
      icon: '✨'
    },
    {
      id: 2,
      title: 'E-commerce Analytics Dashboard',
      description: 'Comprehensive admin dashboard with real-time sales analytics, inventory management, and customer insights. Includes interactive charts and data visualization.',
      tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Chart.js', 'Express'],
      category: 'web',
      github: 'https://github.com/darina-romanovskaya/dashboard',
      live: 'https://dashboard.demo.darina.dev',
      featured: true,
      status: 'completed',
      year: '2023',
      color: '#00ffff',
      icon: '📊'
    },
    {
      id: 3,
      title: 'Microservices API Gateway',
      description: 'Scalable API gateway for microservices architecture with rate limiting, authentication, monitoring, and load balancing. Built for high-traffic applications.',
      tech: ['PHP', 'MySQL', 'Redis', 'Docker', 'Nginx', 'JWT'],
      category: 'backend',
      github: 'https://github.com/darina-romanovskaya/api-gateway',
      live: 'https://api.demo.darina.dev',
      featured: false,
      status: 'completed',
      year: '2023',
      color: '#ffff00',
      icon: '🔗'
    },
    {
      id: 4,
      title: 'Design System Library',
      description: 'Comprehensive component library with documentation, theming support, and accessibility features. Used as foundation for multiple enterprise projects.',
      tech: ['React', 'Storybook', 'TypeScript', 'Jest', 'Sass', 'Rollup'],
      category: 'ui',
      github: 'https://github.com/darina-romanovskaya/design-system',
      live: 'https://design.darina.dev',
      featured: true,
      status: 'completed',
      year: '2023',
      color: '#ff6b6b',
      icon: '🎨'
    },
    {
      id: 5,
      title: 'Real-time Chat Application',
      description: 'WebSocket-based chat platform with rooms, file sharing, end-to-end encryption, and voice messages. Supports group chats and private messaging.',
      tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'JWT', 'WebRTC'],
      category: 'web',
      github: 'https://github.com/darina-romanovskaya/chat-app',
      live: 'https://chat.demo.darina.dev',
      featured: false,
      status: 'completed',
      year: '2023',
      color: '#6bffb8',
      icon: '💬'
    },
    {
      id: 6,
      title: 'Task Management Platform',
      description: 'Productivity application with kanban boards, time tracking, team collaboration, and automated reporting. Built for remote teams.',
      tech: ['React', 'Redux', 'Express', 'PostgreSQL', 'Docker', 'WebSocket'],
      category: 'web',
      github: 'https://github.com/darina-romanovskaya/task-manager',
      live: 'https://tasks.demo.darina.dev',
      featured: false,
      status: 'completed',
      year: '2022',
      color: '#6b83ff',
      icon: '📋'
    },
    {
      id: 7,
      title: 'E-learning Platform',
      description: 'Online education platform with video courses, quizzes, progress tracking, and certificate generation. Supports multiple payment methods.',
      tech: ['PHP', 'Laravel', 'MySQL', 'Redis', 'Vue.js', 'Stripe'],
      category: 'web',
      github: 'https://github.com/darina-romanovskaya/elearning',
      live: 'https://learn.demo.darina.dev',
      featured: false,
      status: 'completed',
      year: '2022',
      color: '#ff8e6b',
      icon: '🎓'
    },
    {
      id: 8,
      title: 'Weather Forecast App',
      description: 'Real-time weather application with 7-day forecasts, historical data, and interactive maps. Uses multiple weather API sources.',
      tech: ['React', 'TypeScript', 'OpenWeather API', 'Mapbox', 'Chart.js'],
      category: 'web',
      github: 'https://github.com/darina-romanovskaya/weather-app',
      live: 'https://weather.demo.darina.dev',
      featured: false,
      status: 'completed',
      year: '2022',
      color: '#6bd4ff',
      icon: '☁️'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'web', label: 'Web Apps', count: projects.filter(p => p.category === 'web').length },
    { id: 'backend', label: 'Backend', count: projects.filter(p => p.category === 'backend').length },
    { id: 'ui', label: 'UI/UX', count: projects.filter(p => p.category === 'ui').length },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const stats = {
    totalProjects: projects.length,
    completed: projects.filter(p => p.status === 'completed').length,
    featured: projects.filter(p => p.featured).length,
    years: [...new Set(projects.map(p => p.year))].length
  };

  return (
    <div className="projects-page" onMouseMove={handleMouseMove}>
      <div 
        className="projects-bg-effect"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
      />

      <section className="projects-hero section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="gradient-text">Project Portfolio</span>
            </h1>
            <p className="hero-subtitle">
              A collection of my work showcasing full-stack development capabilities 
              from concept to deployment.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">{stats.totalProjects}</span>
                <span className="stat-label">Total Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.completed}</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.featured}</span>
                <span className="stat-label">Featured</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.years}+</span>
                <span className="stat-label">Years</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-filters">
        <div className="container">
          <div className="filters-container">
            <div className="filters-header">
              <h2>Browse by Category</h2>
              <p>Filter projects based on technology stack and focus area</p>
            </div>
            <div className="filters-grid">
              {filters.map(filterItem => (
                <button
                  key={filterItem.id}
                  className={`filter-card ${filter === filterItem.id ? 'active' : ''}`}
                  onClick={() => setFilter(filterItem.id)}
                >
                  <div className="filter-content">
                    <span className="filter-label">{filterItem.label}</span>
                    <span className="filter-count">{filterItem.count}</span>
                  </div>
                  <div className="filter-line"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="projects-grid-section section">
        <div className="container">
          <div className="projects-container">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  borderLeft: `4px solid ${project.color}`
                }}
              >
                <div className="project-header">
                  <div className="project-icon" style={{ color: project.color }}>
                    {project.icon}
                  </div>
                  <div className="project-title-section">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-meta">
                      <span className="project-year">{project.year}</span>
                      <span className="project-status">{project.status}</span>
                      {project.featured && (
                        <span className="project-featured">Featured</span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="tech-tag"
                      style={{
                        background: `${project.color}20`,
                        color: project.color,
                        border: `1px solid ${project.color}40`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                    style={{
                      background: `${project.color}15`,
                      border: `1px solid ${project.color}30`,
                      color: project.color
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = `${project.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = `${project.color}15`;
                    }}
                  >
                    <span>View Code</span>
                    <span className="link-icon">↗</span>
                  </a>
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link secondary"
                  >
                    <span>Live Demo</span>
                    <span className="link-icon">↗</span>
                  </a>
                </div>

                {hoveredProject === project.id && (
                  <div 
                    className="project-hover-effect"
                    style={{
                      background: `radial-gradient(circle at center, ${project.color}15 0%, transparent 70%)`
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Have an idea you want to bring to life? Let's discuss how we can create something amazing together.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-button primary">
                <span>Start a Project</span>
                <span className="button-icon">→</span>
              </Link>
              <a 
                href="https://github.com/darina-romanovskaya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cta-button secondary"
              >
                <span>View GitHub</span>
                <span className="button-icon">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .projects-page {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #111119 100%);
          overflow: hidden;
        }
        
        .projects-bg-effect {
          position: fixed;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255, 0, 255, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          transform: translate(-50%, -50%);
          transition: left 0.1s ease, top 0.1s ease;
        }
        
        .projects-hero {
          position: relative;
          z-index: 2;
          padding-top: 4rem;
          text-align: center;
        }
        
        .hero-title {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #ff00ff, #00ffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 3rem;
          line-height: 1.8;
        }
        
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ff00ff, #00ffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .projects-filters {
          position: relative;
          z-index: 2;
          padding: 3rem 0;
          background: rgba(10, 10, 15, 0.7);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .filters-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .filters-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .filters-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        
        .filters-header p {
          color: var(--text-secondary);
          font-size: 1.125rem;
        }
        
        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        
        .filter-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          text-align: left;
        }
        
        .filter-card:hover,
        .filter-card.active {
          background: rgba(255, 0, 255, 0.1);
          border-color: rgba(255, 0, 255, 0.3);
          transform: translateY(-3px);
        }
        
        .filter-card.active .filter-line {
          width: 100%;
        }
        
        .filter-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .filter-label {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        
        .filter-count {
          background: rgba(255, 0, 255, 0.2);
          color: var(--neon-pink);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        
        .filter-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff00ff, #00ffff);
          transition: width 0.3s ease;
        }
        
        .projects-grid-section {
          position: relative;
          z-index: 2;
          padding-top: 4rem;
        }
        
        .projects-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }
        
        .project-card {
          background: rgba(26, 26, 38, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          animation: slideInUp 0.6s ease-out both;
        }
        
        .project-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 0, 255, 0.3);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 40px rgba(255, 0, 255, 0.1);
        }
        
        .project-card.featured {
          border: 2px solid rgba(255, 0, 255, 0.5);
          box-shadow: 0 0 30px rgba(255, 0, 255, 0.2);
        }
        
        .project-header {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          align-items: flex-start;
        }
        
        .project-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }
        
        .project-title-section {
          flex: 1;
        }
        
        .project-title {
          font-size: 1.5rem;
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
          line-height: 1.3;
        }
        
        .project-meta {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        
        .project-year,
        .project-status,
        .project-featured {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-weight: 600;
        }
        
        .project-year {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
        }
        
        .project-status {
          background: rgba(0, 255, 0, 0.1);
          color: #00ff00;
        }
        
        .project-featured {
          background: rgba(255, 0, 255, 0.2);
          color: var(--neon-pink);
        }
        
        .project-description {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }
        
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .tech-tag {
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .tech-tag:hover {
          transform: translateY(-2px);
        }
        
        .project-links {
          display: flex;
          gap: 1rem;
        }
        
        .project-link {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .project-link.secondary {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--text-secondary);
        }
        
        .project-link.secondary:hover {
          border-color: rgba(255, 0, 255, 0.5);
          color: var(--neon-pink);
          background: rgba(255, 0, 255, 0.1);
        }
        
        .link-icon {
          font-weight: bold;
        }
        
        .project-hover-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .project-card:hover .project-hover-effect {
          opacity: 1;
        }
        
        .projects-cta {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 6rem 0;
        }
        
        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .cta-content h2 {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }
        
        .cta-content p {
          color: var(--text-secondary);
          font-size: 1.125rem;
          line-height: 1.8;
          margin-bottom: 3rem;
        }
        
        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .cta-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          min-width: 180px;
        }
        
        .cta-button.primary {
          background: linear-gradient(135deg, #ff00ff, #cc00cc);
          color: white;
          border: none;
        }
        
        .cta-button.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 0, 255, 0.3);
        }
        
        .cta-button.secondary {
          background: transparent;
          color: var(--text-secondary);
          border: 2px solid var(--text-secondary);
        }
        
        .cta-button.secondary:hover {
          border-color: var(--neon-pink);
          color: var(--neon-pink);
          transform: translateY(-3px);
        }
        
        .button-icon {
          font-weight: bold;
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .projects-container {
            grid-template-columns: 1fr;
          }
          
          .project-card {
            padding: 1.5rem;
          }
          
          .cta-content h2 {
            font-size: 2.5rem;
          }
          
          .cta-buttons {
            flex-direction: column;
          }
          
          .cta-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;