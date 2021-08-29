import useStyles from "../../component/styles/modalStyles";
import {useLoading} from "../../component/hooks/hooks";
import React, {useEffect, useState} from "react";
import {GroupService, UserService} from "../../services/services";
import FullscreenLoading from "../../component/FullScreenLoading";

import * as ReactDOM from "react-dom";
import Avatar from "@material-ui/core/Avatar";
import {Paper} from "@material-ui/core";
import {DataGrid} from "@material-ui/data-grid";
import Linker from "../../component/Linker";
import {useConfirm} from "material-ui-confirm";
import {useSnackbar} from "notistack";

const AddMemberModal = ({
                            isShowing,
                            modalRef,
                            toggleModal,
                            groupName,
                            toggleMount
                        }) => {

    const classes = useStyles();
    const {loading, onLoading, offLoading} = useLoading();
    const confirm = useConfirm();
    const {enqueueSnackbar} = useSnackbar()

    isShowing && (document.body.style.overflow = "hidden");
    const [users, setUsers] = useState([]);
    const [userNames, setUserNames] = useState([]);
    const loadUsernames = (items) => {
        setUserNames(items);
    }

    const loadUsers = (item) => {
        setUsers(item)
    }

    const addMembers =  (groupName, ids) => {
        toggleModal();
        toggleMount();
        onLoading();
        if (ids.length === 0) {
            enqueueSnackbar("Please select at least one member.", {variant:"warning"});
        } else  GroupService.addMembers(groupName, ids)
            .then(r => {
                if (r.status === 200)
                    loadUsernames(r.data);
                else enqueueSnackbar(r.data.message, {variant:"warning"});
            });
        offLoading();
        document.body.style.overflow = "auto";
    }

    useEffect(() => {
        UserService.getAvailable()
            .then(r => {
                if (r.status === 200) {
                    loadUsers(r.data);
                    console.log(r.data);
                } else enqueueSnackbar(r.data.message, {variant:"warning"});
            })
            .catch((r) => {
                enqueueSnackbar(r, {variant:"error"});
            })
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                toggleModal();
                document.body.style.overflow = "auto";
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef, toggleModal]);

    const columns = [
        {field: "name", headerName: "Name", width: 150},
        {
            field: "avatarUrl", headerName: "Avatar", width: 150,
            renderCell: (params) => {
                let url = null;
                if (params.rows?.user?.avatarUrl == null)
                    url = process.env.default_avatar;
                else url = params.rows.user.avatarUrl;
                return (
                    <div>
                        <Avatar alt="avatar" src={url}/>
                    </div>
                );
            }
        },
        {
            field: "action", headerName: "Actions", width: 150,
            renderCell: (params) => {
                let id = params.rows?.id;
                return (
                    <Linker to={"/profile/" + id} isButton={true} content={"See profile"}/>
                )
            }
        }
    ];


    return isShowing
        ? ReactDOM.createPortal(
            <div>
                {loading ? <FullscreenLoading/> : null}
                <div className={classes.modalOverlay}/>
                <Paper className={classes.root} ref={modalRef}>
                    <div className={classes.userList}>
                        <DataGrid
                            rows={users}
                            columns={columns}
                            checkboxSelection
                            onSelectionModelChange={(p) => {
                                setUserNames(p.selectionModel);
                            }}
                            pageSize={5}
                        />
                    </div>
                    <div
                        className={classes.option}
                        style={{borderRadius: 0}}
                        onClick={() => {
                            addMembers(groupName, userNames);
                        }}
                    > Update
                    </div>
                    <div
                        className={classes.option}
                        style={{borderRadius: 0}}
                        onClick={() => {
                            toggleModal();
                            document.body.style.overflow = "auto";
                        }}
                    >
                        Cancel
                    </div>

                </Paper>
            </div>, document.body
        ) : null;
}


export default AddMemberModal;