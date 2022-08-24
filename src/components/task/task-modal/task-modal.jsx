import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { store } from '../../../atoms';
import Modal from '../../modal';
import Input from '../../input';
import Controls from '../../controls';
import './task-modal.styles.scss';

export const TaskModal = ({ task, isModalOpen, close }) => {
  const [taskList, setTaskList] = useRecoilState(store);
  const [currentTask, setCurrentTask] = useState(task);

  const handleChangeField = ({ target: { name, value } }) => {
    setCurrentTask((values) => ({ ...values, [name]: value }));
  };

  const handleChangeSubtaskField = ({ target: { name, value } }) => {
    const updatedSubtasks = currentTask.subtasks.map((curSubtask) => {
      return curSubtask.id === name
        ? { ...curSubtask, title: value }
        : curSubtask;
    });

    setCurrentTask({ ...currentTask, subtasks: updatedSubtasks });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    close();
    const updatedTasks = taskList.map((task) =>
      task.id === currentTask.id ? currentTask : task
    );
    setTaskList(() => updatedTasks);
  };

  return (
    <Modal
      title={task.title}
      isOpen={isModalOpen}
      closeModalHandler={close}
      modifier="task-modal"
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <Controls type="stretch">
          {task.type !== 'backlog' && (
            <Input
              type="radio"
              name="type"
              changeHandler={handleChangeField}
              value="backlog"
              label="Backlog"
              labelClass="btn secondary"
            />
          )}
          {task.type !== 'todo' && (
            <Input
              type="radio"
              name="type"
              changeHandler={handleChangeField}
              value="todo"
              label="ToDo"
              labelClass="btn danger"
            />
          )}
          {task.type !== 'inProgress' && (
            <Input
              type="radio"
              name="type"
              changeHandler={handleChangeField}
              value="inProgress"
              label="In Progress"
              labelClass="btn success"
            />
          )}
          {task.type !== 'done' && (
            <Input
              type="radio"
              name="type"
              changeHandler={handleChangeField}
              value="done"
              label="Done"
              labelClass="btn primary"
            />
          )}
        </Controls>
        <Input
          type="text"
          name="title"
          changeHandler={handleChangeField}
          value={currentTask.title}
          label="Title:"
          autoFocus
        />
        <Input
          type="textarea"
          name="description"
          changeHandler={handleChangeField}
          value={currentTask.description}
          label="Description:"
        />
        <Input
          type="text"
          name="estimation"
          changeHandler={handleChangeField}
          value={currentTask.estimation.value}
          label="Estimation:"
        />
        {currentTask.subtasks.length > 0 &&
          currentTask.subtasks.map((subtask, idx) => (
            <Input
              key={subtask.id}
              type="text"
              name={subtask.id}
              changeHandler={handleChangeSubtaskField}
              value={subtask.title}
              label={idx === 0 && 'Subtasks:'}
            />
          ))}
        <Controls type="right">
          <button className="btn secondary" type="button" onClick={close}>
            Cancel
          </button>
          <button className="btn success" type="submit">
            Submit
          </button>
        </Controls>
      </form>
    </Modal>
  );
};
