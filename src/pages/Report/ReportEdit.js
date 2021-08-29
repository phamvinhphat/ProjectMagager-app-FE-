import React, {useEffect, useRef, useState} from "react";
import {Paper, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GanttChart from "../../component/Gantt";
import useStyles from "./styles/ReportEditStyle"
import {useLoading} from "../../component/hooks/hooks";
import FullscreenLoading from "../../component/FullScreenLoading";
import BackButton from "../../component/BackButton";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import PhaseCreateModal from "../Phase/PhaseCreateModal";
import TaskCreateModal from "../Task/TaskCreateModal";
import TaskServices from "../../services/task.service";
import moment from "moment";
import {useParams} from "react-router-dom";
import PhaseEditModal from "../Phase/PhaseEditModal";
import EditIcon from "@material-ui/icons/Edit";

const Chart = ({phase, loadPhaseId, togglePhaseEdit, toggleMount}) => {
    let start = moment(phase.startDate).format("MMM Do YYYY");
    let end = moment(phase.dueDate).format("MMM Do YYYY");
    const  NoValue = (
        <Grid item xs={12}>
            <Typography variant="body2" align="center">No value</Typography>
        </Grid>
    );

    return (
        <Grid container justify={"center"} spacing={3}>
            <Grid item xs={12}>
                <Typography variant="overline">Phase: {phase.name} ({start} - {end})</Typography>
                <Button>
                    <EditIcon color={"primary"} onClick={() => {
                        loadPhaseId(phase.id);
                        togglePhaseEdit();
                    }}/>
                </Button>
            </Grid>
            {phase.tasks.length > 0? (
                <Grid item xs={12}>
                    <GanttChart data={phase.tasks} id={phase.id} toggleMount={toggleMount}/>
                </Grid>
            ) : NoValue}
        </Grid>
    )
}

const ReportEdit = () => {
    const classes = useStyles();
    const {loading, onLoading, offLoading} = useLoading();
    const [mounted, setMounted] = useState(true);
    const modalRef = useRef(null);
    const [showTask, setShowTask] = useState(false);
    const [showPhase, setShowPhase] = useState(false);
    const [showPhaseEdit, setShowPhaseEdit] = useState(false);

    const [phaseId, setPhaseId] = useState("");
    let {reportId} = useParams();

    const [report, setReport] = useState({});
    const {phases = [], name, groupId} = report;
    //const [phases, setPhases] = useState([]);

    const loadReport = (value) => {
        setReport(value);
    };
    //const loadPhases = (value) => setPhases(value);
    const loadPhaseId = (value) => setPhaseId(value);

    const toggleMount = () => setMounted(!mounted);
    const toggleTask = () => setShowTask(!showTask);
    const togglePhase = () => setShowPhase(!showPhase);
    const togglePhaseEdit = () => {
        setShowPhaseEdit(!showPhaseEdit);
    }

    useEffect(() => {
        onLoading();
            TaskServices.getList(reportId)
                .then((r) => {
                    if (r.status === 200) {
                        loadReport(r.data);
                    } else console.log(r.data.message);
                })
                .catch((r) => {
                    console.log(r);
                })
            offLoading();
        document.title = "Report Edit - " + name;
    }, [mounted, setMounted, reportId, name]);

    return (
        <>
            {loading ? <FullscreenLoading/> : null}
            <Paper className={classes.root}>
                <PhaseEditModal
                    toggle={togglePhaseEdit}
                    toggleMount={toggleMount}
                    modalRef={modalRef}
                    phaseId={phaseId}
                    isShow={showPhaseEdit}
                />
                <PhaseCreateModal
                    modalRef={modalRef}
                    toggleMount={toggleMount}
                    toggle={togglePhase}
                    isShowing={showPhase}
                    isOnReport={true}
                    reportId={reportId}
                />
                <TaskCreateModal
                    reportId={reportId}
                    isOnReport={true}
                    toggle={toggleTask}
                    toggleMount={toggleMount}
                    modalRef={modalRef}
                    isShowed={showTask}
                    groupId={groupId}
                    offLoading={offLoading}
                    onLoading={onLoading}
                />
                <Grid container className={classes.container}>
                    <Grid container item xs={6} spacing={2}>
                        <Grid item xs={3}>
                            <BackButton switchTo={"/report"} children="Back to list"/>
                        </Grid>
                        <Grid item xs={3}>
                            <Button onClick={toggleTask}>
                                <AddIcon/>
                                Create task
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button onClick={togglePhase}>
                                <AddIcon/>
                                Create phase
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container item xs={6} spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="button" display="block" gutterBottom align="right" color="primary">
                                Report Editor
                            </Typography>
                            <Typography variant="body2" display="block" gutterBottom align="right" color="secondary">
                                {name}
                            </Typography>
                        </Grid>
                    </Grid>
                    {phases.length > 0 ? (
                        phases.map((phase) => {
                                return <Chart phase={phase}
                                              togglePhaseEdit={togglePhaseEdit}
                                              loadPhaseId={loadPhaseId}
                                              toggleMount={toggleMount}
                                />
                            })
                    ): (
                        <Grid item xs={12}>
                            <Typography variant="body2" align="center">No value, Please create a new Phase</Typography>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </>
    );
}
export default ReportEdit;