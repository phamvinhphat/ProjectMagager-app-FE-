import React, {useEffect, useRef, useState} from "react";
import {ProjectService} from "../../services/services";
import {useLoading} from "../../component/hooks/hooks";
import FullscreenLoading from "../../component/FullScreenLoading";
import {DataGrid} from "@material-ui/data-grid";
import {Grid, Paper, Typography} from "@material-ui/core";
import useStyles from "./styles/listStyle";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined'
import AddIcon from '@material-ui/icons/Add';
import ProjectCreateModal from "./ProjectCreateModal";
import moment from "moment";

import BackButton from "../../component/BackButton";
import Button from "@material-ui/core/Button";
import Linker from "../../component/Linker";
import {useSnackbar} from "notistack";
import {useConfirm} from "material-ui-confirm";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    const [isCreate, setIsCreate] = useState(false);
    const {loading, onLoading, offLoading} = useLoading();
    const modalRef = useRef(null);
    const classes = useStyles();
    const [mounted, setMounted] = useState(true);
    const confirm = useConfirm()

    const {enqueueSnackbar} = useSnackbar();

    const loadProjects = (e) => {
        setProjects(e);
    }

    const toggleCreate = () => {
        setIsCreate(!isCreate);
    }

    const toggleMount = () => setMounted(!mounted);

    const handleOnYes = (id) => {
        onLoading();
        confirm({description:"Are you sure? This action is permanent."})
            .then(() =>{
                ProjectService.deleteProject(id)
                    .then((r) => {
                        if (r.status === 200) {
                            toggleMount();
                            enqueueSnackbar("Removed success", {variant:"success"})
                        } else  enqueueSnackbar(r.data.message, {variant:"warning"})
                    }, null)
                    .catch((r) => enqueueSnackbar(r, {variant:"error"}))
            })
        offLoading();
    }
    useEffect(() => {
        onLoading();
        ProjectService.getList()
            .then((r) => {
                if (r.status === 200) {
                    loadProjects(r.data);
                } else loadProjects([]);
            }).catch((r) => {
            enqueueSnackbar(r, {variant:"error"})
        });
        offLoading();
        document.title = "Project List";
        }, [mounted,setMounted]);

    const columns = [
        {field: 'name', headerName: 'Project Name', width: 200},
        {field: 'remark', headerName: 'Descriptions', width: 300},
        {
            field: 'startDate', headerName: 'Start Date', width: 200,
            valueFormatter: (params) => {
                return moment(params.value).format("Do MMM YYYY");
            }
        },
        {field: 'dueDate', headerName: 'End Date', width: 200,
            valueFormatter: (params) => {
                return moment(params.value).format("Do MMM YYYY");
            }},
        {
            field: 'action', headerName: 'Actions', width: 200,
            renderCell: (p) => {
                return (
                    <div>
                        <Linker to={"project/" + p.row.id} content={<EditOutlinedIcon/>}/>
                        <Button>
                            <DeleteSweepOutlinedIcon
                                color="secondary"
                                onClick={() =>handleOnYes(p.row.id)}
                            />
                        </Button>
                    </div>
                )
            }
        },
    ];

    return (
        <>
            {loading ? <FullscreenLoading/> : null}
            <Paper className={classes.root}>
                <ProjectCreateModal
                    modalRef={modalRef}
                    toggleModal={toggleCreate}
                    isShowing={isCreate}
                    toggleMount={toggleMount}
                />
                <Grid container justify="center" spacing={3} className={classes.content}>
                    <Grid item xs={1}>
                        <Typography variant="h6" align="center">PROJECTS</Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent={"space-between"} >
                    <Grid item xs={3}>
                        <BackButton children="Back to home" switchTo={"/"}/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={toggleCreate}>
                            <AddIcon/> Create
                        </Button>
                    </Grid>
                </Grid>
                <Grid container style={{padding:10}}>
                    <Grid item xs={12} >
                        <DataGrid
                            className={classes.projectList}
                            rows={projects}
                            columns={columns}
                            pageSize={5}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}
export default ProjectList