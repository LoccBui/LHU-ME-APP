import axios from "axios";
axios.defaults.baseURL = 'https://tapi.lhu.edu.vn/me';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token ="BaqAJtMHSNL0CY_a-lBk4hnfqAhO4yyU4LeO8QAH1F8.26D5D42974469E86";
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