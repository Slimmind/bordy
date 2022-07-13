import Header from './components/header';
import ColumnWrap from './components/column-wrap';
function App() {
  const tasks = [
    {
      id: 'task-1',
      type: 'available',
      title: 'First Task',
      description: 'First test task from list of available tasks' 
    },
    {
      id: 'task-2',
      type: 'inProgress',
      title: 'Task in progress',
      description: 'First test task from list of tasks which are in progress' 
    },
    {
      id: 'task-3',
      type: 'done',
      title: 'Done Task',
      description: 'First done task from list of done tasks'
    },
    {
      id: 'task-4',
      type: 'available',
      title: 'Another Available task',
      description: 'Second available task from list of available tasks'
    },
  ];
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <ColumnWrap tasks={tasks} />
        </div>
      </main>
    </>
  );
}

export default App;
