import React, {useEffect, useState} from "react";
import {PhaseService, ReportService} from "../../services/services";
import * as ReactDOM from "react-dom";
import {Button, InputLabel, MenuItem, Paper, Select, TextField, Typography} from "@material-ui/core";
import useStyles from "../../component/styles/modalStyles";
import FullscreenLoading from "../../component/FullScreenLoading";
import {useLoading} from "../../component/hooks/hooks";
import Grid from "@material-ui/core/Grid";
import {useSnackbar} from "notistack";

const PhaseCreateModal = ({toggle, toggleMount, modalRef, reportId = "", isOnReport = true, isShowing}) => {
    const [name, setName] = useState("");
    const [remark, setRemark] = useState("");
    const [startDate, setStartDate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [rpId, setReportId] = useState("");
    const [reports, setReports] = useState([]);

    const classes = useStyles();
    const [error, setError] = useState({});
    const {loading, onLoading, offLoading} = useLoading();
    const {enqueueSnackbar} = useSnackbar();

    const changeName = (e) => setName(e.target.value);
    const changeRemark = (e) => setRemark(e.target.value);
    const changeStartDate = (e) => setStartDate(e.target.value);
    const changeDueDate = (e) => setDueDate(e.target.value);
    const changeReportId = (e) => setReportId(e.target.value);
    const loadReports = (e) => setReports(e);

    isShowing && (document.body.style.overflow = "hidden");

    const createPhase = () => {
        onLoading();
        PhaseService.postPhase(name, remark, startDate, dueDate, reportId !== "" ? reportId : rpId)
            .then((r) => {
                if (r.status === 200 || r.status === 204) {
                    toggleMount();
                    toggle();
                    enqueueSnackbar("Submit successfully", {variant:"success"})
                } else enqueueSnackbar(r.data.message, {variant:"warning"})
            }).catch((r) => {
            enqueueSnackbar(r, {variant:"error"})
        })
        document.body.style.overflow = "auto";
        offLoading();
    }

    useEffect(() => {
        onLoading();
        if (!isOnReport) {
            ReportService.getList(isOnReport ? reportId : rpId)
                .then((r) => {
                    if (r.status === 200) {
                        loadReports(r.data);
                    } else alert(r.data.message);
                })
                .catch((r) => {
                    enqueueSnackbar(r, {variant:"error"})
                });
        }
        offLoading();
    }, [modalRef, toggle, reportId, rpId, isOnReport])

    const reportSelect = (
        <Grid item xs={12}>
            <InputLabel id="reports-label">Report</InputLabel>
            <Select
                labelId="reports-label"
                id="reports-select"
                value={rpId}
                variant="outlined"
                onChange={changeReportId}
                label="Report"
                fullWidth
                size={"small"}
                required
            >
                <MenuItem value={null}>Select</MenuItem>
                {reports.map(({id, name}, index) =>
                    <MenuItem key={index} value={id}>
                        {name}
                    </MenuItem>
                )}
            </Select>
        </Grid>
    );

    return isShowing
        ? ReactDOM.createPortal(
            <div>
                {loading ? <FullscreenLoading/> : null}
                <div className={classes.modalOverlay}/>
                <Paper className={classes.root} ref={modalRef}>
                    <Grid container xs={12} spacing={3} style={{padding: 10}} justify="flex-end" direction="row">
                        <Grid item xs={12}>
                            <Typography
                                align="center"
                                variant="h5"
                            >
                                Create new Phase
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                autoFocus={true}
                                variant="outlined"
                                label="Phase Name"
                                value={name}
                                onChange={changeName}
                                required
                                size={"small"}
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
                                size={"small"}
                                onChange={changeRemark}
                                className={classes.textField}
                            />
                        </Grid>
                        {!isOnReport ? reportSelect() : null}
                        <Grid item xs={12}>
                            <TextField
                                type="date"
                                autoFocus={true}
                                variant="outlined"
                                value={startDate}
                                label="Start Date"
                                size={"small"}
                                onChange={changeStartDate}
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
                                size={"small"}
                                onChange={changeDueDate}
                                required
                                className={classes.textField}
                                helperText={error.dueDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={8}/>
                        <Grid item xs={4}>
                            <Button
                                color="primary"
                                onClick={() => {
                                    createPhase();
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
        ) : null
}
export default PhaseCreateModal