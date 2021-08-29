import "./styles/DepCreate.css"
import React, {useState} from 'react';

import {GroupService} from "../../services/services";
import useStyles from "../../component/styles/modalStyles";
import {useHistory} from "react-router-dom";
import {useLoading} from "../../component/hooks/hooks";
import * as ReactDOM from "react-dom";
import {Paper, TextField, Typography} from "@material-ui/core";
import FullscreenLoading from "../../component/FullScreenLoading";


const DepCreateModal = ({
                            isShowing,
                            modalRef,
                            toggleModal,
                            toggleMount,
                        }) => {
    const classes = useStyles();
    const {loading, onLoading, offLoading} = useLoading();

    isShowing && (document.body.style.overflow = "hidden");

    const [depName, setDepName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState({});

    const loadDepName = (value) => {
        setDepName(value.target.value);
    }

    const loadDescription = (value) => {
        setDescription(value.target.value);
    }

    const validate = () => {
        let isError = false;
        if (depName === "") {
            setError((prevError) => ({
                ...prevError,
                depName: "Name is required.",
            }));
            isError = true;
        }
        return isError;
    }

    const handleSubmit = async () => {
        onLoading();
        if (!validate()){
            debugger;
            await GroupService.postDepartment(depName, description, "")
                .then((r) => {
                    if (r.status === 200)
                        toggleModal();
                    else
                        alert(r.message);
                }, null);
        }
        document.body.style.overflow = "auto";
        toggleMount();
        offLoading();
    }
    return isShowing
        ? ReactDOM.createPortal(
            <div>
                {loading? <FullscreenLoading/> : null}
                <div className={classes.modalOverlay}/>
                <Paper className={classes.root} ref={modalRef}>
                    <div className={classes.createDep}>
                        <div className="newDep">
                            <Typography component="h1" variant="h5" className="newDepTitle">
                                Create New Department
                            </Typography>
                            <from className="newDepFrom">
                                <div className="newDepItem">
                                    <TextField
                                        type="text"
                                        onChange={loadDepName}
                                        label="Department Name"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        name="name"
                                        helperText={error!= null? error.depName:""}
                                    />
                                </div>

                                <div className="newDepItem">
                                    <TextField
                                        type="text"
                                        onChange={loadDescription}
                                        label="Description"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="description"
                                        name="description"
                                    />
                                </div>
                            </from>
                        </div>
                    </div>
                    <div className={classes.option}
                         style={{borderRadius: 0}}
                         onClick={() => handleSubmit()}
                    >Create
                    </div>
                    <div
                        className={classes.option}
                        style={{borderRadius: 0, margin: 10}}
                        onClick={() => {
                            toggleModal();
                            document.body.style.overflow = "auto";
                        }}
                    >
                        Cancel
                    </div>
                </Paper>
            </div>
            , document.body
        ) :
        null;
}
export default DepCreateModal;