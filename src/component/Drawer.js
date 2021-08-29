import {
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Slide,
    Toolbar,
    Typography
} from "@material-ui/core";
import DomainIcon from '@material-ui/icons/Domain';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BugReportIcon from '@material-ui/icons/BugReport';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import {ConfirmProvider} from 'material-ui-confirm';
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import NavigationBar from "./NavigationBar";
import {useTheme} from '@material-ui/core/styles';
import useStyles from './styles/drawerStyles';
import {useState} from "react";
import Linker from "./Linker";
import {SnackbarProvider} from "notistack";

const MiniDrawer = ({contents}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <NavigationBar
                position="fixed"
                className={clsx(classes.appBar, {[classes.appBarShift]: open,})}
                toggleDrawer={handleDrawerOpen}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </NavigationBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar} onClick={handleDrawerClose}>
                    <Typography variant="overline" noWrap>
                        Navigation
                    </Typography>
                    <IconButton>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <Linker to="/" content={(
                        <ListItem button key="home">
                            <ListItemIcon>
                                <HomeWorkIcon color={"primary"}/>
                            </ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItem>
                    )} isButton={false}/>
                    <Linker to="/department" content={(
                        <ListItem button key="Department">
                            <ListItemIcon>
                                <DomainIcon color={"primary"}/>
                            </ListItemIcon>
                            <ListItemText primary="Department"/>
                        </ListItem>
                    )} isButton={false}/>

                    <Linker to={"/group"} content={(
                        <ListItem button key="Group">
                            <ListItemIcon><PeopleOutlineIcon color={"primary"}/></ListItemIcon>
                            <ListItemText primary="Group"/>
                        </ListItem>
                    )} isButton={false}/>

                    <Linker to={"/project"} content={(
                        <ListItem button key="Project">
                            <ListItemIcon><AccountTreeIcon color={"primary"}/></ListItemIcon>
                            <ListItemText primary="Project"/>
                        </ListItem>
                    )} isButton={false}/>

                    <Linker to={"/report"} content={(
                        <ListItem button key="Report">
                            <ListItemIcon><AssessmentIcon color={"primary"}/></ListItemIcon>
                            <ListItemText primary="Report"/>
                        </ListItem>
                    )} isButton={false}/>
                </List>
                <Divider/>
                <List>
                    <ListItem button key="Report Bug">
                        <ListItemIcon><BugReportIcon/></ListItemIcon>
                        <ListItemText primary="Report Bug"/>
                    </ListItem>
                    {open ?
                        <ListItem>
                            <Typography variant="overline">
                                By Nhóm 12
                            </Typography>
                        </ListItem>
                        : null
                    }
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <ConfirmProvider defaultOptions={{
                    confirmationButtonProps: {autoFocus: true}
                }}>

                    <SnackbarProvider maxSnack={3}
                                      autoHideDuration={3000}
                                      anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}
                                      TransitionComponent={Slide}
                                      preventDuplicate={true}
                    >
                        {contents}
                    </SnackbarProvider>
                </ConfirmProvider>
            </main>
        </div>
    );
}

export default MiniDrawer;