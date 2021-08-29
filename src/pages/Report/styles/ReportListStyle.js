import {makeStyles} from "@material-ui/core";

export default makeStyles((themes) => ({
    root: {
        padding: "10px 20px 20px 20px",
        width: "100%"
    },
    container: {
        height: "inherit",
        width: "99%",
    },
    formControl: {
        margin: themes.spacing(2),
        minWidth: 120,
        marginTop: 20,
    },
    reportList: {
        minHeight: 500,
    },
}))