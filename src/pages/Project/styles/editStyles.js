import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        height: "100%",
        minHeight: "100vh",
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
        flexGrow: true
    },
    grid: {
        spacing: 2,
        direction: "row",
        justifyContent: "center",
        alignItems: "stretch",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
        flexGrow: 1,
        minHeight: 500,
    },
    topPaper: {
        marginBottom: 10,
    }
}))