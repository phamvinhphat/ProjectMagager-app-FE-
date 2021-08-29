import React, {useRef} from 'react';
import {useStyles} from './styles/navibarStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {ClickAwayListener, Grow, Link, MenuList, Paper, Popper} from "@material-ui/core";
import {AppBarProps} from "@material-ui/core/AppBar/AppBar";
import {AuthService} from "../services/services";
import Notification from "./Notification";
import {Link as RouterLink} from 'react-router-dom';
import Linker from "./Linker";

export default function NavigationBar(props: AppBarProps) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openNotify, setOpenNotify] = React.useState(false);
    const anchorRef = useRef(null);
    const anchorRefN = useRef(null);
    const AppName = () => {
        return process.env.app_name;
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleToggleN = () => {
        setOpenNotify((prevOpen) => !prevOpen);
    };

    const handleCloseN = (event) => {
        if (anchorRefN.current && anchorRefN.current.contains(event.target)) {
            return;
        }
        setOpenNotify(false);
    };

    const handleLogout = () => {
        AuthService.logout();
        window.location.reload(false);
    }
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
        AppName();
    }, [open]);


    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }


    const renderMenu = (
        <Popper
            id={"popper-account"}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition disablePortal

            style={{marginTop: 20, zIndex:1}}>
            {({TransitionProps, placement}) => (
                <Grow
                    {...TransitionProps}
                    style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <Linker to={"/profile/" + localStorage.getItem("username")} isButton={false} content={(
                                    <MenuItem>
                                        Profile
                                    </MenuItem>
                                )}/>

                                <MenuItem onClick={handleClose}>
                                    <Link
                                        component={RouterLink} to={"/settings"}
                                        variant="body1"
                                        color="secondary"
                                        underline="none"
                                    >
                                        Account Settings</Link>
                                </MenuItem>
                                <MenuItem onMouseDown={() => handleLogout()}>Logout</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );


    return (
        <div className={classes.grow}>
            <AppBar position={props.position} className={props.className}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.toggleDrawer}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Project Manager
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 17 new notifications"
                                    color="inherit"
                                    ref={anchorRefN}
                                    aria-controls={openNotify ? 'menu-notify-grow' : undefined}
                                    onClick={handleToggleN}
                                    style={{marginRight: 30}}
                        >
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            ref={anchorRef}
                            onClick={handleToggle}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
            <Notification handleClose={handleCloseN} anchorRef={anchorRefN} open={openNotify} setOpen={setOpenNotify}/>
        </div>
    );
}
