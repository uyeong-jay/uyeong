import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.withCredentials = true; //백,프 간 쿠키 공유도되록 만들기

export const getAPI = async (url: string, token?: string) => {
  const res = await axios.get(`/api/${url}`, { headers: { Authorization: token || '' } });

  return res;
};

export const postAPI = async (url: string, data: object, token?: string) => {
  const res = await axios.post(`/api/${url}`, data, { headers: { Authorization: token || '' } });

  return res;
};
