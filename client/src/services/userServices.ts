import request from './index';
import endpoints from './endpoints';

const userServices = {
  async login(body: { email: string; password: string }) {
    return request.post(endpoints.login, body);
  },
  async me() {
    return request.get(endpoints.currentUser);
  },
};

export default Object.freeze(userServices);
