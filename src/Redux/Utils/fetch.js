import fetch from 'isomorphic-fetch';
import URLSearchParams from 'url-search-params';
import { browserHistory } from 'react-router';
import APIS from '../apis';

function getUrl(path, params = {},mode = false) {

    let server = '';

    if (path.startsWith('http')) {
        return path;
    }

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

    return server;
}

function check401(res) {
    if (res.status === 401) {
        //browserHistory.replace('/login');
    }
    return res;
}

function jsonParse(res) {
    return res.json();
}

const http = {
    request: (path, params) => new Promise((resolve, reject) => {
        const url = getUrl(path, params);
        if (!url) {
            return;
        }

        return fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                }
            })
            .then(check401)
            .then(jsonParse)
            .then(json => resolve(json))
            .catch(err => reject(err))
    }),
    get: (path, params) => new Promise((resolve, reject) => {
        const url = getUrl(path, params);
        if (!url) {
            return;
        }

        return fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
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
                    'Accept': '*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                },
                body: searchParams
            })
            .then(check401)
            .then(jsonParse)
            .then(json => resolve(json))
            .catch(err => reject(err));
    }),

    remove: (path, params, payload) => new Promise((resolve, reject) => {
        const searchParams = new URLSearchParams()
        const url = getUrl(path, params)

        if (!url) {
            return
        }

        for (const prop in payload) {
            searchParams.set(prop, payload[prop])
        }

        return fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
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




