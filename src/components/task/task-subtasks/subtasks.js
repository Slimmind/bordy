import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { store } from '../../../atoms';
import classNames from 'classnames';
import './subtasks.styles.scss';

export const Subtasks = ({ task }) => {
  const [taskList, setTaskList] = useRecoilState(store);
  const [collapsed, setCollapsed] = useState(true);

  const toggleSubtask = (event, subtask) => {
    event.stopPropagation();
    const updatedSubtasks = task.subtasks.map((listItem) =>
      listItem.id === subtask.id
        ? { ...listItem, done: !listItem.done }
        : listItem
    );
    const updatedTask = { ...task, subtasks: updatedSubtasks };
    const updatedTasks = taskList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTaskList(() => updatedTasks);
  };

  const toggleCollapse = (event) => {
    event.stopPropagation();
    setCollapsed(!collapsed);
  };

  return (
    <>
      {task.subtasks.length > 0 && (
        <div className={classNames('subtasks', { collapsed: collapsed })}>
          {task.subtasks.length > 1 && (
            <button
              className="collapse-btn"
              onClick={(event) => toggleCollapse(event)}
            ></button>
          )}
          <ul className={classNames('subtask-list', { collapsed: collapsed })}>
            {task.subtasks.map((subtask) => (
              <li
                className={classNames('subtask', { done: subtask.done })}
                key={subtask.id}
              >
                <button
                  className="circle-btn"
                  onClick={(event) => toggleSubtask(event, subtask)}
                ></button>
                <small>{subtask.title}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
