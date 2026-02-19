import axios from "axios";

const API_BASE =
  "https://system-vuejs.potatoscript-com.workers.dev/api/users";

export const getUsers = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const createUser = async (user) => {
  return axios.post(API_BASE, user);
};

export const updateUser = async (id, user) => {
  return axios.put(`${API_BASE}/${id}`, user);
};

export const deleteUser = async (id) => {
  return axios.delete(`${API_BASE}/${id}`);
};
