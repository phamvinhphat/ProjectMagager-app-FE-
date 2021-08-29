import {
    Button,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListSubheader,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import Linker from "../component/Linker";
import {
    AccountTree,
    AdbRounded,
    Assessment,
    Domain,
    Face,
    MailOutline,
    PeopleOutline,
    PhoneAndroid
} from "@material-ui/icons";
import Tooltips from "../component/ToolTips";
import Avatar from "@material-ui/core/Avatar";
import {useEffect, useRef, useState} from "react";
import {UserService} from "../services/services";
import TaskServices from "../services/task.service";
import GanttChart from "../component/Gantt";
import moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import TaskCreateModal from "./Task/TaskCreateModal";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
        width: "100%",
        height: "100%",

    },
    container: {
        minHeight: 450,
    },
    topBtn: {
        margin: 15,
        padding: 10,
        "&:hover": {
            background: "#d4d6d5",
        },
    },

    listInfo: {
        width: '100%',
        maxWidth: 500,
        backgroundColor: theme.palette.background.paper,
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    pallet_one: {
        color: theme.palette.getContrastText("#7579E7"),
        backgroundColor: "#7579E7",
    },
    pallet_two: {
        color: theme.palette.getContrastText("#9AB3F5"),
        backgroundColor: "#9AB3F5",
    },
    pallet_three: {
        color: theme.palette.getContrastText("#A3D8F4"),
        backgroundColor: "#A3D8F4",
    },
    pallet_four: {
        color: theme.palette.getContrastText("#B9FFFC"),
        backgroundColor: "#B9FFFC",
    },
}))

const defaultAvatar = "https://res.cloudinary.com/projectmngapi/image/upload/v1626178367/6542357_preview_jysfir.png";

const Home = () => {
    const classes = useStyles();

    const [isShowing, setShowing] = useState(false);
    const [mount, setMount] = useState(true);
    const modalRef = useRef();

    const [profile, setProfile] = useState({});
    const [tasks, setTask] = useState([]);

    const {avatarUrl, email, groupName, groupType, name, phoneNumber, username, id, groupId} = profile;
    const toggleMount = () => setMount(!mount);
    const toggle = () => setShowing(!isShowing);

    useEffect(() => {
        document.title = "Project Manager"
        UserService.getProfile(localStorage.getItem("username"))
            .then((r) => {
                if (r.status === 200)
                    setProfile(r.data);
                else console.log(r.data.message);
            })
            .catch((r) => console.log(r));
        TaskServices.getListByUser()
            .then((r) => {
                if (r.status === 200)
                    setTask(r.data);
                else console.log(r.data.message);
            })
            .catch((r) => console.log(r));
    }, [mount, setMount]);

    return (
        <div className={classes.root}>
            <TaskCreateModal
                toggleMount={toggleMount}
                toggle={toggle}
                isShowed={isShowing}
                modalRef={modalRef}
                isOnReport={false}
                groupId={groupId}
            />
            <Grid container spacing={4} justify={"flex-start"}>
                {/*Icons container*/}
                <Grid container xs={3} item justifyContent={"flex-start"}>
                    <Paper>
                        <List>
                            <ListItem style={{margin:15}}>
                                <ListItemAvatar >
                                    <AdbRounded fontSize={"large"} color={"primary"}/>
                                </ListItemAvatar>
                                <ListItemText primary={"Hello, "+ name}
                                              secondary={"Today is - " + moment().format("Do MM YYYY")}
                                              id={id}
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid container item justify={"flex-start"} spacing={3} xs={9} style={{marginBottom: 20}}>
                    <Tooltips contents={(
                        <Paper elevation={3} className={classes.topBtn}>
                            <Linker content={(
                                <Domain fontSize={"large"}/>
                            )} to={"/department"} isButton={true}/>
                        </Paper>
                    )} tips={"Move to department list"}/>
                    <Tooltips contents={(
                        <Paper elevation={3} className={classes.topBtn}>
                            <Linker content={(
                                <PeopleOutline fontSize={"large"}/>
                            )} to={"/group"} isButton={true}/>
                        </Paper>
                    )} tips={"Move to your department/group"}/>

                    <Tooltips contents={(
                        <Paper elevation={3} className={classes.topBtn}>
                            <Linker content={(
                                <AccountTree fontSize={"large"}/>
                            )} to={"/project"} isButton={true}/>
                        </Paper>
                    )} tips={"Move to projects list"}/>

                    <Tooltips contents={(
                        <Paper elevation={3} className={classes.topBtn}>
                            <Linker content={(
                                <Assessment fontSize={"large"}/>
                            )} to={"/report"} isButton={true}/>
                        </Paper>
                    )} tips={"Move to reports list"}/>
                </Grid>
                {/*  End icon container  */}

                <Grid container spacing={2}>
                    {/*Info container*/}
                    <Grid container item xs={3}>
                        <Grid item xs={12}>
                            <Paper style={{padding: 10, width: "100%"}}>
                                <List className={classes.listInfo}
                                      subheader={
                                          <ListSubheader component="div" id="nested-list-subheader"
                                                         style={{alignItems: "flex-end"}}>
                                                <Grid container justifyContent={"flex-end"} alignItems={"center"}>
                                                    <Grid item xs={9}>
                                                        <Typography variant={"overline"}>
                                                            Role: {localStorage.getItem("roles")}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Avatar alt={username}
                                                                src={avatarUrl === null ? defaultAvatar : avatarUrl}
                                                                className={classes.avatar}/>
                                                    </Grid>
                                                </Grid>
                                          </ListSubheader>
                                      }
                                >
                                    <ListItem>
                                        <ListItemAvatar><Avatar
                                            className={classes.pallet_four}><Face/></Avatar></ListItemAvatar>
                                        <ListItemText primary="Name"
                                                      secondary={name === null ? "No information" : name}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={classes.pallet_three}>
                                                <MailOutline/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Email"
                                                      secondary={email === null ? "No information" : email}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={classes.pallet_two}>
                                                <PhoneAndroid/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Phone"
                                                      secondary={phoneNumber === null ? "No information" : phoneNumber}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar className={classes.pallet_one}>
                                                <PeopleOutline/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Group"
                                                      secondary={(groupName === null ? "No information" : groupName) + " - " +
                                                      (groupType === null ? "No information" : groupType)}/>
                                    </ListItem>
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/*  Gantt  */}
                    <Grid container item xs={9} justify={"center"}>
                        <Paper style={{width: "100%"}}>
                            <Grid item xs={12}>
                                <Typography variant={"h6"} align={"center"} style={{paddingTop: 20}}>
                                    Upcoming tasks
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={"flex-end"} item xs={12}>
                                <Button>
                                    <Typography variant={"overline"} align={"center"} display={"block"} onClick={toggle}>
                                        Create task
                                    </Typography>
                                    <AddIcon/>
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {tasks.length > 0 ? <GanttChart id={username} data={tasks} toggleMount={toggleMount}/> :
                                    <Typography children={"No value"} align={"center"}/>}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;