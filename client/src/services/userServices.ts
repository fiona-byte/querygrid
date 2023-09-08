import { array, object, string, number, boolean, InferType, lazy } from 'yup';
import request from './index';
import endpoints from './endpoints';
import { utils } from '@utils/index';

const ProjectSetupSchema = object({
  data: boolean().required(),
  status: number().required(),
  message: string().required(),
});

const UserSchema = object({
  data: object({
    id: string().required(),
    first_name: string().required(),
    last_name: string().required(),
    email: string().required(),
    status: string().required(),
    role_id: string().required(),
    role: object({
      id: string().required(),
      name: string().required(),
      permissions: lazy((obj) => object(utils.mapValues(obj, () => array().of(string())))),
      created_at: string().required(),
      updated_at: string().required(),
    }).required(),
    created_at: string().required(),
    updated_at: string().required(),
  }).required(),
  status: number().required(),
  message: string().required(),
});

const userServices = {
  async login(body: unknown) {
    return request.post(endpoints.login, body);
  },
  async me() {
    return request.get(endpoints.currentUser).then(async ({ data }) =>
      UserSchema.validate(data, {
        stripUnknown: true,
      }),
    );
  },
  async setup(body: unknown) {
    return request.post(endpoints.setup, body);
  },
  async install() {
    return request.get(endpoints.install).then(async ({ data }) =>
      ProjectSetupSchema.validate(data, {
        stripUnknown: true,
      }),
    );
  },
};

export type ProjectSetup = InferType<typeof ProjectSetupSchema>;
export type User = InferType<typeof UserSchema>;
export default Object.freeze(userServices);
