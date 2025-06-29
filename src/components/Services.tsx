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

interface ServicesProps {
  user?: User;
}

const Services: React.FC<ServicesProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleOrderFuel = () => {
    navigate('/order-fuel');
  };

  const handleBookMechanic = () => {
    navigate('/book-mechanic');
  };

  const handleServiceHistory = () => {
    navigate('/service-history');
  };

  const handleTrackDelivery = () => {
    navigate('/track-order');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleWhyChoose = () => {
    navigate('/why-choose');
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
                color: '#000000', 
                fontSize: '2rem',
                fontWeight: '600'
              }}>
                Our Services
              </h1>
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                color: '#666',
                fontSize: '1rem'
              }}>
                {user ? `Choose a service, ${user.name}` : 'Choose the service you need'}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleBackToDashboard}
            style={{
              background: 'transparent',
              color: '#000000',
              border: '2px solid #00D46A',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#00D46A';
              e.currentTarget.style.color = '#000';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#000000';
            }}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Quick Service Buttons */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem'
      }}>
        
        {/* Order Fuel */}
        <div 
          onClick={handleOrderFuel}
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '2px solid transparent',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 212, 106, 0.2)';
            e.currentTarget.style.borderColor = '#00D46A';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #000000, #00D46A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            ⛽
          </div>
          <h3 style={{ 
            color: '#000000', 
            margin: '0 0 1rem 0',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            Order Fuel
          </h3>
          <p style={{ 
            color: '#666', 
            margin: 0,
            fontSize: '1rem',
            lineHeight: '1.5'
          }}>
            Get fuel delivered directly to your location. Fast, reliable, and convenient.
          </p>
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            color: '#00D46A',
            fontSize: '1.5rem',
            opacity: 0.7
          }}>
            →
          </div>
        </div>

        {/* Book a Mechanic */}
        <div 
          onClick={handleBookMechanic}
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '2px solid transparent',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 212, 106, 0.2)';
            e.currentTarget.style.borderColor = '#00D46A';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #000000, #00D46A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🔧
          </div>
          <h3 style={{ 
            color: '#000000', 
            margin: '0 0 1rem 0',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            Book a Mechanic
          </h3>
          <p style={{ 
            color: '#666', 
            margin: 0,
            fontSize: '1rem',
            lineHeight: '1.5'
          }}>
            Schedule professional vehicle maintenance and repair services at your convenience.
          </p>
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            color: '#00D46A',
            fontSize: '1.5rem',
            opacity: 0.7
          }}>
            →
          </div>
        </div>

        {/* Service History */}
        <div 
          onClick={handleServiceHistory}
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '2px solid transparent',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 152, 0, 0.2)';
            e.currentTarget.style.borderColor = '#ff9800';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #000000, #00D46A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🛠
          </div>
          <h3 style={{ 
            color: '#000000', 
            margin: '0 0 1rem 0',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            Service History
          </h3>
          <p style={{ 
            color: '#666', 
            margin: 0,
            fontSize: '1rem',
            lineHeight: '1.5'
          }}>
            View your complete service history, invoices, and maintenance records.
          </p>
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            color: '#ff9800',
            fontSize: '1.5rem',
            opacity: 0.3
          }}>
            →
          </div>
        </div>

        {/* Track Delivery */}
        <div 
          onClick={handleTrackDelivery}
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '2px solid transparent',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(156, 39, 176, 0.2)';
            e.currentTarget.style.borderColor = '#9c27b0';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <div style={{ 
            fontSize: '4rem', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #000000, #00D46A)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            📍
          </div>
          <h3 style={{ 
            color: '#000000', 
            margin: '0 0 1rem 0',
            fontSize: '1.5rem',
            fontWeight: '700'
          }}>
            Track Delivery
          </h3>
          <p style={{ 
            color: '#666', 
            margin: 0,
            fontSize: '1rem',
            lineHeight: '1.5'
          }}>
            Real-time tracking of your fuel delivery and service appointments.
          </p>
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            color: '#9c27b0',
            fontSize: '1.5rem',
            opacity: 0.3
          }}>
            →
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '3rem auto 0',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          color: '#333', 
          margin: '0 0 1rem 0',
          fontSize: '1.5rem'
        }}>
          Need Help?
        </h2>
        <p style={{ 
          color: '#666', 
          margin: '0 0 1.5rem 0',
          fontSize: '1rem'
        }}>
          Our customer support team is available 24/7 to assist you with any questions.
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button style={{
            background: '#000000',
            color: '#fff',
            border: '2px solid #00D46A',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#00D46A';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#000000';
            e.currentTarget.style.color = '#fff';
          }}>
            📞 Call Support
          </button>
          <button style={{
            background: 'transparent',
            color: '#000000',
            border: '2px solid #000000',
            borderRadius: '8px',
            padding: '10px 22px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#000000';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#000000';
          }}>
            💬 Live Chat
          </button>
          <button 
            onClick={handleWhyChoose}
            style={{
              background: '#00D46A',
              color: '#000',
              border: '2px solid #00D46A',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000';
              e.currentTarget.style.color = '#00D46A';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#00D46A';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ⭐ Why Choose Us?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services; 