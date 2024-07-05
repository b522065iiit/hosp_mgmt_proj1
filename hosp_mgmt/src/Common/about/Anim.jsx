import React, { useState } from 'react';
import './Anim.css'; // Import the CSS for animations

const HospitalInfo = () => {

  return (
    <div className="flex justify-between items-center w-full p-8 bg-gray-50">
      {/* Animation for Image */}
      <div className="hospital-image-container">
        <img src="./src/Common/assets/istockphoto-1312706504-612x612.jpg" alt="Hospital" className="hospital-image border rounded-lg" />
      </div>

      {/* Animation for Info */}
      <div className="hospital-info-container px-4">
        <h1 className="text-3xl font-semibold text-cyan-400 mb-2 justify-center items-center">About Us</h1>
        <h1 className="text-5xl font-bold mb-4 justify-center items-center font-Ubonto text-teal-700">CARE+</h1>
        <p className='text-1xl text-justify truncate-lines-10'><p className='font-semibold text-cyan-400'>Comprehensive Healthcare:</p> Offering advanced medical services including cardiology, orthopedics, neurology, pediatrics, emergency care, maternity services, oncology, rehabilitation, and primary care.
        <p className='font-semibold  text-cyan-400'>
          Expertise and Innovation:</p> <p>Our dedicated team uses cutting-edge technology to provide personalized care and ensure the best outcomes for our patients.</p>
        <p className='font-semibold  text-cyan-400'>
        Patient-Centered:</p> <p>We prioritize individual needs, delivering compassionate care and support throughout every healthcare journey.</p>
        <p className='font-semibold  text-cyan-400'>
        Commitment to Excellence:</p><p> Committed to achieving the highest standards of healthcare excellence with a focus on patient satisfaction.</p>
        <p className='font-semibold  text-cyan-400'>
        Community Engagement:</p><p>Actively engaging with our community through education, outreach, and partnerships to promote wellness and improve healthcare access.</p> 
        <p className='font-semibold  text-cyan-400'>Mission:</p> Enhancing health and well-being through exceptional care, integrity, compassion, and respect.</p>
      </div>
    </div>
  );
}

export default HospitalInfo;
