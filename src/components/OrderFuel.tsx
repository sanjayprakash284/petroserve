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

interface OrderFuelProps {
  user?: User;
}

interface VehicleInfo {
  type: string;
  registrationNumber: string;
  fuelType: 'Petrol' | 'Diesel';
  tankCapacity: string;
}

interface DeliveryLocation {
  useCurrentLocation: boolean;
  addressLine: string;
  landmark: string;
  pincode: string;
}

const OrderFuel: React.FC<OrderFuelProps> = ({ user }) => {
  const navigate = useNavigate();
  
  // Form states
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
    type: 'Car',
    registrationNumber: '',
    fuelType: 'Petrol',
    tankCapacity: ''
  });
  
  const [fuelQuantity, setFuelQuantity] = useState(20);
  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation>({
    useCurrentLocation: true,
    addressLine: '',
    landmark: '',
    pincode: ''
  });
  
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('ASAP');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [promoCode, setPromoCode] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Price calculations
  const petrolPrice = 95.50;
  const dieselPrice = 87.30;
  const serviceFee = 25;
  const basePrice = vehicleInfo.fuelType === 'Petrol' ? petrolPrice : dieselPrice;
  const fuelCost = fuelQuantity * basePrice;
  const totalCost = fuelCost + serviceFee;

  const handleBackToServices = () => {
    navigate('/services');
  };

  const handleConfirmOrder = () => {
    console.log('Order confirmed');
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

  const vehicleTypes = ['Car', 'Bike', 'Truck', 'Generator', 'Other'];
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

  const faqs = [
    {
      question: "Is doorstep delivery safe?",
      answer: "Yes, absolutely! Our certified delivery personnel follow strict safety protocols. All equipment is regularly inspected and our staff are trained in safe fuel handling procedures."
    },
    {
      question: "What if I'm not at home?",
      answer: "You can reschedule your delivery or authorize someone else to receive it. We'll call you 15 minutes before arrival to confirm availability."
    },
    {
      question: "Can I cancel after placing an order?",
      answer: "Yes, you can cancel up to 30 minutes after placing your order without any charges. After that, a minimal cancellation fee may apply."
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
                color: '#1976d2', 
                fontSize: '2rem',
                fontWeight: '600'
              }}>
                ⛽ Order Fuel
              </h1>
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                color: '#666',
                fontSize: '1rem'
              }}>
                Get fuel delivered directly to your location
              </p>
            </div>
          </div>
          
          <button
            onClick={handleBackToServices}
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
          
          {/* 1. Vehicle Information Component */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#1976d2', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
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
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Fuel Type
                </label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="Petrol"
                      checked={vehicleInfo.fuelType === 'Petrol'}
                      onChange={(e) => setVehicleInfo({...vehicleInfo, fuelType: e.target.value as 'Petrol' | 'Diesel'})}
                      style={{ marginRight: '0.5rem' }}
                    />
                    Petrol
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      value="Diesel"
                      checked={vehicleInfo.fuelType === 'Diesel'}
                      onChange={(e) => setVehicleInfo({...vehicleInfo, fuelType: e.target.value as 'Petrol' | 'Diesel'})}
                      style={{ marginRight: '0.5rem' }}
                    />
                    Diesel
                  </label>
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Tank Capacity (Optional)
                </label>
                <input
                  type="text"
                  value={vehicleInfo.tankCapacity}
                  onChange={(e) => setVehicleInfo({...vehicleInfo, tankCapacity: e.target.value})}
                  placeholder="e.g., 45 litres"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                />
              </div>
            </div>
          </div>

          {/* 2. Fuel Quantity Selector */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#1976d2', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              ⛽ Fuel Quantity
            </h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                Quantity: {fuelQuantity} Litres
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={fuelQuantity}
                onChange={(e) => setFuelQuantity(Number(e.target.value))}
                style={{ width: '100%', marginBottom: '1rem' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.9rem' }}>
                <span>5L</span>
                <span>100L</span>
              </div>
            </div>
            
            <div style={{ 
              background: '#f8f9fa', 
              padding: '1rem', 
              borderRadius: '8px',
              border: '2px solid #e9ecef'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Price per litre ({vehicleInfo.fuelType}):</span>
                <span>₹{basePrice.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '1.1rem', color: '#1976d2' }}>
                <span>Estimated Cost:</span>
                <span>₹{fuelCost.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* 3. Delivery Location */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#1976d2', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              📍 Delivery Location
            </h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '1rem' }}>
                <input
                  type="checkbox"
                  checked={deliveryLocation.useCurrentLocation}
                  onChange={(e) => setDeliveryLocation({...deliveryLocation, useCurrentLocation: e.target.checked})}
                  style={{ marginRight: '0.5rem' }}
                />
                Use current location (GPS)
                {deliveryLocation.useCurrentLocation && (
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
            
            {!deliveryLocation.useCurrentLocation && (
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Address Line
                  </label>
                  <input
                    type="text"
                    value={deliveryLocation.addressLine}
                    onChange={(e) => setDeliveryLocation({...deliveryLocation, addressLine: e.target.value})}
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
                    value={deliveryLocation.pincode}
                    onChange={(e) => setDeliveryLocation({...deliveryLocation, pincode: e.target.value})}
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
                    value={deliveryLocation.landmark}
                    onChange={(e) => setDeliveryLocation({...deliveryLocation, landmark: e.target.value})}
                    placeholder="Near mall, school, etc."
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 4. Preferred Delivery Time Slot */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#1976d2', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              🕐 Preferred Delivery Time
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

          {/* 5. Payment Method Component */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#1976d2', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              💳 Payment Method
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              {['UPI', 'Wallet', 'Card', 'Cash'].map(method => (
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
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                Promo Code (Optional)
              </label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code"
                  style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }}
                />
                <button style={{
                  background: '#ff9800',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  cursor: 'pointer'
                }}>
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* 8. FAQ / Safety Guidelines */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem'
          }}>
            <h2 style={{ color: '#1976d2', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              ❓ Frequently Asked Questions
            </h2>
            
            {faqs.map((faq, index) => (
              <div key={index} style={{ marginBottom: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontWeight: '600'
                  }}
                >
                  {faq.question}
                  <span>{expandedFAQ === index ? '−' : '+'}</span>
                </button>
                {expandedFAQ === index && (
                  <div style={{ padding: '0 1rem 1rem', color: '#666', lineHeight: '1.5' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          {/* 6. Order Summary Component */}
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem',
            position: 'sticky',
            top: '2rem'
          }}>
            <h2 style={{ color: '#1976d2', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              📋 Order Summary
            </h2>
            
            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Vehicle:</strong> {vehicleInfo.type} ({vehicleInfo.fuelType})
              </div>
              {vehicleInfo.registrationNumber && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Registration:</strong> {vehicleInfo.registrationNumber}
                </div>
              )}
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Quantity:</strong> {fuelQuantity} Litres
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Delivery:</strong> {deliveryLocation.useCurrentLocation ? 'Current Location' : 'Manual Address'}
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Time:</strong> {selectedTimeSlot}
              </div>
              <div>
                <strong>Payment:</strong> {paymentMethod}
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Fuel Cost ({fuelQuantity}L × ₹{basePrice}):</span>
                <span>₹{fuelCost.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Service Fee:</span>
                <span>₹{serviceFee.toFixed(2)}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontWeight: '700', 
                fontSize: '1.2rem',
                color: '#1976d2',
                borderTop: '1px solid #e0e0e0',
                paddingTop: '0.5rem'
              }}>
                <span>Total Cost:</span>
                <span>₹{totalCost.toFixed(2)}</span>
              </div>
            </div>
            
            {/* 7. Confirm Order Button */}
            <button
              onClick={handleConfirmOrder}
              style={{
                width: '100%',
                background: '#4caf50',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '1.5rem',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#45a049'}
              onMouseOut={(e) => e.currentTarget.style.background = '#4caf50'}
            >
              ✅ Confirm & Pay ₹{totalCost.toFixed(2)}
            </button>
            
            <div style={{ 
              textAlign: 'center', 
              fontSize: '0.9rem', 
              color: '#666', 
              marginTop: '1rem',
              lineHeight: '1.4'
            }}>
              🔒 Secure payment • 📞 24/7 support<br/>
              💯 100% safe delivery guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFuel; 