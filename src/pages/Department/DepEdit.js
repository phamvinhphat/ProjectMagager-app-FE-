import React, {useRef, useState} from 'react';
import "./styles/DepEdit.css"
import Button from "@material-ui/core/Button";
import {GroupService, UserService} from "../../services/services";
import Avatar from '@material-ui/core/Avatar';
import AddMemberModal from "./AddMemberModal";
import {useLoading} from "../../component/hooks/hooks";
import FullscreenLoading from "../../component/FullScreenLoading";
import BackButton from "../../component/BackButton";
import {Grid, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Paper, Typography} from "@material-ui/core";
import {useParams} from "react-router";
import {useSnackbar} from "notistack";
import {Domain, PeopleSharp} from "@material-ui/icons";
import {useConfirm} from "material-ui-confirm";
import {useHistory} from "react-router-dom";
import {DataGrid} from "@material-ui/data-grid";

const DepEdit = () => {
    const [member, setMember] = useState([]);
    const [checked, setChecked] = useState([]);
    const [dep, setDep] = useState({});
    const {name, users = [], leaderId} = dep;

    const {enqueueSnackbar} = useSnackbar();
    const confirm = useConfirm();
    const history = useHistory();
    const [isShowing, setIsShowing] = useState(false);
    const modalRef = useRef(null);
    const {loading, onLoading, offLoading} = useLoading();
    const [mounted, setMounted] = useState(true);
    let {depId} = useParams();

    const [leader, setLeader] = useState({})

    const toggleMount = () => setMounted(!mounted);
    const addMember = (m) => {
        setMember(oldArray => [...oldArray, m]);
    };

    const loadDep = (e) => {
        setDep(e)
    }
    const loadCheck = (e) => {
        setChecked(e);
    }

    const toggle = () => {
        setIsShowing(!isShowing);
    };

    const kickHandle = (depName, ids) => {
        if (ids.length === 0) {
            enqueueSnackbar("Please select at least one member!", {variant: "warning"});
            return;
        }
        confirm({description: "Are you sure?"})
            .then(() => {
                GroupService.removeMembers(depName, ids).then(res => {
                    if (res.status === 200) {
                        enqueueSnackbar("Success", {variant: "success"});
                        toggleMount();
                    } else enqueueSnackbar(res.data.message, {variant: "warning"});
                })
            })
            .catch((r) => {
                enqueueSnackbar(r, {variant: "error"});
            })

    }
    const promotionHandle = (username) => {
        if (username == null) {
            enqueueSnackbar("Please select at least one member!", {variant: "warning"});
            return;
        }
        confirm("Are you sure? You will lose all privilege after this.")
            .then(() => {
                GroupService.promotion(username).then(res => {
                    if (res.status === 200) {
                        enqueueSnackbar("Success", {variant: "success"});
                        toggleMount();
                    } else enqueueSnackbar(res.data.message, {variant: "warning"});
                })
            })
            .catch((r) => {
                enqueueSnackbar(r, {variant: "error"});
            })
    }

    const deleteHandle = () => {
        confirm("Are you sure that you want to delete this group? This action is permanent.")
            .then(() => {
                GroupService.deleteGroup(depId).then(res => {
                    if (res.status === 200) {
                        enqueueSnackbar("Success", {variant: "success"});
                        history.goBack();
                        toggleMount();
                    } else enqueueSnackbar(res.data.message, {variant: "warning"});
                })
                    .catch((r) => {
                        enqueueSnackbar(r, {variant: "error"});
                    })
            })

    }

    React.useEffect(() => {
        onLoading();
        GroupService.getDetail(depId)
            .then((result) => {
                if (result.status === 200) {
                    loadDep(result.data);
                } else console.log(result.data.message);
                offLoading();
            })
            .catch(() => {
                enqueueSnackbar("Internal Server Error", "error");
            });

        users.forEach((user) => {
            UserService.getProfile(user.id)
                .then((result) => {
                    if (result.status === 200) {
                        addMember(result.data);
                        if (result.data.id === leaderId) setLeader(result.data);
                    }
                }, {})
                .catch((result) => {
                    enqueueSnackbar(result, "error");
                });
        })
        offLoading();
        document.title = "Department Edit - " + name;
    }, [mounted, setMounted, depId, name, leaderId]);

    const columns = [
        {field: "avatarUrl", headerName: "Avatar", width: 200,
            renderCell: (p) => {
                return (
                    <Avatar alt={p.row.username} src={p.row.avatarUrl}/>
                )
        }},
        {field: "name", headerName: "Name", width: 200},
        {field: "Privilege", headerName: "Privilege", width: 200,
            renderCell: (p) => {
            return  (
                <Button variant={"outlined"}
                        children={p.row.id === leaderId? "Leader" : "Member"}
                        color={p.row.id === leaderId? "secondary" : "primary"}
                />
            )
        }},
        {field: "action", headerName: "Actions", width: 200,
            renderCell: (p) => {
                return (
                    <>
                        <Button
                            variant={"outlined"}
                            style={{marginRight:5}}
                            onClick={() => kickHandle(name, checked)}
                        >
                            Kick
                        </Button>
                        <Button
                            variant={"outlined"}
                            onClick={() => promotionHandle(p.getValue(p.id, 'userName'))}
                        >
                            Promotion
                        </Button>
                    </>
                )
            }}
    ];

    return (
        <div>
            <BackButton children="Back" switchTo="/department"/>
            <Paper className="DepContainer">
                {loading ? <FullscreenLoading/> : null}
                <AddMemberModal
                    isShowing={isShowing}
                    toggleModal={toggle}
                    modalRef={modalRef}
                    groupName={name}
                    toggleMount={toggleMount}
                />
                <Grid container justifyContent={"flex-start"} spacing={3}>
                    <Grid item container xs={3} spacing={3}>
                        <List style={{padding: "20px 0 0 10px"}}>
                            <ListItem>
                                <Typography variant={"body2"} style={{fontSize: 21, textAlign:"center"}}>
                                    DEPARTMENT EDIT
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar children={<Domain/>}/>
                                </ListItemAvatar>
                                <ListItemText primary={"Department"} secondary={name}/>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar children={<PeopleSharp/>}/>
                                </ListItemAvatar>
                                <ListItemText primary={"Leader"} secondary={leader.name}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Button children={"Add members"} onClick={toggle} color={"primary"}/>
                                    <Button children={"Delete"} onClick={deleteHandle} color={"secondary"}/>
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={9} style={{padding: 20}}>
                        <DataGrid columns={columns} rows={member}
                                  checkboxSelection
                                  onSelectionModelChange={(row) => {
                                      loadCheck(row);
                                  }}
                                  pageSize={5}
                                  style={{minHeight:500}}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}


export default DepEdit;

