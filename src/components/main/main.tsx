import React from 'react';
import { clsx } from 'clsx';
import './main.styles.scss';
import { useAppContext } from '../../context/app-context';

export const Main = ({ children }) => {
	const { settings } = useAppContext();

	return (
		<main className={clsx({ dark: settings.darkMode })
		}>
			<div className="container">{children}</div>
		</main >
	);
};
