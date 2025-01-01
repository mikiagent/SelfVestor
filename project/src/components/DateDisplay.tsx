import React, { useState, useEffect } from 'react';

export function DateDisplay() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="text-center mb-6">
      <p className="text-gray-600 text-sm">Today is</p>
      <h2 className="text-3xl font-bold text-gray-900">{formattedDate}</h2>
      <p className="text-2xl font-bold text-gray-700 mt-1">{formattedTime}</p>
    </div>
  );
}