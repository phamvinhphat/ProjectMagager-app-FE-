import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/GroupType";

const getAll = () => {
    return axios
        .get(
            API_URL +
            "/all",
            {headers : authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const getList = () => {
  return axios
      .get(
          API_URL,
          {headers : authHeader()}
      )
      .catch((error) => {
          return error.response;
      });
};

const getDetails = (id) => {
    return axios
        .get(API_URL
            + "/" +id,
            {headers : authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const deleteType = (typeId) => {
    return axios
        .delete(
            API_URL
            + "?typeId="
            + typeId,
            {headers : authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const postType = (Name, Remark, ParentNid, IdentityRoleId) => {
    return axios
        .post(
            API_URL,
            {Name, Remark, ParentNid, IdentityRoleId},
            {headers : authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};
const GroupTypeService = {
    getAll,
    getDetails,
    getList,
    deleteType,
    postType,
};

export default GroupTypeService;