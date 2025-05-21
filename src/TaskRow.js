import React, { useState, useRef, useEffect } from 'react';

function TaskRow({ task, onCheck }) {
  const [hovered, setHovered] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const contentRef = useRef(null);
  const containerRef = useRef(null);

  const handleDoneClick = () => {
    setIsRemoving(true);
    setTimeout(() => onCheck(task.name), 300); // Match transition time
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr auto',
        gap: '8px',
        padding: '8px',
        marginBottom: isRemoving ? '0px' : '8px',
        backgroundColor: 'rgb(223, 208, 184)',
        transition: 'max-height 0.3s ease, opacity 0.3s ease, margin 0.3s ease',
        maxHeight: isRemoving ? 0 : 200,
        opacity: isRemoving ? 0 : 1,
        overflow: 'hidden',
        borderRadius: '4px',
        color : 'black',
      }}
    >
      <div style={cellStyle}><strong>{task.name}</strong></div>
      <div style={cellStyle}>
        {Math.floor(task.requiredTime / 60)}h {task.requiredTime % 60}m
      </div>
      <div style={cellStyle}>{task.dueDate}</div>
      <div style={cellStyle}>
        <button
          onClick={handleDoneClick}
          style={{
            padding: '4px 8px',
            backgroundColor: 'rgb(4, 79, 25)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Done
        </button>
      </div>

      {/* Hover Details */}
      <div
        ref={contentRef}
        style={{
          gridColumn: '1 / -1',
          maxHeight: hovered ? contentRef.current?.scrollHeight : 0,
          opacity: hovered ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease',
          backgroundColor: 'rgb(148, 137, 121)',
          padding: hovered ? '8px 12px' : '0 12px',
          borderRadius: '4px',
          color: 'white',
        }}
      >
        <div>
          <strong>Description:</strong> {task.description}
        </div>
        <div>
          <strong>Start Date:</strong> {task.startDate}
        </div>
      </div>
    </div>
  );
}

const cellStyle = {
  padding: '4px 0',
};

export default TaskRow;
