import { array, object, string, number, lazy, mixed } from 'yup';
import request from './index';
import endpoints from './endpoints';
import { utils } from '@utils/index';

const DocumentsSchema = object({
  data: array().of(string().required()).required(),
  status: number().required(),
  message: string().required(),
});

const DocumentSchema = object({
  data: lazy((obj) => object(utils.mapValues(obj, () => mixed()))),
  status: number().required(),
  message: string().required(),
});

const documentServices = {
  async getDocuments(projectId: string, collection: string) {
    return request.get(endpoints.getDocuments + projectId + '/' + collection).then(async ({ data }) =>
      DocumentsSchema.validate(data, {
        stripUnknown: true,
      }),
    );
  },
  async getDocument(projectId: string, collection: string, document: string) {
    return request.get(endpoints.getDocuments + projectId + '/' + collection + '/' + document).then(async ({ data }) =>
      DocumentSchema.validate(data, {
        stripUnknown: true,
      }),
    );
  },
};

export default Object.freeze(documentServices);
