import {
    CircularProgress,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Paper, Typography
} from "@material-ui/core";
import useStyles from "./styles/accountSettingStyles";
import {useEffect, useRef, useState} from "react";
import AvatarModal from "./components/AvatarModal";
import {useLoading} from "../../component/hooks/hooks";
import {
    CalendarToday,
    CheckCircleOutline,
    ContactMailOutlined, EmailOutlined,
    HighlightOffOutlined, MenuBookOutlined, PeopleAltOutlined,
    Person, PersonOutlined, PhoneAndroidOutlined,
    VerifiedUserOutlined
} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {UserService} from "../../services/services";
import {useSnackbar} from "notistack";


const AccSettings = () => {
    const classes = useStyles();
    const [showAvatar, setShowAvatar] = useState(false);
    const {loading, onLoading, offLoading} = useLoading();
    const modalRef = useRef(null);
    const {enqueueSnackbar} = useSnackbar();

    const [user, setUser] = useState({});
    const {...profile} = user;

    const username = localStorage.getItem("username");

    const toggleAvatar = () => setShowAvatar(!showAvatar);

    useEffect(() => {
        UserService.getProfile(username)
            .then((r) => {
                if (r.status===200){
                    setUser(r.data);
                }
            })
            .catch((r) => enqueueSnackbar(r, {variant:"error"}))

        document.title="Account Settings - " + profile.name;
    },[username])

    return (
        <div className={classes.root}>
            <Grid container justifyContent={"space-evenly"} spacing={3}>
                <AvatarModal
                    isShowing={showAvatar}
                    toggleModal={toggleAvatar}
                    modalRef={modalRef}
                    onLoading={onLoading}
                    offLoading={offLoading}
                    setUser={setUser}
                />
                <Grid container justifyContent={"flex-start"} spacing={3} item xs={3}>
                    <Grid container item>
                        <Paper className={classes.root}>
                            <List>
                                <ListItemText primary={"Actions"} style={{padding:10}}/>
                                <ListItem button key={"changePass"}>
                                    <ListItemIcon><LockOutlinedIcon color={"primary"}/></ListItemIcon>
                                    <ListItemText primary={"Change password"}/>
                                </ListItem>
                                <ListItem button key={"updateInfo"}>
                                    <ListItemIcon><ContactMailOutlined color={"primary"}/></ListItemIcon>
                                    <ListItemText primary={"Update your information"}/>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={2} item xs={9} justifyContent={"space-between"}>
                    <Paper className={classes.root}>
                        <Grid container justifyContent={"flex-start"} item xs={12}>
                            <Grid item xs={12}>
                                <Typography children={"Account Information"} variant={"overline"} style={{fontSize:24}}/>
                            </Grid>
                            <Grid container item xs={7} spacing={3}>
                                <Grid item xs={6}>
                                    <List>
                                        <ListItemText primary={"Personal information"}/>
                                        <ListItem>
                                            <ListItemIcon><PersonOutlined color={"primary"}/></ListItemIcon>
                                            <ListItemText primary={"Name"} secondary={profile.name}/>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><MenuBookOutlined color={"primary"}/></ListItemIcon>
                                            <ListItemText primary={"Bio"} secondary={profile.bio}/>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><EmailOutlined color={"primary"}/></ListItemIcon>
                                            <ListItemText primary={"Email"} secondary={profile.email}/>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="verification">
                                                    {profile.emailConfirmed? <CheckCircleOutline color={"primary"}/>:<HighlightOffOutlined color={"secondary"}/>}
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><PhoneAndroidOutlined color={"primary"}/></ListItemIcon>
                                            <ListItemText primary={"Phone"} secondary={profile.phoneNumber}/>
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid item xs={6}>
                                    <List>
                                        <ListItemText primary={"Work information"}/>
                                        <ListItem>
                                            <ListItemIcon><PeopleAltOutlined color={"primary"}/></ListItemIcon>
                                            <ListItemText primary={"Team"} secondary={profile.groupType +" - "+ profile.groupName}/>
                                        </ListItem>
                                        <ListItemText primary={"Account information"}/>
                                        <ListItem>
                                            <ListItemIcon><VerifiedUserOutlined color={profile.isActived?"primary":"secondary"}/></ListItemIcon>
                                            <ListItemText primary={"Activation"} secondary={profile.isActived?"Activated":"Deactivated"}/>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon><CalendarToday color={"primary"}/></ListItemIcon>
                                            <ListItemText primary={"Created Date"} secondary={moment(profile.dateCreated).format("MMM Do YYYY")}/>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                            <Grid container item xs={5} justifyContent={"center"} alignItems={"center"}>
                                <Avatar
                                    src={user.avatarUrl ? user.avatarUrl : null}
                                    alt="avatar"
                                    onClick={toggleAvatar}
                                    loading={loading ? 1 : 0}
                                    className={classes.avatar}
                                />
                                {loading ? (
                                    <CircularProgress size={14} className={classes.progressAvatar}/>
                                ) : null}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
export default AccSettings;