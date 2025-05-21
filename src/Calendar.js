import React, { useState } from 'react';
import { format, addDays, startOfWeek, endOfWeek } from 'date-fns';
import CalendarWeek from './CalendarWeek';

function Calendar({ tasks }) {
  // Display 1 week before the current week, the current week, and 2 weeks after the current week
  const [currentDate, setCurrentDate] = useState(new Date());
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weeks = [
    { start: addDays(startOfCurrentWeek, -7), end: addDays(endOfCurrentWeek, -7) },
    { start: startOfCurrentWeek, end: endOfCurrentWeek },
    { start: addDays(startOfCurrentWeek, 7), end: addDays(endOfCurrentWeek, 7) },
    { start: addDays(startOfCurrentWeek, 14), end: addDays(endOfCurrentWeek, 14) },
  ];
  const [hoveredCell, setHoveredCell] = useState(null);
  const handleCellHover = (date) => {
    setHoveredCell(date);
  };
  const handleCellLeave = () => {
    setHoveredCell(null);
  };

  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: '100%'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: 'white' }}>
        {dayHeaders.map((day, index) => (
          <div key={index} style={{ flex: 1, textAlign: 'center' }}>
            {day}
          </div>
        ))}
      </div>
      {weeks.map((week, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CalendarWeek
            tasks={tasks}
            date={week.start}
            onCellHover={handleCellHover}
            onCellLeave={handleCellLeave}
          />
        </div>
      ))}
      {hoveredCell && (
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
          Hovered Cell: {format(new Date(hoveredCell), 'yyyy-MM-dd')}
        </div>
      )}
    </div>
  );
}

export default Calendar;