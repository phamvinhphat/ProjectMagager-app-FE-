import {PhaseService} from "../../services/services";
import React, {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import useStyles from "../../component/styles/modalStyles";
import moment from "moment";
import {useSnackbar} from "notistack";

const PhaseEditModal = ({toggle, toggleMount, isShow, phaseId, modalRef}) => {
    const [phase, setPhase] = useState({});
    // const [name, setName] = useState("");
    // const [remark, setRemark] = useState("");
    // const [startDate, setStartDate] = useState("");
    // const [dueDate, setDueDate] = useState("");

    const classes = useStyles();
    const loadPhase = (e) => setPhase(e);
    const {enqueueSnackbar} = useSnackbar();
    // const loadName = (e) => setPhase(e);
    // const loadStartDate = (e) => setPhase(e);
    // const loadDueDate = (e) => setPhase(e);
    // const loadRemark = (e) => setPhase(e);

    const deletePhase = () => {
        PhaseService.deletePhase(phaseId)
            .then((r) => {
                if (r.status === 200)
                {
                    toggle();
                    toggleMount();
                    enqueueSnackbar("Submit successfully", {variant:"success"})
                } else enqueueSnackbar(r.data.message, {variant:"warning"})
            })
            .catch((r) => {
                enqueueSnackbar(r, {variant:"error"})
            })
    }

    useEffect(() => {
        const fetchPhase = () => {
            PhaseService.getDetails(phaseId)
                .then((r) => {
                    if (r.status === 200) {
                        loadPhase(r.data);
                    } else console.log(r.data.message)
                })
                .catch((r) => {
                    enqueueSnackbar(r, {variant:"error"})
                })
        }
        fetchPhase();
    }, [phaseId]);

    return isShow ? createPortal(<div>
            <div className={classes.modalOverlay}/>
            <Paper className={classes.root} style={{width:400, padding:20}} ref={modalRef}>
                <Grid container justify="flex-end" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant={"h6"} align={"center"}>
                            Phase Information
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"overline"}> Name </Typography>
                        <TextField
                            value={phase.name}
                            variant="outlined"
                            type="text"
                            fullWidth
                            size={"small"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"overline"}> Description </Typography>
                        <TextField
                            value={phase.remark}
                            variant="outlined"
                            type="text"
                            size={"small"}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Typography variant={"overline"}> Start Date </Typography>
                        <TextField
                            value={moment(phase.startDate).format("MM Do YYYY")}
                            variant="outlined"
                            type="text"
                            size={"small"}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"overline"}> End Date </Typography>
                        <TextField
                            value={moment(phase.dueDate).format("MM Do YYYY")}
                            variant="outlined"
                            type="text"
                            size={"small"}
                            fullWidth
                        />
                    </Grid>
                    <Grid container item justify={"flex-end"} xs={12}>
                        <Button variant={"text"} color={"secondary"} onClick={deletePhase}>
                            Delete
                        </Button>
                        <Button variant={"text"} color={"primary"} onClick={toggle}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
        , document.body) : null;
}
export default PhaseEditModal;