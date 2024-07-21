import React, { useEffect, useState } from 'react'

const Footer = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    updateCurrentDate();
  }, []); 

  const updateCurrentDate = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(formattedDate);
  };
  return (
    <footer>
      <p>Employee Management System. Developed by Nagaraja {currentDate}</p>
    </footer>
  )
}

export default Footer