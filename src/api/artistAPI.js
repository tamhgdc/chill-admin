import axiosClient from './axiosClient';

const artistAPI = {
  getAll(params) {
    const url = '/artists';
    return axiosClient.get(url, { params });
  },

  get(id) {
    const url = `/artists/${id}`;
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/artists';
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/artists/${id}`;
    return axiosClient.patch(url, data);
  },

  delete(id) {
    const url = `/artists/${id}`;
    return axiosClient.delete(url);
  },
};

export default artistAPI;