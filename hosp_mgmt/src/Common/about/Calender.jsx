import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // import your locale if needed

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startDay = startOfMonth.day();

    let days = [];
    // Add previous month's days to fill the first week
    for (let i = 0; i < startDay; i++) {
      days.push(startOfMonth.subtract(startDay - i, 'day'));
    }
    // Add current month's days
    for (let i = 0; i < endOfMonth.date(); i++) {
      days.push(startOfMonth.add(i, 'day'));
    }
    // Add next month's days to fill the last week
    const remainingDays = 42 - days.length; // Calendar with 6 weeks to cover all months
    for (let i = 0; i < remainingDays; i++) {
      days.push(endOfMonth.add(i + 1, 'day'));
    }

    setDaysInMonth(days);
  }, [currentDate]);

  const getWeekdayHeaders = () => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      weekDays.push(dayjs().day(i).format('ddd'));
    }
    return weekDays;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <h2 className="text-lg font-bold">
          {currentDate.format('MMMM YYYY')}
        </h2>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {getWeekdayHeaders().map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
        {daysInMonth.map((day) => (
          <div
            key={day.format('YYYY-MM-DD')}
            className={`text-center p-2 rounded-full ${
              day.isSame(dayjs(), 'day') ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {day.date()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;