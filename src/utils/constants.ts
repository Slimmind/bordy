export const TaskTypes = {
  BACKLOG: "backlog",
  TODO: "todo",
  IN_PROGRESS: "inProgress",
  DONE: "done",
};

export type Settings = {
  darkMode: boolean;
};

export type TaskType = {
  id: string;
  title: string;
  description: string;
  type: string;
  estimation: {
    value: string;
    total: number;
    spent: number;
    remaining: number;
    overtime: number;
  };
  subtasks: Array<{
    id: string;
    title: string;
  }>;
  highlighted: boolean;
  run: boolean;
};

export type AppState = {
  settings: Settings;
  tasks: TaskType[];
};
