import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Welcome, Login, Signup, CompanyIcon, Dashboard, Services, TrackOrder, OrderFuel, BookMechanic, ServiceHistory, WhyChoose } from './components';
import './App.css';

function App() {
  // Component to handle Dashboard with user data
  const DashboardWrapper = () => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    if (!user) {
      // If no user data, redirect to login
      window.location.href = '/login';
      return null;
    }
    
    return <Dashboard user={user} />;
  };

  // Component to handle Services with user data
  const ServicesWrapper = () => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    if (!user) {
      // If no user data, redirect to login
      window.location.href = '/login';
      return null;
    }
    
    return <Services user={user} />;
  };

  // Component to handle TrackOrder with user data
  const TrackOrderWrapper = () => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    if (!user) {
      // If no user data, redirect to login
      window.location.href = '/login';
      return null;
    }
    
    return <TrackOrder user={user} />;
  };

  // Component to handle OrderFuel with user data
  const OrderFuelWrapper = () => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    if (!user) {
      // If no user data, redirect to login
      window.location.href = '/login';
      return null;
    }
    
    return <OrderFuel user={user} />;
  };

  // Component to handle BookMechanic with user data
  const BookMechanicWrapper = () => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    if (!user) {
      // If no user data, redirect to login
      window.location.href = '/login';
      return null;
    }
    
    return <BookMechanic user={user} />;
  };

  // Component to handle ServiceHistory with user data
  const ServiceHistoryWrapper = () => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    if (!user) {
      // If no user data, redirect to login
      window.location.href = '/login';
      return null;
    }
    
    return <ServiceHistory user={user} />;
  };

  // Component to handle WhyChoose with navigation function
  const WhyChooseWrapper = () => {
    const handleNavigate = (page: string) => {
      window.location.href = `/${page}`;
    };
    
    return <WhyChoose onNavigate={handleNavigate} />;
  };

  return (
    <div style={{
      background: 'linear-gradient(to bottom, #f8f8f8, #ffffff)', /* Uber-style subtle gray gradient */
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      /* Removed backgroundAttachment: 'fixed', */
    }}>
      <Router>
        <nav style={{ display: 'flex', alignItems: 'center', padding: '1rem', background: '#ffffff', marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <CompanyIcon />
          <span style={{ fontWeight: 700, fontSize: 22, marginLeft: 12, color: '#000000', flex: 1 }}>PetroServe</span>
          <Link to="/login" style={{ marginRight: 16, color: '#000000', textDecoration: 'none', fontWeight: 500, padding: '8px 16px', borderRadius: '8px', transition: 'all 0.2s ease' }}>Login</Link>
          <Link to="/signup" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500, background: '#00D46A', padding: '8px 16px', borderRadius: '8px', transition: 'all 0.2s ease' }}>Sign Up</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<DashboardWrapper />} />
          <Route path="/services" element={<ServicesWrapper />} />
          <Route path="/track-order" element={<TrackOrderWrapper />} />
          <Route path="/order-fuel" element={<OrderFuelWrapper />} />
          <Route path="/book-mechanic" element={<BookMechanicWrapper />} />
          <Route path="/service-history" element={<ServiceHistoryWrapper />} />
          <Route path="/why-choose" element={<WhyChooseWrapper />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
