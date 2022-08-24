import React, { useContext } from 'react';
import classNames from 'classnames';
import { DarkModeContext } from '../../context/dark-mode-context';
import './main.styles.scss';

export const Main = ({ children }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <main className={classNames({ dark: darkMode })}>
      <div className="container">{children}</div>
    </main>
  );
};
