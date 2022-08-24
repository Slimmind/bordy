import React from 'react';
import Column from '../column';
import './column-wrap.styles.scss';

export const ColumnWrap = ({ tasks }) => {
  const { backlog, todo, inProgress, done } = tasks.reduce((list, task) => {
    const { type } = task;
    list[type] = list[type] ?? [];
    list[type].push(task);
    return list;
  }, {});

  return (
    tasks && (
      <div className="column-wrap">
        <Column type="backlog" tasks={backlog} />
        <Column type="todo" tasks={todo} />
        <Column type="inProgress" tasks={inProgress} />
        <Column type="done" tasks={done} />
      </div>
    )
  );
};

// FOR AN ABILITY TO ADD COLUMNS
// export const ColumnWrap = ({ tasks }) => {
//   const columns = [... new Set(tasks.map(task => task.type))];
//   const getTasks = type => tasks.filter(task => task.type === type);

//   return (
//     <div className='column-wrap'>
//       {
//         columns.map(column => <Column type={column} tasks={getTasks(column)} />)
//       }
//     </div>
//   );
// }
