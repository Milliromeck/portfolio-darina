import { Link } from 'react-router-dom';

const Home = () => {
  const skills = [
    { name: 'React', level: 95, color: '#61DAFB' },
    { name: 'TypeScript', level: 85, color: '#3178C6' },
    { name: 'PHP', level: 90, color: '#777BB4' },
    { name: 'MySQL', level: 88, color: '#4479A1' },
    { name: 'Docker', level: 80, color: '#2496ED' },
    { name: 'Node.js', level: 82, color: '#339933' },
  ];

  return (
    <div className="home">
      <div className="container">
        <section className="hero">
          <h1 className="hero-title">
            <span className="greeting">Hi, I'm</span>
            <span className="name">Darina Romanovskaya</span>
          </h1>
          <p className="hero-subtitle">
            Full-Stack Developer crafting <span className="highlight">digital experiences</span> with modern technologies
          </p>
          <p className="hero-description">
            I specialize in building performant, scalable web applications with clean architecture 
            and attention to detail. Passionate about creating intuitive interfaces and robust backend systems.
          </p>
          <div className="hero-actions">
            <Link to="/projects" className="btn btn-primary">
              <span>View Projects</span>
              <span className="arrow">→</span>
            </Link>
            <Link to="/contact" className="btn btn-outline">
              <span>Get in Touch</span>
              <span className="arrow">↗</span>
            </Link>
          </div>
        </section>

        <section className="skills">
          <h2 className="section-title">Technical Expertise</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="skill-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="skill-header">
                  <div className="skill-icon" style={{ background: `${skill.color}20` }}>
                    <span style={{ color: skill.color }}>{skill.name.charAt(0)}</span>
                  </div>
                  <div className="skill-info">
                    <h3>{skill.name}</h3>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress"
                    style={{
                      width: `${skill.level}%`,
                      background: skill.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="features">
          <h2 className="section-title">Interactive Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Floating Hearts</h3>
              <p>Custom pixel art hearts with randomized physics and glow effects</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Particle System</h3>
              <p>Real-time particle animations that connect based on proximity</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Interactive UI</h3>
              <p>Hover effects, smooth transitions, and responsive design</p>
            </div>
          </div>
        </section>

        <section className="cta">
          <h2 className="section-title">Ready to Build Something Amazing?</h2>
          <p className="cta-description">
            Whether you need a full-stack application, API integration, or consultation, 
            I'm here to help bring your ideas to life.
          </p>
          <Link to="/contact" className="btn btn-primary btn-large">
            Start a Project
          </Link>
        </section>
      </div>

      <style jsx>{`
        .home {
          padding: 2rem 0;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .hero {
          text-align: center;
          padding: 4rem 0;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .hero-title {
          margin-bottom: 1rem;
        }
        
        .greeting {
          display: block;
          font-size: 1.5rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }
        
        .name {
          display: block;
          font-size: 3.5rem;
          background: linear-gradient(135deg, #ff00ff, #00ffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin: 1rem 0;
          line-height: 1.4;
        }
        
        .highlight {
          color: #ff00ff;
          font-weight: 600;
        }
        
        .hero-description {
          font-size: 1.125rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin: 2rem auto;
          max-width: 600px;
        }
        
        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 3rem;
          flex-wrap: wrap;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #ff00ff, #cc00cc);
          color: white;
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 0, 255, 0.3);
        }
        
        .btn-outline {
          background: transparent;
          border-color: var(--text-secondary);
          color: var(--text-secondary);
        }
        
        .btn-outline:hover {
          border-color: #ff00ff;
          color: #ff00ff;
          transform: translateY(-3px);
        }
        
        .arrow {
          font-weight: bold;
        }
        
        .section-title {
          font-size: 2.5rem;
          text-align: center;
          margin: 4rem 0 2rem;
          position: relative;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #ff00ff, #00ffff);
          border-radius: 2px;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        
        .skill-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          animation: slideUp 0.6s ease-out both;
          transition: all 0.3s ease;
        }
        
        .skill-card:hover {
          border-color: #ff00ff;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(255, 0, 255, 0.1);
        }
        
        .skill-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .skill-icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .skill-info {
          flex: 1;
        }
        
        .skill-info h3 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--text-primary);
        }
        
        .skill-level {
          color: #ff00ff;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .skill-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }
        
        .skill-progress {
          height: 100%;
          border-radius: 3px;
          transition: width 1s ease-out;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .feature-card {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 0, 255, 0.05);
          border-radius: 12px;
          border: 1px solid transparent;
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          border-color: rgba(255, 0, 255, 0.3);
          transform: translateY(-5px);
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .feature-card h3 {
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        
        .feature-card p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        .cta {
          text-align: center;
          padding: 4rem 0;
          margin-top: 4rem;
          background: linear-gradient(135deg, rgba(255, 0, 255, 0.05), rgba(0, 255, 255, 0.05));
          border-radius: 20px;
        }
        
        .cta-description {
          max-width: 600px;
          margin: 1rem auto 2rem;
          font-size: 1.125rem;
          color: var(--text-secondary);
        }
        
        .btn-large {
          padding: 1.25rem 2.5rem;
          font-size: 1.125rem;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .name {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.25rem;
          }
          
          .hero-actions {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
            justify-content: center;
          }
          
          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;