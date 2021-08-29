import React, {useState} from "react";
import {Grid} from "@material-ui/core";
import AuthContext from "./AuthContext";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import useStyles from "./style/authPageStyle";


const Login = () => {
    const classes = useStyles();
    const [active, setActive] = useState("signin");

    const switchToSignup = () => {
        setTimeout(() => {
            setActive("signup");
        }, 600);
    };

    const switchToSignin = () => {
        setTimeout(() => {
            setActive("signin");
        }, 600);
    };

    const contextValue = { switchToSignup, switchToSignin };

    return (
        <AuthContext.Provider value={contextValue}>
            <div className={classes.root}>
                <div className={classes.background}>
                    <Grid
                        container
                        justify="center"
                        spacing={0}
                        direction="column"
                        className={classes.container}
                        active={active}
                    >
                        <Grid item xs={12} sm={6} style={{ width: "400px" }}>
                            {active === "signin" && <SignIn/>}
                            {active === "signup" && <SignUp/>}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </AuthContext.Provider>
    );
};

export default Login;
