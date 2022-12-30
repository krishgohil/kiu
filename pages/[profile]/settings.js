import { useRouter } from 'next/router';
import { React, useState, useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { FaLock } from 'react-icons/fa';
import Switch from "react-switch";
import { useAppContext } from '../../context';
import { host } from '../../host'

const Settings = ({ handle }) => {

    const [checkedAccType, setCheckedAccType] = useState(false);
    const [checked, setchecked] = useState(false)
    const [chkNotifMessages, setchkNotifMessages] = useState(false)
    const [chkNotifSocialScore, setchkNotifSocialScore] = useState(false)
    const [chkNotifFollowRequests, setchkNotifFollowRequests] = useState(false)
    const [chkNotifComments, setchkNotifComments] = useState(false)
    const [chkNotifReposts, setchkNotifReposts] = useState(false)
    const [chkNotifStars, setchkNotifStars] = useState(false)

    const context = useAppContext()
    const router = useRouter()
    const { _id, accountType, notificationSettings, notificationToken } = context.sharedState
    // const { notificationTokenCurrent } = useSelector(state => state.generalReducer)

    const [browserNotificationSetting, setbrowserNotificationSetting] = useState()

    useEffect(() => {
        console.log(notificationSettings)
        let decision = notifyMe()
        console.log(decision)
        if (decision === true) {
            setbrowserNotificationSetting(true)
        } else if (decision === false) {
            setbrowserNotificationSetting(false)
        } else if (decision == "notSupported") {
            setbrowserNotificationSetting("notSupported")
        } else {
            setbrowserNotificationSetting(false)
        }
        if (accountType == 'private') { setCheckedAccType(true) } else { setCheckedAccType(false) }

        if (notificationSettings && decision === true) {

            if (notificationSettings.messages) {
                setchkNotifMessages(true)
            }
            if (notificationSettings.comments) {
                setchkNotifComments(true)
            }
            if (notificationSettings.reposts) {
                setchkNotifReposts(true)
            }
            if (notificationSettings.socialScore) {
                setchkNotifSocialScore(true)
            }
            if (notificationSettings.followRequests) {
                setchkNotifFollowRequests(true)
            }
            if (notificationSettings.stars) {
                setchkNotifStars(true)
            }
        }
    }, [_id, accountType, notificationSettings])


    function notifyMe(ask) {
        console.log("ksjdfkjsldkfjslfkjlask")
        if (!("Notification" in window)) {
            // Check if the browser supports notifications
            // alert("This browser does not support desktop notification");

            return ("notSupported")
        } else if (Notification.permission === "granted") {
            // Check whether notification permissions have already been granted;
            // if so, create a notification
            return (true)
            // const notification = new Notification("Hi there!");
            // …
        } else if (Notification.permission !== "denied" || Notification.permission == undefined) {
            // We need to ask the user for permission
            console.log("denied", ask)
            if (ask) {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        // const notification = new Notification("Hi there!");
                        return (true)
                    } else {
                        return (false)
                    }
                });
            } else {
                return (false)
            }

        }
    }


    const handleChange = () => {
        if (checkedAccType) {
            setCheckedAccType(false);
            dispatch(account_Type())
        } else {
            console.log('jjjjjjjjj')
            setCheckedAccType(true);
            dispatch(account_Type())
        }
    };
    const gotoAbout = () => {
        navigate('/info/about')
    }

    const termOfservice = () => {
        navigate('/info/terms-of-service')
    }

    const gotoPrivacy = () => {
        navigate('/info/privacy')
    }

    const account_Type = () => async dispatch => {

        try {
            const response = await fetch(`${host}/api/users/accountType`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: _id, checked: checkedAccType })
            })
            const json = await response.json();
            console.log(json)
        } catch (error) {
            console.log(error)

        }
    }
    const notificationSettingsFunc = (messages, socialScore, followRequests, comments, reposts, stars) => async dispatch => {

        try {
            const response = await fetch(`${host}/api/users/notificationSettingsFunc`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id, messages, socialScore, followRequests, comments, reposts, stars })
            })
            const json = await response.json();
            console.log(json)
            if (json != 'fail' && typeof json == 'object') {

                dispatch({
                    type: GET_USER_DETAILS,
                    payload: {
                        name: json.name,
                        profileImg: json.profileImg,
                        username: json.username,
                        bio: json.bio,
                        _id: json._id,
                        following: json.following,
                        followers: json.followers,
                        socialScore: json.socialScore,
                        posts: json.posts,
                        feed: json.feed_posts,
                        accountType: json.accountType,
                        notificationToken: json.notificationToken,
                        notificationSettings: json.notificationSettings,
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }



    const [isTokenFound, setTokenFound] = useState(false);

    const changeNotifMessagesFunc = () => {
        var _messages = chkNotifMessages
        var _comments = chkNotifComments
        var _socialScore = chkNotifSocialScore
        var _followRequests = chkNotifFollowRequests
        var stars = chkNotifStars
        var _reposts = chkNotifReposts
        if (chkNotifMessages) {
            setchkNotifMessages(false)
            _messages = false
            dispatch(notificationSettingsFunc(_messages, _socialScore, _followRequests, _comments, _reposts, stars))

        } else {
            let decision = notifyMe(true)
            if (decision == true) {
                setchkNotifMessages(true)
                _messages = true
                dispatch(notificationSettingsFunc(_messages, _socialScore, _followRequests, _comments, _reposts, stars))
            }

            if (decision !== browserNotificationSetting) {
                if (decision == undefined) {
                    setbrowserNotificationSetting(false)
                } else {
                    setbrowserNotificationSetting(decision)
                }
            }
        }

    }
    const changeNotifCommentsFunc = () => {

        var _messages = chkNotifMessages
        var _comments = chkNotifComments
        var _socialScore = chkNotifSocialScore
        var _followRequests = chkNotifFollowRequests
        var stars = chkNotifStars
        var _reposts = chkNotifReposts
        if (chkNotifComments) {
            setchkNotifComments(false)
            _comments = false
            dispatch(notificationSettingsFunc(_messages, _socialScore, _followRequests, _comments, _reposts, stars))
        } else {
            let decision = notifyMe(true)
            if (decision == true) {
                setchkNotifComments(true)
                _comments = true
                dispatch(notificationSettingsFunc(_messages, _socialScore, _followRequests, _comments, _reposts, stars))
            }

            if (decision !== browserNotificationSetting) {
                if (decision == undefined) {
                    setbrowserNotificationSetting(false)
                } else {
                    setbrowserNotificationSetting(decision)
                }
            }

        }

    }
    const changeNotifSocialScoreFunc = () => {
        var _messages = chkNotifMessages
        var _comments = chkNotifComments
        var _socialScore = chkNotifSocialScore
        var _followRequests = chkNotifFollowRequests
        var stars = chkNotifStars
        var _reposts = chkNotifReposts
        if (chkNotifSocialScore) {
            setchkNotifSocialScore(false)
            _socialScore = false
            dispatch(notificationSettingsFunc(_messages, _socialScore, _followRequests, _comments, _reposts, stars))
        } else {
            let decision = notifyMe(true)
            if (decision == true) {
                setchkNotifSocialScore(true)
                _socialScore = true
                dispatch(notificationSettingsFunc(_messages, _socialScore, _followRequests, _comments, _reposts, stars))
            }

            if (decision !== browserNotificationSetting) {
                if (decision == undefined) {
                    setbrowserNotificationSetting(false)
                } else {
                    setbrowserNotificationSetting(decision)
                }
            }

        }
    }
    const changeNotifRepostsFunc = () => {
        var _messages = chkNotifMessages
        var _comments = chkNotifComments
        var _socialScore = chkNotifSocialScore
        var _followRequests = chkNotifFollowRequests
        var stars = chkNotifStars
        var _reposts = chkNotifReposts
        if (chkNotifReposts) {
            setchkNotifReposts(false)
            _reposts = false
            dispatch(notificationSettingsFunc(_messages, _socialScore, _followRequests, _comments, _reposts, stars))
        } else {
            let decision = notifyMe(true)
            if (decision == true) {
                setchkNotifReposts(true)
                _reposts = true
                dispatch(notificationSettingsFunc(_messages, _socialScore, _followRequests, _comments, _reposts, stars))
            }

            if (decision !== browserNotificationSetting) {
                if (decision == undefined) {
                    setbrowserNotificationSetting(false)
                } else {
                    setbrowserNotificationSetting(decision)
                }
            }
        }
    }
    const changeNotifFollowRequestsFunc = () => {
        var _messages = chkNotifMessages
        var _comments = chkNotifComments
        var _socialScore = chkNotifSocialScore
        var _reposts = chkNotifReposts
        var _followRequests = chkNotifFollowRequests
        var stars = chkNotifStars
        if (chkNotifFollowRequests) {
            setchkNotifFollowRequests(false)
            _followRequests = false
            dispatch(notificationSettingsFunc(_messages, _socialScore, _followRequests, _comments, _reposts, stars))
        } else {
            let decision = notifyMe(true)
            if (decision == true) {
                setchkNotifFollowRequests(true)
                _followRequests = true
                dispatch(notificationSettingsFunc(_messages, _socialScore, _followRequests, _comments, _reposts, stars))
            }

            if (decision !== browserNotificationSetting) {
                if (decision == undefined) {
                    setbrowserNotificationSetting(false)
                } else {
                    setbrowserNotificationSetting(decision)
                }
            }
        }
    }
    const changeNotifStarsFunc = () => {
        var _messages = chkNotifMessages
        var _comments = chkNotifComments
        var _socialScore = chkNotifSocialScore
        var _reposts = chkNotifReposts
        var _followRequests = chkNotifFollowRequests
        var stars = chkNotifStars
        if (chkNotifStars) {
            setchkNotifStars(false)
            stars = false
            dispatch(notificationSettingsFunc(_messages, _socialScore, _followRequests, _comments, _reposts, stars))
        } else {
            let decision = notifyMe(true)
            if (decision == true) {
                setchkNotifStars(true)
                stars = true
                dispatch(notificationSettingsFunc(_messages, _socialScore, _followRequests, _comments, _reposts, stars))
            }

            if (decision !== browserNotificationSetting) {
                if (decision == undefined) {
                    setbrowserNotificationSetting(false)
                } else {
                    setbrowserNotificationSetting(decision)
                }
            }
        }
    }

    const logOutHandler = () => {
        if (window.confirm("Do you want to log out?") == true) {
            dispatch(log_out())
        }
    }

    const log_out = () => async dispatch => {

        dispatch({
            type: LOG_OUT
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user id')
        localStorage.removeItem('username')
        navigate('/info/about')
    }

    return (
        <>
            <dialog open style={{ position: 'fixed', top: '0%', left: '0%', boxSizing: 'border-box', display: 'flex', height: '100vh', width: '100vw', zIndex: 999, backgroundColor: "rgba(0,0,0,0.85)", marign: 0, justifyContent: 'center', alignItems: 'center' }}>

                <div style={{ height: '100vh', width: "100vw", backgroundColor: 'black', padding: "0.5rem", overflowY: "scroll" }} >

                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.25rem' }} >
                        <AiOutlineClose color='white' size={28} onClick={() => router.back()} />
                    </div>

                    <h5 style={{ color: "white", paddingTop: "0.5rem" }}  >Account Type</h5>


                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }} >
                        <div>
                            {/* <BsPeople color="white" size={26} /> */}
                            <FaLock color="white" size={18} />
                        </div>
                        <div style={{ color: "white", marginRight: "1rem", marginBottom: "0", margin: "0.2rem 1rem", }} >  Private Account</div>
                        <Switch checked={checkedAccType} onChange={handleChange} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={16} uncheckedIcon={false} checkedIcon={false} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={14} width={32} className="react-switch" id="material-switch"
                        />
                    </div>




                    <hr style={{ color: "whitesmoke" }} />




                    <h5 style={{ color: "white", paddingTop: "0.5rem" }}  >Notifications</h5>
                    {
                        browserNotificationSetting === false ?
                            <div style={{ color: "orange", margin: "0.5rem 0" }} >
                                *Allow Notifications from your browser settings
                            </div>
                            : ""
                    }
                    {
                        browserNotificationSetting === "notSupported" ?
                            <div style={{ color: "orange", margin: "0.5rem 0" }} >
                                *Your browser does not support Nofitications
                            </div>
                            : ""
                    }
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", }} className="settingsCommon" >

                        <div style={{ color: "white", margin: "0 0.5rem 0 0 " }} >Messages</div>
                        <Switch onChange={changeNotifMessagesFunc} checked={chkNotifMessages} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={16} uncheckedIcon={false} checkedIcon={false} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={14} width={32} className="react-switch" id="material-switch"
                        />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", }} className="settingsCommon" >

                        <div style={{ color: "white", margin: "0 0.5rem 0 0 " }} >SocialScore</div>
                        <Switch onChange={changeNotifSocialScoreFunc} checked={chkNotifSocialScore} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={16} uncheckedIcon={false} checkedIcon={false} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={14} width={32} className="react-switch" id="material-switch"
                        />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", }} className="settingsCommon" >

                        <div style={{ color: "white", margin: "0 0.5rem 0 0 " }} >Follow Requests</div>
                        <Switch onChange={changeNotifFollowRequestsFunc} checked={chkNotifFollowRequests} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={16} uncheckedIcon={false} checkedIcon={false} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={14} width={32} className="react-switch" id="material-switch"
                        />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", }} className="settingsCommon" >

                        <div style={{ color: "white", margin: "0 0.5rem 0 0 " }} >Comments & Replies</div>
                        <Switch onChange={changeNotifCommentsFunc} checked={chkNotifComments} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={16} uncheckedIcon={false} checkedIcon={false} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={14} width={32} className="react-switch" id="material-switch"
                        />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", }} className="settingsCommon" >

                        <div style={{ color: "white", margin: "0 0.5rem 0 0 " }} >Reposts</div>
                        <Switch onChange={changeNotifRepostsFunc} checked={chkNotifReposts} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={16} uncheckedIcon={false} checkedIcon={false} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={14} width={32} className="react-switch" id="material-switch"
                        />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem", }} className="settingsCommon" >

                        <div style={{ color: "white", margin: "0 0.5rem 0 0 " }} >Stars</div>
                        <Switch onChange={changeNotifStarsFunc} checked={chkNotifStars} onColor="#86d3ff" onHandleColor="#2693e6" handleDiameter={16} uncheckedIcon={false} checkedIcon={false} boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={14} width={32} className="react-switch" id="material-switch"
                        />
                    </div>





                    <hr style={{ color: "whitesmoke" }} />






                    <h5 style={{ color: "#c7c6c5", paddingTop: "0.5rem" }}  >Security</h5>
                    <div style={{ margin: "0.5rem 0" }} >

                        <button onClick={() => navigate("/password-reset")} style={{ color: "white", margin: "0 0.5rem 0 0 ", border: "1px solid gray", backgroundColor: '#212121', padding: "0.5rem 1rem", borderRadius: "1rem" }} >Reset Password</button>
                    </div>
                    <div style={{ margin: "0.5rem 0" }} >

                        <button onClick={logOutHandler} style={{ color: "white", margin: "0 0.5rem 0 0 ", border: "1px solid gray", backgroundColor: '#212121', padding: "0.5rem 1rem", borderRadius: "1rem" }} >
                            Log Out
                        </button>
                    </div>

                    {/* <li  style={{ marginTop: '1rem', marginBottom: '1rem', paddingTop: '1rem', paddingBottom: '1rem', borderRadius: "1rem" }} >

                </li> */}

                    <hr style={{ color: "whitesmoke" }} />

                    <h5 style={{ color: "#c7c6c5", paddingTop: "0.5rem" }}  >Other</h5>
                    <div style={{ color: "#c7c6c5" }} >

                        <p style={{ cursor: 'pointer' }} onClick={termOfservice} >Terms of Service
                        </p>
                        <p style={{ cursor: 'pointer' }} onClick={gotoAbout} >

                            About
                        </p>
                        <p style={{ cursor: 'pointer' }} onClick={gotoPrivacy} >
                            Privacy
                        </p>
                        <p style={{ color: 'skyblue' }}>
                            @All rights reserved
                        </p>
                    </div>


                </div>
            </dialog>

        </>
    )
}

export default Settings