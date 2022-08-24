import { useEffect, useState } from 'react';

export const useEstimation = (task) => {
	const [spentTime, setSpentTime] = useState(task.estimation.spent);
	const [overtimeVal, setOvertimeVal] = useState(task.estimation.overtime);
	const [remainingVal, setRemainingVal] = useState(task.estimation.remaining);

	useEffect(() => {
		let interval;
		if (task.run) {
			interval = setInterval(() => {
				setSpentTime((prev) => prev + 1);
				setRemainingVal((prev) => prev - 1);
				if (spentTime > task.estimation.total) {
					setOvertimeVal((prev) => prev + 1);
				}
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [task.run, spentTime, task.estimation.total]);

	return {
		spentTime,
		setSpentTime,
		overtimeVal,
		setOvertimeVal,
		remainingVal,
		setRemainingVal,
	};
};
