import { PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import './controls.styles.scss';

type ControlsProps = {
	type: string;
} & PropsWithChildren;

export const Controls = ({ type, children }: ControlsProps) => (
	<div className={clsx('controls', type)}> {children}</div>
);
