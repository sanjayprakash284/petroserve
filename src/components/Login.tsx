import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CompanyIcon from './CompanyIcon';

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);
    
    // Demo credentials for testing
    const demoCredentials = [
      { email: 'demo@petroserve.com', password: 'demo123', name: 'Demo User', phone: '+1234567890' },
      { email: 'admin@petroserve.com', password: 'admin123', name: 'Admin User', phone: '+1234567891' },
      { email: 'test@example.com', password: 'test123', name: 'Test User', phone: '+1234567892' }
    ];
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if credentials match any demo account
      const user = demoCredentials.find(cred => 
        cred.email === form.email && cred.password === form.password
      );
      
      if (user) {
        setMessage('Login successful!');
        
        // Store user data in localStorage
        localStorage.setItem('token', 'demo-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify({
          id: Math.random().toString(36).substr(2, 9),
          name: user.name,
          email: user.email,
          phone: user.phone
        }));
        
        // Navigate to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setMessage('Invalid email or password. Try demo@petroserve.com / demo123');
      }
      
    } catch (err: any) {
      setMessage('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: '3rem auto', padding: 32, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', borderRadius: 12, background: '#fff', textAlign: 'center' }}>
      <CompanyIcon />
      <h2 style={{ margin: '1rem 0', color: '#000000', fontWeight: '700' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          value={form.email} 
          onChange={handleChange} 
          style={{ width: '100%', padding: 12, margin: '12px 0', borderRadius: 8, border: '2px solid #e0e0e0', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s ease' }} 
          required 
          disabled={isLoading}
          onFocus={(e) => e.target.style.borderColor = '#00D46A'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          value={form.password} 
          onChange={handleChange} 
          style={{ width: '100%', padding: 12, margin: '12px 0', borderRadius: 8, border: '2px solid #e0e0e0', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s ease' }} 
          required 
          disabled={isLoading}
          onFocus={(e) => e.target.style.borderColor = '#00D46A'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: 14, 
            background: isLoading ? '#ccc' : '#000000', 
            color: '#fff', 
            border: '2px solid #00D46A', 
            borderRadius: 8, 
            marginTop: 16, 
            fontWeight: 600,
            fontSize: '16px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
          disabled={isLoading}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.background = '#00D46A';
              e.currentTarget.style.color = '#000';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.background = '#000000';
              e.currentTarget.style.color = '#fff';
            }
          }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: 16, color: '#666' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#00D46A', textDecoration: 'none', fontWeight: '600' }}>Sign up</Link>
      </p>
      {message && (
        <div style={{ 
          marginTop: 16, 
          color: message.includes('success') ? '#00D46A' : '#ff4757',
          fontWeight: message.includes('success') ? '600' : 'normal',
          padding: '8px 12px',
          borderRadius: '6px',
          background: message.includes('success') ? 'rgba(0, 212, 106, 0.1)' : 'rgba(255, 71, 87, 0.1)'
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Login; 