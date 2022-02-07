import { USER_API_URL } from 'config';
import axiosClient from './axiosClient';

const userAPI = {
  login(data) {
    const url = '/auth/login';
    return axiosClient.post(url, data, { baseURL: USER_API_URL });
  },

  getAll(params) {
    const url = '/users';
    return axiosClient.get(url, { params, baseURL: USER_API_URL });
  },

  get(id) {
    const url = `/users/${id}`;
    return axiosClient.get(url, { baseURL: USER_API_URL });
  },

  add(data) {
    const url = '/users';
    return axiosClient.post(url, data, { baseURL: USER_API_URL });
  },

  update(id, data) {
    const url = `/users/${id}`;
    return axiosClient.patch(url, data, { baseURL: USER_API_URL });
  },

  delete(id) {
    const url = `/users/${id}`;
    return axiosClient.delete(url, { baseURL: USER_API_URL });
  },
};

export default userAPI;
