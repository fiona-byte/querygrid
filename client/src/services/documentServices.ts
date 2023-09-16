import { array, object, string, number, lazy, mixed } from 'yup';
import request from './index';
import endpoints from './endpoints';
import { utils } from '@utils/index';

export type UpdateDocument = {
  name: string;
  document: string;
  field: unknown;
};

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

  async createDocument(projectId: string, body: { name: string; field: unknown }) {
    return request.post(endpoints.createDocument + projectId, body);
  },

  async updateDocument(projectId: string, body: UpdateDocument) {
    return request.patch(endpoints.updateDocument + projectId, body);
  },
};

export default Object.freeze(documentServices);
