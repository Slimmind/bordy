import React from 'react';
import './styles.scss'
import Task from '../task';

export const Column = ({ type, tasks }) => {
  return (
    <div className={`column ${type}`}>
      <ul className="task-list">
        { tasks.map(task => (
          <Task task={task} key={task.id} />
        ))}
      </ul>
    </div>
  );
}