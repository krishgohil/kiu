import React, { useEffect, useState, useRef } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { AiOutlineClose } from 'react-icons/ai';

import { FaUserCircle } from 'react-icons/fa'
import { MdPhotoCameraFront, MdSettings } from 'react-icons/md'
import { toast } from 'react-toastify';


import { BsArrowLeft } from 'react-icons/bs'

import parse, { domToReact } from 'html-react-parser';


import { SiSmartthings } from 'react-icons/si';


import { host } from '../host'
import { IoFlashOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useAppContext } from '../context';
import Head from 'next/head';


const SearchedProfile = (props) => {
    const router = useRouter()
    const { profile } = router.query
    const context = useAppContext()
    const { _id, username, profileImg } = context
    const [showSocialScore, setshowSocialScore] = useState(false);
    const [visitedUserId, setvisitedUserId] = useState('');
    const [heightbelow, setheightbelow] = useState(0);
    const [scoreonprofile, setscoreonprofile] = useState(false);
    const [showfollowing, setshowfollowing] = useState(false)
    const [showfollowers, setshowfollowers] = useState(false)
    const [followingUserDetails, setfollowingUserDetails] = useState({ followingUserinfo: {}, counter: 0 })
    const [followerUserDetails, setfollowerUserDetails] = useState({ followerUserinfo: {}, counter: 0 })
    const [showeditprofilemodal, setshoweditprofilemodal] = useState(false)
    const [isFollowing, setisFollowing] = useState(false)
    const [hasRequested, sethasRequested] = useState(false)
    const [userposts, setuserposts] = useState([])
    const [noPosts, setnoPosts] = useState(false)
    // const { rpostid, category } = useParams()

    const [loading, setloading] = useState(true)






    const [userNotFound, setuserNotFound] = useState(false)
    const [searcheduserinfo, setsearcheduserinfo] = useState({ bio: '', username: '', name: '', profileImg: '', followers: {}, following: {}, _id: '', posts: [], notificationToken: "" })


    async function fetchSearchedUserProfile() {
        console.log(profile)
        const response = await fetch(`${host}/api/auth/fetchuniqueuser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ profile }),
        });
        const json = await response.json();
        console.log(json)

        const { fetchsearchedusername, message } = json
        console.log(fetchsearchedusername)
        if (fetchsearchedusername && message == 'success') {

            let avg = fetchsearchedusername.totalSocialScore / fetchsearchedusername.socialScores.length

            if (avg == Infinity) {
                avg = 0
            }
            if (Number.isNaN(avg) == false) {
                avg = avg
            }
            else if (Number.isNaN(avg) == true) {
                avg = 0
            }

            setsearcheduserinfo({
                ...searcheduserinfo,
                bio: fetchsearchedusername.bio,
                name: fetchsearchedusername.name,
                profileImg: fetchsearchedusername.profileImg,
                username: fetchsearchedusername.username,
                followers: fetchsearchedusername.followers,
                following: fetchsearchedusername.following,
                notificationToken: fetchsearchedusername.notificationToken,
                notificationSettings: fetchsearchedusername.notificationSettings,
                _id: fetchsearchedusername._id,
                posts: fetchsearchedusername.posts,
                avgSocialScore: avg
            })
            setloading(false)

            console.log(fetchsearchedusername.posts)
        }

        else if (message == 'user_loggedOut' || message == "failed") {
            setloading(false)
            setuserNotFound(true)
        }

    }


    useEffect(() => {
        console.log(props)
        const { fetchsearchedusername, message } = props
        if (fetchsearchedusername && message == 'success') {

            let avg = fetchsearchedusername.totalSocialScore / fetchsearchedusername.socialScores.length

            if (avg == Infinity) {
                avg = 0
            }
            if (Number.isNaN(avg) == false) {
                avg = avg
            }
            else if (Number.isNaN(avg) == true) {
                avg = 0
            }

            setsearcheduserinfo({
                ...searcheduserinfo,
                bio: fetchsearchedusername.bio,
                name: fetchsearchedusername.name,
                profileImg: fetchsearchedusername.profileImg,
                username: fetchsearchedusername.username,
                followers: fetchsearchedusername.followers,
                following: fetchsearchedusername.following,
                notificationToken: fetchsearchedusername.notificationToken,
                notificationSettings: fetchsearchedusername.notificationSettings,
                _id: fetchsearchedusername._id,
                posts: fetchsearchedusername.posts,
                avgSocialScore: avg
            })
            setloading(false)

            console.log(fetchsearchedusername.posts)
        }

        else if (message == 'user_loggedOut' || message == "failed") {
            setloading(false)
            setuserNotFound(true)
        }



        // if (profile) {
        //     fetchSearchedUserProfile()
        // }
    }, [profile])








    const fetch_posts = (id) => async dispatch => {
        // console.log(isFollowingId)\
        console.log('tum ho toh', id, 'kl')
        const response = await fetch(`${host}/api/post/fetch_posts`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: id }),
        });
        console.log('jfkjaskfjsk')
        const json = await response.json();
        console.log(json.posts)
        if (json.posts.length == 0) {
            setuserposts(json.posts)
            setnoPosts(true)



        } else if (json.posts.length > 0) {
            setuserposts(json.posts)


            dispatch({
                type: SET_SEARCHED_PROFILE_POSTS,
                payload: json
            })

        }

    }

    const turnOnBtn = () => {
        console.log(searcheduserinfo.posts)
        setshowSocialScore(true)
        navigate(`socialscore`)

        if (searcheduserinfo._id.length) {
            setvisitedUserId(searcheduserinfo._id)
        }
        if (w < 1000) {
            console.log(w)
            // console.log('ha bhai chala')
            setscoreonprofile(true)
        }
    }







    const searchUniqueUserFollowing = (isFollowingId) => async dispatch => {
        // console.log(isFollowingId)
        const response = await fetch(`${host}/api/auth/searchuniqueserfollowing`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isFollowingId }),
        });
        const json = await response.json();
        setfollowingUserDetails({ ...followingUserDetails, followingUserinfo: json, counter: 1 })
    }

    const searchUniqueUserFollower = (followedById) => async dispatch => {
        // console.log(followedById)
        const response = await fetch(`${host}/api/auth/searchuniqueserfollower`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ followedById }),
        });
        const json = await response.json();
        setfollowerUserDetails({ ...followerUserDetails, followerUserinfo: json, counter: 1 })
        // console.log(json)
    }


    const launchfollowing = () => {
        setshowfollowing(true)
        navigate(`/${profile}/following`)
        if (followingUserDetails.counter < 1) {
            // console.log('rann')
            let isFollowingId = (searcheduserinfo.following)
            dispatch(searchUniqueUserFollowing(isFollowingId))
        }
    }


    const launchfollowers = () => {
        setshowfollowers(true)
        navigate(`/${profile}/followers`)
        if (followerUserDetails.counter < 1) {
            // console.log('rann')
            let followedById = (searcheduserinfo.followers)
            dispatch(searchUniqueUserFollower(followedById))
        }
    }
    const handle = () => {
        setshowSettingModal(false)
        setshowfollowing(false)
        setshowfollowers(false)
        setshowSocialScore(false)
        // navigate(`/${profile}`)
        navigate(-1)
    }

    const goAndCancel = () => {
        setshowfollowing(false)
        setshowfollowers(false)
        setshowSocialScore(false)
    }

    const handleEditButton = () => {
        // setshoweditprofilemodal(true)
        if (showeditprofilemodal === true) {
            setshoweditprofilemodal(false)
            navigate(`/${profile}`)
        }
        else if (showeditprofilemodal === false) {

            setshoweditprofilemodal(true)
            navigate(`/${profile}/editprofile`)
        }
    }


    // const showSocials = () => {
    //     setsocials(value => !value)
    // }

    const [showall, setshowall] = useState(true)
    const [showposts, setshowposts] = useState(false)
    const [showkwiks, setshowkwiks] = useState(false)
    const [showprdcts, setshowprdcts] = useState(false)



    const showallfunc = () => {
        navigate("")

    }
    const showpostsfunc = () => {
        navigate("media")

    }

    const showkwiksfunc = () => {
        navigate("kwiks")
    }

    const showprdctsfunc = () => {
        navigate("products")

    }




    const [revPosts, setrevPosts] = useState()

    const getReviewPosts = () => async dispatch => {
        const response = await fetch(`${host}/api/users/getReviewPosts`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: searcheduserinfo._id }),
        });
        const json = await response.json();
        const { final } = json
        console.log(final)
        setrevPosts(final)
        if (showprdcts === true) {
            console.log('asdfghjkl')
        }
    }


    const [dikha, setdikha] = useState(false)

    const n = () => {
        setdikha(value => !value)

    }






    //settings 

    const [showSettingModal, setshowSettingModal] = useState(false)

    const settingFunc = () => {
        setshowSettingModal(true)
        navigate('settings')
    }

    const handleFollowClick = () => {
        if (_id && guest === false) {
            dispatch(followFunc())
        }

    }

    const followFunc = () => async dispatch => {
        const response = await fetch(`${host}/api/users/follow-rqst`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requestedId: searcheduserinfo._id, userId: _id }),
        });

        const json = await response.json();
        console.log(json)
        if (json === 'success') {
            setisFollowing(false)
            sethasRequested(true)
            // SET_TO_FOLLOW_REQUESTS
            dispatch({
                type: SET_TO_FOLLOW_REQUESTS,
                payload: {
                    toFollowId: searcheduserinfo._id,
                }
            })
        }

        if (flw_Recommendations && flw_Recommendations.length > 0) {
            let arr = []
            for (let f = 0; f < flw_Recommendations.length; f++) {
                if (flw_Recommendations[f]._id != searcheduserinfo._id) {
                    arr.push(flw_Recommendations[f])
                }

                if (f == (flw_Recommendations.length - 1)) {
                    dispatch({
                        type: SET_FLW_RECOMMENDATION,
                        payload: {
                            flw_Recommendations: arr
                        }
                    })
                }
            }
        }


    }


    const handleUnfollowClick = () => {
        if (_id && guest == false) {
            if (window.confirm(`Unfollow ${searcheduserinfo.username} ?`) === true) {
                dispatch(unfollow())
            }
        }
    }

    const handleCancelRequest = () => {
        if (_id && guest == false) {
            if (window.confirm(`Cancel Request`) === true) {
                dispatch(cancelRequest())
            }
        }
    }


    const unfollow = () => async dispatch => {
        const response = await fetch(`${host}/api/users/unfollow`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: _id, toUnfollow: searcheduserinfo._id }),
        });
        const json = await response.json();
        // console.log(json)
        if (json === 'success') {

            setisFollowing(false)

            toast.info(`Unfollowed ${searcheduserinfo.username}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })
        }

    }
    const cancelRequest = () => async dispatch => {
        const response = await fetch(`${host}/api/users/cancelRequest`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: _id, toCancelFrom: searcheduserinfo._id }),
        });
        const json = await response.json();
        // console.log(json)
        if (json === 'success') {

            setisFollowing(false)
            sethasRequested(false)
        }

    }



    const ref = useRef()
    const [showName, setshowName] = useState(false)





    const requestOrderFunc = (id) => {
        if (guest == false) {
            dispatch(checkIfChat(id))
            // if (req == true) {
            //     setreq(false)
            // } else {
            //     // console.log(id)
            //     // setreq(true)
            // }
        } else {
            toast.info(`SignUp to access all features`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"

            })
        }

    }

    const checkIfChat = (id) => async dispatch => {

        console.log(id)
        // console.log(_id)

        if (id && id != _id && id.length == 24 && _id.length == 24) {
            const response = await fetch(`${host}/api/chats/checkIfChat`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: _id, receiverId: id }),
            });
            const json = await response.json();
            // console.log(json)
            // localStorage.setItem('l', 'prdct')

            // dispatch({
            //     type: SET_PRDCT_CHAT,
            //     payload: {
            //         img: feed[0].postimg[0],
            //         title: feed[0].title,
            //         tagLine: feed[0].tagLine,
            //         price: feed[0].price,
            //         discountedPrice: feed[0].discountedPrice,
            //         productCategory: feed[0].productCategory,
            //         ownerId: feed[0].postedBy._id,
            //         _id: feed[0]._id,
            //         chatId: json._id
            //     }
            // })
            if (json && json._id) {

                navigate(`/upp/chats/${json._id}`)
            } else {
                toast.warn('Oops Something went wrong', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark'
                })
            }
        }
        else if (id == _id) {
            toast.info('Cannot send message to yourself !', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })
        } else {
            toast.warn('Oops Something went wrong', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })
        }



        // setchatUsers(json)
    }

    const gotoprofile = (goto) => {
        console.log("ek pal toh jeene do")
        navigate(`/${goto}`)
    }


    const searchHashTag = (searchfeed) => {
        console.log(searchfeed[0].data)
        var result = searchfeed[0].data.slice(1);
        // sessionStorage.setItem('homeScrollId', feed._id)
        // sessionStorage.setItem('homeScroll', window.scrollY)
        navigate(`/search/${result}/posts`)
        // alert(searchfeed)
    }
    const searchUser = (searchfeed) => {
        console.log(searchfeed[0].data)
        var result = searchfeed[0].data.slice(1);
        // sessionStorage.setItem('homeScrollId', feed._id)
        // sessionStorage.setItem('homeScroll', window.scrollY)
        navigate(`/${result}`)
        // alert(searchfeed)
    }

    const options = {
        replace: ({ name, attribs, children }) => {
            // console.log(name)
            // if (!attribs) {
            //     return;
            // }


            if (name && name !== "span" && name !== "a") {
                return <div>{children[0]?.data}</div>
            } else if (attribs && attribs.class !== 'texthash' && attribs.class !== 'textuser' && attribs.class !== 'textAnker') {
                return <div>{children[0]?.data}</div>
            }


            // if (!attribs || (attribs.class !== 'texthash' && attribs.class !== 'textuser')) {
            //     return (
            //         <p style={{ color: "red" }}   >
            //         </p>);
            // }

            // // if (attribs.id === 'main') {
            // //     return <h1 style={{ fontSize: 42 }}>{domToReact(children, options)}</h1>;
            // // }

            if (attribs && attribs.class === 'texthash') {
                // console.log(children)
                return (
                    <span className='texthash' onClick={(e) => {
                        e.stopPropagation();
                        searchHashTag(children)
                    }}  >
                        {domToReact(children, options)}
                    </span>
                );
            }
            if (attribs && attribs.class === 'textuser') {
                // console.log(children)
                return (
                    <span className='textuser' onClick={(e) => {
                        e.stopPropagation();
                        searchUser(children)
                    }}  >
                        {domToReact(children, options)}
                    </span>
                );
            }
            if (attribs && attribs.class === 'textAnker') {
                // console.log(children)
                return (
                    <a className='textAnker' href={children[0]?.data} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => {
                            e.stopPropagation();
                            // console.log(e)
                            // searchUser(children)
                        }}
                    >
                        {domToReact(children, options)}

                    </a>
                );
            }
        }
    };
    return (
        <>
            <Head>
                <title>{props.fetchsearchedusername.name} (@{props.fetchsearchedusername.username}) /Keepitupp posts</title>
                <meta
                    name="description"
                    content={props.fetchsearchedusername.bio}
                />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>


            {
                userNotFound && !loading ?
                    <>
                        <div
                            id='lop'
                            className='srchRow'
                        // style={{width :'70%'}}
                        >

                            <Row className='basicinfo' style={{ display: 'flex', justifyContent: "space-between" }}>

                                <Col lg={6} xs={3} style={{ display: 'flex', flexDirection: 'column', }}>

                                    <FaUserCircle className='profileimg bnone' />
                                </Col>


                                <Col lg={2} xs={3}>
                                    <Col style={{ marginTop: '1rem', display: 'flex' }} className='flwng'>
                                        <p style={{ cursor: 'pointer' }} className='flwng'>User</p>
                                    </Col>

                                    <Col style={{ marginTop: '1rem', display: 'flex', }} className='flwrs'>
                                        <p style={{ cursor: 'pointer' }} className='flwrs' >Not</p>
                                    </Col>

                                    <Col style={{ marginTop: '1rem', display: 'flex' }} className='sscore' >
                                        <p style={{ cursor: 'pointer' }} className='sscore'>Found</p>
                                    </Col>

                                </Col>
                                {/* <Col lg={2} xs={2} >
                            <Col onClick={launchfollowing} style={{ marginTop: '1rem', display: "flex" }} ><p style={{ fontWeight: 'bold', cursor: 'pointer' }} className='flwng' >{searcheduserinfo.following.length}</p></Col>
                            <Col onClick={launchfollowers} style={{ marginTop: '1rem', display: "flex" }} ><p style={{ fontWeight: 'bold', cursor: 'pointer' }} className='flwrs' >{searcheduserinfo.followers.length}</p></Col>
                            <Col onClick={turnOnBtn} style={{ marginTop: '1rem', display: "flex" }} ><p style={{ fontWeight: 'bold', cursor: 'pointer' }} className='sscore' >
                                {searcheduserinfo.avgSocialScore ? searcheduserinfo.avgSocialScore : ''} </p>
                            </Col>
                        </Col> */}

                            </Row>
                            <hr />

                        </div>

                    </>
                    : ""
            }
            {
                !loading && !userNotFound ?
                    <>

                        {
                            dikha ?
                                <dialog open style={{ position: 'absolute', border: 'none', color: 'white', zIndex: 999, top: '0%', left: '0%', backgroundColor: "rgba(0,0,0,.35)", height: '90vh', width: '100vw', position: 'fixed', display: 'flex', overflow: 'hidden', justifyContent: 'flex-end', top: '10vh', }}>
                                    {/* <Post handlecancel={handlecancel} /> */}
                                    <div className='reqDivmain'>


                                        {/* <Requests dikha={dikha} userId={_id} n={n} /> */}

                                    </div>
                                </dialog>
                                : ''
                        }



                        <div style={{
                            display: 'flex',
                            width: '100%',
                            // backgroundColor: 'whitesmoke',
                            backgroundColor: 'black',
                            justifyContent: 'center',
                            position: "relative"

                        }}
                        >



                            <div
                                id='lop'
                                className='srchRow'
                            // style={{width :'70%'}}
                            >
                                <div className='gobackPC' style={{ position: "fixed", top: '8vh', width: "inherit", backgroundColor: "black", maxWidth: "inherit", zIndex: "9", }} >
                                    <div onClick={() => router.back()} style={{ marginLeft: '1rem', color: 'silver' }}  >
                                        <BsArrowLeft size={20} />
                                    </div>
                                    <div>
                                        <p onClick={() => window.scrollTo(0, 0)
                                        } style={{ margin: '0 1rem', fontWeight: "500", cursor: "pointer", color: "silver" }} >{searcheduserinfo.username}</p>
                                    </div>
                                </div>

                                <Col
                                    ref={ref}
                                    className='searchedprofileContainer' style={showSocialScore && scoreonprofile ? { display: 'none' } : {}} >



                                    <Row className='basicinfo' style={{ display: 'flex', justifyContent: "space-between", }}>

                                        <Col lg={6} xs={4} style={{ display: 'flex', flexDirection: 'column', }}>
                                            {
                                                searcheduserinfo.profileImg !== '' ?
                                                    <>
                                                        <img alt="img" className='profileimg' src={searcheduserinfo.profileImg}  ></img>
                                                    </>


                                                    :
                                                    <FaUserCircle className='profileimg bnone' />

                                            }



                                        </Col>


                                        <Col lg={2} xs={2}>
                                            <Col style={{ marginTop: '1rem', display: 'flex' }} onClick={launchfollowing} className='flwng'>
                                                <p style={{ cursor: 'pointer' }} className='flwng'>Following</p>
                                            </Col>

                                            <Col style={{ marginTop: '1rem', display: 'flex', }} onClick={launchfollowers} className='flwrs'>
                                                <p style={{ cursor: 'pointer' }} className='flwrs' >Followers</p>
                                            </Col>

                                            <Col style={{ marginTop: '1rem', display: 'flex' }} onClick={turnOnBtn} className='sscore' >
                                                <p style={{ cursor: 'pointer' }} className='sscore'>SocialScore</p>
                                            </Col>

                                        </Col>
                                        <Col lg={2} xs={2} >
                                            <Col onClick={launchfollowing} style={{ marginTop: '1rem', display: "flex" }} ><p style={{ fontWeight: 'bold', cursor: 'pointer' }} className='flwng' >{searcheduserinfo.following.length}</p></Col>
                                            <Col onClick={launchfollowers} style={{ marginTop: '1rem', display: "flex" }} ><p style={{ fontWeight: 'bold', cursor: 'pointer' }} className='flwrs' >{searcheduserinfo.followers.length}</p></Col>
                                            <Col onClick={turnOnBtn} style={{ marginTop: '1rem', display: "flex" }} ><p style={{ fontWeight: 'bold', cursor: 'pointer' }} className='sscore' >
                                                {searcheduserinfo.avgSocialScore ? searcheduserinfo.avgSocialScore : 0} </p>
                                            </Col>
                                        </Col>

                                    </Row>

                                    <div style={{ maxWidth: '80%' }} >
                                        <p className='searcheduserName' >{searcheduserinfo.name}
                                            {/* <span className='usnmlg' style={{ fontWeight: "500", marginLeft: "0.25rem" }} >
                                @{searcheduserinfo.username}
                            </span> */}
                                        </p>
                                        <div className='searcheduserBio' style={username === profile ? { whiteSpace: 'pre-wrap', wordBreak: "break-word", } : { marginBottom: "1rem", whiteSpace: 'pre-wrap', wordBreak: "break-word", }}>
                                            {/* {searcheduserinfo.bio} */}
                                            {parse(searcheduserinfo.bio, options)}</div>


                                    </div>



                                    <Row className='numbers'>


                                        {
                                            username === profile ?
                                                <>
                                                    <Col lg={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                        <>
                                                            <div style={{ display: 'flex', alignItems: "center", marginLeft: '1rem' }} >
                                                                <MdSettings size={24} color='silver' onClick={settingFunc} />
                                                            </div>
                                                            {/* <div className='mobnotifyIcon' onClick={n}  >
                                                <MdOutlineNewReleases color='white' size={24} />
                                            </div> */}

                                                            <button className='editprofilebtn'
                                                                onClick={handleEditButton}
                                                            >Edit Profile</button>

                                                        </>
                                                    </Col>
                                                    {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }} >

                                        <MdSettings size={24} />
                                    </div> */}
                                                </>
                                                :
                                                <div >

                                                    {
                                                        isFollowing && !hasRequested ?
                                                            <Col style={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", marginRight: "2rem" }}>

                                                                <button className='dsfdsfsd'
                                                                    onClick={() => requestOrderFunc(searcheduserinfo._id)}
                                                                    style={{ backgroundColor: "#212121", margin: "0 0 0.5rem 0.5rem", fontWeight: "500", color: "white", fontSize: "12px", padding: "0.25rem 0.5rem", borderRadius: "6px" }}

                                                                >                                                                    Chat <IoFlashOutline size={14} />
                                                                </button>
                                                                <button className='dsfdsfsd'
                                                                    onClick={handleUnfollowClick}
                                                                    style={{ backgroundColor: "#212121", margin: "0 0.5rem 0.5rem 0.5rem", fontWeight: "500", color: "white", fontSize: "12px", padding: "0.25rem 0.5rem", borderRadius: "6px" }}

                                                                >Following</button>

                                                            </Col>
                                                            :
                                                            ""
                                                    }
                                                    {
                                                        !isFollowing && hasRequested ?
                                                            <Col style={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", marginRight: "2rem" }}>

                                                                <button className='dsfdsfsd'
                                                                    onClick={() => requestOrderFunc(searcheduserinfo._id)}
                                                                    style={{ backgroundColor: "#212121", margin: "0 0 0.5rem 0.5rem", fontWeight: "500", color: "white", fontSize: "12px", padding: "0.25rem 0.5rem", border: "none", borderRadius: "6px" }}

                                                                >                                                                    Chat <IoFlashOutline size={14} />
                                                                </button>
                                                                <button className='dsfdsfsd'
                                                                    onClick={handleCancelRequest}
                                                                    style={{ margin: "0 0.5rem 0.5rem 0.5rem", fontWeight: "500", color: "white", fontSize: "12px", padding: "0.25rem 0.5rem", border: "none", borderRadius: "6px", backgroundColor: "#212121" }}

                                                                >Requested</button>

                                                            </Col>
                                                            :
                                                            ""
                                                    }
                                                    {
                                                        !isFollowing && !hasRequested ?
                                                            <Col style={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", marginRight: "2rem" }}>

                                                                <button className='dsfdsfsd'
                                                                    onClick={() => requestOrderFunc(searcheduserinfo._id)}
                                                                    style={{ backgroundColor: "#212121", margin: "0 0 0.5rem 0.5rem", fontWeight: "500", color: "white", fontSize: "12px", padding: "0.25rem 0.5rem", border: "none", borderRadius: "6px" }}

                                                                >                                                                    Chat <IoFlashOutline size={14} />
                                                                </button>
                                                                <button className='dsfdsfsd'
                                                                    onClick={handleFollowClick}
                                                                    style={{ backgroundColor: "dodgerblue", margin: "0 0.5rem 0.5rem 0.5rem", fontWeight: "500", color: "white", fontSize: "12px", padding: "0.25rem 0.5rem", border: "none", borderRadius: "6px" }}
                                                                >Follow</button>
                                                            </Col>
                                                            :
                                                            ""
                                                    }

                                                </div>

                                        }

                                    </Row>
                                    <hr style={{ margin: '0.25rem' }} />

                                    <Row style={{ opacity: "1", display: 'flex', justifyContent: "center", }} >
                                        <Col id='krish' className='segmain'   >
                                            <p className={showall ? 'seg segactive ' : 'seg'} onClick={showallfunc} style={{ marginBottom: 0, fontWeight: 'bold', background: 'hidden', opacity: 1 }} >All</p>
                                            <p className={showprdcts ? 'seg segactive ' : 'seg'} onClick={showprdctsfunc} style={{ marginBottom: 0, fontWeight: 'bold', background: 'hidden', opacity: 1 }} >
                                                <SiSmartthings color="white" size={20} />
                                            </p>
                                            <p className={showposts ? 'seg segactive' : 'seg'} onClick={showpostsfunc} style={{ marginBottom: 0, fontWeight: 'bold' }} >
                                                {/* Photos */}
                                                <MdPhotoCameraFront size={25} />
                                            </p>
                                            <p className={showkwiks ? 'seg segactive' : 'seg'} onClick={showkwiksfunc} style={{ marginBottom: 0, fontWeight: 'bold', }} >Kwiks</p>
                                            {/* <p className={showprdcts ? 'p_showprdcts' : 'seg'} onClick={showprdctsfunc} style={{ marginBottom: 0, borderRadius: "0.5rem", fontWeight: 'bold' }} >Reviews</p> */}
                                        </Col>
                                    </Row>

                                    <hr style={{ margin: '0rem' }} />






                                    <div style={{ marginBottom: `${heightbelow}px` }} >


                                        {userposts.length > 0 ?
                                            userposts.map((post, i) => {
                                                return (
                                                    <>
                                                        {
                                                            (post.content != null || post.content != undefined) ?
                                                                <>
                                                                    {/* {showall && post.content.isDeleted == false ?

                                                                        <AllOpts key={i} _id={_id} i={i} feed={post} showkwiks={showkwiks} showposts={showposts} showall={showall} searcheduserinfo={searcheduserinfo} /> : ""
                                                                    }

                                                                    {showkwiks && post.content.postType == "kwik" && post.content.isDeleted == false ?

                                                                        <AllOpts key={i} _id={_id} i={i} feed={post} showkwiks={showkwiks} showposts={showposts} showall={showall} searcheduserinfo={searcheduserinfo} /> : ""
                                                                    }
                                                                    {showprdcts && post.content.postType == "product" && post.content.isDeleted == false ?

                                                                        <AllOpts key={i} _id={_id} i={i} feed={post} showkwiks={showkwiks} showposts={showposts} showall={showall} searcheduserinfo={searcheduserinfo} /> : ""
                                                                    }

                                                                    {showposts && post.content.isDeleted == false && (post.content.postType == "media" || post.content.postType == "post") ?

                                                                        <AllOpts key={i} _id={_id} i={i} feed={post} showkwiks={showkwiks} showposts={showposts} showall={showall} searcheduserinfo={searcheduserinfo} /> : ""
                                                                    }

 */}



                                                                </>


                                                                : ''
                                                        }

                                                    </>
                                                )
                                            }).reverse()
                                            :
                                            <div>
                                                {
                                                    noPosts ?
                                                        <div style={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: "center", marginTop: '1rem' }}>
                                                            <div style={{ backgroundColor: "white", padding: "1rem", borderRadius: '1rem', border: '1px solid black', fontWeight: 'bold' }} >
                                                                No posts
                                                            </div>
                                                        </div>
                                                        :
                                                        <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
                                                            <Spinner style={{ margin: "1rem 0", color: "skyblue" }} />
                                                        </div>
                                                }
                                            </div>

                                        }


                                    </div>




                                </Col>




                            </div>


                            <div className='recommendation' style={{ width: '30%', marginLeft: '10%' }}>
                                <div style={{ color: 'black', margin: "1rem", }}>
                                    {/* {
                                        flw_Recommendations && flw_Recommendations.length > 0 ?
                                            <div style={{
                                                border: "1px  red", maxHeight: '60vh', padding: '0.5rem', overflowY: 'scroll', scrollMargin: 0, backgroundColor: 'whitesmoke',
                                                backgroundColor: 'rgb(15,15,15)',
                                                borderRadius: "2rem"
                                            }}>
                                                {

                                                    flw_Recommendations.map((recomm, i) => {
                                                        return (
                                                            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', cursor: 'pointer' }}>
                                                                {
                                                                    !recomm.profileImg || recomm.profileImg === '' ?
                                                                        <FaUserCircle color='white' style={{ height: '3.125rem', width: '3.125rem', borderRadius: '50%', marginRight: '0.6rem' }} />
                                                                        :
                                                                        <img alt="img" src={recomm.profileImg} style={{ height: '3.125rem', width: '3.125rem', borderRadius: '50%', marginRight: '0.6rem' }} ></img>

                                                                }
                                                                <div style={{ width: '60%' }}  >
                                                                    <p onClick={() => gotoprofile(recomm.username)} style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', color: "white" }}>{recomm.username}</p>
                                                                    <p onClick={() => gotoprofile(recomm.username)} style={{ marginBottom: 0, fontSize: '0.8rem', marginTop: '0.1rem', color: "white" }}>{recomm.name}</p>
                                                                </div>
                                                                <button onClick={followFunc} className='username2' >Follow</button>
                                                            </div>
                                                        )
                                                    })
                                                }



                                            </div>
                                            : ""
                                    } */}

                                    <p style={{ fontSize: "12px" }} className='info_tos' onClick={() => navigate('/info/terms-of-service')}  >Terms of Service
                                    </p>
                                    <p style={{ fontSize: "12px" }} className='info_about' onClick={() => navigate('/info/about')}  >

                                        About
                                    </p>
                                    <p style={{ fontSize: "12px" }} className='info_privacy' onClick={() => navigate('/info/privacy')}  >
                                        Privacy
                                    </p>
                                    <p className='info_privacy'>
                                        @All rights reserved
                                    </p>

                                </div>
                            </div>
                        </div >

                        {/* <Row>KRISH</Row> */}

                        {
                            showSocialScore === true ?
                                <dialog open style={{ position: 'fixed', top: '0%', left: '0%', boxSizing: 'border-box', display: 'flex', height: '100vh', width: '100vw', zIndex: 999, backgroundColor: "rgba(0,0,0,.65)", margin: 0, justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                                    <div className='scoreInfodiv' >

                                        <div style={{ paddingTop: '1rem', paddingLeft: '1rem', paddingRight: '1rem', margin: 0, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p style={{ display: 'flex', margin: 0, fontWeight: 'bold', color: 'white' }}>Social Score</p>
                                            <AiOutlineClose className='cancl' size={32}
                                                onClick={handle}
                                            />
                                        </div>

                                        <hr style={{ margin: 0 }} />

                                        <div style={{ overflowY: "scroll", scrollMargin: 0, marginBottom: 0, margin: 0, backgroundColor: 'rgb(14, 15, 16)', borderRadius: '0rem 0rem 1rem 1rem' }}>

                                            {/* <Scoreinfo goAndCancel={goAndCancel} _id={_id} profile={profile} visitedProfId={searcheduserinfo._id} profileImg={profileImg} notificationToken={searcheduserinfo.notificationToken} notificationSettings={searcheduserinfo.notificationSettings} username={username} /> */}
                                        </div>
                                    </div>
                                </dialog>
                                : ''
                        }

                        {
                            showfollowing === true ?
                                <dialog open style={{
                                    // position: 'absolute',  app.scss body relative with absolute here not working so user fixed
                                    position: 'fixed',
                                    top: '0%', left: '0%', boxSizing: 'border-box', display: 'flex', height: '100vh', width: '100vw', zIndex: 999, backgroundColor: "rgba(0,0,0,.65)", margin: 0, justifyContent: 'center', alignItems: 'center', padding: 0
                                }}>
                                    <div className='flwngdiv' >
                                        <div style={{ paddingTop: '1rem', paddingLeft: '1rem', paddingRight: '1rem', margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p style={{ display: 'flex', margin: 0, fontWeight: 'bold', }}>Following</p>
                                            <AiOutlineClose className='cancl' size={32}
                                                onClick={handle}
                                            />
                                        </div>

                                        <hr style={{ margin: 0 }} />

                                        <div style={{ overflowY: "scroll", scrollMargin: 0, padding: '1rem', marginBottom: 0, margin: 0 }}>
                                            {
                                                followingUserDetails.followingUserinfo.length > 0 ?
                                                    followingUserDetails.followingUserinfo.map((followin, index) => (
                                                        <>
                                                            <Following searcheduserinfoId={searcheduserinfo._id} following={followin} index={index} goAndCancel={goAndCancel} _id={_id} key={index} />
                                                        </>

                                                    )
                                                    ) : ''
                                            }
                                            {
                                                flw_Recommendations && flw_Recommendations.length > 0 ?
                                                    <>
                                                        <p style={{ marginBottom: '0.5rem', fontWeight: "400", marginTop: '1rem' }} >Follow Recommendations</p>

                                                        {
                                                            flw_Recommendations.map((recomm, i) => {
                                                                return (
                                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', cursor: 'pointer' }}>
                                                                        {
                                                                            !recomm.profileImg || recomm.profileImg === '' ?
                                                                                <FaUserCircle style={{ height: '3.125rem', width: '3.125rem', borderRadius: '50%', marginRight: '0.6rem' }} />
                                                                                :
                                                                                <img alt="img" src={recomm.profileImg} style={{ height: '3.125rem', width: '3.125rem', borderRadius: '50%', marginRight: '0.6rem' }} ></img>

                                                                        }
                                                                        <div style={{ width: '60%' }}>
                                                                            <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', color: "white" }}>{recomm.username}</p>
                                                                            <p style={{ marginBottom: 0, fontSize: '0.8rem', marginTop: '0.1rem', color: "white" }}>{recomm.name}</p>
                                                                        </div>
                                                                        <button className='username2' >Follow</button>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </>

                                                    : ''

                                            }
                                        </div>
                                    </div>
                                </dialog>
                                : ''
                        }


                        {
                            showfollowers === true ?
                                <dialog open style={{ position: 'fixed', top: '0%', left: '0%', boxSizing: 'border-box', display: 'flex', height: '100vh', width: '100vw', zIndex: 999, backgroundColor: "rgba(0,0,0,.65)", marign: 0, justifyContent: 'center', alignItems: 'center' }}>
                                    <div className='flwrdiv' >

                                        <div style={{ paddingTop: '1rem', paddingLeft: '1rem', paddingRight: '1rem', margin: 0, scolor: 'black', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p style={{ display: 'flex', margin: 0, fontWeight: 'bold' }}>Followers</p>
                                            <AiOutlineClose className='cancl' size={32} onClick={handle} />
                                        </div>

                                        <hr style={{ margin: 0 }} />

                                        <div style={{ overflowY: "scroll", padding: '1rem' }}>
                                            {
                                                followerUserDetails.followerUserinfo.length > 0 ?
                                                    followerUserDetails.followerUserinfo.map((followers, index) => (
                                                        <>
                                                            <Followers searcheduserinfoId={searcheduserinfo._id} followers={followers} key={index} index={index} goAndCancel={goAndCancel} />
                                                        </>

                                                    )
                                                    ) : ''
                                            }
                                            {
                                                flw_Recommendations && flw_Recommendations.length > 0 ?
                                                    <>
                                                        <p style={{ marginBottom: '0.5rem', fontWeight: "400", marginTop: '1rem' }} >Follow Recommendations</p>

                                                        {
                                                            flw_Recommendations.map((recomm, i) => {
                                                                return (
                                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', cursor: 'pointer' }}>
                                                                        {
                                                                            !recomm.profileImg || recomm.profileImg === '' ?
                                                                                <FaUserCircle style={{ height: '3.125rem', width: '3.125rem', borderRadius: '50%', marginRight: '0.6rem' }} />
                                                                                :
                                                                                <img alt="img" src={recomm.profileImg} style={{ height: '3.125rem', width: '3.125rem', borderRadius: '50%', marginRight: '0.6rem' }} ></img>

                                                                        }
                                                                        <div style={{ width: '60%' }}>
                                                                            <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', color: "white" }}>{recomm.username}</p>
                                                                            <p style={{ marginBottom: 0, fontSize: '0.8rem', marginTop: '0.1rem', color: "white" }}>{recomm.name}</p>
                                                                        </div>
                                                                        <button className='username2' >Follow</button>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </>

                                                    : ''

                                            }
                                        </div>
                                    </div>
                                </dialog>
                                : ''
                        }
                        {
                            showeditprofilemodal ?
                                <dialog open style={{ position: 'fixed', top: '0%', left: '0%', boxSizing: 'border-box', display: 'flex', height: '100vh', width: '100vw', zIndex: 999, backgroundColor: "rgba(0,0,0,.85)", marign: 0, justifyContent: 'center', alignItems: 'center' }}>

                                    <EditProfile handleEditButton={handleEditButton} setshoweditprofilemodal={setshoweditprofilemodal} />
                                </dialog>
                                : ''
                        }

                        {
                            showSettingModal ?
                                <dialog open style={{ position: 'fixed', top: '0%', left: '0%', boxSizing: 'border-box', display: 'flex', height: '100vh', width: '100vw', zIndex: 999, backgroundColor: "rgba(0,0,0,0.85)", marign: 0, justifyContent: 'center', alignItems: 'center' }}>
                                    <Settings handle={handle} />
                                </dialog>
                                : ''
                        }
                    </>
                    :

                    loading ?
                        <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
                            <Spinner style={{ margin: "1rem 0", color: "skyblue" }} />
                        </div> :
                        ""

            }



            {/* for crawler / bots */}

            <main style={{ display: "none" }} >
                <ForBot props={props} />
            </main>

        </>


    )
}

export default SearchedProfile


export async function getServerSideProps(context) {

    console.log("wesrtyui", context.params)
    if (context.params.profile && context.params.profile !== "sw.js") {
        const response = await fetch(`${host}/api/auth/fetchuniqueuser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ profile: context.params.profile }),
        });
        const json = await response.json();
        console.log(json, "1302")
        // const { fetchsearchedusername, message } = json

        return {
            props: json, // will be passed to the page component as props
        }
    } else {
        return {
            redirect: {
                destination: '/',
                statusCode: 307
            }
        }
    }


}









//--------------------------------------- ScorerComment

// FOLLOWING COMPONENT --------------------------------------------------------------------------------------------------------------
export const Following = ({ following, index, goAndCancel, searcheduserinfoId }) => {
    const onclick = () => {
        goAndCancel()
        console.log(following.username)
        // navigate(`/${following.username}`)
        // navigate(-1)
        // window.history.back()
    }
    const { _id } = useSelector(state => state.auth2)
    const dispatch = useDispatch()

    const { flw_Recommendations } = useSelector(state => state.generalReducer)


    useEffect(() => {
        console.log(flw_Recommendations)
    }, [])
    const [dnone, setdnone] = useState(false)
    const unfollowFunc = () => {

        dispatch(unfollow())
        setdnone(true)
    }

    const unfollow = () => async dispatch => {
        const response = await fetch(`${host}/api/users/unfollow`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: _id, toUnfollow: following._id }),
        });
        const json = await response.json();
        // console.log(json)
        if (json === 'success') {
            toast.info(`Unfollowed ${following.username}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })
        }

    }
    return (
        <div style={dnone ? { display: "none" } : { display: "block" }} >
            <div key={index} style={{ display: 'flex', alignItems: 'center', color: "white", marginBottom: '1rem', justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: 'center' }} >
                    <img alt="img" src={following.profileImg} style={{ height: '3.125rem', width: '3.125rem', borderRadius: '50%', marginRight: '0.6rem' }} onClick={onclick}></img>
                    <div style={{ margin: 0 }}>
                        <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', color: "white" }}>{following.username}</p>
                        <p style={{ marginBottom: 0, fontSize: '0.8rem', marginTop: '0.1rem', color: "white" }}>{following.name}</p>
                    </div>
                </div>

                {
                    _id == searcheduserinfoId ?
                        <button onClick={unfollowFunc} className='flwbtn' style={{ backgroundColor: "gray" }}>Unfollow</button>
                        : ""
                }


            </div>



        </div >

    )
}

//FOLLOWERS COMPONENT ------------------------------------------------------------------------------------------------------------
export const Followers = ({ followers, index, goAndCancel, searcheduserinfoId }) => {

    const onclick = () => {
        goAndCancel()
        // navigate(`/${followers.username}`)
        navigate(-1)
        window.history.back()
    }

    const [dnone, setdnone] = useState(false)
    const unfollowFunc = () => {

        dispatch(unfollow())
        setdnone(true)
    }

    const unfollow = () => async dispatch => {
        const response = await fetch(`${host}/api/users/unfollow`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: followers._id, toUnfollow: _id }),
        });
        const json = await response.json();
        // console.log(json)
        if (json === 'success') {
            toast.info(`Unfollowed ${followers.username}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })
        }

    }
    return (
        <div style={dnone ? { display: "none" } : { display: "block" }}>
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', cursor: 'pointer', justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: 'center' }} >
                    <img alt="img" src={followers.profileImg} style={{ height: '3.125rem', width: '3.125rem', borderRadius: '50%', marginRight: '0.6rem' }} value={index} onClick={onclick}></img>
                    <div>
                        <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>{followers.username}</p>
                        <p style={{ marginBottom: 0, fontSize: '0.8rem', marginTop: '0.1rem' }}>{followers.name}</p>
                    </div>
                </div>
                {
                    _id == searcheduserinfoId ?
                        <button onClick={unfollowFunc} className='flwbtn' style={{ backgroundColor: "gray" }} >Remove</button>
                        : ""
                }

            </div>
        </div>

    )
}

const ForBot = ({ props }) => {
    const options = {
        replace: ({ name, attribs, children }) => {

            if (name && name !== "span" && name !== "a") {
                return <div>{children[0]?.data}</div>
            } else if (attribs && attribs.class !== 'texthash' && attribs.class !== 'textuser' && attribs.class !== 'textAnker') {
                return <div>{children[0]?.data}</div>
            }
            if (attribs && attribs.class === 'texthash') {
                // console.log(children)
                return (
                    <span className='texthash' onClick={(e) => {
                        e.stopPropagation();
                        searchHashTag(children)
                    }}  >
                        {domToReact(children, options)}
                    </span>
                );
            }
            if (attribs && attribs.class === 'textuser') {
                // console.log(children)
                return (
                    <span className='textuser' onClick={(e) => {
                        e.stopPropagation();
                        searchUser(children)
                    }}  >
                        {domToReact(children, options)}
                    </span>
                );
            }
            if (attribs && attribs.class === 'textAnker') {
                // console.log(children)
                return (
                    <a className='textAnker' href={children[0]?.data} target="_blank" rel="noopener noreferrer"
                        onClick={(e) => {
                            e.stopPropagation();
                            // console.log(e)
                            // searchUser(children)
                        }}
                    >
                        {domToReact(children, options)}

                    </a>
                );
            }
        }
    };
    return (
        <div style={{
            display: 'flex',
            width: '100%',
            backgroundColor: 'black',
            justifyContent: 'center',
            position: "relative"

        }}
        >
            <div
                id='lop'
                className='srchRow'
            // style={{width :'70%'}}
            >
                <div className='gobackPC' style={{ position: "fixed", top: '8vh', width: "inherit", backgroundColor: "black", maxWidth: "inherit", zIndex: "9", }} >
                    <div onClick={() => navigate(-1)} style={{ marginLeft: '1rem', color: 'silver' }}  >
                        <BsArrowLeft size={20} />
                    </div>
                    <div>
                        <p onClick={() => window.scrollTo(0, 0)
                        } style={{ margin: '0 1rem', fontWeight: "500", cursor: "pointer", color: "silver" }} >{props.fetchsearchedusername.username}</p>
                    </div>
                </div>

                <Col
                    className='searchedprofileContainer'>



                    <Row className='basicinfo' style={{ display: 'flex', justifyContent: "space-between", }}>

                        <Col lg={6} xs={4} style={{ display: 'flex', flexDirection: 'column', }}>
                            {
                                props.fetchsearchedusername.profileImg !== '' ?
                                    <>
                                        <img alt="img" className='profileimg' src={props.fetchsearchedusername.profileImg}  ></img>
                                    </>


                                    :
                                    <FaUserCircle className='profileimg bnone' />

                            }



                        </Col>


                        <Col lg={2} xs={2}>
                            <Col style={{ marginTop: '1rem', display: 'flex' }} className='flwng'>
                                <p style={{ cursor: 'pointer' }} className='flwng'>Following</p>
                            </Col>

                            <Col style={{ marginTop: '1rem', display: 'flex', }} className='flwrs'>
                                <p style={{ cursor: 'pointer' }} className='flwrs' >Followers</p>
                            </Col>

                            <Col style={{ marginTop: '1rem', display: 'flex' }} className='sscore' >
                                <p style={{ cursor: 'pointer' }} className='sscore'>SocialScore</p>
                            </Col>

                        </Col>
                        <Col lg={2} xs={2} >
                            <Col style={{ marginTop: '1rem', display: "flex" }} ><p style={{ fontWeight: 'bold', cursor: 'pointer' }} className='flwng' >{props.fetchsearchedusername.following.length}</p></Col>
                            <Col style={{ marginTop: '1rem', display: "flex" }} ><p style={{ fontWeight: 'bold', cursor: 'pointer' }} className='flwrs' >{props.fetchsearchedusername.followers.length}</p></Col>
                            <Col style={{ marginTop: '1rem', display: "flex" }} ><p style={{ fontWeight: 'bold', cursor: 'pointer' }} className='sscore' >
                                {props.fetchsearchedusername.avgSocialScore ? props.fetchsearchedusername.avgSocialScore : 0} </p>
                            </Col>
                        </Col>

                    </Row>

                    <div style={{ maxWidth: '80%' }} >
                        <p className='searcheduserName' >{props.fetchsearchedusername.name}
                            {/* <span className='usnmlg' style={{ fontWeight: "500", marginLeft: "0.25rem" }} >
                        @{props.fetchsearchedusername.username}
                    </span> */}
                        </p>
                        <div className='searcheduserBio' style={{ whiteSpace: 'pre-wrap', wordBreak: "break-word", }} >
                            {/* {props.fetchsearchedusername.bio} */}
                            {parse(props.fetchsearchedusername.bio, options)}</div>


                    </div>



                    <Row className='numbers'>




                    </Row>
                    <hr style={{ margin: '0.25rem' }} />

                    <Row style={{ opacity: "1", display: 'flex', justifyContent: "center", }} >
                        <Col id='krish' className='segmain'   >
                            <p className="seg" style={{ marginBottom: 0, fontWeight: 'bold', background: 'hidden', opacity: 1 }} >All</p>
                            <p className="seg" style={{ marginBottom: 0, fontWeight: 'bold', background: 'hidden', opacity: 1 }} >
                                <SiSmartthings color="white" size={20} /> <span style={{ display: "none" }} >Products</span>
                            </p>
                            <p className="seg" style={{ marginBottom: 0, fontWeight: 'bold' }} >
                                {/* Photos */}
                                <MdPhotoCameraFront size={25} /> <span style={{ display: "none" }} >Media</span>
                            </p>
                            <p className="seg" style={{ marginBottom: 0, fontWeight: 'bold', }} >Kwiks</p>
                            {/* <p className={showprdcts ? 'p_showprdcts' : 'seg'} onClick={showprdctsfunc} style={{ marginBottom: 0, borderRadius: "0.5rem", fontWeight: 'bold' }} >Reviews</p> */}
                        </Col>
                    </Row>

                    <hr style={{ margin: '0rem' }} />

                </Col>

            </div>


            <div className='recommendation' style={{ width: '30%', marginLeft: '10%' }}>
                <div style={{ color: 'black', margin: "1rem", }}>
                    <p style={{ fontSize: "12px" }} className='info_tos' onClick={() => navigate('/info/terms-of-service')}  >Terms of Service
                    </p>
                    <p style={{ fontSize: "12px" }} className='info_about' onClick={() => navigate('/info/about')}  >

                        About
                    </p>
                    <p style={{ fontSize: "12px" }} className='info_privacy' onClick={() => navigate('/info/privacy')}  >
                        Privacy
                    </p>
                    <p className='info_privacy'>
                        @All rights reserved
                    </p>

                </div>
            </div>
        </div >
    )
}




