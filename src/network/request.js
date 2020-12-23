import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL:'',
    timeout:5000
  });
  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    console.log(err);
  });

  instance.interceptors.response.use(res => {
    return res.data;
  }, err => {
    console.log(err);
  });


  // 3、发送真正的网络请求
  // instance()返回的就是一个Promise
  return instance(config);
}

export function instance() {

}
