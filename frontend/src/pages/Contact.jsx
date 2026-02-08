import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  // валидация формы
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.length < 10) newErrors.message = 'Message should be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ОТПРАВКА НА FORMSPREE
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus('validation-error');
      return;
    }
    
    setStatus('sending');
    
    try {
      const response = await fetch('https://formspree.io/f/xvzbovna', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });
      
      const result = await response.json();
      
      // Formspree возвращает success при статусе 200-299
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Formspree Error:', error);
      setStatus('error');
    }
    
    setTimeout(() => setStatus(''), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="gradient-text">Contact Me</span>
            </h1>
            <p className="hero-description">
              Have a project in mind or just want to chat about technology? 
              I'm always open to discussing new opportunities.
            </p>
          </div>
        </div>
      </section>

      <section className="contact-main section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-section">
              <div className="form-card">
                <h2>Send a Message</h2>
                <p>Fill out the form below and I'll get back to you soon</p>
                
                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'error' : ''}
                      required
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      required
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                  
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className={errors.message ? 'error' : ''}
                      required
                    />
                    {errors.message && <span className="error-text">{errors.message}</span>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`submit-btn ${status === 'sending' ? 'sending' : ''}`}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                  
                  {status === 'success' && (
                    <div className="success-message">
                      ✓ Message sent successfully! I'll contact you soon.
                    </div>
                  )}
                  
                  {status === 'error' && (
                    <div className="error-message">
                      ✗ Failed to send message. Please try again later.
                    </div>
                  )}
                  
                  {status === 'validation-error' && (
                    <div className="error-message">
                      ⚠ Please fix the errors above.
                    </div>
                  )}
                </form>
              </div>
            </div>
            
            <div className="contact-info-section">
              <h2>Get in Touch</h2>
              <div className="contact-info">
                <div className="info-item">
                  <div className="icon">✉️</div>
                  <div>
                    <h3>Email</h3>
                    <p>darinaromanovskaa@gmail.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="icon">📍</div>
                  <div>
                    <h3>Location</h3>
                    <p>Available for remote work worldwide</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="icon">⏱️</div>
                  <div>
                    <h3>Response Time</h3>
                    <p>Usually within 24 hours</p>
                  </div>
                </div>
              </div>
              
              <div className="social-links">
                <h3>Connect</h3>
                <div className="social-grid">
                  <a href="https://github.com/Milliromeck" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  <a href="https://vk.com/erythromycinthut" target="_blank" rel="noopener noreferrer">
                    VK
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0f 0%, #111119 100%);
          color: white;
          padding: 2rem 0;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .section {
          margin-bottom: 4rem;
        }
        
        .contact-hero {
          text-align: center;
          padding-top: 4rem;
        }
        
        .hero-title {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #ff00ff, #00ffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hero-description {
          font-size: 1.25rem;
          color: #a0a0b0;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-top: 2rem;
        }
        
        .form-card {
          background: rgba(26, 26, 38, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2.5rem;
          backdrop-filter: blur(20px);
        }
        
        .form-card h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: white;
        }
        
        .form-card p {
          color: #a0a0b0;
          margin-bottom: 2rem;
        }
        
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .form-group input.error,
        .form-group textarea.error {
          border-color: #ff5555;
          background: rgba(255, 85, 85, 0.05);
        }
        
        .form-group textarea {
          min-height: 150px;
          resize: vertical;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #ff00ff;
          background: rgba(255, 0, 255, 0.05);
        }
        
        .error-text {
          color: #ff5555;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
        
        .submit-btn {
          padding: 1rem;
          background: linear-gradient(135deg, #ff00ff, #cc00cc);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 0, 255, 0.3);
        }
        
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .submit-btn.sending {
          animation: pulse 1.5s infinite;
          position: relative;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .success-message {
          text-align: center;
          padding: 1rem;
          background: rgba(0, 255, 0, 0.1);
          border: 1px solid rgba(0, 255, 0, 0.3);
          border-radius: 8px;
          color: #00ff00;
          font-weight: 500;
          margin-top: 1rem;
        }
        
        .error-message {
          text-align: center;
          padding: 1rem;
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid rgba(255, 0, 0, 0.3);
          border-radius: 8px;
          color: #ff5555;
          font-weight: 500;
          margin-top: 1rem;
        }
        
        .contact-info-section h2 {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: white;
        }
        
        .contact-info {
          margin-bottom: 3rem;
        }
        
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .info-item:last-child {
          border-bottom: none;
        }
        
        .info-item .icon {
          font-size: 1.5rem;
          margin-top: 0.25rem;
        }
        
        .info-item h3 {
          color: #ff00ff;
          margin-bottom: 0.5rem;
          font-size: 1.25rem;
        }
        
        .info-item p {
          color: #a0a0b0;
          font-size: 1rem;
        }
        
        .social-links h3 {
          color: white;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }
        
        .social-grid {
          display: flex;
          gap: 1rem;
        }
        
        .social-grid a {
          flex: 1;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: white;
          text-align: center;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .social-grid a:hover {
          background: rgba(255, 0, 255, 0.1);
          border-color: #ff00ff;
          transform: translateY(-3px);
        }
        
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .hero-title {
            font-size: 2rem;
          }
          
          .form-card {
            padding: 1.5rem;
          }
          
          .social-grid {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;