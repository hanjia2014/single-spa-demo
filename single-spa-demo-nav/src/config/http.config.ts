import axios from 'axios';

axios.interceptors.request.use(
  request => {
    request.headers['X-TEST-VALUE'] = '1234567';
    return request;
  },
  error => {
    return Promise.reject(error);
  }
)

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch
}

export const handlePromiseCall = promiseObj => {
  return (promiseObj.fetch || promiseObj)
    .then(async res => {
      const jsonRes = res.json;
      if (!jsonRes) {
        return {
          response: res,
          error: null
        };
      }
    })
    .catch(error => {
      return Promise.resolve({
        response: null,
        error
      });
    });
};