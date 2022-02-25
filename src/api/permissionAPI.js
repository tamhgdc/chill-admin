import { USER_API_URL } from 'config';
import axiosClient from './axiosClient';

const permissionAPI = {
  getAll(params) {
    const url = '/permission';
    return axiosClient.get(url, { params, baseURL: USER_API_URL });
  },

  get(id) {
    const url = `/permission/${id}`;
    return axiosClient.get(url, { baseURL: USER_API_URL });
  },

  getByCode(code) {
    const url = `/permission/code/${code}`;
    return axiosClient.get(url, { baseURL: USER_API_URL });
  },

  add(data) {
    const url = '/permission';
    return axiosClient.post(url, data, { baseURL: USER_API_URL });
  },

  update(id, data) {
    const url = `/permission/${id}`;
    return axiosClient.patch(url, data, { baseURL: USER_API_URL });
  },

  delete(id) {
    const url = `/permission/${id}`;
    return axiosClient.delete(url, { baseURL: USER_API_URL });
  },
};

export default permissionAPI;
