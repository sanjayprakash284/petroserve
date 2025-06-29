import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyIcon from './CompanyIcon';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface TrackOrderProps {
  user?: User;
}

interface DeliveryOrder {
  id: string;
  orderId: string;
  serviceType: 'Fuel' | 'Mechanic';
  status: 'Confirmed' | 'Assigned' | 'On the Way' | 'Arrived' | 'Completed';
  eta: string;
  actualETA: number; // minutes
  orderSummary: {
    fuelType?: string;
    quantity?: number;
    mechanicService?: string;
    price: number;
  };
  agent: {
    name: string;
    phone: string;
    profilePic: string;
    rating: number;
    vehicleNumber?: string;
  };
  location: {
    current: { lat: number; lng: number };
    destination: { lat: number; lng: number };
    address: string;
  };
  placedAt: string;
  notifications: boolean;
}

const TrackOrder: React.FC<TrackOrderProps> = ({ user }) => {
  const navigate = useNavigate();
  
  // Mock delivery data - in real app this would come from API
  const [deliveryOrder] = useState<DeliveryOrder>({
    id: 'DEL-2024-001',
    orderId: 'ORD-2024-001',
    serviceType: 'Fuel',
    status: 'On the Way',
    eta: 'Arriving in 8 mins',
    actualETA: 8,
    orderSummary: {
      fuelType: 'Petrol',
      quantity: 25,
      price: 2387.50
    },
    agent: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      profilePic: '👨‍🔧',
      rating: 4.8,
      vehicleNumber: 'DL 01 FU 1234'
    },
    location: {
      current: { lat: 28.5355, lng: 77.3910 },
      destination: { lat: 28.5421, lng: 77.3899 },
      address: 'Sector 15, Gurgaon, Haryana'
    },
    placedAt: '2024-01-20 14:30',
    notifications: true
  });

  const [notifications, setNotifications] = useState(deliveryOrder.notifications);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  // Update current time for real-time display
  useEffect(() => {
    const timer = setInterval(() => {
      // Force component re-render for live updates
      setNotifications(prev => prev);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBackToServices = () => {
    navigate('/services');
  };

  const handleCallAgent = () => {
    window.open(`tel:${deliveryOrder.agent.phone}`, '_self');
  };

  const handleWhatsAppAgent = () => {
    const message = `Hi ${deliveryOrder.agent.name}, I'm tracking my delivery order ${deliveryOrder.orderId}. Can you provide an update?`;
    window.open(`https://wa.me/${deliveryOrder.agent.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmergencySupport = () => {
    window.open('tel:+911234567890', '_self');
  };

  const handleCancelOrder = () => {
    if (deliveryOrder.status === 'Confirmed' || deliveryOrder.status === 'Assigned') {
      alert('Order cancelled successfully. Refund will be processed within 24 hours.');
      navigate('/dashboard');
    } else {
      alert('Order cannot be cancelled as the agent is already on the way.');
    }
    setShowCancelDialog(false);
  };

  const handleChangeLocation = () => {
    alert('Please call our support team to change the delivery location.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return '#2196f3';
      case 'Assigned': return '#ff9800';
      case 'On the Way': return '#4caf50';
      case 'Arrived': return '#9c27b0';
      case 'Completed': return '#4caf50';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed': return '✅';
      case 'Assigned': return '👨‍💼';
      case 'On the Way': return '🚛';
      case 'Arrived': return '📍';
      case 'Completed': return '🎉';
      default: return '❓';
    }
  };

  const progressSteps = [
    { 
      id: 1, 
      label: 'Order Confirmed', 
      completed: true,
      icon: '✓'
    },
    { 
      id: 2, 
      label: 'Assigned', 
      completed: !['Confirmed'].includes(deliveryOrder.status),
      icon: '✓'
    },
    { 
      id: 3, 
      label: 'En Route', 
      completed: ['On the Way', 'Arrived', 'Completed'].includes(deliveryOrder.status),
      icon: deliveryOrder.status === 'On the Way' ? '🚛' : '✓'
    },
    { 
      id: 4, 
      label: deliveryOrder.serviceType === 'Fuel' ? 'Delivered' : 'Completed', 
      completed: deliveryOrder.status === 'Completed',
      icon: deliveryOrder.status === 'Completed' ? '✓' : '○'
    }
  ];

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
                color: '#9c27b0', 
                fontSize: '2rem',
                fontWeight: '600'
              }}>
                🚚 Track Your Delivery
              </h1>
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                color: '#666',
                fontSize: '1rem'
              }}>
                Order ID: {deliveryOrder.orderId} • Real-time tracking
              </p>
            </div>
          </div>
          
          <button
            onClick={handleBackToServices}
            style={{
              background: 'transparent',
              color: '#9c27b0',
              border: '2px solid #9c27b0',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#9c27b0';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#9c27b0';
            }}
          >
            ← Back to Services
          </button>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '2rem' 
      }}>
        
        {/* Left Column - Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* 2. Live Delivery Status Card */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <h2 style={{ 
                margin: 0, 
                color: '#333',
                fontSize: '1.5rem',
                fontWeight: '600'
              }}>
                📍 Live Delivery Status
              </h2>
              <div style={{
                background: getStatusColor(deliveryOrder.status),
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {getStatusIcon(deliveryOrder.status)} {deliveryOrder.status}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#4caf50', marginBottom: '0.25rem' }}>
                    {deliveryOrder.eta}
                  </div>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    ⏰ Estimated Arrival Time
                  </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {deliveryOrder.serviceType === 'Fuel' ? '⛽' : '🔧'} Service Type: {deliveryOrder.serviceType}
                  </div>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    📍 Location: {deliveryOrder.location.address}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ 
                  background: '#f8f9fa', 
                  padding: '1rem', 
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
                    🧾 Order Summary
                  </div>
                  {deliveryOrder.serviceType === 'Fuel' ? (
                    <div>
                      <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>
                        Fuel Type: {deliveryOrder.orderSummary.fuelType}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>
                        Quantity: {deliveryOrder.orderSummary.quantity}L
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.25rem' }}>
                      Service: {deliveryOrder.orderSummary.mechanicService}
                    </div>
                  )}
                  <div style={{ fontWeight: '600', color: '#2e7d32', fontSize: '1.1rem' }}>
                    Total: ₹{deliveryOrder.orderSummary.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Info */}
            <div style={{ 
              background: '#f1f8e9', 
              padding: '1.5rem', 
              borderRadius: '12px',
              border: '2px solid #4caf50'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    fontSize: '3rem',
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    background: '#4caf50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {deliveryOrder.agent.profilePic}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '1.2rem', color: '#2e7d32', marginBottom: '0.25rem' }}>
                      {deliveryOrder.agent.name}
                    </div>
                    <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      📞 {deliveryOrder.agent.phone}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#666', fontSize: '0.9rem' }}>
                        ⭐ {deliveryOrder.agent.rating}/5
                      </span>
                      {deliveryOrder.agent.vehicleNumber && (
                        <span style={{ color: '#666', fontSize: '0.9rem' }}>
                          • 🚛 {deliveryOrder.agent.vehicleNumber}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleCallAgent}
                  style={{
                    background: '#4caf50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#45a049'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#4caf50'}
                >
                  📞 Call Agent
                </button>
              </div>
            </div>
          </div>

          {/* 3. Map with Real-Time Tracking - Chennai City */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h3 style={{ color: '#333', margin: '0 0 1rem 0', fontSize: '1.3rem' }}>
              🗺️ Live Tracking - Chennai City
            </h3>
            
            <div style={{
              background: '#f5f5f5',
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              padding: '1rem',
              position: 'relative',
              minHeight: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Roboto, Arial, sans-serif'
            }}>
              {/* Google Maps Style Chennai Map */}
              <svg
                viewBox="0 0 600 450"
                style={{ 
                  width: '100%', 
                  maxWidth: '500px', 
                  height: 'auto',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px'
                }}
              >
                {/* Background Grid (Google Maps style) */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e8e8e8" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Water Bodies - Google Maps Blue */}
                <path
                  d="M450 150 Q500 160 550 180 Q580 200 590 250 Q585 300 560 320 Q520 330 480 325"
                  fill="#aadaff"
                  stroke="#66c2ff"
                  strokeWidth="1"
                />
                <text x="520" y="240" fontSize="10" fill="#0066cc" fontWeight="500">Bay of Bengal</text>
                
                {/* Parks and Green Areas */}
                <circle cx="240" cy="160" r="25" fill="#c8e6c9" stroke="#81c784" strokeWidth="1" />
                <text x="235" y="165" fontSize="8" fill="#2e7d32">Semmozhi Poonga</text>
                
                <rect x="140" y="120" width="40" height="30" fill="#c8e6c9" stroke="#81c784" strokeWidth="1" />
                <text x="150" y="140" fontSize="8" fill="#2e7d32">Anna Nagar Park</text>
                
                {/* Major Roads - Google Maps style */}
                {/* National Highway */}
                <path
                  d="M50 280 Q150 285 250 290 Q350 295 450 300 Q550 305 580 310"
                  fill="none"
                  stroke="#ffb74d"
                  strokeWidth="6"
                />
                <path
                  d="M50 280 Q150 285 250 290 Q350 295 450 300 Q550 305 580 310"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeDasharray="10,5"
                />
                <text x="250" y="310" fontSize="9" fill="#e65100" fontWeight="500">GST Road (NH-45)</text>
                
                {/* OMR */}
                <path
                  d="M280 200 Q320 220 360 240 Q400 260 440 280 Q480 300 520 320"
                  fill="none"
                  stroke="#ffb74d"
                  strokeWidth="5"
                />
                <text x="380" y="275" fontSize="9" fill="#e65100" fontWeight="500">OMR (IT Expressway)</text>
                
                {/* ECR */}
                <path
                  d="M320 200 Q360 210 400 220 Q440 230 480 240 Q520 250 560 260"
                  fill="none"
                  stroke="#ffb74d"
                  strokeWidth="4"
                />
                <text x="440" y="255" fontSize="8" fill="#e65100" fontWeight="500">ECR</text>
                
                {/* Chennai Specific Pickup & Drop Locations */}
                
                {/* PICKUP LOCATION - T. Nagar (Fuel Station) */}
                <g>
                  <circle cx="200" cy="180" r="12" fill="#34a853" stroke="#ffffff" strokeWidth="3" />
                  <text x="205" y="186" fontSize="12" fill="#fff" fontWeight="bold">P</text>
                  <rect x="180" y="195" width="40" height="16" fill="#ffffff" stroke="#34a853" strokeWidth="1" rx="3" />
                  <text x="185" y="206" fontSize="8" fill="#34a853" fontWeight="600">PICKUP</text>
                  <text x="170" y="220" fontSize="10" fill="#333" fontWeight="600">T. Nagar Fuel Hub</text>
                  <text x="170" y="232" fontSize="8" fill="#666">Pondy Bazaar, T. Nagar</text>
                </g>
                
                {/* DROP LOCATION - Adyar (Customer Location) */}
                <g>
                  <circle cx="320" cy="240" r="12" fill="#ea4335" stroke="#ffffff" strokeWidth="3">
                    <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text x="325" y="246" fontSize="12" fill="#fff" fontWeight="bold">D</text>
                  <rect x="300" y="255" width="40" height="16" fill="#ffffff" stroke="#ea4335" strokeWidth="1" rx="3" />
                  <text x="315" y="266" fontSize="8" fill="#ea4335" fontWeight="600">DROP</text>
                  <text x="290" y="280" fontSize="10" fill="#333" fontWeight="600">Adyar Residence</text>
                  <text x="290" y="292" fontSize="8" fill="#666">Besant Nagar, Adyar</text>
                </g>
                
                {/* Delivery Vehicle (Google Maps style) */}
                <g>
                  <circle cx="200" cy="180" r="8" fill="#1976d2" stroke="#ffffff" strokeWidth="2">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0; 30,15; 60,30; 90,45; 120,60; 90,45; 60,30; 30,15; 0,0"
                      dur="12s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text x="203" y="184" fontSize="8" fill="#fff">🚛</text>
                </g>
                
                {/* Route Path (Google Maps blue route) */}
                <path
                  d="M200 180 Q220 190 240 200 Q260 210 280 220 Q300 230 320 240"
                  fill="none"
                  stroke="#1976d2"
                  strokeWidth="5"
                  strokeOpacity="0.8"
                  strokeLinecap="round"
                />
                <path
                  d="M200 180 Q220 190 240 200 Q260 210 280 220 Q300 230 320 240"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeDasharray="6,4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;-10"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </path>
                
                {/* Chennai Areas (Google Maps POI style) */}
                
                {/* Anna Nagar */}
                <circle cx="160" cy="140" r="4" fill="#757575" />
                <text x="170" y="145" fontSize="9" fill="#333" fontWeight="500">Anna Nagar</text>
                
                {/* Velachery */}
                <circle cx="220" cy="300" r="4" fill="#757575" />
                <text x="230" y="305" fontSize="9" fill="#333" fontWeight="500">Velachery</text>
                
                {/* Porur */}
                <circle cx="120" cy="160" r="4" fill="#757575" />
                <text x="130" y="165" fontSize="9" fill="#333" fontWeight="500">Porur</text>
                
                {/* Tambaram */}
                <circle cx="180" cy="350" r="4" fill="#757575" />
                <text x="190" y="355" fontSize="9" fill="#333" fontWeight="500">Tambaram</text>
                
                {/* Airport */}
                <rect x="95" y="195" width="20" height="15" fill="#9c27b0" rx="2" />
                <text x="100" y="205" fontSize="10" fill="#fff">✈️</text>
                <text x="120" y="205" fontSize="9" fill="#333" fontWeight="500">Chennai Airport</text>
                
                {/* Central Railway */}
                <rect x="235" y="155" width="15" height="12" fill="#795548" rx="2" />
                <text x="240" y="163" fontSize="8" fill="#fff">🚂</text>
                <text x="255" y="165" fontSize="9" fill="#333" fontWeight="500">Central</text>
                
                {/* Marina Beach */}
                <rect x="460" y="170" width="60" height="12" fill="#03a9f4" rx="6" />
                <text x="485" y="180" fontSize="9" fill="#fff" fontWeight="500">Marina Beach</text>
                
                {/* Fuel Stations along route */}
                <circle cx="180" cy="200" r="5" fill="#ff9800" stroke="#fff" strokeWidth="1" />
                <text x="160" y="215" fontSize="7" fill="#e65100">⛽ HP Petrol</text>
                
                <circle cx="260" cy="220" r="5" fill="#ff9800" stroke="#fff" strokeWidth="1" />
                <text x="240" y="235" fontSize="7" fill="#e65100">⛽ IOC Station</text>
                
                {/* Traffic Light */}
                <rect x="248" y="198" width="4" height="8" fill="#ff5722" rx="1">
                  <animate attributeName="fill" values="#ff5722;#ffeb3b;#4caf50;#ff5722" dur="4s" repeatCount="indefinite" />
                </rect>
                <text x="255" y="205" fontSize="7" fill="#666">Traffic Signal</text>
                
                {/* Distance Markers */}
                <text x="20" y="30" fontSize="10" fill="#1976d2" fontWeight="600">
                  📍 Route: T. Nagar → Adyar
                </text>
                <text x="20" y="45" fontSize="9" fill="#666">
                  Distance: 8.2 km • Est. Time: 22 mins
                </text>
                <text x="20" y="60" fontSize="9" fill="#666">
                  Via: Khader Nawaz Khan Rd
                </text>
              </svg>
              
              {/* Google Maps Style Tracking Info */}
              <div style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: '#ffffff',
                padding: '12px',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                fontSize: '12px',
                maxWidth: '220px',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{ fontWeight: '600', marginBottom: '8px', color: '#1976d2', fontSize: '13px' }}>
                  🗺️ Live Tracking
                </div>
                <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#34a853', marginRight: '8px' }}></div>
                  <span style={{ fontSize: '11px', fontWeight: '500' }}>Pickup: T. Nagar Fuel Hub</span>
                </div>
                <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ea4335', marginRight: '8px' }}></div>
                  <span style={{ fontSize: '11px', fontWeight: '500' }}>Drop: Adyar Residence</span>
                </div>
                <div style={{ marginBottom: '6px', fontSize: '11px', color: '#5f6368' }}>
                  <strong>Route:</strong> Khader Nawaz Khan Rd
                </div>
                <div style={{ marginBottom: '6px', fontSize: '11px', color: '#5f6368' }}>
                  <strong>Distance:</strong> 8.2 km • <strong>ETA:</strong> {deliveryOrder.eta}
                </div>
                <div style={{ fontSize: '10px', color: '#ea4335', padding: '4px 8px', background: '#fef7f0', borderRadius: '4px' }}>
                  ⚠️ Heavy traffic at Guindy Junction
                </div>
              </div>
              
              {/* Google Maps Style Status Cards */}
              <div style={{
                position: 'absolute',
                bottom: '15px',
                right: '15px',
                background: '#ffffff',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '500',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{ color: '#34a853', marginBottom: '2px' }}>🚗 Current Speed</div>
                <div style={{ color: '#5f6368' }}>25 km/h (Heavy Traffic)</div>
              </div>
              
              {/* Weather Card */}
              <div style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: '#ffffff',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '500',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{ color: '#1976d2', marginBottom: '2px' }}>🌤️ Chennai Weather</div>
                <div style={{ color: '#5f6368' }}>32°C • Partly Cloudy</div>
              </div>
              
              {/* Agent Info Card */}
              <div style={{
                position: 'absolute',
                bottom: '15px',
                left: '15px',
                background: '#ffffff',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '500',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                border: '1px solid #e0e0e0',
                maxWidth: '140px'
              }}>
                <div style={{ color: '#1976d2', marginBottom: '2px' }}>👨‍💼 Agent: Raj Kumar</div>
                <div style={{ color: '#5f6368', fontSize: '10px' }}>TN-09-AX-1234 • ⭐ 4.8</div>
              </div>
            </div>
            
            {/* Google Maps Style Legend */}
            <div style={{
              marginTop: '1rem',
              padding: '16px',
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '12px', color: '#333', fontSize: '14px' }}>
                Map Legend
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '8px',
                fontSize: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#34a853' }}></div>
                  <span style={{ color: '#5f6368' }}>Pickup Location</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ea4335' }}></div>
                  <span style={{ color: '#5f6368' }}>Drop Location</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#1976d2' }}></div>
                  <span style={{ color: '#5f6368' }}>Delivery Vehicle</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '16px', height: '3px', background: '#1976d2', borderRadius: '2px' }}></div>
                  <span style={{ color: '#5f6368' }}>Delivery Route</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff9800' }}></div>
                  <span style={{ color: '#5f6368' }}>Fuel Stations</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '16px', height: '3px', background: '#ffb74d', borderRadius: '2px' }}></div>
                  <span style={{ color: '#5f6368' }}>Major Highways</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '16px', height: '8px', background: '#aadaff', borderRadius: '2px' }}></div>
                  <span style={{ color: '#5f6368' }}>Water Bodies</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '16px', height: '8px', background: '#c8e6c9', borderRadius: '2px' }}></div>
                  <span style={{ color: '#5f6368' }}>Parks & Green Areas</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Order Timeline Tracker */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h3 style={{ color: '#333', margin: '0 0 2rem 0', fontSize: '1.3rem' }}>
              📋 Order Progress Timeline
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
              {/* Progress Line */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '0',
                right: '0',
                height: '4px',
                background: '#e0e0e0',
                borderRadius: '2px',
                zIndex: 1
              }}>
                <div style={{
                  height: '100%',
                  background: '#4caf50',
                  borderRadius: '2px',
                  width: `${(progressSteps.filter(step => step.completed).length - 1) * 33.33}%`,
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
              
              {progressSteps.map((step, index) => (
                <div key={step.id} style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                  flex: 1
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: step.completed ? '#4caf50' : '#e0e0e0',
                    color: step.completed ? '#fff' : '#999',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '16px',
                    marginBottom: '0.5rem',
                    border: step.completed ? '3px solid #4caf50' : '3px solid #e0e0e0',
                    transition: 'all 0.3s ease'
                  }}>
                    {step.icon}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: step.completed ? '600' : '400',
                    color: step.completed ? '#2e7d32' : '#666',
                    textAlign: 'center'
                  }}>
                    {step.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Actions & Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* 5. Customer Action Buttons */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h3 style={{ color: '#333', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              🎯 Quick Actions
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                onClick={handleCallAgent}
                style={{
                  width: '100%',
                  background: '#4caf50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '1rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#45a049'}
                onMouseOut={(e) => e.currentTarget.style.background = '#4caf50'}
              >
                📞 Call Delivery Agent
              </button>
              
              <button
                onClick={handleWhatsAppAgent}
                style={{
                  width: '100%',
                  background: '#25d366',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '1rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#1eb752'}
                onMouseOut={(e) => e.currentTarget.style.background = '#25d366'}
              >
                💬 Chat / WhatsApp
              </button>
              
              {['Confirmed', 'Assigned'].includes(deliveryOrder.status) && (
                <button
                  onClick={() => setShowCancelDialog(true)}
                  style={{
                    width: '100%',
                    background: '#f44336',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#d32f2f'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#f44336'}
                >
                  ❌ Cancel Order
                </button>
              )}
              
              <button
                onClick={handleChangeLocation}
                style={{
                  width: '100%',
                  background: '#ff9800',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '1rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f57c00'}
                onMouseOut={(e) => e.currentTarget.style.background = '#ff9800'}
              >
                📍 Change Drop Location
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h3 style={{ color: '#333', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              🔔 Notifications
            </h3>
            
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              padding: '1rem',
              background: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                style={{ marginRight: '0.75rem', transform: 'scale(1.2)' }}
              />
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                  Alert me when delivery is 5 mins away
                </div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                  Get notified when your agent is almost there
                </div>
              </div>
            </label>
          </div>

          {/* 6. Help & Safety Tips */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h3 style={{ color: '#333', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              🛡️ Help & Safety Tips
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ 
                background: '#fff3e0', 
                padding: '1rem', 
                borderRadius: '8px',
                border: '1px solid #ff9800',
                marginBottom: '1rem'
              }}>
                <div style={{ fontWeight: '600', color: '#e65100', marginBottom: '0.5rem' }}>
                  📍 Important Reminder
                </div>
                <div style={{ color: '#ef6c00', fontSize: '0.9rem' }}>
                  Make sure you're available at the drop point when the agent arrives.
                </div>
              </div>
              
              <div style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.5' }}>
                • Keep your phone accessible for agent communication<br/>
                • Have exact change ready if paying cash<br/>
                • Ensure safe parking space for delivery vehicle<br/>
                • Check fuel quality before agent leaves (for fuel delivery)
              </div>
            </div>
            
            <button
              onClick={handleEmergencySupport}
              style={{
                width: '100%',
                background: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#d32f2f'}
              onMouseOut={(e) => e.currentTarget.style.background = '#f44336'}
            >
              🚨 Emergency Support
            </button>
          </div>
        </div>
      </div>

      {/* Cancel Order Dialog */}
      {showCancelDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#f44336' }}>
              ❌ Cancel Order
            </h3>
            <p style={{ margin: '0 0 2rem 0', color: '#666' }}>
              Are you sure you want to cancel this order? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setShowCancelDialog(false)}
                style={{
                  flex: 1,
                  background: '#e0e0e0',
                  color: '#333',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Keep Order
              </button>
              <button
                onClick={handleCancelOrder}
                style={{
                  flex: 1,
                  background: '#f44336',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder; 