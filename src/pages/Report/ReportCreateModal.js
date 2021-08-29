import {GroupService, ProjectService, ReportService} from "../../services/services";
import React, {useEffect, useState} from "react";
import {useLoading} from "../../component/hooks/hooks";
import moment from "moment";
import * as ReactDOM from "react-dom";
import FullscreenLoading from "../../component/FullScreenLoading";
import useStyles from "../../component/styles/modalStyles";
import {Button, InputLabel, MenuItem, Paper, Select, TextField, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SliderCustom from "../../component/PrettoSlider";
import {useSnackbar} from "notistack";

const ReportCreateModal = ({
                               isShowed,
                               toggle,
                               modalRef,
                               projectId,
                               toggleMount,
                               showPrjList = false
                           }) => {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [remark, setRemark] = useState("");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [groups, setGroups] = useState([]);
    const [project, setProject] = useState([]);
    const [groupId, setGroupId] = useState("");
    const [prjId, setPjId] = useState("");
    const [error, setError] = useState({});

    const {loading, onLoading, offLoading} = useLoading();
    const {enqueueSnackbar} = useSnackbar();

    isShowed && (document.body.style.overflow = "hidden");

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
    const loadGroups = (values) => {
        setGroups(values);
    }
    const loadProject = (values) => {
        setProject(values);
    }
    const loadGroupId = (val) => {
        setGroupId(val.target.value);
    }
    const loadPrjId = (val) => {
        setPjId(val.target.value);
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

        if (!moment(startDate, 'YYYY-MM-DD', true).isValid()) {
            setError((prevError) => ({
                ...prevError,
                startDate: "This is not a valid date.",
            }));
            isError = true;

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
        if (!moment(dueDate, 'YYYY-MM-DD', true).isValid()) {
            setError((prevError) => ({
                ...prevError,
                dueDate: "This is not a valid date.",
            }));
            isError = true;

        } else if (moment(dueDate) < moment(startDate)) {
            setError((prevError) => ({
                ...prevError,
                dueDate: "End date can not be before start date",
            }));
            isError = true;
            console.log("dueDate " + isError);
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

        if (prjId === "" && projectId === "") {
            setError((prevError) => ({
                ...prevError,
                project: "Please select a project.",
            }));
            isError = true;
        } else {
            setError((prevError) => ({
                ...prevError,
                project: "Please select a project.",
            }));
        }
        if (groupId === "") {
            setError((prevError) => ({
                ...prevError,
                group: "Please select a Group or a Department.",
            }));
            isError = true;
        } else {
            setError((prevError) => ({
                ...prevError,
                group: "Please select a Group or a Department.",
            }));
        }
        return isError;
    }

    const createReport = () => {
        onLoading();
        if (!validate()) {
            debugger;
            ReportService.postReport(name, remark, startDate, dueDate, 0, projectId, groupId)
                .then((r) => {
                    if (r.status === 200 || r.status === 204) {
                        toggle();
                        toggleMount();
                        enqueueSnackbar("Created", {variant: "success"})
                    } else {
                        alert(r.data.message);
                    }
                })
                .catch((r) => {
                    enqueueSnackbar("Internal Server Error.", {variant: "error"})
                    toggle();
                });
        }
        document.body.style.overflow = "auto";
        offLoading();
    }


    useEffect(() => {
        onLoading();
        GroupService.getList("")
            .then((r) => {
                if (r.status === 200) {
                    loadGroups(r.data);
                } else console.log(r.data.message);
            }).catch((r) => {
            enqueueSnackbar("Internal Server Error.", {variant: "error"})
        })
        if (showPrjList)
            ProjectService.getList()
                .then((r) => {
                    if (r.status === 200) {
                        loadProject(r.data);
                    } else console.log(r.data.message);
                })
                .catch(() => {
                    enqueueSnackbar("Internal Server Error.", {variant: "error"})
                });
        offLoading();
    }, [modalRef, toggle, showPrjList]);

    const projectSelect = () => {
        return (
            <Grid item xs={12}>
                <InputLabel id="group-label">Projects</InputLabel>
                <Select
                    labelId="group-label"
                    id="group-select"
                    value={prjId}
                    variant="outlined"
                    onChange={loadPrjId}
                    label="Group"
                    fullWidth
                    required
                >
                    <MenuItem value={null}>Select</MenuItem>
                    {project.map(({id, name}, index) =>
                        <MenuItem key={index} value={id}>
                            {name}
                        </MenuItem>
                    )}
                </Select>
            </Grid>
        )
    }

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (modalRef.current && !modalRef.current.contains(event.target)) {
    //             toggle();
    //             document.body.style.overflow = "auto";
    //         }
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [modalRef, toggle]);

    return isShowed
        ? ReactDOM.createPortal(
            <div>
                {loading ? <FullscreenLoading/> : null}
                <div className={classes.modalOverlay}/>
                <Paper className={classes.root} ref={modalRef}>
                    <Grid container xs={12} spacing={2} style={{padding: 10}} justify="center" direction="row">
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                style={{fontSize: 32, fontWeight: "bold"}}>
                                Create new report
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                autoFocus={true}
                                variant="outlined"
                                label="Report Name"
                                value={name}
                                onChange={loadName}
                                required
                                className={classes.textField}
                                helperText={error.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                autoFocus={true}
                                variant="outlined"
                                label="Descriptions"
                                value={remark}
                                onChange={loadRemark}
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="group-label">Group</InputLabel>
                            <Select
                                labelId="group-label"
                                id="group-select"
                                value={groupId}
                                variant="outlined"
                                required
                                onChange={loadGroupId}
                                label="Group"
                                fullWidth
                            >
                                <MenuItem value={null}>Select</MenuItem>
                                {groups.map(({id, name}, index) =>
                                    <MenuItem key={index} value={id}>
                                        {name}
                                    </MenuItem>
                                )}
                            </Select>
                        </Grid>
                        {showPrjList ?
                            projectSelect()
                            : null}
                        <Grid item xs={12}>
                            <TextField
                                type="date"
                                autoFocus={true}
                                variant="outlined"
                                value={startDate}
                                label="Start Date"
                                onChange={loadStartDate}
                                required
                                className={classes.textField}
                                helperText={error.startDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="date"
                                autoFocus={true}
                                variant="outlined"
                                label="End Date"
                                value={dueDate}
                                onChange={loadDueDate}
                                required
                                className={classes.textField}
                                helperText={error.dueDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item={8}/>
                        <Grid item xs={4}>
                            <Button
                                color="primary"
                                onClick={() => {
                                    createReport();
                                }}
                            >
                                Create
                            </Button>
                            <Button
                                color="secondary"
                                onClick={() => {
                                    toggle();
                                    document.body.style.overflow = "auto";
                                }}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>, document.body
        ) : null;
}
export default ReportCreateModal;