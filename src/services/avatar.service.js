import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/avatar";

const getUserAvatar = (username) => {
    return axios
        .get(API_URL + "/main?userName="+ username, { headers: authHeader() })
        .catch((error) => {
            return error.response;
        });
};

const uploadAvatar = (username, file) => {
    return axios
        .post(API_URL +"?userName="+ username, file, { headers: authHeader() })
        .catch((error) => {
            return error.response;
        });
};

const deleteAvatar = (username, photoId) => {
    return axios
        .delete(API_URL + "/" + photoId +"?userName="+username, { headers: authHeader() })
        .catch((error) => {
            return error.response;
        });
};

const AvatarService = {
    getUserAvatar,
    uploadAvatar,
    deleteAvatar,
};

export default AvatarService;
