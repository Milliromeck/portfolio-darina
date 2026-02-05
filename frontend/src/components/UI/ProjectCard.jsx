import { useState } from 'react';
import Button from './Button';

const ProjectCard = ({ 
  title, 
  description, 
  tech, 
  image,
  github,
  live,
  featured = false 
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className={`project-card ${featured ? 'featured' : ''} ${hovered ? 'hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="project-image">
        <div className="image-container">
          <div className="image-placeholder">
            {image || '🖥️'}
          </div>
          {featured && (
            <div className="featured-badge">
              <span>Featured</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">{title}</h3>
          <div className="project-status">
            <span className="status-dot"></span>
            <span className="status-text">Completed</span>
          </div>
        </div>
        
        <p className="project-description">{description}</p>
        
        <div className="project-tech">
          {tech.map((item, index) => (
            <span key={index} className="tech-tag">{item}</span>
          ))}
        </div>
        
        <div className="project-links">
          <Button 
            variant="outline" 
            size="small"
            onClick={() => window.open(github, '_blank')}
          >
            View Code
          </Button>
          <Button 
            variant="primary" 
            size="small"
            onClick={() => window.open(live, '_blank')}
          >
            Live Demo
          </Button>
        </div>
      </div>

      <style jsx="true">{`
        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-radius: var(--border-radius-lg);
          overflow: hidden;
          transition: all var(--transition-normal);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .project-card.featured {
          border: 2px solid var(--neon-primary);
          box-shadow: var(--shadow-neon);
        }
        
        .project-card.hovered {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg), var(--shadow-neon);
          border-color: var(--border-glow);
        }
        
        .project-image {
          height: 200px;
          background: linear-gradient(135deg, var(--bg-secondary), var(--bg-card));
          position: relative;
          overflow: hidden;
        }
        
        .image-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .image-placeholder {
          font-size: 4rem;
          opacity: 0.6;
          transition: transform var(--transition-normal);
        }
        
        .project-card.hovered .image-placeholder {
          transform: scale(1.1);
        }
        
        .featured-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, var(--neon-primary), #cc00cc);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: var(--border-radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .project-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .project-title {
          margin: 0;
          font-size: 1.25rem;
          color: var(--text-primary);
        }
        
        .project-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background: #00ff00;
          border-radius: 50%;
          box-shadow: 0 0 10px #00ff00;
        }
        
        .status-text {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        
        .project-description {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }
        
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        
        .tech-tag {
          background: var(--neon-primary-10);
          color: var(--neon-primary);
          padding: 0.25rem 0.75rem;
          border-radius: var(--border-radius-sm);
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .project-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;