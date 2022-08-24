import { useState } from 'react';
import { clsx } from 'clsx';
import Modal from '../modal';
import Chart from '../chart';
import Input from '../input';
import { LogoIcon } from '../../icons/icon-logo';
import { StatsIcon } from '../../icons/icon-stats';
import { SunIcon } from '../../icons/icon-sun';
import { CalendarIcon } from '../../icons/icon-calendar';
import { MoonIcon } from '../../icons/icon-moon';
import { useAppContext } from '../../context/app-context';
import './header.styles.scss';

export const Header = () => {
	const { settings, toggleTheme, tasks, updateAllTasks } = useAppContext();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const searchTask = ({ target }) => {
		const searchResults = tasks.map((item) => {
			item.highlighted =
				!!target.value &&
				item.title.toLowerCase().includes(target.value.toLowerCase());
			return item;
		});

		updateAllTasks(searchResults);
	};

	return (
		<>
			<header className={clsx('main-header', { dark: settings.darkMode })}>
				<div className='container'>
					<h1 className='header-logo'>
						<LogoIcon />
					</h1>
					<div className='header-search'>
						<Input
							type='search'
							id='search'
							placeholder='Search'
							onChange={searchTask}
						/>
					</div>
					<nav>
						<ul>
							<li>
								<button>
									<CalendarIcon />
								</button>
							</li>
							<li>
								<button onClick={openModal}>
									<StatsIcon />
								</button>
							</li>
							<li>
								<button onClick={toggleTheme}>
									{settings.darkMode ? <SunIcon /> : <MoonIcon />}
								</button>
							</li>
							<li></li>
						</ul>
					</nav>
				</div>
			</header>
			<Modal
				title='Diagram'
				isOpen={isModalOpen}
				closeModalHandler={closeModal}
			>
				<Chart data={tasks} />
			</Modal>
		</>
	);
};
