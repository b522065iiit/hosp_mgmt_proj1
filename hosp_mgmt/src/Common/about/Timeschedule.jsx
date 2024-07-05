import React from 'react';

const scheduleData = [
  { time: '08:00 - 09:00', event: 'Morning Rounds - General Ward' },
  { time: '09:00 - 10:00', event: 'Consultation - ICU' },
  { time: '10:00 - 11:00', event: 'Surgery - Operating Room' },
  { time: '11:00 - 12:00', event: 'Medication Check - Maternity' },
  { time: '12:00 - 13:00', event: 'Lunch Break' },
  { time: '13:00 - 14:00', event: 'Patient Check - Emergency' },
  { time: '14:00 - 15:00', event: 'Discharge - Pediatrics' },
  { time: '15:00 - 16:00', event: 'Staff Meeting' },
];

const TimeSchedule = () => {
  return (
    <div className="p-4 mx-auto bg-white rounded-lg shadow-lg" style={{ width: '20cm', height: '22cm'}}>
      <h2 className="text-xl font-bold mb-4 text-center">Hospital Time Schedule</h2>
      <div className="space-y-2">
        {scheduleData.map((item, index) => (
          <div key={index} className="p-3 bg-blue-100 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">{item.time}</p>
            <p className="text-lg font-semibold">{item.event}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSchedule;