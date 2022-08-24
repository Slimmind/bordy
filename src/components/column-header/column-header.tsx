import { useState } from 'react';
import { clsx } from 'clsx';
import { nanoid } from 'nanoid';
import Modal from '../modal';
import Controls from '../controls';
import { useAppContext } from '../../context/app-context';
import { estimationToMinutes } from '../../utils/estimation-to-minutes';
import './column-header.styles.scss';
import Input from '../input';

type ColumnHeaderProps = {
	type: string;
	itemsAmount: number;
};

export const ColumnHeader = ({ type, itemsAmount }: ColumnHeaderProps) => {
	const { createTask } = useAppContext();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [subtasks, setSubtasks] = useState([
		{
			id: 'subtask-1',
			title: '',
			done: false,
		},
	]);
	const [inputs, setInputs] = useState({
		title: '',
		description: '',
		subtasks: [],
		duration: '',
		estimation: {
			value: '',
		},
	});

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleChange = ({ target }) => {
		const name = target.name;
		const value = target.value;
		setInputs({ ...inputs, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsModalOpen(false);
		const estimatedTime = estimationToMinutes(inputs.estimation);
		const newTask = {
			id: nanoid(),
			creationDate: Date.now(),
			type: 'backlog',
			title: inputs.title,
			description: inputs.description,
			highlighted: false,
			subtasks,
			estimation: {
				value: inputs.estimation,
				total: estimatedTime,
				spent: 0,
				remaining: estimatedTime,
				overtime: 0,
			},
		};

		console.log('NEW: ', newTask);

		createTask(newTask);
	};

	const addSubTaskField = () => {
		const newSubtask = {
			id: `subtask-${subtasks.length + 1}`,
			title: '',
			done: false,
		};
		setSubtasks((prevSubtasks) => [...prevSubtasks, newSubtask]);
	};

	const handleSubtasks = (e, id) => {
		setSubtasks((subtasks) =>
			subtasks.map((subtask) => {
				if (subtask.id === id) {
					return { ...subtask, title: e.target.value };
				}
				return subtask;
			})
		);
	};

	return (
		<>
			<header className={clsx('column-header', type)}>
				<div>
					<strong>{type}</strong>
					<span>
						{itemsAmount} {itemsAmount === 1 ? 'item' : 'items'}
					</span>
				</div>
				{type === 'backlog' && (
					<>
						<button
							className='circle-btn success add'
							aria-label='add item'
							onClick={openModal}
						></button>
					</>
				)}
			</header>
			<Modal
				title='Create task'
				isOpen={isModalOpen}
				closeModalHandler={closeModal}
			>
				<form onSubmit={(e) => handleSubmit(e)}>
					<Input
						id='title'
						placeholder='Title...'
						onChange={handleChange}
						value={inputs.title}
						autoFocus
					/>
					<Input
						type='textarea'
						id='description'
						placeholder='Description...'
						onChange={handleChange}
						value={inputs.description}
					/>
					<section className='subtask-section'>
						{subtasks.map((subtask) => (
							<Input
								key={subtask.id}
								id={subtask.id}
								placeholder='Subtask...'
								value={subtask.title}
								onChange={(e) => handleSubtasks(e, subtask.id)}
							/>
						))}
						<button
							type='button'
							className='circle-btn success add'
							aria-label='add item'
							onClick={addSubTaskField}
						></button>
					</section>
					<Input
						id='estimation'
						placeholder='Estimation (1w 2d 3h 4m)'
						onChange={handleChange}
					/>
					<Controls type='right'>
						<button
							className='btn secondary'
							type='button'
							onClick={closeModal}
						>
							Cancel
						</button>
						<button className='btn success' type='submit'>
							Submit
						</button>
					</Controls>
				</form>
			</Modal>
		</>
	);
};
