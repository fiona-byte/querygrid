export const utils = {
  setAuthentication: () => {
    localStorage.setItem('user-authentication', 'true');
  },

  getAuthentication: () => {
    const item = localStorage.getItem('user-authentication');
    return item === 'true';
  },

  clearAuthentication: () => {
    localStorage.removeItem('user-authentication');
  },

  stringAvatar: (name: string) => ({
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  }),

  hasPrevious: (page: number) => page > 1,

  hasNext: (page: number, total: number) => page < total,

  mapValues: (obj: any, iteratee: any) => {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, iteratee(value)]));
  },

  isObject: (value: unknown) => typeof value === 'object' && !Array.isArray(value) && value !== null,
};
