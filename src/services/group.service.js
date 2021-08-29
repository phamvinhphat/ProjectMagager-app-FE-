import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/group";

const postDepartment = (name, remark, leaderId) => {
    return axios
        .post(
            API_URL + "/department",
            {name, remark, leaderId},
            {headers : authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const postTeam  = (name, remark, leaderId, parentNId) => {
    return axios
        .post(
            API_URL + "/team",
            {name, remark, leaderId, parentNId},
            {headers : authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const getAll = () => {
    return axios
        .get(
            API_URL + "/all",
            {headers : authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const getByUser = () => {
    return axios
        .get(
            API_URL,
            {headers : authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
}
const getList = (type) => {
    return axios
        .get(
            API_URL + "/type?key=" + type,
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
}

const getDetail = (id) => {
    return axios
        .get(
            API_URL + "/" + id,
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
}

const deleteGroup = (id) => {
    return axios
        .delete(
            API_URL + "/" + id,
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
};

const addMembers = (groupName, usernames) => {
    return axios
        .post(
            API_URL + "/addmember",
            {groupName, usernames},
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
};

const removeMembers = (groupName, usernames) => {
    return axios
        .post(
            API_URL + "/removemember",
            {groupName, usernames},
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
};

const promotion = (username) => {
    return axios
        .put(
            API_URL + "/promotion?username=" + username,
            {},
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
};
const leaveGroup = () => {
    return axios
        .post(
            API_URL + "/leave",
            {},
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
};

const memberList = (groupId) => {
    return axios
        .get(
          API_URL + "/" + groupId + "/members",
            {headers: authHeader()}
        ).catch((error) => {
            return error.response;
        });
};

const GroupService = {
    postDepartment,
    postTeam,
    getAll,
    getList,
    getDetail,
    deleteGroup,
    addMembers,
    removeMembers,
    promotion,
    leaveGroup,
    memberList,
    getByUser,
};

export default GroupService;