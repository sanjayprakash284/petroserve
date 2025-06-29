import React from 'react';

const CompanyIcon: React.FC = () => (
  <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Location Pin - Positioned higher above car */}
    <path 
      d="M24 1 C28 1 32 5 32 9 C32 13 24 18 24 18 C24 18 16 13 16 9 C16 5 20 1 24 1 Z" 
      fill="none"
      stroke="#DC2626" 
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    
    {/* Fuel Droplet inside Location Pin */}
    <path 
      d="M24 5 C25 5 26 6 26 7.5 C26 9 25 10 24 10 C23 10 22 9 22 7.5 C22 6 23 5 24 5 Z" 
      fill="#DC2626"
    />
    
    {/* Realistic Car Body - Modern sedan profile */}
    <path 
      d="M8 36 L10 34 L12 32 L16 31 L32 31 L36 32 L38 34 L40 36 L40 39 L38 39 L38 40 C38 41 37 42 36 42 L34 42 C34 41 33 40 32 40 C31 40 30 41 30 42 L18 42 C18 41 17 40 16 40 C15 40 14 41 14 42 L12 42 C11 42 10 41 10 40 L10 39 L8 39 L8 36 Z" 
      fill="none"
      stroke="#DC2626" 
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    
    {/* Car Roof and Windshield - Realistic slope */}
    <path 
      d="M16 31 L18 26 L22 24 L26 24 L30 26 L32 31" 
      fill="none"
      stroke="#DC2626" 
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    
    {/* Front Windshield */}
    <path 
      d="M18 26 L20 28 L22 29 L16 31" 
      fill="none"
      stroke="#DC2626" 
      strokeWidth="1.5"
    />
    
    {/* Rear Window */}
    <path 
      d="M30 26 L28 28 L26 29 L32 31" 
      fill="none"
      stroke="#DC2626" 
      strokeWidth="1.5"
    />
    
    {/* Car Door Line */}
    <path 
      d="M24 31 L24 39" 
      stroke="#DC2626" 
      strokeWidth="1.5"
    />
    
    {/* Front Headlight */}
    <ellipse cx="38" cy="35" rx="1.5" ry="1" fill="none" stroke="#DC2626" strokeWidth="1.5"/>
    
    {/* Rear Light */}
    <ellipse cx="10" cy="35" rx="1" ry="0.8" fill="#DC2626"/>
    
    {/* Left Wheel - More realistic */}
    <circle 
      cx="16" 
      cy="42" 
      r="3.5" 
      fill="none"
      stroke="#DC2626" 
      strokeWidth="2.5"
    />
    <circle cx="16" cy="42" r="2" fill="none" stroke="#DC2626" strokeWidth="1.5"/>
    <circle cx="16" cy="42" r="1" fill="#DC2626"/>
    
    {/* Right Wheel - More realistic */}
    <circle 
      cx="32" 
      cy="42" 
      r="3.5" 
      fill="none"
      stroke="#DC2626" 
      strokeWidth="2.5"
    />
    <circle cx="32" cy="42" r="2" fill="none" stroke="#DC2626" strokeWidth="1.5"/>
    <circle cx="32" cy="42" r="1" fill="#DC2626"/>
    
    {/* PETROSERVE Text */}
    <text 
      x="24" 
      y="52" 
      textAnchor="middle" 
      fontSize="6" 
      fontWeight="bold" 
      fontFamily="Arial, sans-serif" 
      fill="#DC2626"
    >
      PETROSERVE
    </text>
  </svg>
);

export default CompanyIcon; 