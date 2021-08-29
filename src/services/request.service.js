import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/Request";

const getRequests = () => {
    return axios
        .get(
            API_URL,
            {headers : authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const activeGroup = (requestId, isAccept) => {
    return axios
        .put (
            API_URL +
            "/activegroup",
            {requestId,isAccept},
            {headers : authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const RequestService = {
    getRequests,
    activeGroup,
};

export default RequestService;