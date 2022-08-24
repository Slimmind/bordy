export const updateStorage = (updatedState) =>
  localStorage.setItem('state', JSON.stringify(updatedState));
