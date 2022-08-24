import React, { useState } from 'react';
import classNames from 'classnames';
import Modal from '../modal';
import Input from '../input';
import Controls from '../controls';
import './column-header.styles.scss';

export const ColumnHeader = ({ type, itemsAmount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    subtasks: [],
    duration: '',
  });
  // const [taskList, setTaskList] = useRecoilState(store);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setIsModalOpen(false);
    // const updatedTaskList = [
    //   ...taskList,
    //   {
    //     id: Date.now(),
    //     type: 'backlog',
    //     title: inputs.title,
    //     description: inputs.description,
    //     highlighted: false,
    //   },
    // ];

    // setTaskList(() => updatedTaskList);
  };

  return (
    <>
      <header className={classNames('column-header', type)}>
        <div>
          <strong>{type}</strong>
          <span>
            {itemsAmount} {itemsAmount === 1 ? 'item' : 'items'}
          </span>
        </div>
        {type === 'backlog' && (
          <>
            <button
              className="circle-btn success add"
              aria-label="add item"
              onClick={openModal}
            ></button>
          </>
        )}
      </header>
      <Modal
        title="Create task"
        isOpen={isModalOpen}
        closeModalHandler={closeModal}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="text"
            name="title"
            placeholder="Title..."
            changeHandler={handleChange}
            value={inputs.title}
            autoFocus
          />
          <Input
            type="textarea"
            name="description"
            placeholder="Description..."
            changeHandler={handleChange}
            value={inputs.description}
          />
          <Input
            type="text"
            name="estimation"
            placeholder="Estimation (1w 2d 3h 4m)"
            changeHandler={handleChange}
          />
          <Controls type="right">
            <button
              className="btn secondary"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className="btn success" type="submit">
              Submit
            </button>
          </Controls>
        </form>
      </Modal>
    </>
  );
};
