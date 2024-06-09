import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const CustomDatePicker = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState(null);

  const today = new Date();

  const handleChange = (date) => {
    setStartDate(date);
    const formattedDate = format(date, 'yyyy-MM-dd'); 
    onDateChange(formattedDate); 
  };

  return (
    <div>
      <DatePicker
        className='border-2 border-green-500 rounded-md'
        selected={startDate}
        onChange={handleChange}
        minDate={today}
        filterDate={(date) => date > today}
        calendarStartDay={0} 
      />
    </div>
  );
};

export default CustomDatePicker;
