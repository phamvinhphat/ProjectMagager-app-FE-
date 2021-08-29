import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cardAction: {
        justifyContent: "center",
        flexDirection: "column",
        marginBottom: 40,
    },
    textField: {
        "& .MuiInputBase-input": {
            color: "black",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#109cbb",
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "#8E8E8E",
        },
        "&:hover .MuiInput-underline:before": {
            borderBottomColor: "#8E8E8E",
        },
        "& .MuiFormHelperText-root": {
            color: "red",
        },
    },
    cardSignIn: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 500,
        alignItem: "center",
        textAlign: "center",
        opacity: 0.9,
        padding: 20,
        borderRadius: "10px",
        border: "2px solid #ffffff",
        "&[animate='1']": {
            animation: `$toLeft .8s ${theme.transitions.easing.easeInOut}`,
        },
        "&[animate='0']": {
            animation: `$moveIn .3s ${theme.transitions.easing.easeInOut}`,
        },
    },
    link: {
        fontSize: 12,
        color: "#8E8E8E",
        fontWeight: "bold",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "none",
        },
    },
    cardSignup: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 500,
        alignItem: "center",
        textAlign: "center",
        opacity: 0.9,
        borderRadius: "10px",
        padding: 20,
        border: "2px solid #fffff",
        "&[animate='1']": {
            animation: `$toRight .8s ${theme.transitions.easing.easeInOut}`,
        },
        "&[animate='0']": {
            animation: `$moveIn .3s ${theme.transitions.easing.easeInOut}`,
        },
    },
}));