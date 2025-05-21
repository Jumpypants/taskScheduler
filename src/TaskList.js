import React, { useState } from 'react';
import TaskRow from './TaskRow';
import { is } from 'date-fns/locale';

function TaskList({ tasks, onCheck }) {
  const [showTodayOnly, setShowTodayOnly] = useState(true);

  const filteredTasks = showTodayOnly
    ? tasks.filter((task) => isSameDay(new Date(task.scheduledDate), new Date()))
    : tasks;
  console.log ('Filtered Tasks:', filteredTasks);

  return (
    <div style={{ border: '1px solid black', padding: '16px', marginBottom: '16px', borderRadius: '8px', backgroundColor: 'rgb(57, 62, 70)', color: 'white' }}>
      {/* Toggle Switch */}
      <div style={{ marginBottom: '16px' }}>
        <label>
          <input
            type="checkbox"
            checked={showTodayOnly}
            onChange={() => setShowTodayOnly(!showTodayOnly)}
            style={{ width : '20px', height: '20px', marginRight: '8px' }}
          />
          Today Only
        </label>
      </div>

      {/* Header Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr auto',
          gap: '8px',
          fontWeight: 'bold',
          padding: '8px',
        }}
      >
        <div>Name</div>
        <div>Required Time</div>
        <div>Due Date</div>
      </div>

      {/* Task Rows */}
      {filteredTasks.map((task) =>
        task.finished ? null : <TaskRow key={task.name} task={task} onCheck={onCheck} />
      )}
    </div>
  );
}

function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}


export default TaskList;
