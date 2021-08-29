import React, {useState} from "react";
import {RequestService} from "../services/services";
import {Grow, Paper, Popper} from "@material-ui/core";


const Notification = ({setOpen, open, anchorRef, handleClose}) => {
    const [request, setRequest] = useState([]);

    const removePerson = (id) => {
        let newPerson = request.filter((person) => person.id !== id)
        setRequest(newPerson)
    }
    const loadRequest = (r) => setRequest(r);

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const fetchRequest = () => {
        RequestService.getRequests()
            .then((r) => {
                if (r.status === 200) {
                    loadRequest(r.data);
                } else alert(r.data.message)
            } )
            .catch((r) => {
                console.log(r)
            });
    }

    return (
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex:1}}>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom' }}
                >
                    <Paper >
                            <h3
                                style={{
                                    backgroundColor: '#fff',
                                    color: '#313174',
                                    textAlign: 'center',
                                    fontSize: '25px',
                                    marginTop: '10px'

                                }}
                            >
                                {request.length} Request Today
                            </h3>
                            {request.map((person) => {
                                const { id, name, image, status, department, groupname, leader } = person


                                return (
                                    <div>
                                        <div className='container' key={id}>
                                            <div className='avatar'>
                                                <img src={image} alt={name} />

                                            </div>
                                            <div className='Content'>
                                                <h4>{name}</h4>
                                                <h4>{status}</h4>
                                                <h4>{department}</h4>
                                                <h4>{groupname}</h4>
                                                <h4>{leader}</h4>
                                            </div>
                                            <div className='button'>
                                                <button className='btn-1' onClick={() => removePerson(id)}>
                                                    Accept
                                                </button>
                                                <button className='btn-2' onClick={() => removePerson(id)}>
                                                    Dismiss
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </Paper>
                </Grow>
            )}
        </Popper>
    )
}

export default Notification;