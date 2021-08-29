import React, {useEffect, useRef, useState} from "react";
import {useLoading} from "../../component/hooks/hooks";
import {GroupService, ProjectService, ReportService} from "../../services/services";
import {Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography} from "@material-ui/core";
import useStyles from "./styles/ReportListStyle";
import FullscreenLoading from "../../component/FullScreenLoading";
import ReportCreateModal from "./ReportCreateModal";
import {DataGrid} from "@material-ui/data-grid";
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import moment from "moment";
import BackButton from "../../component/BackButton";
import AddIcon from "@material-ui/icons/Add";
import Linker from "../../component/Linker";
import {useConfirm} from "material-ui-confirm";
import {useSnackbar} from "notistack";


const ReportList = () => {
    const [groups, setGroups] = useState([]);
    const [reports, setReports] = useState([]);
    const [projects, setProjects] = useState([]);
    const [fData, setFData] = useState([]);
    const [groupName, setGroupName] = useState("All");
    const [prjName, setPrjName] = useState("All");

    const {loading, onLoading, offLoading} = useLoading();
    const [mounted, setMounted] = useState(true);
    const [isShowCreate, setIsShowCreate] = useState(false);
    const modelRef = useRef();
    const classes = useStyles();
    const confirm = useConfirm();
    const {enqueueSnackbar} = useSnackbar();

    const loadReports = (value) => setReports(value);
    const loadGroups = (value) => setGroups(value);
    const loadProjects = (value) => setProjects(value);
    const loadFData = (value) => setFData(value);
    const loadGroup = (value) => {
        setGroupName(value.target.value);
    }
    const loadPrjName = (value) => {
        setPrjName(value.target.value);
    }

    const toggleMount = () => setMounted(!mounted);
    const toggleCreate = () => setIsShowCreate(!isShowCreate);

    useEffect(() => {
        onLoading();
        GroupService.getList("")
            .then((r) => {
                if (r.status === 200) {
                    loadGroups(r.data);
                } else enqueueSnackbar(r.data.message, { variant: 'warning' });
            })
            .catch(() => {
                enqueueSnackbar("Internal Server Error", { variant: 'error' });
            })
        ReportService.getList("")
            .then((r) => {
                if (r.status === 200 || r.status === 204) {
                    loadReports(r.data);
                    loadFData(r.data);
                } else console.log(r.data.message);
            }).catch(() => {
            enqueueSnackbar("Internal Server Error", { variant: 'error' });
        })
        ProjectService.getList()
            .then((r) => {
                if (r.status === 200 || r.status === 204) {
                    loadProjects(r.data);
                } else console.log(r.data.message);
            }).catch(() => {
            enqueueSnackbar("Internal Server Error", { variant: 'error' });
        })
        document.title = "Report List";
        offLoading();
    }, [mounted, setMounted]);

    useEffect(() => {
        let filtered;
        if (groupName === "All" && prjName === "All") {
            filtered = reports;
        }
        if (groupName !== "All" && prjName === "All") {
            filtered = reports.filter(f => f.groupName === groupName);
        }
        if (groupName === "All" && prjName !== "All") {
            filtered = reports.filter(f => f.projectName === prjName);
        }
        if (groupName !== "All" && prjName !== "All") {
            filtered = reports.filter(f => f.projectName === prjName && f.groupName === groupName);
        }
        loadFData(filtered);
    }, [groupName, prjName, reports]);

    const handleDelete = (reportId) => {
        confirm({description: "Are you sure?"})
            .then(() => {
                onLoading();
                ReportService.deleteReport(reportId)
                    .then((r) => {
                        if (r.status === 200 ){
                            toggleMount();
                            enqueueSnackbar("Deleted successfully",{variant:"success"})
                        } else  enqueueSnackbar(r.data.message,{variant:"warning"})
                    })
            })
            .catch((r)=> {
                enqueueSnackbar(r,{variant:"error"})
        })
        offLoading();
    }

    const columns = [
        {field: "name", headerName: "Report name", width: 200},
        {field: "remark", headerName: "Description", width: 200},
        {field: "groupName", headerName: "Group", width: 200},
        {field: "projectName", headerName: "Project", width: 200},
        {field: "progress", headerName: "Progress", width: 150},
        {
            field: "startDate", headerName: "Start", width: 120,
            valueFormatter: (params) => {
                return moment(params.value).format("Do MMM YYYY");
            }
        },
        {
            field: "dueDate", headerName: "End", width: 120,
            valueFormatter: (params) => {
                return moment(params.value).format("Do MMM YYYY");
            }
        },
        {
            field: "actions", headerName: "Actions", width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Linker to={"/report/" + params.row.id} content={<EditIcon/>}/>
                        <Button onClick={() => handleDelete(params.row.id)}>
                            <DeleteOutlinedIcon color="secondary"/>
                        </Button>
                    </>
                );
            }
        },
    ];

    return (
        <>
            {loading ? <FullscreenLoading/> : null}
            <Paper className={classes.root}>
                <ReportCreateModal
                    toggleMount={toggleMount}
                    toggle={toggleCreate}
                    showPrjList={true}
                    projectId={""}
                    modalRef={modelRef}
                    isShowed={isShowCreate}
                />
                <Grid container justifyContent="center" spacing={3}>
                    <Grid item xs={2}>
                        <Typography variant="h6" align="center">REPORTS</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3}
                      className={classes.container}
                      direction="column"
                      justifyContent="center">
                    <Grid container
                          direction="row"
                          justifyContent="space-evenly"
                          alignItems="center"
                          spacing={3}
                    >
                        <Grid item xs={2}>
                            <BackButton children="Back to Home" switchTo={""}/>
                        </Grid>
                        <Grid item xs={2} onClick={toggleCreate}>
                            <Button>
                                <AddIcon/> Create new report
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="overline" display="block" gutterBottom align="right">
                                Filters
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl className={classes.formControl} fullWidth variant="outlined">
                                <InputLabel>Groups</InputLabel>
                                <Select
                                    labelId="group-label"
                                    id="group-select"
                                    value={groupName}
                                    variant="outlined"
                                    onChange={loadGroup}
                                    label="Group"
                                    fullWidth
                                >
                                    <MenuItem value={"All"}>All</MenuItem>
                                    {groups.map(({id, name}) =>
                                        <MenuItem key={id} value={name}>
                                            {name}
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl className={classes.formControl} fullWidth variant="outlined">
                                <InputLabel>Projects</InputLabel>
                                <Select
                                    labelId="group-label"
                                    id="group-select"
                                    value={prjName}
                                    variant="outlined"
                                    onChange={loadPrjName}
                                    label="Group"
                                    fullWidth
                                    autoWidth={true}
                                >
                                    <MenuItem value={"All"}>All</MenuItem>
                                    {projects.map(({id, name}) =>
                                        <MenuItem key={id} value={name}>
                                            {name}
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <DataGrid
                            columns={columns}
                            rows={fData}
                            pageSize={10}
                            className={classes.reportList}
                            disableSelectionOnClick
                            disableColumnFilter
                            autoHeight={true}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}
export default ReportList;