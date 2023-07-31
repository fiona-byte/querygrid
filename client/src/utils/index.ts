export const utils = {
  setAuthentication: () => {
    localStorage.setItem('user-authentication', 'true');
  },

  getAuthentication: () => {
    const item = localStorage.getItem('user-authentication');
    return item === 'true';
  },
};
