import React from 'react';

function CalendarCell({ date, scheduledTasks }) {

  // Parse date manually to avoid UTC issues
  const [year, month, day] = date.split('-').map(Number);

  // Get today's date in local time, formatted as YYYY-MM-DD
  const today = new Date();
  const todayStr = today.getFullYear() + '-' +
    String(today.getMonth() + 1).padStart(2, '0') + '-' +
    String(today.getDate()).padStart(2, '0');

  const isToday = todayStr === date;

  return (
    <div
      style={{
        padding: '8px',
        border: isToday ? '1px solid rgb(148, 137, 121)' : '1px solid black',
        backgroundColor: isToday ? 'rgb(223, 208, 184)' : 'rgb(57, 62, 70)',
        position: 'relative',
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderRadius: '4px',
        transition: 'transform 0.1s ease-in-out', // Add transition for smooth animation
        color: isToday ? 'black' : 'white',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.zIndex = '10'; // Bring to front on hover
        e.currentTarget.style.transform = 'translateY(-20px)'; // Shift up on hover
        e.currentTarget.style.transform = 'scale(1.1)'; // Scale up on hover
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Add shadow on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.zIndex = '1'; // Reset z-index on mouse leave
        e.currentTarget.style.transform = 'translateY(0)'; // Reset position on mouse leave
        e.currentTarget.style.transform = 'scale(1)'; // Reset scale on mouse leave
        e.currentTarget.style.boxShadow = 'none'; // Remove shadow on mouse leave
      }}
    >
      <strong>{`${day}`}</strong>

      {scheduledTasks.length > 0 && (
        <div
          style={{
            marginTop: '8px',
            borderTop: isToday ? '1px solid black' : '1px solid white',
            paddingTop: '8px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {scheduledTasks.map((task, index) => {
            const isOverdue = new Date(task.dueDate) < new Date() && !task.finished;
            return (
              <div
                key={index}
                style={{
                  marginBottom: '4px',
                  backgroundColor: task.finished ? 'rgb(34, 40, 49)' : 'rgb(148, 137, 121)',
                  padding: '4px',
                  borderRadius: '4px',
                  color: isOverdue ? 'rgb(200, 20, 20)' : (task.finished ? 'black' : 'white'),
                }}
              >
                {task.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CalendarCell;
