import React, { useState, useContext } from 'react';
import { useRecoilState } from 'recoil';
import { store } from '../../atoms';
import classNames from 'classnames';
import './header.styles.scss';
import Input from '../input';
import Modal from '../modal';
import Chart from '../chart';
import { LogoIcon } from '../../icons/icon-logo';
import { StatsIcon } from '../../icons/icon-stats';
import { SunIcon } from '../../icons/icon-sun';
import { CalendarIcon } from '../../icons/icon-calendar';
import { MoonIcon } from '../../icons/icon-moon';
import { DarkModeContext } from '../../context/dark-mode-context';

export const Header = () => {
  const [taskList, setTaskList] = useRecoilState(store);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const searchTask = ({ target }) => {
    const searchResults = taskList.map((item) => {
      item.highlighted =
        !!target.value &&
        item.title.toLowerCase().includes(target.value.toLowerCase());
      return item;
    });
    setTaskList(() => searchResults);
  };

  return (
    <>
      <header className={classNames('main-header', { dark: darkMode })}>
        <div className="container">
          <h1 className="header-logo">
            <LogoIcon />
          </h1>
          <div className="header-search">
            <Input
              type="search"
              name="search"
              placeholder="Search"
              changeHandler={searchTask}
            />
          </div>
          <nav>
            <ul>
              <li>
                <button>
                  <CalendarIcon />
                </button>
              </li>
              <li>
                <button onClick={openModal}>
                  <StatsIcon />
                </button>
              </li>
              <li>
                <button onClick={toggleDarkMode}>
                  {darkMode ? <SunIcon /> : <MoonIcon />}
                </button>
              </li>
              <li></li>
            </ul>
          </nav>
        </div>
      </header>
      <Modal
        title="Diagram"
        isOpen={isModalOpen}
        closeModalHandler={closeModal}
      >
        <Chart data={taskList} />
      </Modal>
    </>
  );
};
