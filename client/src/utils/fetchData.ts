import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;

export const postAPI = async (url: string, data: object, token?: string) => {
  const res = await axios.post(`/api/${url}`, data, { headers: { Authorization: token || '' } });

  return res.data;
};
