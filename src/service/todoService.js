import axiosClient from "./axiosClient";

const todoService = {
  login: async (body) => {
    const url = '/login';
    return await axiosClient.post(url, body);
  },
  register: async (body) => {
    const url = '/register';
    return await axiosClient.post(url, body);
  },

}

export default todoService