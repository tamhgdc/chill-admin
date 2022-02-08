import axiosClient from './axiosClient';

const siteAPI = {
  getCount() {
    const url = '/statistic';
    return axiosClient.get(url);
  },
};

export default siteAPI;
