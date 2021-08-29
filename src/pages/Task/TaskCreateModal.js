import React, {useEffect, useState} from "react";
import {GroupService, PhaseService, ReportService} from "../../services/services";
import TaskServices from "../../services/task.service";
import * as ReactDOM from "react-dom";
import useStyles from "../../component/styles/modalStyles"
import {Button, InputLabel, MenuItem, Paper, Select, TextField, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SliderCustom from "../../component/PrettoSlider";
import moment from "moment";
import {useSnackbar} from "notistack";

const TaskCreateModal = ({
                             toggle,
                             toggleMount,
                             modalRef,
                             isShowed,
                             isOnReport = true,
                             reportId,
                             groupId = "",
                             onLoading,
                             offLoading
                         }) => {
    const [reports, setReports] = useState([]);
    const [phases, setPhases] = useState([]);
    const [tasks, setTask] = useState([]);
    const [member, setMember] = useState([]);
    const [rpId, setRpId] = useState("");
    const [phaseId, setPhaseId] = useState("");
    const [parent_n, setParent_n] = useState("");
    const [memberId, setMemberId] = useState("");
    const [name, setName] = useState("");
    const [remark, setRemark] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [percent, setPercent] = useState(0);

    const loadReports = (value) => setReports(value);
    const loadPhases = (value) => setPhases(value);
    const loadTasks = (value) => {
        setTask(value);
    };
    const loadMember = (value) => setMember(value);

    const changeRpId = (e) => setRpId(e.target.value);
    const changeParent_n = (e) => {
        setParent_n(e.target.value);
        let p = tasks.find(t => t.id === e.target.value);
        if (p !== null) loadStartDate(moment(p.dueDate).format("YYYY-MM-DD"));
    }
    const changePhaseId = (e) => setPhaseId(e.target.value);
    const changeMemberId = (e) => setMemberId(e.target.value);
    const changeName = (e) => setName(e.target.value);
    const changeRemark = (e) => setRemark(e.target.value);
    const changeDueDate = (e) => setDueDate(e.target.value);
    const changeStartDate = (e) => setStartDate(e.target.value);
    const changePercent = (e, value) => setPercent(value);
    const loadStartDate = (e) => setStartDate(e);

    isShowed && (document.body.style.overflow = "hidden");
    const classes = useStyles();
    const [error, setError] = useState({});
    const {enqueueSnackbar} = useSnackbar();


    const createHandler = () => {
        TaskServices.postTask(name, remark, dueDate, startDate, percent, phaseId, memberId, parent_n)
            .then((r) => {
                if (r.status === 200) {
                    enqueueSnackbar("Success", {variant: "success"});
                    toggle();
                    toggleMount();
                } else setError(r.data.message);
            })
            .catch(() => {
                enqueueSnackbar("Internal Server Error", {variant: 'error'});
            });
    }

    useEffect(() => {
        if (!isOnReport)
            ReportService.getList("")
                .then((r) => {
                    if (r.status === 200) {
                        loadReports(r.data);
                    } else console.log(r.data.message);
                })
                .catch(() => {
                    enqueueSnackbar("Internal Server Error", {variant: 'error'});
                });
        if (reportId !== "" || rpId !== "")
            PhaseService.getList(reportId ?? rpId)
                .then((result) => {
                    if (result.status === 200) {
                        loadPhases(result.data);
                    } else console.log(result.data.message);
                })
                .catch(() => {
                    enqueueSnackbar("Internal Server Error", {variant: 'error'});
                });


        if (groupId !== "")
            GroupService.memberList(groupId)
                .then((r) => {
                    if (r.status === 200) {
                        loadMember(r.data);
                    } else console.log(r.data.message);
                })
                .catch(() => {
                    enqueueSnackbar("Internal Server Error", {variant: 'error'});
                })

        if (phaseId !== "")
            TaskServices.getListByPhase(phaseId)
                .then((r) => {
                    if (r.status === 200) {
                        loadTasks(r.data);
                    } else console.log(r.data.message);
                })
                .catch(() => {
                    enqueueSnackbar("Internal Server Error", {variant: 'error'});
                });

    }, [groupId, phaseId, reportId, isOnReport, rpId]);

    const reportSelect = () => {
        return (
            <Grid item xs={12}>
                <InputLabel id="reports-label">Reports</InputLabel>
                <Select
                    labelId="reports-label"
                    id="reports-select"
                    value={rpId}
                    variant="outlined"
                    onChange={changeRpId}
                    label="Reports"
                    fullWidth
                    size={"small"}
                    required
                >
                    <MenuItem value={""}>Select</MenuItem>
                    {reports.map(({id, name}, index) =>
                        <MenuItem key={index} value={id}>
                            {name}
                        </MenuItem>
                    )}
                </Select>
            </Grid>
        )
    }

    const phaseSelect = () => {
        return (
            <Grid item xs={12}>
                <InputLabel id="phase-label">Phase</InputLabel>
                <Select
                    labelId="phase-label"
                    id="phase-select"
                    value={phaseId}
                    variant="outlined"
                    onChange={changePhaseId}
                    label="Phases"
                    fullWidth
                    required
                    size={"small"}
                >
                    <MenuItem value={""}>Select</MenuItem>
                    {phases.map(({id, name}, index) =>
                        <MenuItem key={index} value={id}>
                            {name}
                        </MenuItem>
                    )}
                </Select>
            </Grid>
        )
    };

    const taskSelect = () => {
        return (
            <Grid item xs={12}>
                <InputLabel id="parent-label">Parent Task</InputLabel>
                <Select
                    labelId="parent-label"
                    id="parent-select"
                    value={parent_n}
                    variant="outlined"
                    onChange={changeParent_n}
                    label="Parent Task"
                    fullWidth
                    size={"small"}
                >
                    <MenuItem value={""}>Select</MenuItem>
                    {tasks.map(({id, name}, index) =>
                        <MenuItem key={index} value={id}>
                            {name}
                        </MenuItem>
                    )}
                </Select>
            </Grid>
        )
    };

    const memberSelect = () => {
        return (
            <Grid item xs={12}>
                <InputLabel id="member-label">Member</InputLabel>
                <Select
                    labelId="member-label"
                    id="member-select"
                    value={memberId}
                    variant="outlined"
                    onChange={changeMemberId}
                    label="Member"
                    required
                    fullWidth
                    size={"small"}
                >
                    <MenuItem value={""}>Select</MenuItem>
                    {member.map(({id, name}, index) =>
                        <MenuItem key={index} value={id}>
                            {name}
                        </MenuItem>
                    )}
                </Select>
            </Grid>
        )
    };

    const emptyPhase = () => {
        return (<>
                <Grid item xs={12}>
                    <Typography variant="overline">
                        Please Create Phase Before Create Task
                    </Typography>
                </Grid>
                <Grid item={8}/>
                <Grid item xs={4}>
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
            </>
        )
    }

    const createForm = () => {
        return (
            <>
                <Grid container item xs={6} justifyContent={"center"} spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            onChange={changeName}
                            label="Task Name"
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
                            onChange={changeRemark}
                            label="Description"
                            variant="outlined"
                            fullWidth
                            id="description"
                            name="description"
                        />
                    </Grid>
                    {tasks.length !== 0 ? (
                        <Grid item xs={12}>
                            <TextField
                                type="date"
                                onChange={changeStartDate}
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
                    ) : null}
                    <Grid item xs={12}>
                        <TextField
                            type="date"
                            onChange={changeDueDate}
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
                    <Grid item xs={12}>
                        <SliderCustom
                            title={"Progress"}
                            value={percent}
                            onChange={changePercent}
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={6} justifyContent={"center"} spacing={2}>
                    {!isOnReport ? reportSelect() : null}
                    {phases?.length ? phaseSelect() : null}
                    {phaseId !== "" ? taskSelect() : null}
                    {phaseId !== "" ? memberSelect() : null}
                </Grid>
                <Grid container item xs={4} justifyContent={"center"} spacing={2}>
                        <Button
                            color="primary"
                            onClick={() => {
                                createHandler();
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
            </>
        )
    }
    return isShowed ? ReactDOM.createPortal(
            <div>
                <div className={classes.modalOverlay}/>
                <Paper className={classes.root} ref={modalRef}>
                    <Grid container xs={12} spacing={2} style={{padding: 10}} justify="center" direction="row">
                        <Grid item xs={12}>
                            <Typography
                                variant="overline"
                                style={{fontSize: 32, fontWeight: "revert"}}>
                                Create new task
                            </Typography>
                        </Grid>
                        {(phases?.length || !isOnReport) ? createForm() : emptyPhase()}
                    </Grid>
                </Paper>
            </div>, document.body
        ) : null
}
export default TaskCreateModal