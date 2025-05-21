import React, { useState } from 'react';
import CalendarCell from './CalendarCell';
import { format, startOfWeek, endOfWeek, add } from 'date-fns';

function CalendarWeek({ tasks, date }) {
  const [, setHoveredCell] = useState(null);

  const startOfWeekDate = startOfWeek(date, { weekStartsOn: 0 });
  const endOfWeekDate = endOfWeek(date, { weekStartsOn: 0 });


  const sortedTasks = [[], [], [], [], [], [], []];

  tasks.forEach((task) => {
    let taskScheduledDate = new Date(task.scheduledDate);
  
    let dayIndex = taskScheduledDate.getDay();
    if (taskScheduledDate >= startOfWeekDate && taskScheduledDate <= endOfWeekDate) {
      sortedTasks[dayIndex].push(task);
    }
  });
  

  return (
    <div
      style={{
        display: 'flex',
        gap: '1px',
        width: '100%',
        height: '100%',
      }}
    >
      {Array.from({ length: 7 }, (_, index) => {
        const date = add(startOfWeekDate, { days: index });
        const formattedDate = format(date, 'yyyy-MM-dd');

        return (
          <CalendarCell
            key={formattedDate}
            date={formattedDate}
            scheduledTasks={sortedTasks[index]}
            onMouseEnter={() => setHoveredCell(formattedDate)}
            onMouseLeave={() => setHoveredCell(null)}
          />
        );
      })}
    </div>
  );
}

export default CalendarWeek;