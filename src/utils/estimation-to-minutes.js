export const estimationToMinutes = (str) => {
  return str
    .split(' ')
    .map((unit) => unit.match(/[a-zA-Z]+|[0-9]+/g))
    .reduce((acc, val) => {
      switch (val[1]) {
        case 'w':
          return (acc += +val[0] * 5 * 8 * 60);
        case 'd':
          return (acc += +val[0] * 8 * 60);
        case 'h':
          return (acc += +val[0] * 60);
        default:
          return (acc += +val[0]);
      }
    }, 0);
};
