import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
    root: {
        padding: "20px 10px 10px 20px",
        width:"100%",
        height:"fit-content",
        flexGrow:1,
    },
    avatar: {
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
    progressAvatar: {
        position: "absolute",
        color: "#009688",
        right: 10,
        top: 10,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}))