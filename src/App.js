import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { store } from './atoms';
import Header from './components/header';
import Main from './components/main';
import ColumnWrap from './components/column-wrap';
import { DarkModeProvider } from './context/dark-mode-context';
import { updateStorage } from './utils';

function App() {
  const taskList = useRecoilValue(store);

  useEffect(() => {
    updateStorage(taskList);
  }, [taskList]);

  return (
    <DarkModeProvider>
      <Header />
      <Main>
        <ColumnWrap tasks={taskList} />
      </Main>
    </DarkModeProvider>
  );
}

export default App;
