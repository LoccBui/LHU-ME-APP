import axios from "axios";
axios.defaults.baseURL = 'https://tapi.lhu.edu.vn/me';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token ="eyJzaWQiOiIxMzlFNkM0MDFEQkIwMjM2IiwiZXhwIjoyMTM3Njg2NDQ5fQ.3uyN1Cg3iINf16JboEd2WaWXGOKHSC7rcuJb-qJ5wiA";
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/json';
    config.headers['authorization']=`Bearer ${token}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });