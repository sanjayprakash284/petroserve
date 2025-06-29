import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyIcon from './CompanyIcon';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface BookMechanicProps {
  user?: User;
}

interface VehicleInfo {
  type: string;
  modelYear: string;
  registrationNumber: string;
}

interface ServiceLocation {
  useCurrentLocation: boolean;
  addressLine: string;
  landmark: string;
  pincode: string;
}

const BookMechanic: React.FC<BookMechanicProps> = ({ user }) => {
  const navigate = useNavigate();
  
  // Form states
  const [selectedService, setSelectedService] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
    type: 'Car',
    modelYear: '',
    registrationNumber: ''
  });
  
  const [problemDescription, setProblemDescription] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [serviceLocation, setServiceLocation] = useState<ServiceLocation>({
    useCurrentLocation: true,
    addressLine: '',
    landmark: '',
    pincode: ''
  });
  
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('ASAP');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash After Service');
  const [expandedPastRequests, setExpandedPastRequests] = useState(false);

  // Service types with icons and descriptions
  const serviceTypes = [
    { id: 'general', icon: '🧰', title: 'General Service', desc: 'Regular maintenance and check-up' },
    { id: 'battery', icon: '🔋', title: 'Battery Issue', desc: 'Battery replacement or jump start' },
    { id: 'tire', icon: '🛞', title: 'Tire / Puncture', desc: 'Tire repair or replacement' },
    { id: 'breakdown', icon: '🛠', title: 'Breakdown / Emergency', desc: 'Vehicle breakdown assistance' },
    { id: 'carwash', icon: '🧼', title: 'Car Wash / Detailing', desc: 'Professional cleaning service' },
    { id: 'custom', icon: '📦', title: 'Custom Request', desc: 'Special service requirements' }
  ];

  const vehicleTypes = ['Car', 'Bike', 'Truck'];
  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM'
  ];

  // Mock past requests
  const pastRequests = [
    { id: 1, service: 'Battery Issue', date: '2024-01-15', status: 'Completed', rating: 5, cost: '₹450' },
    { id: 2, service: 'Tire Puncture', date: '2024-01-08', status: 'Completed', rating: 4, cost: '₹150' },
    { id: 3, service: 'General Service', date: '2023-12-20', status: 'Completed', rating: 5, cost: '₹800' }
  ];

  const handleBackToServices = () => {
    navigate('/services');
  };

  const handleBookMechanic = () => {
    console.log('Mechanic booking confirmed');
    navigate('/track-order');
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location:', position.coords.latitude, position.coords.longitude);
          alert('Location detected!');
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get location. Please enter address manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedPhoto(file);
    }
  };

  const getEstimatedCost = () => {
    const costs: { [key: string]: string } = {
      'general': '₹500 - ₹1,500',
      'battery': '₹300 - ₹800',
      'tire': '₹100 - ₹500',
      'breakdown': '₹200 - ₹1,000',
      'carwash': '₹150 - ₹400',
      'custom': 'To be determined'
    };
    return costs[selectedService] || 'Our mechanic will diagnose and provide an estimate.';
  };

  const handleEmergencyCall = () => {
    window.open('tel:+911234567890', '_self');
  };

  const handleWhatsAppSupport = () => {
    window.open('https://wa.me/911234567890?text=Emergency%20mechanic%20needed!', '_blank');
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
                color: '#4caf50', 
                fontSize: '2rem',
                fontWeight: '600'
              }}>
                🔧 Book a Mechanic
              </h1>
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                color: '#666',
                fontSize: '1rem'
              }}>
                Professional automotive service at your location
              </p>
            </div>
          </div>
          
          <button
            onClick={handleBackToServices}
            style={{
              background: 'transparent',
              color: '#4caf50',
              border: '2px solid #4caf50',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#4caf50';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#4caf50';
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
        gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', 
        gap: '2rem' 
      }}>
        
        {/* Left Column - Form Components */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* 1. Service Type Selector */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#4caf50', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              🛠️ Select Service Type
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {serviceTypes.map(service => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  style={{
                    padding: '1rem',
                    border: selectedService === service.id ? '2px solid #4caf50' : '2px solid #e0e0e0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    background: selectedService === service.id ? '#f1f8e9' : '#fff'
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{service.icon}</div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: '#333' }}>
                    {service.title}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    {service.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Vehicle Information */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#4caf50', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              🚗 Vehicle Information
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Vehicle Type
                </label>
                <select
                  value={vehicleInfo.type}
                  onChange={(e) => setVehicleInfo({...vehicleInfo, type: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                >
                  {vehicleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Model & Year
                </label>
                <input
                  type="text"
                  value={vehicleInfo.modelYear}
                  onChange={(e) => setVehicleInfo({...vehicleInfo, modelYear: e.target.value})}
                  placeholder="e.g., Honda City 2020"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Registration Number
                </label>
                <input
                  type="text"
                  value={vehicleInfo.registrationNumber}
                  onChange={(e) => setVehicleInfo({...vehicleInfo, registrationNumber: e.target.value})}
                  placeholder="e.g., MH 01 AB 1234"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                />
              </div>
            </div>
          </div>

          {/* 3. Problem Description */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#4caf50', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              📝 Problem Description
            </h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                Describe the issue
              </label>
              <textarea
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Please describe the problem you're experiencing with your vehicle..."
                rows={4}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd', 
                  borderRadius: '6px',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                Upload Photo (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  border: '1px solid #ddd', 
                  borderRadius: '6px',
                  backgroundColor: '#f9f9f9'
                }}
              />
              {uploadedPhoto && (
                <div style={{ marginTop: '0.5rem', color: '#4caf50', fontSize: '0.9rem' }}>
                  ✅ Photo uploaded: {uploadedPhoto.name}
                </div>
              )}
            </div>
          </div>

          {/* 4. Choose Location */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#4caf50', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              📍 Service Location
            </h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '1rem' }}>
                <input
                  type="checkbox"
                  checked={serviceLocation.useCurrentLocation}
                  onChange={(e) => setServiceLocation({...serviceLocation, useCurrentLocation: e.target.checked})}
                  style={{ marginRight: '0.5rem' }}
                />
                Use current location (GPS)
                {serviceLocation.useCurrentLocation && (
                  <button
                    onClick={getCurrentLocation}
                    style={{
                      marginLeft: '1rem',
                      background: '#4caf50',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    📍 Detect Location
                  </button>
                )}
              </label>
            </div>
            
            {!serviceLocation.useCurrentLocation && (
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Address Line
                  </label>
                  <input
                    type="text"
                    value={serviceLocation.addressLine}
                    onChange={(e) => setServiceLocation({...serviceLocation, addressLine: e.target.value})}
                    placeholder="House/Building number, Street name"
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={serviceLocation.pincode}
                    onChange={(e) => setServiceLocation({...serviceLocation, pincode: e.target.value})}
                    placeholder="400001"
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                </div>
                
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={serviceLocation.landmark}
                    onChange={(e) => setServiceLocation({...serviceLocation, landmark: e.target.value})}
                    placeholder="Near mall, school, etc."
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 5. Select Date & Time Slot */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#4caf50', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              🕐 Preferred Service Time
            </h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '1rem' }}>
                <input
                  type="radio"
                  value="ASAP"
                  checked={selectedTimeSlot === 'ASAP'}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  style={{ marginRight: '0.5rem' }}
                />
                ASAP (Within 2 hours)
              </label>
              
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  value="scheduled"
                  checked={selectedTimeSlot === 'scheduled'}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  style={{ marginRight: '0.5rem' }}
                />
                Schedule for later
              </label>
            </div>
            
            {selectedTimeSlot === 'scheduled' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* 7. Payment Option */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#4caf50', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              💳 Payment Method
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {['UPI', 'Card', 'Wallet', 'Cash After Service'].map(method => (
                <label key={method} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginRight: '0.5rem' }}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          {/* Optional: Past Mechanic Requests */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <button
              onClick={() => setExpandedPastRequests(!expandedPastRequests)}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'transparent',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontWeight: '600',
                color: '#4caf50'
              }}
            >
              🧾 Past Mechanic Requests
              <span>{expandedPastRequests ? '−' : '+'}</span>
            </button>
            
            {expandedPastRequests && (
              <div style={{ marginTop: '1rem' }}>
                {pastRequests.map(request => (
                  <div key={request.id} style={{ 
                    padding: '1rem', 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '6px', 
                    marginBottom: '0.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600' }}>{request.service}</div>
                      <div style={{ fontSize: '0.9rem', color: '#666' }}>{request.date}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#4caf50', fontWeight: '600' }}>{request.cost}</div>
                      <div style={{ fontSize: '0.9rem' }}>
                        {'★'.repeat(request.rating)} ({request.rating}/5)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Summary & Actions */}
        <div>
          {/* 6. Estimated Cost & Booking Summary */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem',
            position: 'sticky',
            top: '2rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: '#4caf50', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              📋 Booking Summary
            </h2>
            
            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Service:</strong> {selectedService ? serviceTypes.find(s => s.id === selectedService)?.title : 'Not selected'}
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Vehicle:</strong> {vehicleInfo.type} {vehicleInfo.modelYear}
              </div>
              {vehicleInfo.registrationNumber && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Registration:</strong> {vehicleInfo.registrationNumber}
                </div>
              )}
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Location:</strong> {serviceLocation.useCurrentLocation ? 'Current Location' : 'Manual Address'}
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Time:</strong> {selectedTimeSlot}
              </div>
              <div>
                <strong>Payment:</strong> {paymentMethod}
              </div>
            </div>
            
            <div style={{ 
              background: '#e8f5e8', 
              padding: '1rem', 
              borderRadius: '8px',
              border: '1px solid #4caf50',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#2e7d32' }}>
                Estimated Cost:
              </div>
              <div style={{ fontSize: '1.1rem', color: '#2e7d32' }}>
                {getEstimatedCost()}
              </div>
            </div>
            
            {/* 8. Confirm Booking Button */}
            <button
              onClick={handleBookMechanic}
              disabled={!selectedService}
              style={{
                width: '100%',
                background: selectedService ? '#4caf50' : '#ccc',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: selectedService ? 'pointer' : 'not-allowed',
                marginBottom: '1rem',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => {
                if (selectedService) e.currentTarget.style.background = '#45a049'
              }}
              onMouseOut={(e) => {
                if (selectedService) e.currentTarget.style.background = '#4caf50'
              }}
            >
              🔧 Book Mechanic Now
            </button>
            
            <div style={{ 
              textAlign: 'center', 
              fontSize: '0.9rem', 
              color: '#666', 
              lineHeight: '1.4'
            }}>
              🔒 Secure booking • ⭐ Verified mechanics<br/>
              💯 100% service guarantee
            </div>
          </div>

          {/* 9. Live Support / Emergency */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h3 style={{ color: '#ff5722', margin: '0 0 1rem 0', fontSize: '1.2rem' }}>
              🚨 Emergency Support
            </h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <button
                onClick={handleEmergencyCall}
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
                📞 Emergency Call
              </button>
              
              <button
                onClick={handleWhatsAppSupport}
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
                💬 WhatsApp Support
              </button>
            </div>
            
            <div style={{ 
              textAlign: 'center', 
              fontSize: '0.8rem', 
              color: '#666', 
              marginTop: '1rem' 
            }}>
              Available 24/7 for emergency breakdowns
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMechanic; 