import React, { useState } from 'react';

// Helper to get local date in YYYY-MM-DD
function getLocalDateString() {
  const now = new Date();
  return now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' +
    String(now.getDate()).padStart(2, '0');
}

function TaskForm({ onTaskAdded }) {
  const [task, setTask] = useState({
    name: '',
    description: '',
    requiredTime: 30,
    startDate: getLocalDateString(),
    dueDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onTaskAdded(task);
    setTask({
      name: '',
      description: '',
      requiredTime: 30,
      startDate: getLocalDateString(),
      dueDate: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column', 
      gap: '16px', 
      padding: '15px', 
      border: '1px solid black', 
      borderRadius: '8px', 
      backgroundColor: 'rgb(57, 62, 70)',
    }}>
      <input
        type="text"
        name="name"
        placeholder="Task Name"
        value={task.name}
        onChange={handleInputChange}
        required
        style={{padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px', backgroundColor: 'rgb(34, 40, 49)', color: 'white'}}
        autoComplete='off'
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleInputChange}
        style={{resize: 'vertical', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px', backgroundColor: 'rgb(34, 40, 49)', color: 'white'}}
      />
      <label style={{ display: 'flex', flexDirection: 'column', fontSize: '14px', color: 'white' }}>
        Required Time (In Minutes):
        <input
          type="number"
          name="requiredTime"
          value={task.requiredTime}
          onChange={handleInputChange}
          required
          style={{padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', marginTop: '4px', backgroundColor: 'rgb(34, 40, 49)', color: 'white'}}
        />
      </label>
      <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
        <label style={{ flex: '1', fontSize: '14px', color: 'white' }}>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={task.startDate}
            onChange={handleInputChange}
            required
            style={{width: '90%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', marginTop: '4px', backgroundColor: 'rgb(34, 40, 49)', color: 'white'}}
          />
        </label>
        <label style={{ flex: '1', fontSize: '14px', color: 'white' }}>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleInputChange}
            required
            style={{width: '90%',padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', marginTop: '4px', backgroundColor: 'rgb(34, 40, 49)', color: 'white'}}
          />
        </label>
      </div>
      <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#007bff', color: '#fff', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s' }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
