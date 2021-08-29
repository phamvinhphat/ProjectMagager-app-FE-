import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/Task";

const postTask = (name, remark, dueDate, startDate, percent, phaseId, userId, parentNId) => {
    return axios
        .post(
            API_URL,
            {name, remark, dueDate, startDate, percent, phaseId, userId, parentNId},
            {headers: authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
}

const getAll = () => {
    return axios
        .get(
            API_URL + "/all",
            {headers: authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
}
const getListByUser = () => {
    return axios
        .get(
            API_URL,
            {headers: authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
}

const getList = (reportId) => {
    return axios
        .get(
            API_URL + "/report?reportId=" + reportId,
            {headers: authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
}

const getListByPhase = (phaseId) => {
    return axios
        .get(
            API_URL + "/phase?phaseId=" + phaseId,
            {headers: authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
}

const getDetail = (taskId) => {
    return axios
        .get(
            API_URL + "/" + taskId,
            {headers: authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
}

const deleteTask = (taskId) => {
    return axios
        .delete(
            API_URL + "?id=" + taskId,
            {headers: authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
}

const editTask = (taskId, name, remark, dueDate, startDate, percent, phaseId, userId, parentNId) => {
    return axios
        .put(
            API_URL + "/" + taskId,
            {name, remark, dueDate, startDate, percent, phaseId, userId, parentNId},
            {headers: authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
}
const getContrib = (userId) =>{
    return axios
        .get(
            API_URL + "/contrib?userId=" +userId,
            {headers: authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
}

const TaskServices = {
    postTask,
    getAll,
    getList,
    getListByPhase,
    getDetail,
    deleteTask,
    editTask,
    getListByUser,
    getContrib,
}
export default TaskServices;