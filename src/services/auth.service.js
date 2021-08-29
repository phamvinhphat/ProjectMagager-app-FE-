import axios from "axios";
import moment from "moment";
import authHeader from "./auth-header";
import tough from 'tough-cookie';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL + "/User";
const axiosCookieJarSupport = require('axios-cookiejar-support');
axiosCookieJarSupport(axios);
const cookies = new tough.CookieJar();

const register = (username, password, email, name, phoneNumber) => {
    return axios
        .post(API_URL, {
            username,
            password,
            email,
            name,
            phoneNumber
        })
        .catch((error) => {
            return error.response;
        });
};

const login = (username, password, rememberme) => {
    return axios
        .post(API_URL + "/authenticate", {
            username,
            password,
            rememberme,
        })
        .catch((error) => {
            return error.response;
        });
};

const isLoggedIn = () => {
    let token;
    const exp = localStorage.getItem("expTime");
    const clientTime = moment().diff(moment(exp));
    if (clientTime>0 && exp!==null)
        refreshToken().then((r) => {
            if (r.status !== 200) {
               revokeToken().then((r) => {
                   if(r.status !== 200){
                       logout();
                       return !!token;
                   }
               })
            } else {
                saveLogin(r.data);
                console.log("token refreshed");
                return !!token;
            }
            ;
        }).catch((r) => {
            console.log(r);
        });
    else token = localStorage.getItem("token");
    return !!token;
};

const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("id");
    localStorage.removeItem("expTime");
    localStorage.removeItem("refreshToken");
};

const saveLogin = (response) => {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.userName);
    localStorage.setItem("roles", response.data.roleName);
    localStorage.setItem("id", response.data.id);
    localStorage.setItem("expTime", response.data.expTime);
    cookies.setCookie('refreshToken='+response.data.refreshToken+'; path=/; domain=localhost', process.env.REACT_APP_API_URL);
}

const getCurrentUser = () => {
    return localStorage.getItem("username");
};

const refreshToken = () => {
    return axios
        .post(
            API_URL +
            "/refresh-token",
            {header: authHeader(),withCredentials: true, jar: cookies}
        )
        .catch((error) => {
            return error.response;
        });
};

const revokeToken = () => {
    let token = Cookies.get('refreshToken');
    return axios
        .post(
            API_URL +
            "/revoke-token",
            {token},
        )
        .catch((error) => {
            return error.response;
        });
};

const AuthService = {
    register,
    login,
    isLoggedIn,
    logout,
    getCurrentUser,
    refreshToken,
    revokeToken,
    saveLogin,
};

export default AuthService;
