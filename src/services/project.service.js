import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/Project";

const postProject = (name, remark, dueDate, startDate) => {
    return axios
        .post(
            API_URL,
            {name, remark, dueDate, startDate},
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
};

const getAll = () => {
    return axios
        .get(
            API_URL + "/all",
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
};

const getList = () => {
    return axios
        .get(
            API_URL ,
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
};

const deleteProject = (idPro) => {
    return axios
        .delete(
            API_URL + "?idPro=" + idPro,
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
};

const getDetails = (id) => {
    return axios
        .get(
            API_URL + "/" + id,
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
};

const ProjectService = {
    postProject,
    getList,
    getAll,
    deleteProject,
    getDetails,
};

export default ProjectService;