import './styles/DepList.css';
import React, {useRef, useState} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Link as ReactLink} from "react-router-dom";
import {GroupService} from "../../services/services";
import {Button, Grid, Link, Paper, Typography} from "@material-ui/core";
import DepCreateModal from "./DepCreateModal";
import useLoading from "../../component/hooks/useLoading";
import FullscreenLoading from "../../component/FullScreenLoading";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AddIcon from "@material-ui/icons/Add";
import {useSnackbar} from "notistack";


const DepList = () => {
    const [data, setData] = useState([]);
    const [isShowingCreate, setIsShowingCreate] = useState(false);
    const modalRef = useRef(null);
    const [mounted, setMounted] = useState(true);
    const {loading, onLoading, offLoading} = useLoading()
    const {enqueueSnackbar} = useSnackbar();

    const toggleMount = () => setMounted(!mounted);
    const toggleCreate = () => {
        setIsShowingCreate(!isShowingCreate);
    };
    const handleDelete = (id) => {
        GroupService.deleteGroup(id).then((r) => {
            if (r.status === 200) {
                console.log(r.statusText);
            } else enqueueSnackbar("Failed", "error");
        });
    }

    React.useEffect(() => {
        onLoading();
        GroupService.getList("department")
            .then((r) => {
                console.log(r.status);
                if (r.status === 200)
                    setData(r.data);
                else  enqueueSnackbar(r.data.message, "error");
                offLoading();
            }, [])
            .catch((r) => {
                console.log(r);
                enqueueSnackbar(r, "error");
            });
        document.title = "Department List";
    }, [mounted, setMounted]);
    const columns = [
        {field: 'name', headerName: 'Department Name', width: 200},
        {
            field: 'groupType',
            headerName: 'Type',
            width: 200,
            valueFormatter: (params) => params.row?.groupType?.name
        },
        {field: 'users', headerName: 'Members', width: 150},
        {
            field: 'leader', headerName: 'Leader', width: 150,
            valueFormatter: (params) => params.row?.leader?.name
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                const link = {
                    pathname: "/department/" + params.row.id,
                    state: {
                        depId: params.row.id
                    }
                };
                return (<>
                        <Link component={ReactLink}
                              variant="body1"

                              underline="none"
                              to={link}>
                            <Button variant="text">
                                <EditOutlinedIcon color="primary"/>
                            </Button>
                        </Link>
                        <Button variant="text">
                            <DeleteForeverIcon
                                className="depListDelete"
                                onClick={() => handleDelete(params.row.id)}
                            />
                        </Button>
                    </>
                )
            }
        },
    ];
    return (<>
            {loading ? <FullscreenLoading/> : null}
            <DepCreateModal
                isShowing={isShowingCreate}
                toggleModal={toggleCreate}
                modalRef={modalRef}
                toggleMount={toggleMount}
            />
            <Paper style={{height: "100%", width: "100%"}}>
                <Grid container justify="center" spacing={3}>
                    <Grid item xs={1}>
                        <Typography variant="h6" align="center">DEPARTMENT</Typography>
                    </Grid>
                </Grid>
                <Grid container justify="center" spacing={3} xs={1}>
                    <Grid item xs={1}>
                        <Button onClick={toggleCreate}>
                            <AddIcon/> Create
                        </Button>
                    </Grid>
                </Grid>
                <Grid container className="Department" spacing={3}>
                    <Grid item xs={12} style={{minHeight: 500}}>
                        <DataGrid
                            rows={data}
                            disableSelectionOnClick
                            columns={columns}
                            pageSize={10}
                            checkboxSelection
                        />
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}
export default DepList;