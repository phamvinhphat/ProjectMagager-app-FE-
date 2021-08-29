import React, {useState} from 'react';

import {ProjectService} from "../../services/services";
import useStyles from "../../component/styles/modalStyles";
import {useHistory} from "react-router-dom";
import {useLoading} from "../../component/hooks/hooks";
import * as ReactDOM from "react-dom";
import {Grid, Paper, TextField, Typography} from "@material-ui/core";
import FullscreenLoading from "../../component/FullScreenLoading";
import moment from "moment";
import {useSnackbar} from "notistack";


const ProjectCreateModal = ({
                                isShowing,
                                modalRef,
                                toggleModal,
                                toggleMount,
                            }) => {
    const classes = useStyles();
    const {loading, onLoading, offLoading} = useLoading();

    isShowing && (document.body.style.overflow = "hidden");

    const [name, setName] = useState("");
    const [remark, setRemark] = useState("");
    const [startDate, setStartDate] = useState(moment().format("DD-MM-YYYY"));
    const [dueDate, setDueDate] = useState(moment().format("DD-MM-YYYY"));
    const [error, setError] = useState({});

    const {enqueueSnackbar} = useSnackbar();

    const loadName = (value) => {
        setName(value.target.value);
    }
    const loadRemark = (value) => {
        setRemark(value.target.value);
    }
    const loadDueDate = (value) => {
        setDueDate(value.target.value);
    }
    const loadStartDate = (value) => {
        setStartDate(value.target.value);
    }

    const validate = () => {
        let isError = false;
        if (name === "") {
            setError((prevError) => ({
                ...prevError,
                name: "Project name is required.",
            }));
            isError = true;
        } else {
            setError((prevError) => ({
                ...prevError,
                name: "",
            }));
        }

        if (!moment(startDate, 'DD/MM/YYYY', true).isValid()) {
            setError((prevError) => ({
                ...prevError,
                startDate: "This is not a valid date.",
            }));
        } else {
            setError((prevError) => ({
                ...prevError,
                startDate: "",
            }));
        }
        if (startDate === "") {
            setError((prevError) => ({
                ...prevError,
                startDate: "Start date is required.",
            }));
            isError = true;
        } else {
            setError((prevError) => ({
                ...prevError,
                startDate: "",
            }));
        }
        if (!moment(dueDate, 'DD/MM/YYYY', true).isValid()) {
            setError((prevError) => ({
                ...prevError,
                dueDate: "This is not a valid date.",
            }));
        } else {
            setError((prevError) => ({
                ...prevError,
                dueDate: "",
            }));
        }
        if (dueDate === "") {
            setError((prevError) => ({
                ...prevError,
                dueDate: "End date is required.",
            }));
            isError = true;
        } else {
            setError((prevError) => ({
                ...prevError,
                dueDate: "",
            }));
        }
        return isError;
    }

    const handleSubmit =  () => {
        if (!validate()) {
            onLoading();
             ProjectService.postProject(name, remark, dueDate, startDate)
                .then((r) => {
                    if (r.status === 204 || r.status === 200) {
                        toggleModal();
                        toggleMount();
                        enqueueSnackbar("Submit successfully", {variant:"success"})
                    }
                    else enqueueSnackbar(r.data.message, {variant:"warning"})
                }, null).catch((r) => {
                    enqueueSnackbar(r, {variant:"error"})
                });
        }
        document.body.style.overflow = "auto";
        offLoading();
        toggleModal();
    }
    return isShowing
        ? ReactDOM.createPortal(
            <div>
                {loading ? <FullscreenLoading/> : null}
                <div className={classes.modalOverlay}/>
                <Paper className={classes.root} ref={modalRef}>
                    <div className={classes.createDep}>
                        <div className="newDep">
                            <Grid container={12} spacing={2}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="overline" className="newDepTitle">
                                        Create New Project
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        onChange={loadName}
                                        label="Project Name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        helperText={error.name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="text"
                                        onChange={loadRemark}
                                        label="Description"
                                        variant="outlined"
                                        fullWidth
                                        id="description"
                                        name="description"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="date"
                                        onChange={loadStartDate}
                                        value={startDate}
                                        label="Start Date"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="startDate"
                                        name="startDate"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        helperText={error.startDate}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="date"
                                        onChange={loadDueDate}
                                        value={dueDate}
                                        label="End Date"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="endDate"
                                        name="endDate"
                                        helperText={error.dueDate}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className={classes.option}
                         style={{borderRadius: 0}}
                         onClick={() => handleSubmit()}
                    >Create
                    </div>
                    <div
                        className={classes.option}
                        style={{borderRadius: 0, margin: 10}}
                        onClick={() => {
                            toggleModal();
                            document.body.style.overflow = "auto";
                        }}
                    >
                        Cancel
                    </div>
                </Paper>
            </div>
            , document.body
        ) :
        null;
}
export default ProjectCreateModal;