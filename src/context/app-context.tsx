import {
	createContext,
	useState,
	useEffect,
	useContext,
	PropsWithChildren,
} from 'react';
import { AppState, Task } from '../utils/constants';

const initialContext = {
	settings: { darkMode: true },
	tasks: [
		{
			id: '1',
			type: 'backlog',
			title: 'Welcome Task :)',
			description: 'Description',
			run: false,
			highlighted: false,
			subtasks: [],
			estimation: {
				value: '1h',
				total: 60,
				spent: 0,
				remaining: 60,
				overtime: 0,
			},
		},
	],
};

const loadState = () => {
	try {
		const serializedState = localStorage.getItem('appState');
		if (serializedState === null) {
			return initialContext;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return initialContext;
	}
};

export const AppContext = createContext(initialContext);

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within an AppContextProvider');
	}
	return context;
};

export const AppContextProvider = ({ children }: PropsWithChildren) => {
	const [contextState, setContextState] = useState(loadState());

	useEffect(() => {
		try {
			const serializedState = JSON.stringify(contextState);
			localStorage.setItem('appState', serializedState);
		} catch (err) {
			console.log('ERROR! ', err);
		}
	}, [contextState]);

	const contextMethods = {
		toggleTheme: () => {
			setContextState((prevState: AppState) => ({
				...prevState,
				settings: {
					...prevState.settings,
					darkMode: !prevState.settings.darkMode,
				},
			}));
		},
		createTask: (task: Task) => {
			setContextState((prevState: AppState) => ({
				...prevState,
				tasks: [...prevState.tasks, task],
			}));
		},
		updateTask: (updatedTask: Task) => {
			setContextState((prevState: AppState) => {
				const updatedTasks = prevState.tasks.map((task: Task) =>
					task.id === updatedTask.id ? updatedTask : task
				);
				return {
					...prevState,
					tasks: updatedTasks,
				};
			});
		},
		deleteTask: (taskId: string) => {
			setContextState((prevState: AppState) => ({
				...prevState,
				tasks: prevState.tasks.filter((task: Task) => task.id !== taskId),
			}));
		},
		updateAllTasks: (updatedTasks: Task[]) => {
			setContextState((prevState: Task[]) => ({
				...prevState,
				tasks: updatedTasks,
			}));
		},
	};

	return (
		<AppContext.Provider value={{ ...contextState, ...contextMethods }}>
			{children}
		</AppContext.Provider>
	);
};
