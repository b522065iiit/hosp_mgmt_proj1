import React from 'react';

const FacilityBox = ({ facility, onClick }) => {
  return (
    <div
      className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => onClick(facility.id)}
    >
      <img src={facility.image} alt={facility.name} className="w-full h-32 object-cover rounded-md mb-2" />
      <h3 className="text-lg font-semibold">{facility.name}</h3>
      <p className="text-gray-600">{facility.description}</p>
    </div>
  );
};

export default FacilityBox;