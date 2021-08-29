import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";

import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import "./MyProfile.css"
import {GroupService, UserService} from "../../services/services";

const defaultAvatar = "https://res.cloudinary.com/projectmngapi/image/upload/v1626178367/6542357_preview_jysfir.png";
const UserProfile = () => {
    const [profile, setProfile] = useState({}) ;
    const [group, setGroup] = useState({}) ;
    const [avatar, setAvatar] = useState("");

    let {userId}= useParams();

    const loadProfile = (e) => setProfile(e)
    const loadGroup = (e) => setGroup(e)
    const loadAvatar = (e) => setAvatar(e)


    useEffect(() => {
        const fetchProfile = () => {
            if (userId !== null && userId.length > 0)
                UserService.getProfile(userId)
                    .then((r) => {
                        if (r.status===200) {
                            loadProfile(r.data);
                            if (r.data.avatarUrl === null) {
                                loadAvatar(defaultAvatar);
                            } else loadAvatar(r.data.avatarUrl);
                            fetchGroup(r.data.groupId);
                        }
                        else alert(r.data.message);
                    })
                    .catch(()=> {
                        console.log("Internal server error");
                    })
        }
        const fetchGroup = (groupId) => {
            if(profile !== null){
                GroupService.getDetail(groupId)
                    .then((r) => {
                        if (r.status===200) {
                            loadGroup(r.data);
                        }
                        else alert(r.data.message);
                    })
                    .catch(()=> {
                        console.log("Internal server error");
                    })
            }
        }
        fetchProfile();
        document.title ="Profile - " + profile.name;
    },[userId, JSON.stringify(profile)]);

    return (
        <div className="myprofile">
            <div className="profileContainer">
                <div className="profileUpDate">
                    <form className="profileUpdateFrom">
                        <div className="profileUpdateLeft">
                            <div className="profileShowTopTitle">
                                <span className="profileShowprofileName">{profile.name}</span>
                            </div>
                            <span className="profileShowTitle">Account Details</span>
                            <div className="profileShowInfo">
                                <PermIdentityIcon className="profileShowIcon"/>
                                <span className="profileShowInfoTitle">{profile.name}</span>
                            </div>
                            <div className="profileShowInfo">
                                <CalendarTodayIcon className="profileShowIcon"/>
                                <span className="profileShowInfoTitle">{profile.bio}</span>
                            </div>
                            <span className="profileShowTitle">Contact Details</span>
                            <div className="profileShowInfo">
                                <PhoneAndroidIcon className="profileShowIcon"/>
                                <span className="profileShowInfoTitle">{profile.phoneNumber?? "No update"}</span>
                            </div>
                            <div className="profileShowInfo">
                                <MailOutlineIcon className="profileShowIcon"/>
                                <span className="profileShowInfoTitle">{profile.email}</span>
                            </div>
                            <span className="profileShowTitle">Working Position</span>
                            <div className="profileShowInfo">
                                <MeetingRoomIcon className="profileShowIcon"/>
                                <span className="profileShowInfoTitle">{group.name}</span>
                            </div>
                        </div>
                        <div className="profileUpdateRight">
                            <div className="profileUpdateUpload">
                                <img className="profileUpdateImg"
                                     src={avatar}
                                     alt=""/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;