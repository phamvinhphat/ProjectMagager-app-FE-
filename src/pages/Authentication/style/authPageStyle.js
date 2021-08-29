import {makeStyles} from "@material-ui/core";
import Background from '../../../images/step.svg';

export default makeStyles((themes) =>({
    root: {
        height: "100%"
    },
    background: {
        backgroundImage: `url(${Background})`,
        backgroundColor:"#fff",
        backgroundPosition: 'center',
        backgroundSize: '250px',
        backgroundRepeat: 'no-repeat'
    },
    container: {
        alignItems: "flex-end",
        minHeight: "100vh",
        paddingRight: "150px",
        [themes.breakpoints.down("md")]: {
            alignItems: "center",
            paddingRight: 0,
        },
        "&[active='signup']": {
            alignItems: "center",
            paddingRight: "0px",
        },
    },
}))