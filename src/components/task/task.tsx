import { clsx } from 'clsx';
import { useModal } from '../../hooks';
import TaskHeader from './task-header';
import TaskModal from './task-modal';
import Subtasks from './task-subtasks';
import TaskEstimation from './task-estimation';
import { TimerIcon } from '../../icons/icon-timer';
import { TaskType } from '../../utils/constants';
import './task.styles.scss';

type TaskProps = {
  task: TaskType;
}

const TaskTitle = ({ title }: { title: string }) => (
  <h4 className="task-title">{title}</h4>
);

const TaskDescription = ({ description }: { description: string }) => (
  <div className="task-description">
    <p>{description}</p>
  </div>
);

const RunTaskMarker = ({ run }: { run: boolean }) => (
  run ? (
    <div className="run-task-marker">
      <TimerIcon />
    </div>
  ) : null
);

const TaskContent = ({ task }: { task: TaskType }) => (
  <>
    <TaskHeader task={task} />
    <TaskTitle title={task.title} />
    <TaskDescription description={task.description} />
    <Subtasks task={task} />
    <TaskEstimation task={task} />
  </>
);

export const Task = ({ task }: TaskProps) => {
  const { id, type, highlighted, run } = task;
  const [isModalOpen, openModal, closeModal] = useModal();

  const taskClasses = clsx('task', type, { highlighted });

  return (
    <>
      <li className={taskClasses} id={id} onClick={openModal}>
        <RunTaskMarker run={run} />
        <TaskContent task={task} />
      </li>
      <TaskModal task={task} isModalOpen={isModalOpen} close={closeModal} />
    </>
  );
};
