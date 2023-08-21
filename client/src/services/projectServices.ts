import request from './index';
import endpoints from './endpoints';

const projectServices = {
  async createProject(body: { name: string; description: string }) {
    return request.post(endpoints.createProject, body);
  },
  async projects() {
    return request.get(endpoints.Projects);
  },
};

export default Object.freeze(projectServices);