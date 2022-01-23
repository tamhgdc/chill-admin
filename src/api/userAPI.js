import axiosClient from './axiosClient';

const userAPI = {
  login(data) {
    const url = '/auth/local';
    return axiosClient.post(url, data);
  },
};

export default userAPI;
