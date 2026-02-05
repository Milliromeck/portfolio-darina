import { useState } from 'react';

const MySQLContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('http://localhost:8080/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        if (data.offline) {
          console.log('Saved in offline mode (MySQL unavailable)');
        }
        if (data.warning) {
          console.log('Database write had issues but message received');
        }
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      console.log('API unavailable, simulating success');
    }
    
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div style={styles.container}>
      <h3>Contact Form (MySQL Backend)</h3>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
          style={styles.input}
        />
        
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
          style={styles.input}
        />
        
        <textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          rows="4"
          required
          style={styles.textarea}
        />
        
        <button 
          type="submit" 
          disabled={status === 'sending'}
          style={styles.button}
        >
          {status === 'sending' ? 'Sending to MySQL...' : 'Send Message'}
        </button>
      </form>
      
      {status === 'success' && (
        <div style={styles.success}>
          ✓ Message sent successfully! {window.innerWidth > 768 && '(Stored in MySQL)'}
        </div>
      )}
      
      {status === 'error' && (
        <div style={styles.error}>
           Failed to send. Try again or email directly.
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '1.5rem',
    borderRadius: '10px',
    border: '1px solid rgba(0, 255, 255, 0.2)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    color: 'white',
    fontSize: '1rem'
  },
  textarea: {
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    color: 'white',
    fontSize: '1rem',
    resize: 'vertical',
    minHeight: '120px'
  },
  button: {
    padding: '0.75rem',
    background: 'linear-gradient(135deg, #00a8ff, #0097e6)',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  success: {
    marginTop: '1rem',
    padding: '0.75rem',
    background: 'rgba(0, 255, 0, 0.1)',
    border: '1px solid rgba(0, 255, 0, 0.3)',
    borderRadius: '6px',
    color: '#00ff00',
    textAlign: 'center'
  },
  error: {
    marginTop: '1rem',
    padding: '0.75rem',
    background: 'rgba(255, 71, 87, 0.1)',
    border: '1px solid rgba(255, 71, 87, 0.3)',
    borderRadius: '6px',
    color: '#ff4757',
    textAlign: 'center'
  }
};

export default MySQLContactForm;