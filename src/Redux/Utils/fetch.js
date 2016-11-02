 import Promise from 'promise-polyfill';
import fetch from 'isomorphic-fetch';
import URLSearchParams from 'url-search-params';
import { browserHistory } from 'react-router';
import APIS from '../apis';

import ES6Promise from 'es6-promise';
ES6Promise.polyfill();

var env = process.env.NODE_ENV;

function getUrl(path, params = {},mode = false) {

    let server = '';

	/*
	if(env ==='test'){
		server = 'optest.krspace.cn';
	}
	*/

	/*
    if (path.match(/^http/) != 'null') {
        return path;
    }
    */


    try {
        server += APIS[path].url;
    } catch(err) {
        console.error(`${path} not defined in apis.js`);
        return false;
    }

    if(Object.keys(params).length){
        for (let item in params) {
            if (params.hasOwnProperty(item)) {
                server = server.replace('{' + item + '}', params[item]);
                delete params[item];
            }
        }
    }


    if(!mode){

        var searchParams = new URLSearchParams();

        for (let item in params) {
            if (params.hasOwnProperty(item)) {
                searchParams.set(item,params[item]);
            }
        }

        if(server.indexOf('?') !== -1){
            server +='&'+searchParams.toString();
        }else{
            server +='?'+searchParams.toString();
        }
    }

	//去除多余参数
	server = server.replace(/={.*?}/gi,'=');

    return server;
}



function getMethod(path) {

     const apiConfig = APIS[path];
    return apiConfig.method;
}

function check401(res) {
    if (res.code ===-4011) {
		window.location.href = '/';
    }
    return res;
}

function jsonParse(res) {
    return res.json();
}

const http = {

    request:(path='demo', params,payload,method)=>{



        const url = getUrl(path, params);

        method = method || getMethod(path);
        var promise = '';

        if (!url) {
            return;
        }

        switch(method){
            case 'get':{

                promise = http.get(url,params);
                break;
            }
            case 'post':{
                    promise = http.post(url,params,payload);
                break;
            }

            case 'put':{
                    promise = http.update(url,params,payload);
                break;
            }
            case 'delete':{
                   promise = http.remove(url,params,payload);
                break;
            }
            default:{
                promise = http.get(url,params,payload);
                break;
            }
        }

        return promise;
    },
	transformPreResponse(response){
		var data = response;
		//处理mock 数据
		if(Object.prototype.toString.call(response) === '[object Array]'){
			data = response.pop();
		}
		return data;
	},
	transformResponse:function(response){
		return response.data;
	},
	get: (url, params) => new Promise((resolve, reject) => {

		if (!url) {
			return;
		}

		fetch(url, {
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Accept': '*',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				'cache':false,
			},
			withCredentials:true
		})
			.then(jsonParse)
			.then(check401)
			.then(http.transformPreResponse)
			.then(json => {
				if(parseInt(json.code)>0){
					//处理数据格式
					resolve(http.transformResponse(json));
				}else{
					reject(json);
				}
			})
			.catch(err => reject(err));
	}),

	getdemo: (url, params) => new Promise((resolve, reject) => {


		if (!url) {
			return;
		}

		var xhr = new XMLHttpRequest();

		xhr.withCredentials = true;
		xhr.open('GET', url, true);
		xhr.responseType = 'json';
		xhr.setRequestHeader('crossDomain', true);
		xhr.onload = function(e) {
		  if (this.status >= 200 || this.status <300 ) {
			  var json = http.transformPreResponse(xhr.response);
			   console.log('fgfgfg',typeof json);
				if(json && json.code && parseInt(json.code)>0){
                   console.log('00456',json);
					//处理数据格式
					resolve(http.transformResponse(json))
				}else{
					console.log('0000----',json);
					reject(json)
				}
		  }else{
				reject(xhr.response);
		  }
		};

		xhr.send();

	}),

	post: (url, params, payload) => new Promise((resolve, reject) => {
		const searchParams = new URLSearchParams();

		if (!url) {
			return
		}

		for (const prop in payload) {
			searchParams.set(prop, payload[prop])
		}

		fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Accept': '*',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
				"Cookie": document.cookie 
			},
			body: searchParams
		})
			
			.then(jsonParse)
			.then(check401)
			.then(http.transformPreResponse)
			.then(json => {

				if(parseInt(json.code)>0){
					//处理数据格式
					resolve(http.transformResponse(json));
				}else{
					reject(json);
				}
			})
			.catch(err => reject(err));
	}),

	update: (url, params, payload) => new Promise((resolve, reject) => {
		const searchParams = new URLSearchParams();

		if (!url) {
			return
		}

		for (const prop in payload) {
			searchParams.set(prop, payload[prop])
		}

		fetch(url, {
			method: 'PUT',
			credentials: 'same-origin',
			headers: {
				'Accept': '*',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
			},
			body: searchParams
		})
			.then(jsonParse)
			.then(check401)
			.then(http.transformPreResponse)
			.then(json => {
				if(parseInt(json.code)>0){
					//处理数据格式
					resolve(http.transformResponse(json));
				}else{
					reject(json);
				}
			})
			.catch(err => reject(err));
	}),

	remove: (url, params, payload) => new Promise((resolve, reject) => {
		const searchParams = new URLSearchParams();

		if (!url) {
			return
		}

		for (const prop in payload) {
			searchParams.set(prop, payload[prop])
		}

		return fetch(url, {
			method: 'DELETE',
			credentials: 'same-origin',
			headers: {
				'Accept': '*',
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
			},
			body: searchParams
		})
			.then(jsonParse)
			.then(check401)
			.then(http.transformPreResponse)
			.then(json => {
				if(parseInt(json.code)>0){
					//处理数据格式
					resolve(http.transformResponse(json))
				}else{
					reject(json)
				}
			})
			.catch(err => reject(err));
	}),
}



module.exports = http;




