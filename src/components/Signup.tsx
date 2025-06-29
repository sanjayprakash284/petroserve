import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CompanyIcon from './CompanyIcon';

const Signup: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, just show success message
      setMessage('Signup successful! You can now log in with demo@petroserve.com / demo123');
      
      // Clear form
      setForm({ name: '', email: '', password: '', phone: '' });
      
    } catch (err: any) {
      setMessage('Signup failed');
    }
  };

  return (
    <div style={{ maxWidth: 350, margin: '3rem auto', padding: 24, boxShadow: '0 2px 8px #eee', borderRadius: 8, background: '#fff', textAlign: 'center' }}>
      <CompanyIcon />
      <h2 style={{ margin: '1rem 0' }}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} style={{ width: '100%', padding: 8, margin: '8px 0', borderRadius: 4, border: '1px solid #ccc' }} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ width: '100%', padding: 8, margin: '8px 0', borderRadius: 4, border: '1px solid #ccc' }} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={{ width: '100%', padding: 8, margin: '8px 0', borderRadius: 4, border: '1px solid #ccc' }} required />
        <input name="phone" type="text" placeholder="Phone" value={form.phone} onChange={handleChange} style={{ width: '100%', padding: 8, margin: '8px 0', borderRadius: 4, border: '1px solid #ccc' }} required />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, marginTop: 12, fontWeight: 600 }}>Sign Up</button>
      </form>
      <p style={{ marginTop: 16 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      {message && <div style={{ marginTop: 16, color: message.includes('success') ? 'green' : 'red' }}>{message}</div>}
    </div>
  );
};

export default Signup; 