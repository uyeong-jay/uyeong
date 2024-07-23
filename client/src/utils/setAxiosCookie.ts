import axios from 'axios';

export const setAxiosCookie = (req: any) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.common.Cookie = '';

  if (req && cookie) {
    axios.defaults.headers.common.Cookie = cookie;
  }
};
