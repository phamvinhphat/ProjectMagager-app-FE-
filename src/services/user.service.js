import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/User";
const searchUser = (key) => {
    return axios
        .get(
            API_URL +
            "?key=" +
            key,
            {headers: authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const getAvailable = () => {
    return axios
        .get(
            API_URL + "/available",
            {headers: authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
}

const getProfile = (Username) => {
    return axios
        .get(
            API_URL +
            "/profile?key=" +
            Username,
            {headers: authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const changePassword = (UserName, CurrentPassword, NewPassword, NewPasswordConfirm) => {
    return axios
        .put(
            API_URL +
            "changePassword",
            {
                UserName,
                CurrentPassword,
                NewPassword,
                NewPasswordConfirm
            },
            {headers: authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const changeEmail = (username, password, newEmail) => {
    return axios
        .post(
            API_URL +"/sendChangeEmail?username="+username+"&newEmail="+newEmail,
            {password},
            {headers:authHeader()},
        )
        .catch((error) => {
            return error.response;
        });
}

const updateProfile = (username, name, bio, email, phoneNumber)=> {
    return axios
        .put(
            API_URL+"/updateProfile",
            {username, name, bio, email, phoneNumber},
            {headers:authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
}
const UserService = {
    searchUser,
    getProfile,
    changePassword,
    getAvailable,
    changeEmail,
    updateProfile,
};

export default UserService;