import { array, object, string, number } from 'yup';
import request from './index';
import endpoints from './endpoints';

const CollectionsSchema = object({
  data: array().of(string().required()).required(),
  status: number().required(),
  message: string().required(),
});

const collectionServices = {
  async getCollections(projectId: string) {
    return request.get(endpoints.getCollections + projectId).then(async ({ data }) =>
      CollectionsSchema.validate(data, {
        stripUnknown: true,
      }),
    );
  },
};

export default Object.freeze(collectionServices);
