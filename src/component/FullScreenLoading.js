import {CircularProgress} from "@material-ui/core";
import React from "react";

import useStyles from "./styles/fullScreenLoadingStyles";

const FullscreenLoading = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress size={40} className={classes.progress} />
        </div>
    );
};

export default FullscreenLoading;
