import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Calendar from './Calendar';
import FreeTimeGraph from './FreeTimeGraph';

function App() {
  const [tasks, setTasks] = useState([]);
  const [freeTime, setFreeTime] = useState([]);
  const [availableTime, setAvailableTime] = useState([]);

  const deleteFinishedTasks = async () => {
    await fetch('http://localhost:4567/deleteFinishedTasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: ''
    });
    // Refetch tasks after deletion
    fetchTasks();
    fetchFreeTime();
    fetchAvailableTime();
  };

  const fetchTasks = () => {
    fetch('http://localhost:4567/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  };

  const fetchFreeTime = () => {
    fetch('http://localhost:4567/freeTime')
      .then(res => res.json())
      .then(data => setFreeTime(data))
      .catch(err => console.error('Error fetching free time:', err));
  }

  const fetchAvailableTime = () => {
    fetch('http://localhost:4567/availableTime')
      .then(res => res.json())
      .then(data => setAvailableTime(data))
      .catch(err => console.error('Error fetching available time:', err));
  }

  useEffect(() => {
    fetchTasks();
    fetchFreeTime();
    fetchAvailableTime();
  }, []);

  const handleCheck = async (taskName) => {
    await fetch('http://localhost:4567/deleteTask', {
      method: 'DELETE',
      headers: { 'Content-Type': 'text/plain' },
      body: taskName
    });

    // Refetch tasks after deletion
    fetchTasks();
    fetchFreeTime();
    fetchAvailableTime();
  };

  const addTask = async (task) => {
    await fetch('http://localhost:4567/addTask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    });

    // Refetch tasks after adding a new one
    fetchTasks();
    fetchFreeTime();
    fetchAvailableTime();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh', backgroundColor: 'rgb(34, 40, 49)' }}>
      <div style={{ width: '30%', padding: '20px', overflowY: 'auto', borderRight: '1px solid rgb(57, 62, 70)', resize: 'horizontal'}}>
        <TaskForm onTaskAdded={addTask} />
        <TaskList tasks={tasks} onCheck={handleCheck}/>
        <button
          onClick={deleteFinishedTasks}
          style={{
            padding: '10px 20px',
            backgroundColor: 'rgb(255, 88, 88)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Delete All Finished Tasks
        </button>
      </div>
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <FreeTimeGraph freeTime={freeTime} availableTime={availableTime} />
        <Calendar tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
