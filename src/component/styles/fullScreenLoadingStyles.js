import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 105,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        opacity: 0.5,
    },
    progress: {
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: 106,
    },
}));
