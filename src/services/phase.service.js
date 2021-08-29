import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/Phase";

const getAll = () => {
    return axios
        .get(
            API_URL + "/all",
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
};
const getList = (reportId) => {
    return axios
        .get(
            API_URL + "?reportId=" + reportId,
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
}
const getDetails = (id) => {
    return axios
        .get(
            API_URL + "/" + id,
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
};

const deletePhase = (id) => {
    return axios
        .delete(
            API_URL + "?id=" + id,
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
};

const postPhase = (name, remark, startDate, dueDate, reportID) => {
    return axios
        .post(
            API_URL,
            {name, remark, dueDate, startDate, reportID},
            {headers : authHeader()}
        ).catch((error) => {
            return error.response;
        });
};

const PhaseService = {
    getAll,
    getList,
    getDetails,
    postPhase,
    deletePhase,
};

export default PhaseService;