import axios from 'axios';

const fetcher = async (url, method = 'GET') => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  try {
    const res = await axios({
      method,
      url: `${BASE_URL}${url}`,
    });

    if (res.status === 200) return res;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export default fetcher;
