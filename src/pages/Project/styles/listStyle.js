import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        height: "100%",
        minHeight: "100vh",
        width:"100%",
    },
    content: {
        padding: "10px 15px",
        height: "100%",
    },
    button: {
        display: "flex",
        alignItems: "center",
        marginRight: 10,
        cursor: "pointer"
    },
    icon: {
        marginRight: 20,
        color: "#009688",
    },
    create: {
        margin: "0 5px 10px 0",
    },
    createText: {
        marginBottom: 6
    },
    projectList: {
        minHeight: "100vh",
    },

}));