import React from 'react';
import classNames from 'classnames';
import './controls.styles.scss';

export const Controls = ({ type, children }) => (
  <div className={classNames('controls', type)}>{children}</div>
);
