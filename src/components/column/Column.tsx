import { clsx } from "clsx";
import ColumnHeader from "../column-header";
import Task from "../task";
import { type TaskType } from "../../utils/constants";
import "./column.styles.scss";

type ColumnProps = {
  type: string;
  tasks: TaskType[];
};

export const Column = ({ type, tasks }: ColumnProps) => {
  if (type && !!tasks?.length) {
    return (
      <div className={clsx("column", type)}>
        <ColumnHeader type={type} itemsAmount={tasks ? tasks.length : 0} />
        {tasks && (
          <ul className="task-list">
            {tasks.map((task) => (
              <Task task={task} key={task.id} />
            ))}
          </ul>
        )}
      </div>
    );
  }
};
