import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { store } from '../../../atoms';
import Controls from '../../controls';
import { PlayIcon } from '../../../icons/icon-play';
import { PauseIcon } from '../../../icons/icon-pause';
import './task-estimation.styles.scss';

export const TaskEstimation = ({ task }) => {
  const [taskList, setTaskList] = useRecoilState(store);
  const { value, total, spent, remaining, overtime } = task.estimation;
  const [spentTime, setSpentTime] = useState(spent);
  const [overtimeVal, setOvertimeVal] = useState(overtime);
  const [remainingVal, setRemainingVal] = useState(remaining);
  const progressIndex = ((spentTime - overtime * 2) / total) * 100;
  const overtimeIndex = (overtimeVal / total) * 100;

  useEffect(() => {
    if (task.run) {
      const interval = setInterval(() => {
        setSpentTime(spentTime => spentTime + 1);
        setRemainingVal(remainingVal => remainingVal - 1);
        if (spentTime > total) {
          setOvertimeVal(overtimeVal => overtimeVal + 1);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  });

  const toggleRunTask = (event) => {
    event.stopPropagation();
    const updatedEstimation = {
      ...task.estimation,
      spent: spentTime,
      remaining: remainingVal,
      overtime: overtimeVal
    }
    const updatedTask = { ...task, run: !task.run, estimation: updatedEstimation };
    const updatedTasks = taskList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTaskList(() => updatedTasks);
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
      {spent && (
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
            <span className="spent">Spent: {spentTime}</span>
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
