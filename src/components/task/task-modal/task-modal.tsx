import React, { useState, ChangeEvent, FormEvent } from 'react';
import Modal from '../../modal';
import Controls from '../../controls';
import Input from '../../input';
import { useAppContext } from '../../../context/app-context';
import { Task } from '../../../utils/constants';
import './task-modal.styles.scss';

interface TaskModalProps {
	task: Task;
	isModalOpen: boolean;
	close: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
	task,
	isModalOpen,
	close,
}) => {
	const { updateTask } = useAppContext();
	const [currentTask, setCurrentTask] = useState<Task>(task);

	const handleChangeField = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setCurrentTask((values) => ({ ...values, [name]: value }));
	};

	const handleChangeSubtaskField = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const updatedSubtasks = currentTask.subtasks.map((curSubtask) => {
			return curSubtask.id === name
				? { ...curSubtask, title: value }
				: curSubtask;
		});

		setCurrentTask({ ...currentTask, subtasks: updatedSubtasks });
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		close();
		updateTask(currentTask);
	};

	return (
		<Modal
			title={task.title}
			isOpen={isModalOpen}
			closeModalHandler={close}
			modifier='task-modal'
		>
			<form onSubmit={handleSubmit}>
				<Controls type='stretch'>
					{task.type !== 'backlog' && (
						<Input
							type='radio'
							id='type'
							onChange={handleChangeField}
							value='backlog'
							label='Backlog'
							labelClass='btn secondary'
						/>
					)}
					{task.type !== 'todo' && (
						<Input
							type='radio'
							id='type'
							onChange={handleChangeField}
							value='todo'
							label='ToDo'
							labelClass='btn danger'
						/>
					)}
					{task.type !== 'inProgress' && (
						<Input
							type='radio'
							id='type'
							onChange={handleChangeField}
							value='inProgress'
							label='In Progress'
							labelClass='btn success'
						/>
					)}
					{task.type !== 'done' && (
						<Input
							type='radio'
							id='type'
							onChange={handleChangeField}
							value='done'
							label='Done'
							labelClass='btn primary'
						/>
					)}
				</Controls>
				<Input
					type='text'
					id='title'
					onChange={handleChangeField}
					value={currentTask.title}
					label='Title:'
					autoFocus
				/>
				<Input
					type='textarea'
					id='description'
					onChange={handleChangeField}
					value={currentTask.description}
					label='Description:'
				/>
				<Input
					type='text'
					id='estimation'
					onChange={handleChangeField}
					value={currentTask.estimation.value}
					label='Estimation:'
				/>
				{!!currentTask.subtasks?.length &&
					currentTask.subtasks.map(
						(subtask, idx) =>
							subtask.title && (
								<Input
									key={subtask.id}
									type='text'
									id={subtask.id}
									onChange={handleChangeSubtaskField}
									value={subtask.title}
									label={idx === 0 && 'Subtasks:'}
								/>
							)
					)}
				<Controls type='right'>
					<button className='btn secondary' type='button' onClick={close}>
						Cancel
					</button>
					<button className='btn success' type='submit'>
						Submit
					</button>
				</Controls>
			</form>
		</Modal>
	);
};

// import { useState } from 'react';
// import Modal from '../../modal';
// import Controls from '../../controls';
// import { useAppContext } from '../../../context/app-context';
// import './task-modal.styles.scss';
// import Input from '../../input';

// export const TaskModal = ({ task, isModalOpen, close }) => {
// 	const { updateTask } = useAppContext();
// 	const [currentTask, setCurrentTask] = useState(task);

// 	const handleChangeField = ({ target: { name, value } }) => {
// 		setCurrentTask((values) => ({ ...values, [name]: value }));
// 	};

// 	const handleChangeSubtaskField = ({ target: { name, value } }) => {
// 		const updatedSubtasks = currentTask.subtasks.map((curSubtask) => {
// 			return curSubtask.id === name
// 				? { ...curSubtask, title: value }
// 				: curSubtask;
// 		});

// 		setCurrentTask({ ...currentTask, subtasks: updatedSubtasks });
// 	};

// 	const handleSubmit = (event) => {
// 		event.preventDefault();
// 		close();
// 		updateTask(currentTask);
// 	};

// 	return (
// 		<Modal
// 			title={task.title}
// 			isOpen={isModalOpen}
// 			closeModalHandler={close}
// 			modifier='task-modal'
// 		>
// 			<form onSubmit={(e) => handleSubmit(e)}>
// 				<Controls type='stretch'>
// 					{task.type !== 'backlog' && (
// 						<Input
// 							type='radio'
// 							id='type'
// 							onChange={handleChangeField}
// 							value='backlog'
// 							label='Backlog'
// 							labelClass='btn secondary'
// 						/>
// 					)}
// 					{task.type !== 'todo' && (
// 						<Input
// 							type='radio'
// 							id='type'
// 							onChange={handleChangeField}
// 							value='todo'
// 							label='ToDo'
// 							labelClass='btn danger'
// 						/>
// 					)}
// 					{task.type !== 'inProgress' && (
// 						<Input
// 							type='radio'
// 							id='type'
// 							onChange={handleChangeField}
// 							value='inProgress'
// 							label='In Progress'
// 							labelClass='btn success'
// 						/>
// 					)}
// 					{task.type !== 'done' && (
// 						<Input
// 							type='radio'
// 							id='type'
// 							onChange={handleChangeField}
// 							value='done'
// 							label='Done'
// 							labelClass='btn primary'
// 						/>
// 					)}
// 				</Controls>
// 				<Input
// 					type='text'
// 					id='title'
// 					onChange={handleChangeField}
// 					value={currentTask.title}
// 					label='Title:'
// 					autoFocus
// 				/>
// 				<Input
// 					type='textarea'
// 					id='description'
// 					onChange={handleChangeField}
// 					value={currentTask.description}
// 					label='Description:'
// 				/>
// 				<Input
// 					type='text'
// 					id='estimation'
// 					onChange={handleChangeField}
// 					value={currentTask.estimation.value}
// 					label='Estimation:'
// 				/>
// 				{!!currentTask.subtasks?.length &&
// 					currentTask.subtasks.map(
// 						(subtask, idx) =>
// 							subtask.title && (
// 								<Input
// 									key={subtask.id}
// 									type='text'
// 									id={subtask.id}
// 									onChange={handleChangeSubtaskField}
// 									value={subtask.title}
// 									label={idx === 0 && 'Subtasks:'}
// 								/>
// 							)
// 					)}
// 				<Controls type='right'>
// 					<button className='btn secondary' type='button' onClick={close}>
// 						Cancel
// 					</button>
// 					<button className='btn success' type='submit'>
// 						Submit
// 					</button>
// 				</Controls>
// 			</form>
// 		</Modal>
// 	);
// };
