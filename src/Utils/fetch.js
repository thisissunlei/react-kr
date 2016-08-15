import fetch from 'isomorphic-fetch';
import URLSearchParams from 'url-search-params';
import { browserHistory } from 'react-router';
import APIS from '../Configs/apis';

function getUrl(path, params = {},mode = false) {

    let server = 'http://36kr.com/api/';

    if (path.startsWith('http')) {
        return path;
    }

    try {
        server += APIS[path].url;
    } catch(err) {
        console.error(`${path} not defined in apis.js`);
        return false;
    }

    for (let item in params) {
        if (params.hasOwnProperty(item)) {
            server = server.replace('{' + item + '}', params[item]);
			delete params[item];
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

    return server;
}

function check401(res) {
    if (res.status === 401) {
        browserHistory.replace('/login');
    }
    return res;
}

function jsonParse(res) {
    return res.json();
}

const http = {
    get: (path, params) => new Promise((resolve, reject) => {
        const url = getUrl(path, params);
        if (!url) {
            return;
        }

        return fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'authorization': localStorage.authorization || ''
                }
            })
            .then(check401)
            .then(jsonParse)
            .then(json => resolve(json))
            .catch(err => reject(err))
    }),

    post: (path, params, payload) => new Promise((resolve, reject) => {
        const searchParams = new URLSearchParams()
        const url = getUrl(path, params)

        if (!url) {
            return
        }

        for (const prop in payload) {
            searchParams.set(prop, payload[prop])
        }

        return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                    'authorization': localStorage.authorization || ''
                },
                body: searchParams
            })
            .then(check401)
            .then(jsonParse)
            .then(json => resolve(json))
            .catch(err => reject(err));
    }),
}



module.exports = http;













