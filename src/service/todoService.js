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
  fetchTodo: async () => {
    const url = '/todos';
    return await axiosClient.get(url);
  },
  createTodo: async (body) => {
    const url = '/todos';
    return await axiosClient.post(url, body)
  },
  changeStatus: async (id, body) => {
    const url = '/todos/changestatus/'+id;
    return await axiosClient.put(url, body)
  }
}

export default todoService