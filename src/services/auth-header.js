const axios = require('axios');

export default function authHeader() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    if (token) {
        return {Authorization: "Bearer " + token};
    } else {
        return {};
    }
}
