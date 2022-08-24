import { clsx } from 'clsx';
import { useAppContext } from '../../context/app-context';
import { PropsWithChildren } from 'react';
import './modal.styles.scss';

type ModalProps = {
	title: string;
	isOpen: boolean;
	closeModalHandler: () => void;
	modifier: string;
} & PropsWithChildren;

export const Modal = ({
	title,
	isOpen,
	closeModalHandler,
	children,
	modifier,
}: ModalProps) => {
	const { settings } = useAppContext();
	const closeModal = () => {
		closeModalHandler();
	};

	return (
		<dialog
			open={isOpen}
			className={clsx('modal-wrap', { dark: settings.darkMode }, modifier)}
		>
			<div className='modal-overlay' onClick={closeModal} />
			<div className='modal'>
				<header className='modal-header'>
					{title && <h2>{title}</h2>}
					<button
						className='circle-btn danger close'
						aria-label='close modal button'
						onClick={closeModal}
					></button>
				</header>
				<div className='modal-content'>{children}</div>
			</div>
		</dialog>
	);
};
