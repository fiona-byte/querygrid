import request from './index';
import endpoints from './endpoints';

const userServices = {
  async login(body: unknown) {
    return request.post(endpoints.login, body);
  },
  async me() {
    return request.get(endpoints.currentUser);
  },
  async setup(body: unknown) {
    return request.post(endpoints.setup, body);
  },
};

export default Object.freeze(userServices);
