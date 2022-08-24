import React from 'react';
import { useModal } from '../../hooks';
import classNames from 'classnames';
import TaskHeader from './task-header';
import TaskModal from './task-modal';
import Subtasks from './task-subtasks';
import TaskEstimation from './task-estimation';
import { TimerIcon } from '../../icons/icon-timer';

import './task.styles.scss';

export const Task = ({ task }) => {
  const { id, type, title, description, run, highlighted } = task;
  const [isModalOpen, openModal, closeModal] = useModal();

  return (
    <>
      <li
        className={classNames('task', type, {
          highlighted: highlighted,
        })}
        id={id}
        onClick={openModal}
      >
        {run && (
          <div className="run-task-marker">
            <TimerIcon />
          </div>
        )}
        <TaskHeader task={task} />
        <h4 className="task-title">{title}</h4>
        <div className="task-description">
          <p>{description}</p>
        </div>
        <Subtasks task={task} />
        <TaskEstimation task={task} />
      </li>
      <TaskModal task={task} isModalOpen={isModalOpen} close={closeModal} />
    </>
  );
};
