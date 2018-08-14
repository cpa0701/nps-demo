import axios from 'axios';
import {
    message,
} from 'antd';

const $ = require("jquery");

export class Http {
    mode = 'local';

    getUrl(url) {
        // let prefix = '';
        // let suffix = '';
        // switch (this.mode) {
        //     case 'local': {
        //         prefix = 'mock/';
        //         suffix = '';
        //         break;
        //     }
        //     case 'remote': {
        //         prefix = '';
        //         break;
        //     }
        //     case 'product': {
        //         prefix = '';
        //         break;
        //     }
        //     default: {
        //         prefix = '';
        //         break;
        //     }
        // }
        // let _url = prefix + url + suffix;
        return url;
    }

    async get(api, data = {}, config = {}) {
        api = this.getUrl(api);
        if (api.includes('mock')) {
            return await new Promise(function (resolve, reject) {
                $.ajax({
                    url: api, type: "get",
                    success: (res) => {
                        resolve(JSON.parse(res))//在异步操作成功时调用
                    },
                    error: (error) => {
                        reject(error);
                    }
                });
            })
        } else
            return await this._request(
                {
                    url: api,
                    method: 'GET',
                    params: data,
                }, config
            );
    }

    async post(api, data = {}, config = {}) {
        api = this.getUrl(api);
        if (api.includes('mock')) {
            return await new Promise(function (resolve, reject) {
                $.ajax({
                    url: api, data: JSON.stringify(data), type: "post",datatype: "json",
                    success: (res) => {
                        resolve(JSON.parse(res))//在异步操作成功时调用
                    },
                    error: (error) => {
                        reject(error);
                    }
                });
            })
        } else {
            return await this._request(
                {
                    url: api,
                    method: 'POST',
                    data: data,
                }, config
            );
        }

    }

    async delete(api, data = {}, config = {}) {
        api = this.getUrl(api);
        return await this._request(
            {
                url: api,
                method: 'DELETE'
            }, config
        );
    }

    async put(api, data = {}, config = {}) {
        api = this.getUrl(api);
        return await this._request(
            {
                url: api,
                method: 'PUT',
                data: data,
            }, config
        );
    }

    async _request(params, config = {
        baseURL: '',
    }) {
        params = Object.assign(params, config);
        return await axios(params)
            .then(result => {
                return result.data.data ? result.data.data : false
            }).catch(function (error) {
                if (error.response.data.code === 401) {
                    message.error('登录超时');
                    window.location.href = '#/login'
                } else
                    message.error(error.response.data.description);
                return false
            });
    }

    log(msg) {
        if (this.mode !== 'product') {
            console.log(msg);
        }
    }
}

const http = new Http();

export default http;
