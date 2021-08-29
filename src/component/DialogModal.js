import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogModal({
                                        toggle,
                                        isOpened,
                                        contents,
                                        heading,
                                        onYes,
                                        isYesNo
                                    }) {
    const yesSnip = ({onYes, toggle}) =>{
        return (
            <Button
                onClick={() => {
                    onYes();
                    toggle();
                }}
                color="primary"
                autoFocus>
                Agree
            </Button>
        )
    };
    return (
        <div>
            <Dialog
                open={isOpened}
                onClose={toggle}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{heading}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {contents}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {isYesNo? yesSnip(onYes, toggle): null}
                    <Button onClick={toggle} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


