import React from 'react';
import { useRecoilState } from 'recoil';
import { store } from '../../../atoms';
import Controls from '../../controls';
import './task-header.styles.scss';

export const TaskHeader = ({ task }) => {
  const [taskList, setTaskList] = useRecoilState(store);

  const moveTo = (event, type) => {
    event.stopPropagation();
    const updatedTask = { ...task, type };
    const updatedTasks = taskList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTaskList(() => updatedTasks);
  };

  return (
    <header className="task-header">
      <Controls type="right">
        {task.type !== 'backlog' && (
          <button
            className="circle-btn secondary"
            onClick={(event) => moveTo(event, 'backlog')}
          ></button>
        )}
        {task.type !== 'todo' && (
          <button
            className="circle-btn danger"
            onClick={(event) => moveTo(event, 'todo')}
          ></button>
        )}
        {task.type !== 'inProgress' && (
          <button
            className="circle-btn success"
            onClick={(event) => moveTo(event, 'inProgress')}
          ></button>
        )}
        {task.type !== 'done' && (
          <button
            className="circle-btn primary"
            onClick={(event) => moveTo(event, 'done')}
          ></button>
        )}
      </Controls>
    </header>
  );
};
