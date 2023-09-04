import request from './index';
import endpoints from './endpoints';

const projectServices = {
  async createProject(body: { name: string; description: string }) {
    return request.post(endpoints.createProject, body);
  },
  async projects(offset: number, search: string) {
    return request.get(endpoints.projects, { params: { offset, search } });
  },
  async projectCount() {
    return request.get(endpoints.projectCount);
  },
  async getProjectById(projectId: string) {
    return request.get(endpoints.getProjectById, { params: { projectId } });
  },
};

export default Object.freeze(projectServices);
