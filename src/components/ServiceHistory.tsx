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

interface ServiceHistoryProps {
  user?: User;
}

interface ServiceOrder {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  status: 'Completed' | 'Cancelled' | 'Ongoing';
  serviceType: 'Fuel' | 'Mechanic';
  details: {
    // For Fuel orders
    quantity?: number;
    fuelType?: 'Petrol' | 'Diesel';
    // For Mechanic services
    mechanicService?: string;
    mechanicName?: string;
  };
  location: string;
  totalAmount: number;
  vehicleNumber?: string;
  rating?: number;
  hasInvoice: boolean;
}

const ServiceHistory: React.FC<ServiceHistoryProps> = ({ user }) => {
  const navigate = useNavigate();
  
  // Filter states
  const [serviceFilter, setServiceFilter] = useState('All');
  const [dateRange, setDateRange] = useState('Last 7 Days');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Mock service history data
  const mockServiceHistory: ServiceOrder[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-01-20',
      time: '14:30',
      status: 'Completed',
      serviceType: 'Fuel',
      details: {
        quantity: 25,
        fuelType: 'Petrol'
      },
      location: 'Sector 15, Gurgaon',
      totalAmount: 2400,
      vehicleNumber: 'DL 01 AB 1234',
      rating: 5,
      hasInvoice: true
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-01-18',
      time: '10:15',
      status: 'Completed',
      serviceType: 'Mechanic',
      details: {
        mechanicService: 'Battery Issue',
        mechanicName: 'Rajesh Kumar'
      },
      location: 'MG Road, Bangalore',
      totalAmount: 650,
      vehicleNumber: 'KA 05 CD 5678',
      rating: 4,
      hasInvoice: true
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-01-15',
      time: '16:45',
      status: 'Completed',
      serviceType: 'Fuel',
      details: {
        quantity: 40,
        fuelType: 'Diesel'
      },
      location: 'Andheri West, Mumbai',
      totalAmount: 3520,
      vehicleNumber: 'MH 01 EF 9012',
      rating: 5,
      hasInvoice: true
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      date: '2024-01-12',
      time: '09:30',
      status: 'Completed',
      serviceType: 'Mechanic',
      details: {
        mechanicService: 'Tire Puncture',
        mechanicName: 'Amit Singh'
      },
      location: 'Sector 18, Noida',
      totalAmount: 300,
      vehicleNumber: 'UP 16 GH 3456',
      hasInvoice: true
    },
    {
      id: '5',
      orderNumber: 'ORD-2024-005',
      date: '2024-01-10',
      time: '11:20',
      status: 'Ongoing',
      serviceType: 'Fuel',
      details: {
        quantity: 30,
        fuelType: 'Petrol'
      },
      location: 'Salt Lake, Kolkata',
      totalAmount: 2865,
      vehicleNumber: 'WB 02 IJ 7890',
      hasInvoice: false
    }
  ];

  // Filter orders based on current filters
  const filteredOrders = mockServiceHistory.filter(order => {
    const matchesService = serviceFilter === 'All' || 
      (serviceFilter === 'Fuel Orders' && order.serviceType === 'Fuel') ||
      (serviceFilter === 'Mechanic Services' && order.serviceType === 'Mechanic');
    
    const matchesSearch = searchQuery === '' || 
      order.vehicleNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.details.mechanicService?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.details.fuelType?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesService && matchesSearch;
  });

  const handleBackToServices = () => {
    navigate('/services');
  };

  const handleRebook = (order: ServiceOrder) => {
    if (order.serviceType === 'Fuel') {
      navigate('/order-fuel');
    } else {
      navigate('/book-mechanic');
    }
  };

  const handleDownloadInvoice = (orderId: string) => {
    // In real app, this would download the actual invoice
    alert(`Downloading invoice for order ${orderId}`);
  };

  const handleRateService = (orderId: string, rating: number) => {
    console.log(`Rating order ${orderId} with ${rating} stars`);
    // In real app, this would update the rating in the backend
  };

  const handleExportHistory = (format: 'PDF' | 'CSV') => {
    alert(`Exporting service history as ${format}`);
    // In real app, this would generate and download the file
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return '#4caf50';
      case 'Ongoing': return '#ff9800';
      case 'Cancelled': return '#f44336';
      default: return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return '✅';
      case 'Ongoing': return '🔄';
      case 'Cancelled': return '❌';
      default: return '❓';
    }
  };

  const getTotalSpent = () => {
    return filteredOrders
      .filter(order => order.status === 'Completed')
      .reduce((total, order) => total + order.totalAmount, 0);
  };

  const getServiceCounts = () => {
    const completed = filteredOrders.filter(order => order.status === 'Completed').length;
    const fuel = filteredOrders.filter(order => order.serviceType === 'Fuel').length;
    const mechanic = filteredOrders.filter(order => order.serviceType === 'Mechanic').length;
    return { completed, fuel, mechanic };
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
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <CompanyIcon />
            <div>
              <h1 style={{ 
                margin: 0, 
                color: '#ff9800', 
                fontSize: '2rem',
                fontWeight: '600'
              }}>
                📈 Your Service History
              </h1>
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                color: '#666',
                fontSize: '1rem'
              }}>
                Track all your fuel deliveries and mechanic services
              </p>
            </div>
          </div>
          
          <button
            onClick={handleBackToServices}
            style={{
              background: 'transparent',
              color: '#ff9800',
              border: '2px solid #ff9800',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#ff9800';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#ff9800';
            }}
          >
            ← Back to Services
          </button>
        </div>

        {/* Filters and Search */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          {/* Service Filter */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              Filter by Service
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['All', 'Fuel Orders', 'Mechanic Services'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setServiceFilter(filter)}
                  style={{
                    padding: '8px 16px',
                    border: serviceFilter === filter ? '2px solid #ff9800' : '1px solid #ddd',
                    borderRadius: '20px',
                    background: serviceFilter === filter ? '#fff3e0' : '#fff',
                    color: serviceFilter === filter ? '#ff9800' : '#666',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: serviceFilter === filter ? '600' : '400'
                  }}
                >
                  {filter === 'All' && '🔘'} 
                  {filter === 'Fuel Orders' && '⛽'} 
                  {filter === 'Mechanic Services' && '🔧'} {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '1px solid #ddd', 
                borderRadius: '6px'
              }}
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="This Month">This Month</option>
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="Custom">Custom Range</option>
            </select>
          </div>

          {/* Search Bar */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              Search Orders
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by vehicle number, order ID, location..."
              style={{ 
                width: '100%', 
                padding: '10px', 
                border: '1px solid #ddd', 
                borderRadius: '6px'
              }}
            />
          </div>
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setViewMode('cards')}
              style={{
                padding: '8px 16px',
                border: viewMode === 'cards' ? '2px solid #ff9800' : '1px solid #ddd',
                borderRadius: '6px',
                background: viewMode === 'cards' ? '#fff3e0' : '#fff',
                color: viewMode === 'cards' ? '#ff9800' : '#666',
                cursor: 'pointer'
              }}
            >
              📋 Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                padding: '8px 16px',
                border: viewMode === 'table' ? '2px solid #ff9800' : '1px solid #ddd',
                borderRadius: '6px',
                background: viewMode === 'table' ? '#fff3e0' : '#fff',
                color: viewMode === 'table' ? '#ff9800' : '#666',
                cursor: 'pointer'
              }}
            >
              📊 Table
            </button>
          </div>

          {/* Export Options */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => handleExportHistory('PDF')}
              style={{
                padding: '8px 16px',
                background: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              📥 Export PDF
            </button>
            <button
              onClick={() => handleExportHistory('CSV')}
              style={{
                padding: '8px 16px',
                background: '#4caf50',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              📥 Export CSV
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Main Content */}
        <div>
          {filteredOrders.length === 0 ? (
            /* Empty State */
            <div style={{ 
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              padding: '4rem 2rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</div>
              <h3 style={{ color: '#666', marginBottom: '1rem' }}>
                No service history found
              </h3>
              <p style={{ color: '#999', marginBottom: '2rem' }}>
                You haven't used our services yet. Book your first fuel delivery or mechanic today!
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={() => navigate('/order-fuel')}
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
                  ⛽ Order Fuel
                </button>
                <button
                  onClick={() => navigate('/book-mechanic')}
                  style={{
                    background: '#4caf50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  🔧 Book Mechanic
                </button>
              </div>
            </div>
          ) : (
            /* Order History List */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {viewMode === 'cards' ? (
                /* Card View */
                filteredOrders.map(order => (
                  <div
                    key={order.id}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      padding: '2rem',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <span style={{ 
                            color: getStatusColor(order.status), 
                            fontSize: '1.2rem' 
                          }}>
                            {getStatusIcon(order.status)}
                          </span>
                          <span style={{ 
                            fontWeight: '600', 
                            color: getStatusColor(order.status) 
                          }}>
                            {order.status}
                          </span>
                          <span style={{ color: '#666', fontSize: '0.9rem' }}>
                            • {order.orderNumber}
                          </span>
                        </div>
                        
                        <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                          📅 {order.date} at {order.time}
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          {order.serviceType === 'Fuel' ? '⛽' : '🔧'}
                          <span style={{ fontWeight: '600' }}>
                            {order.serviceType === 'Fuel' 
                              ? `${order.details.quantity}L ${order.details.fuelType}` 
                              : order.details.mechanicService
                            }
                          </span>
                        </div>
                        
                        {order.details.mechanicName && (
                          <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                            👨‍🔧 Mechanic: {order.details.mechanicName}
                          </div>
                        )}
                        
                        <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                          📍 {order.location}
                        </div>
                        
                        {order.vehicleNumber && (
                          <div style={{ color: '#666', fontSize: '0.9rem' }}>
                            🚗 {order.vehicleNumber}
                          </div>
                        )}
                      </div>
                      
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ 
                          fontSize: '1.2rem', 
                          fontWeight: '700', 
                          color: '#2e7d32',
                          marginBottom: '0.5rem'
                        }}>
                          ₹{order.totalAmount.toLocaleString()}
                        </div>
                        
                        {order.rating && (
                          <div style={{ marginBottom: '0.5rem' }}>
                            {'⭐'.repeat(order.rating)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex', 
                      gap: '1rem', 
                      paddingTop: '1rem', 
                      borderTop: '1px solid #e0e0e0',
                      flexWrap: 'wrap'
                    }}>
                      <button
                        onClick={() => handleRebook(order)}
                        style={{
                          background: '#1976d2',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 16px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        🔁 Rebook
                      </button>
                      
                      {order.hasInvoice && (
                        <button
                          onClick={() => handleDownloadInvoice(order.id)}
                          style={{
                            background: '#ff9800',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 16px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          🧾 Invoice
                        </button>
                      )}
                      
                      {!order.rating && order.status === 'Completed' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '14px', color: '#666' }}>Rate:</span>
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              onClick={() => handleRateService(order.id, star)}
                              style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '16px',
                                cursor: 'pointer',
                                padding: '2px'
                              }}
                            >
                              ⭐
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                /* Table View */
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  overflow: 'hidden'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                      <tr>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Status</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Date</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Service</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Details</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Amount</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map(order => (
                        <tr key={order.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                          <td style={{ padding: '1rem' }}>
                            <span style={{ 
                              color: getStatusColor(order.status),
                              fontWeight: '600'
                            }}>
                              {getStatusIcon(order.status)} {order.status}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', color: '#666' }}>
                            {order.date}
                          </td>
                          <td style={{ padding: '1rem' }}>
                            {order.serviceType === 'Fuel' ? '⛽ Fuel' : '🔧 Mechanic'}
                          </td>
                          <td style={{ padding: '1rem', color: '#666' }}>
                            {order.serviceType === 'Fuel' 
                              ? `${order.details.quantity}L ${order.details.fuelType}` 
                              : order.details.mechanicService
                            }
                          </td>
                          <td style={{ padding: '1rem', fontWeight: '600', color: '#2e7d32' }}>
                            ₹{order.totalAmount.toLocaleString()}
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button
                                onClick={() => handleRebook(order)}
                                style={{
                                  background: '#1976d2',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '4px',
                                  padding: '4px 8px',
                                  fontSize: '12px',
                                  cursor: 'pointer'
                                }}
                              >
                                🔁
                              </button>
                              {order.hasInvoice && (
                                <button
                                  onClick={() => handleDownloadInvoice(order.id)}
                                  style={{
                                    background: '#ff9800',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    fontSize: '12px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  🧾
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar - Statistics */}
        <div>
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '2rem',
            position: 'sticky',
            top: '2rem'
          }}>
            <h3 style={{ color: '#ff9800', margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>
              📈 Order Statistics
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ 
                background: '#f8f9fa', 
                padding: '1rem', 
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: '700', 
                  color: '#2e7d32',
                  textAlign: 'center'
                }}>
                  ₹{getTotalSpent().toLocaleString()}
                </div>
                <div style={{ 
                  textAlign: 'center', 
                  color: '#666',
                  fontSize: '0.9rem'
                }}>
                  Total Spent
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div style={{ 
                  background: '#e3f2fd', 
                  padding: '0.75rem', 
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#1976d2' }}>
                    {getServiceCounts().completed}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    Completed
                  </div>
                </div>
                
                <div style={{ 
                  background: '#fff3e0', 
                  padding: '0.75rem', 
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#ff9800' }}>
                    {getServiceCounts().fuel}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    Fuel Orders
                  </div>
                </div>
                
                <div style={{ 
                  background: '#f1f8e9', 
                  padding: '0.75rem', 
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#4caf50' }}>
                    {getServiceCounts().mechanic}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    Mechanic Services
                  </div>
                </div>
                
                <div style={{ 
                  background: '#fce4ec', 
                  padding: '0.75rem', 
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#e91e63' }}>
                    4.7
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    Avg Rating
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ 
              borderTop: '1px solid #e0e0e0', 
              paddingTop: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ 
                fontSize: '0.9rem', 
                color: '#666', 
                marginBottom: '1rem'
              }}>
                📊 Monthly Summary
              </div>
              <button
                style={{
                  width: '100%',
                  background: '#ff9800',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                📈 View Detailed Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHistory; 