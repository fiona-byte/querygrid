import request from './index';
import endpoints from './endpoints';

const projectServices = {
  async createProject(body: { name: string; description: string }) {
    return request.post(endpoints.createProject, body);
  },
  async projects(offset: number, search: string) {
    return request.get(endpoints.Projects, { params: { offset, search } });
  },
};

export default Object.freeze(projectServices);
