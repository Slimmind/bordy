import React from 'react';
import './chart.styles.scss';

export const Chart = ({ data }) => {
  const tasks = data && data.reduce((acc, cur) => {
    const type = cur.type;
    if (type in acc) acc[type]++;
    else acc[type] = 1;
    return acc;
  }, {});

  const total = Object.values(tasks).reduce((acc, cur) => (acc += cur), 0);

  const getTypeColor = (type) => {
    switch (type) {
      case 'todo':
        return '#dd5555';
      case 'inProgress':
        return '#00aa00';
      case 'done':
        return '#00adf2';
      default:
        return '#cdcdcd';
    }
  };

  const getPercentage = (value) => {
    return (value / total) * 100;
  };

  const getChartStyle = (tasks) => {
    let percentCounter = 0;
    return Object.entries(tasks)
      .map(([type, amount]) => {
        const style = `
          ${getTypeColor(type)}
          ${percentCounter}%,
          ${getTypeColor(type)}
          ${percentCounter + getPercentage(amount)}%
        `;

        percentCounter += getPercentage(amount);

        return style;
      })
      .join(', ');
  };

  return (
    tasks && (
      <>
        <div
          className="chart"
          style={{ backgroundImage: `conic-gradient(${getChartStyle(tasks)})` }}
        ></div>
        <ul className="chart-sign-wrap">
          {Object.entries(tasks).map(([type, amount]) => (
            <li className="chart-sign" key={type}>
              <span style={{ backgroundColor: getTypeColor(type) }}>
                {getPercentage(amount).toFixed(1)}%
              </span>
              <strong>{type}</strong>
            </li>
          ))}
        </ul>
      </>
    )
  );
};
