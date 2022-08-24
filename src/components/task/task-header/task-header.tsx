import React from 'react';
import Controls from '../../controls';
import { useAppContext } from '../../../context/app-context';
import './task-header.styles.scss';

export const TaskHeader = ({ task }) => {
	const { updateTask, deleteTask } = useAppContext();

	const moveTo = (event, type) => {
		event.stopPropagation();
		const updatedTask = { ...task, type };
		updateTask(updatedTask);
	};

	const remove = (event) => {
		event.stopPropagation();
		deleteTask(task.id);
	}

	return (
		<header className="task-header">
			<Controls type="right">
				{task.type !== 'backlog' && (
					<button
						className="circle-btn secondary"
						onClick={(event) => moveTo(event, 'backlog')}
						aria-label="move task to backlog"
					></button>
				)}
				{task.type !== 'todo' && (
					<button
						className="circle-btn danger"
						onClick={(event) => moveTo(event, 'todo')}
						aria-label="move task to todo"
					></button>
				)}
				{task.type !== 'inProgress' && (
					<button
						className="circle-btn success"
						onClick={(event) => moveTo(event, 'inProgress')}
						aria-label="move task to in progress"
					></button>
				)}
				{task.type !== 'done' && (
					<button
						className="circle-btn primary"
						onClick={(event) => moveTo(event, 'done')}
						aria-label="move task to done"
					></button>
				)}
				{task.type === 'done' && (
					<button
						className="circle-btn cross"
						onClick={(event) => remove(event)}
						aria-label="remove task"
					></button>
				)}
			</Controls>
		</header>
	);
};
