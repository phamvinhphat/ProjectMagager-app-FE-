import { Paper, Typography } from "@material-ui/core";

import React, { useRef } from "react";

import useStyles from "./styles/avatarModalStyles";

import { AvatarService } from "../../../services/services";

import ReactDOM from "react-dom";

const AvatarModal = ({
                         isShowing,
                         modalRef,
                         toggleModal,
                         onLoading,
                         offLoading,
                         setUser,
                     }) => {
    const classes = useStyles();

    const fileInputRef = useRef(null);

    const username = localStorage.getItem("username");

    const selectPhoto = () => {
        fileInputRef.current.click();
    };

    const fileChange = (e) => {
        const formData = new FormData();
        const username = localStorage.getItem("username");
        formData.append("file", e.target.files[0]);
        toggleModal();
        onLoading();
        AvatarService.uploadAvatar(username, formData).then((response) => {
            if (response.status === 200) {
                setUser((prevUser) => {
                    return { ...prevUser, avatarUrl: response.data.path };
                });
                offLoading();
            }
        });
    };

    const deleteAvatar = () => {
        toggleModal();
        onLoading();
        AvatarService.getUserAvatar(username).then((response) => {
            if (response.status === 200) {
                const photoId = response.data.id;
                AvatarService.deleteAvatar(username, photoId).then((response) => {
                    offLoading();
                });
            }
        });
    };

    isShowing
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "auto");

    return isShowing
        ? ReactDOM.createPortal(
            <div>
                <div className={classes.modalOverlay}/>
                <Paper className={classes.root} ref={modalRef}>
                    <Typography variant="body1" className={classes.text}>
                        Change Avatar
                    </Typography>
                    <div
                        className={classes.option}
                        style={{ color: "#0095f6" }}
                        onClick={selectPhoto}
                    >
                        Upload photo
                    </div>
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={fileChange}
                    />
                    <div
                        className={classes.option}
                        style={{ color: "#ed4956" }}
                        onClick={deleteAvatar}
                    >
                        Remove current photo
                    </div>
                    <div className={classes.option} onClick={() => toggleModal(false)}>
                        Cancel
                    </div>
                </Paper>
            </div>,
            document.body
        )
        : null;
};

export default AvatarModal;
