import { array, object, string, number, InferType } from 'yup';
import request from './index';
import endpoints from './endpoints';

const ProjectSchema = object({
  data: object({
    projects: array(
      object({
        id: string().required(),
        name: string().required(),
        status: string().required(),
      }),
    ).required(),
    current_page: number().required(),
    total_pages: number().required(),
    count: number().required(),
  }),
  status: number().required(),
  message: string().required(),
});

const CreateProjectSchema = object({
  data: object({
    id: string().required(),
  }),
  status: number().required(),
  message: string().required(),
});

const projectServices = {
  async createProject(body: { name: string; description: string }) {
    return request.post(endpoints.createProject, body).then(async ({ data }) =>
      CreateProjectSchema.validate(data, {
        stripUnknown: true,
      }),
    );
  },
  async projects(search?: string, page?: number, limit?: number) {
    return request.get(endpoints.projects, { params: { search, page, limit } }).then(async ({ data }) =>
      ProjectSchema.validate(data, {
        stripUnknown: true,
      }),
    );
  },
  async getProjectById(projectId: string) {
    return request.get(endpoints.getProjectById, { params: { projectId } });
  },
};

export type CreateProject = InferType<typeof CreateProjectSchema>;
export default Object.freeze(projectServices);
