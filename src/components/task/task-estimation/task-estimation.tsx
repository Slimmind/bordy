import { useEffect, useState } from 'react';
import Controls from '../../controls';
import { PlayIcon } from '../../../icons/icon-play';
import { PauseIcon } from '../../../icons/icon-pause';
import { useAppContext } from '../../../context/app-context';
import './task-estimation.styles.scss';

export const TaskEstimation = ({ task }) => {
	const { updateTask } = useAppContext();
	const { value, total, spent, remaining, overtime } = task.estimation;
	const [spentTimeVal, setSpentTimeVal] = useState(spent);
	const [overtimeVal, setOvertimeVal] = useState(overtime);
	const [remainingVal, setRemainingVal] = useState(remaining);
	const progressIndex = ((spentTimeVal - overtimeVal * 2) / total) * 100;
	const overtimeIndex = (overtimeVal / total) * 100;

	useEffect(() => {
		if (task.run) {
			const interval = setInterval(() => {
				setSpentTimeVal(spentTimeVal => spentTimeVal + 1);
				setRemainingVal(remainingVal => remainingVal > 0 ? remainingVal - 1 : 0);
				if (remainingVal === 0) {
					setOvertimeVal(overtimeVal => overtimeVal + 1);
				}
			}, 60000);
			return () => clearInterval(interval);
		}
	});

	const toggleRunTask = (event) => {
		event.stopPropagation();
		const updatedEstimation = {
			...task.estimation,
			spent: spentTimeVal,
			remaining: remainingVal,
			overtime: overtimeVal
		}
		const updatedTask = { ...task, run: !task.run, estimation: updatedEstimation };
		updateTask(updatedTask);
	};

	return (
		<div className="task-estimation">
			<div className="task-estimation-header">
				<p className="value">
					Estimation: <strong>{value}</strong>
				</p>
				{task.type === 'inProgress' && (
					<Controls>
						<button onClick={toggleRunTask}>
							{task.run ? <PauseIcon /> : <PlayIcon />}
						</button>
					</Controls>
				)}
			</div>
			{(!!spent || task.run) && (
				<>
					<div className="progress-bar">
						<div
							className="progress"
							style={{ width: `${progressIndex}%` }}
						></div>
						<div
							className="overtime"
							style={{ width: `${overtimeIndex}%` }}
						></div>
					</div>
					<div className="progress-values">
						<span className="spent">Spent: {spentTimeVal}</span>
						{remainingVal > 0 && (
							<span className="remaining">Remaining: {remainingVal}</span>
						)}
						{!!overtimeVal && <span className="over">Over: {overtimeVal}</span>}
					</div>
				</>
			)}
		</div>
	);
};
