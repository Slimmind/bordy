import React from 'react';
import './styles.scss';

export const Task = ({ task }) => {
  return (
    <li className='task' id={task.id}>
      <h4 className='title'>{task.title}</h4>
      <div className='description'>
        <p>{task.description}</p>
      </div>
    </li>
  );
}