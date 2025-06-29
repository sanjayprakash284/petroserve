import React from 'react';

interface WhyChooseProps {
  onNavigate: (page: string) => void;
}

const WhyChoose: React.FC<WhyChooseProps> = ({ onNavigate }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: 'Roboto, Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: '#000000',
        color: '#fff',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ fontSize: '1.5rem' }}>⛽</div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>PetroServe</h1>
        </div>
        <button
          onClick={() => onNavigate('services')}
          style={{
            background: 'transparent',
            border: '2px solid #00D46A',
            color: '#00D46A',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#00D46A';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#00D46A';
          }}
        >
          ← Back to Services
        </button>
      </div>

      <div style={{ padding: '0 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          background: '#ffffff',
          margin: '2rem 0',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(25,118,210,0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(25,118,210,0.05) 25%, transparent 25%)',
            backgroundSize: '30px 30px'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#000000',
              margin: '0 0 1rem 0',
              lineHeight: '1.2'
            }}>
              WHY CHOOSE PETROSERVE?
            </h1>
            <p style={{
              fontSize: '1.3rem',
              color: '#666',
              margin: '0 0 2rem 0',
              fontWeight: '500'
            }}>
              Trusted by thousands for fast fuel delivery and expert mechanics
            </p>
            
            {/* Hero Image Placeholder */}
            <div style={{
              background: 'linear-gradient(135deg, #000000, #333333)',
              borderRadius: '12px',
              padding: '3rem 2rem',
              color: '#fff',
              margin: '2rem auto',
              maxWidth: '600px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
              border: '2px solid #00D46A'
            }}>
              <div style={{ fontSize: '4rem' }}>🚛</div>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', color: '#00D46A' }}>Fast & Reliable</h3>
                <p style={{ margin: 0, opacity: 0.9 }}>Fuel delivered to your doorstep in Chennai</p>
              </div>
              <div style={{ fontSize: '4rem' }}>😊</div>
            </div>
          </div>
        </div>

        {/* Our Promise Section */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '2rem',
          margin: '2rem 0',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: '700',
            color: '#333',
            margin: '0 0 2rem 0'
          }}>
            OUR PROMISE TO YOU
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { icon: '⏱️', title: 'On-Time Delivery', desc: 'Always on schedule, every single time' },
              { icon: '🛠️', title: 'Verified Mechanics', desc: 'Skilled professionals you can trust' },
              { icon: '🛡️', title: 'Fuel Quality', desc: 'Premium fuel from trusted sources' },
              { icon: '💳', title: 'Easy Payments', desc: 'Multiple payment options available' },
              { icon: '📞', title: '24/7 Support', desc: 'Round-the-clock customer assistance' },
              { icon: '📍', title: 'Wide Coverage', desc: 'Serving all areas across Chennai' }
            ].map((promise, index) => (
              <div key={index} style={{
                background: '#f8f9fa',
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center',
                border: '1px solid #e9ecef',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{promise.icon}</div>
                <h3 style={{ 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '1.2rem', 
                  fontWeight: '600', 
                  color: '#000000' 
                }}>
                  {promise.title}
                </h3>
                <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
                  {promise.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Testimonials */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '2rem',
          margin: '2rem 0',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: '700',
            color: '#333',
            margin: '0 0 2rem 0'
          }}>
            WHAT OUR CUSTOMERS SAY
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                rating: '⭐⭐⭐⭐⭐',
                text: 'Fast delivery! Got fuel at 1 AM when I was stranded. Lifesaver service!',
                name: 'Arjun Kumar',
                location: 'T. Nagar, Chennai',
                service: 'Fuel Delivery'
              },
              {
                rating: '⭐⭐⭐⭐⭐',
                text: 'Mechanic reached in 20 mins for my car breakdown. Professional and quick!',
                name: 'Meera Raman',
                location: 'Adyar, Chennai',
                service: 'Mechanic Service'
              },
              {
                rating: '⭐⭐⭐⭐⭐',
                text: 'I use PetroServe for my entire fleet. Very reliable and cost-effective.',
                name: 'Sagar Industries',
                location: 'OMR, Chennai',
                service: 'Fleet Service'
              }
            ].map((testimonial, index) => (
              <div key={index} style={{
                background: 'linear-gradient(135deg, #fff5f5, #fff8f0)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid #ffe4e1',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '20px',
                  background: '#00D46A',
                  color: '#000',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {testimonial.service}
                </div>
                
                <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                  {testimonial.rating}
                </div>
                <p style={{
                  fontSize: '1rem',
                  color: '#333',
                  fontStyle: 'italic',
                  margin: '0 0 1rem 0',
                  lineHeight: '1.5'
                }}>
                  "{testimonial.text}"
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#000000' }}>
                      {testimonial.name}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      {testimonial.location}
                    </div>
                  </div>
                  <div style={{
                    background: '#00D46A',
                    color: '#000',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.8rem'
                  }}>
                    ✓ Verified
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Testimonial Box */}
          <div style={{
            marginTop: '2rem',
            background: 'linear-gradient(135deg, #000000, #333333)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center',
            color: '#fff',
            border: '2px solid #00D46A'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏯️</div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem', color: '#00D46A' }}>
              Watch Our Customers Speak
            </h3>
            <p style={{ margin: '0 0 1rem 0', opacity: 0.9 }}>
              Real stories from real customers across Chennai
            </p>
            <button style={{
              background: '#00D46A',
              color: '#000',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#00D46A';
              e.currentTarget.style.color = '#000';
            }}>
              Play Video Testimonials
            </button>
          </div>
        </div>

        {/* Statistics Section */}
        <div style={{
          background: 'linear-gradient(135deg, #000000, #333333)',
          borderRadius: '16px',
          padding: '2rem',
          margin: '2rem 0',
          color: '#fff',
          textAlign: 'center',
          border: '2px solid #00D46A'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            margin: '0 0 2rem 0'
          }}>
            WE'RE GROWING WITH YOU
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { icon: '🚛', number: '10,000+', label: 'Orders Delivered' },
              { icon: '🧑‍🔧', number: '1,200+', label: 'Expert Mechanics' },
              { icon: '🏙️', number: '20+', label: 'Cities Covered' },
              { icon: '⭐', number: '4.9', label: 'Average Rating' }
            ].map((stat, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '1.5rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.9 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '3rem 2rem',
          margin: '2rem 0 3rem 0',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#333',
            margin: '0 0 1rem 0'
          }}>
            Ready to Experience PetroServe?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            margin: '0 0 2rem 0'
          }}>
            Join thousands of satisfied customers in Chennai
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => onNavigate('order-fuel')}
              style={{
                background: '#000000',
                color: '#fff',
                border: '2px solid #00D46A',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                minWidth: '200px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#00D46A';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#000000';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              ⛽ Order Fuel Now
            </button>
            
            <button
              onClick={() => onNavigate('book-mechanic')}
              style={{
                background: '#00D46A',
                color: '#000',
                border: '2px solid #00D46A',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                minWidth: '200px',
                boxShadow: '0 4px 16px rgba(0,212,106,0.3)',
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
              🔧 Book Mechanic
            </button>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#f8f9fa',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ color: '#666', fontWeight: '500' }}>Download our app:</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{
                background: '#000',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}>
                📱 Play Store
              </div>
              <div style={{
                background: '#000',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}>
                🍎 App Store
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose; 