import React from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyIcon from './CompanyIcon';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const navigate = useNavigate();

  // Mock last order data - in a real app this would come from an API
  const lastOrder = {
    id: '#ORD-2025-001',
    service: 'Premium Fuel Delivery',
    date: '2025-06-25',
    amount: '$89.50',
    status: 'Delivered',
    location: '123 Main Street, Downtown'
  };

  const handleNewOrder = () => {
    navigate('/services');
  };

  const handleViewServices = () => {
    navigate('/services');
  };

  const handleOrderHistory = () => {
    // Navigate to order history page
    console.log('Navigate to order history');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5', 
      padding: '2rem 1rem' 
    }}>
      {/* Header */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <CompanyIcon />
            <div>
              <h1 style={{ 
                margin: 0, 
                color: '#1976d2', 
                fontSize: '2rem',
                fontWeight: '600'
              }}>
                Welcome back, {user.name}!
              </h1>
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                color: '#666',
                fontSize: '1rem'
              }}>
                Ready for your next fuel delivery?
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleViewServices}
              style={{
                background: 'transparent',
                color: '#1976d2',
                border: '2px solid #1976d2',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#1976d2';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1976d2';
              }}
            >
              View Services
            </button>
            
            <button
              onClick={handleNewOrder}
              style={{
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#1565c0'}
              onMouseOut={(e) => e.currentTarget.style.background = '#1976d2'}
            >
              New Order
            </button>
          </div>
        </div>
      </div>

      {/* Last Order Summary */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        padding: '2rem'
      }}>
        <h2 style={{ 
          margin: '0 0 1.5rem 0', 
          color: '#333',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>
          Recent Activity
        </h2>
        
        {lastOrder ? (
          <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '1.5rem',
            backgroundColor: '#fafafa'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h3 style={{ 
                  margin: '0 0 0.5rem 0', 
                  color: '#1976d2',
                  fontSize: '1.2rem'
                }}>
                  {lastOrder.service}
                </h3>
                <p style={{ margin: '0.25rem 0', color: '#666' }}>
                  <strong>Order ID:</strong> {lastOrder.id}
                </p>
                <p style={{ margin: '0.25rem 0', color: '#666' }}>
                  <strong>Date:</strong> {new Date(lastOrder.date).toLocaleDateString()}
                </p>
                <p style={{ margin: '0.25rem 0', color: '#666' }}>
                  <strong>Location:</strong> {lastOrder.location}
                </p>
                <p style={{ margin: '0.25rem 0', color: '#666' }}>
                  <strong>Amount:</strong> {lastOrder.amount}
                </p>
              </div>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-end',
                gap: '0.5rem'
              }}>
                <span style={{
                  background: '#4caf50',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {lastOrder.status}
                </span>
                
                <button
                  onClick={handleOrderHistory}
                  style={{
                    background: 'transparent',
                    color: '#1976d2',
                    border: '1px solid #1976d2',
                    borderRadius: '6px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}
                >
                  View All Orders
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#666'
          }}>
            <p style={{ fontSize: '1.1rem', margin: '0 0 1rem 0' }}>
              No recent orders found
            </p>
            <button
              onClick={handleNewOrder}
              style={{
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Place Your First Order
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '2rem auto 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem'
      }}>
        <div 
          onClick={handleViewServices}
          style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
        >
          <h3 style={{ color: '#1976d2', margin: '0 0 0.5rem 0' }}>🚀 View All Services</h3>
          <p style={{ color: '#666', margin: 0 }}>Explore our complete range of services</p>
        </div>
        
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
          cursor: 'pointer'
        }}>
          <h3 style={{ color: '#1976d2', margin: '0 0 0.5rem 0' }}>⚙️ Account Settings</h3>
          <p style={{ color: '#666', margin: 0 }}>Manage your profile and preferences</p>
        </div>
        
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
          cursor: 'pointer'
        }}>
          <h3 style={{ color: '#1976d2', margin: '0 0 0.5rem 0' }}>💬 Support</h3>
          <p style={{ color: '#666', margin: 0 }}>Get help and contact support</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 