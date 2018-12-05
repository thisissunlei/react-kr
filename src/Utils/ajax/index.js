import axios from "axios";
import APIS from 'kr/Configs/Apis';
import RequestIn from '../interceptors';
import utils from 'kr/Utils/tool';

axios.defaults={
  timeout:10000,//超时时间
  withCredentials:true,//允许携带cookie
  mode:'cors',//允许跨域
}

//过滤空參和空格
function filterNull(o) {
  for (let key in o) {
    if (o[key] === null||o[key]==='') {
      delete o[key];
    }
    if (utils.dataType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (utils.dataType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (utils.dataType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}


export default {
  getJSON: (url, params, success, failure) => new Promise((resolve, reject) => {
    axios.interceptors.request.eject(RequestIn.requestInterceptor);
    axios.get(APIS[url].url, params)
    .then(function (response) {
      response=response.data;
      success && success(response)
      resolve(response)
    })
    .catch(function (error) {
      if (error && error.data) {
        error = error.data;
        failure && failure(error)
        reject(error)
      }
    });
  }),
  postJSON: (url, params, success, failure) => new Promise((resolve, reject) => {
    axios.interceptors.request.eject(RequestIn.requestInterceptor);
    axios.post(APIS[url].url, params)
    .then(function (response) {
      response=response.data;
      success && success(response)
      resolve(response)
    })
    .catch(function (error) {
      if (error && error.data) {
        error = error.data;
        failure && failure(error)
        reject(error)
      }
    });
  }),
  putJSON: (url, params, success, failure) => new Promise((resolve, reject) => {
    axios.interceptors.request.eject(RequestIn.requestInterceptor);
    axios.put(APIS[url].url, params)
    .then(function (response) {
      response=response.data;
      success && success(response)
      resolve(response)
    })
    .catch(function (error) {
      if (error && error.data) {
        error = error.data;
        failure && failure(error)
        reject(error)
      }
    });
  }),
  delJSON: (url, params, success, failure) => new Promise((resolve, reject) => {
    axios.interceptors.request.eject(RequestIn.requestInterceptor);
    axios.delete(APIS[url].url, params)
    .then(function (response) {
      response=response.data;
      success && success(response)
      resolve(response)
    })
    .catch(function (error) {
      if (error && error.data) {
        error = error.data;
        failure && failure(error)
        reject(error)
      }
    });
  }),

  get:(url, params, success, failure)=>new Promise((resolve, reject) => {
      if (params) {
        params = filterNull(params)
      }
      if(!APIS[url].url){
        return;
      }
      axios.get(APIS[url].url, {params:params})
      .then(function (response) {
        
            response=response.data;
            success && success(response)
            resolve(response)
        })
        .catch(function (error) {
          
          if (error && error.data) {
            error = error.data;
            failure && failure(error)
            reject(error)
          }
        });
  }),
  
  post:(url, params, success, failure)=>new Promise((resolve, reject) => {
      if (params) {
        params = filterNull(params)
      }
      if(!APIS[url].url){
        return;
      }
      axios.post(APIS[url].url, params)
      .then(function (response) {
            response=response.data;
            success && success(response)
            resolve(response)
        })
        .catch(function (error) {
          if (error && error.data) {
            error = error.data;
            failure && failure(error)
            reject(error)
          }
        });
    }),

  delete:(url, params, success, failure)=>new Promise((resolve, reject) => {
      if (params) {
        params = filterNull(params)
      }
      if(!APIS[url].url){
        return;
      }
      axios.delete(APIS[url].url, {params:params})
      .then(function (response) {
            response=response.data;
            success && success(response)
            resolve(response)
        })
        .catch(function (error) {
          if (error && error.data) {
            error = error.data;
            failure && failure(error)
            reject(error)
          }
        });
     }),

  put:(url, params, success, failure)=>new Promise((resolve, reject) => {
      if (params) {
        params = filterNull(params)
      }
      if(!APIS[url].url){
        return;
      }
      axios.put(APIS[url].url, params)
      .then(function (response) {
            response=response.data;
            success && success(response)
            resolve(response)
        })
        .catch(function (error) {
          if (error && error.data) {
            error = error.data;
            failure && failure(error)
            reject(error)
          }
        });
     })
  };
