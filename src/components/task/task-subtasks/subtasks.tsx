import React, { useState } from 'react';
import { clsx } from 'clsx';
import './subtasks.styles.scss';
import { useAppContext } from '../../../context/app-context';

export const Subtasks = ({ task }) => {
	const { updateTask } = useAppContext();
	const [collapsed, setCollapsed] = useState(true);

	const toggleSubtask = (event, subtask) => {
		event.stopPropagation();
		const updatedSubtasks = task.subtasks.map((listItem) =>
			listItem.id === subtask.id
				? { ...listItem, done: !listItem.done }
				: listItem
		);
		const updatedTask = { ...task, subtasks: updatedSubtasks };
		updateTask(updatedTask);
	};

	const toggleCollapse = (event) => {
		event.stopPropagation();
		setCollapsed(!collapsed);
	};

	return (
		<>
			{!!task.subtasks?.length && (
				<div className={clsx('subtasks', { collapsed: collapsed })}>
					{task.subtasks.length > 1 && (
						<button
							className="collapse-btn"
							onClick={(event) => toggleCollapse(event)}
						></button>
					)}
					<ul className={clsx('subtask-list', { collapsed: collapsed })}>
						{task.subtasks.map((subtask) => subtask.title && (
							<li
								className={clsx('subtask', { done: subtask.done })}
								key={subtask.id}
							>
								<button
									className="circle-btn"
									onClick={(event) => toggleSubtask(event, subtask)}
								></button>
								<small>{subtask.title}</small>
							</li >
						))}
					</ul >
				</div >
			)}
		</>
	);
};
