import request from './index';
import endpoints from './endpoints';

const projectServices = {
  async createProject(body: { name: string; description: string }) {
    return request.post(endpoints.createProject, body);
  },
};

export default Object.freeze(projectServices);
