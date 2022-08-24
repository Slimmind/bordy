import React from 'react';
import classNames from 'classnames';
import './column.styles.scss';
import ColumnHeader from '../column-header';
import Task from '../task';

export const Column = ({ type, tasks }) => {
  return (
    <div className={classNames('column', type)}>
      <ColumnHeader type={type} itemsAmount={tasks ? tasks.length : 0} />
      {tasks && (
        <ul className="task-list">
          {tasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </ul>
      )}
    </div>
  );
};
