import React from 'react';
import Column from '../column';
import './styles.scss';

export const ColumnWrap = ({ tasks }) => {
  const {available, inProgress, done} = tasks.reduce((list, task) => {
    const {type} = task;
    list[type] = list[type] ?? [];
    list[type].push(task);
    return list;
  }, {});

  return (
    <div className='column-wrap'>
      <Column type="available" tasks={available} />
      <Column type="in-progress" tasks={inProgress} />
      <Column type="done" tasks={done} />
    </div>
  );
}