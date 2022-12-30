import React, { useEffect, useState } from 'react';
import Stars from './Stars';
import { AiOutlineClose, AiOutlineShareAlt } from 'react-icons/ai';
import { BsFlag, BsReply, BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegComment, FaRegStar, FaStar } from "react-icons/fa";
import { DateTime } from 'luxon'
import { MdOutlineDelete } from 'react-icons/md'
import parse, { domToReact } from 'html-react-parser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiUserUnfollowLine } from 'react-icons/ri';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { IoFlashOutline } from 'react-icons/io5';
import { host } from '../host'
import { useAppContext, useGeneralContext } from '../context';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';

const Test2 = ({ feed, i, restorationRef, gotoProfile, gotoContent }) => {
    const [doubleclicked, setdoubleclicked] = useState(false);
    const [showamim, setshowamim] = useState(true);
    const [ratedByUser, setratedByUser] = useState(false);
    const [dikha, setdikha] = useState(false)
    const [postOpts, setpostOpts] = useState(false)
    const [rated, setrated] = useState(false)

    const context = useAppContext()
    const genContext = useGeneralContext()
    const router = useRouter()




    const { username, _id } = context.sharedState
    const { flw_Recommendations, pollOptedPosts, starred_posts, reposted_posts, guest } = genContext.genstate

    let path = router.asPath
    const [repostCount, setrepostCount] = useState(0)

    const [actualOpts, setactualOpts] = useState(2)
    const [totalVotes, settotalVotes] = useState(0)
    const [opt1Votes, setOpt1Votes] = useState(0)
    const [opt2Votes, setOpt2Votes] = useState(0)
    const [opt3Votes, setOpt3Votes] = useState(0)
    const [opt4Votes, setOpt4Votes] = useState(0)
    const [optionSelectedId, setoptionSelectedId] = useState('')
    const [totalComments, settotalComments] = useState(0)
    const [hasVoted, sethasVoted] = useState(false)
    const [reply, setreply] = useState('')
    const [totalStars, settotalStars] = useState(0)

    const [hasRated, sethasRated] = useState(false)
    const [rating, setrating] = useState(0)
    const [hasReposted, sethasReposted] = useState(false)
    const [tempdeleted, settempdeleted] = useState(false)
    const [showResults, setshowResults] = useState(false)
    const [userselected, setuserselected] = useState(false)

    const [bar1Width, setbar1Width] = useState(0)

    useEffect(() => {
        // console.log(feed)
        if (restorationRef) {

            // console.log('malhari', restorationRef)
            restorationRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
        } else {
            // console.log('alauddin')
        }
        // console.log(path)
        let z = sessionStorage.getItem('homeScrollId')

        if (feed && feed.avgStarRating) {
            var result = (feed.avgStarRating - Math.floor(feed.avgStarRating)) !== 0;
            if (result) {
                console.log('HAS DECIMAL ')
                setavgStar(feed.avgStarRating.toFixed(2))
            }
            else {
                setavgStar(feed.avgStarRating)
                console.log('does not have a decimal')
            }
        }




        if (feed.postType == 'poll') {

            var actual = 0

            for (let i = 0; i < feed.pollOptions.length; i++) {
                if (feed.pollOptions[i].option.length > 0) {
                    var has_voted = false
                    for (let j = 0; j < feed.pollOptions[i].voters.length; j++) {

                        if (_id == feed.pollOptions[i].voters[j].voterId) {
                            sethasVoted(true)
                            let a = i + 1
                            setuserselected(a)
                            setshowResults(true)
                        }

                    }
                    actual = actual + 1
                    if (i == 0) {
                        // console.log(feed.pollOptions[i].voters.length)
                        setOpt1Votes(feed.pollOptions[i].voters.length)
                    }
                    else if (i == 1) {
                        // console.log(feed.pollOptions[i].voters.length)
                        setOpt2Votes(feed.pollOptions[i].voters.length)
                    }
                    else if (i == 2) {
                        // console.log(feed.pollOptions[i].voters.length)
                        setOpt3Votes(feed.pollOptions[i].voters.length)
                    }
                    else if (i == 3) {
                        // console.log(feed.pollOptions[i].voters.length)
                        setOpt4Votes(feed.pollOptions[i].voters.length)
                    }
                }

            }
            setactualOpts(actual)
            settotalVotes(feed.pollVotes)
        }

        var comments = 0
        var hasRated = false
        var _rating = 0
        var totalstars = 0

        for (let i = 0; i < feed.ratedBy.length; i++) {
            totalstars = feed.ratedBy[i].starRating + totalstars
            if (feed.ratedBy[i].raterId == _id) {
                // console.log(feed.ratedBy[i].starRating)
                hasRated = true
                _rating = feed.ratedBy[i].starRating
            }

            if (feed.ratedBy[i].raterComment.length > 0) {
                comments = comments + 1
            }

        }
        if (starred_posts && starred_posts.length > 0) {
            // console.log("sa")
            for (let s = 0; s < starred_posts.length; s++) {
                // console.log("re")

                if (starred_posts[s].postId == feed._id && _rating != starred_posts[s].stars) {
                    // console.log("ga")

                    _rating = starred_posts[s].stars
                    hasRated = true


                    if (starred_posts[s].stars > 0) {
                        hasRated = true
                        setstar(true)
                    } else {
                        hasRated = false
                        setstar(false)
                    }

                }
            }
        }
        settotalStars(totalstars)


        sethasRated(hasRated)
        if (hasRated == true) {
            setrating(_rating)
            setstar(true)
        }
        settotalComments(comments)



        if (feed.reposts) {

            setrepostCount(feed.reposts)
        }

        if (feed.reposters) {

            for (let j = 0; j < feed.reposters.length; j++) {
                if (feed.reposters[j].reposterId == _id) {
                    sethasReposted(true)
                }
            }
        }


    }, [path, feed])


    useEffect(() => {


        if (hasVoted == false) {
            for (let i = 0; i < pollOptedPosts.length; i++) {

                if (feed._id === pollOptedPosts[i].postId) {

                    settotalVotes(pollOptedPosts[i].totalVotes)
                    setuserselected(pollOptedPosts[i].userselected)
                    setoptionSelectedId(pollOptedPosts[i].optionSelectedId)
                    sethasVoted(true)
                    setshowResults(true)
                    setOpt1Votes(pollOptedPosts[i]._one)
                    setOpt2Votes(pollOptedPosts[i]._two)
                    setOpt3Votes(pollOptedPosts[i]._three)
                    setOpt4Votes(pollOptedPosts[i]._four)
                    // optionSelectedId: optSelId,
                    //     totalVotes: totalVotes,
                    //         userselected: userselected,
                    //             postId: feed._id
                }
            }
        }
    }, [pollOptedPosts])


    useEffect(() => {
        for (let rp = 0; rp < reposted_posts.length; rp++) {
            if (feed._id == reposted_posts[rp].postId) {
                if (reposted_posts[rp].reposted == true) {
                    sethasReposted(true)
                    setrepostCount(reposted_posts[rp].repostCount + 1)
                } else {
                    sethasReposted(false)
                    setrepostCount(reposted_posts[rp].repostCount - 1)
                }

            }


            if (feed.isRepost && feed.repostId == reposted_posts[rp].postId) {
                settempdeleted(true)
                dispatch({
                    type: SET_DELETED_POSTS,
                    payload: {
                        postId: feed._id,
                    }
                })
            }
        }
    }, [reposted_posts])








    const dbclick = () => {
        if (guest == false) {
            // console.log('doubleclick')
            clearTimeout()
            setdoubleclicked(true)
            setshowamim(true)

            setTimeout(() => {
                setshowamim(false)
            }, 3000);
        }


    }

    const setrate = () => {
        setrated(true)
    }

    const changeDbclick = () => {
        // console.log('me chala na bhai')
        setdoubleclicked(false)
    }


    const b = () => {

        router.push(`/post/${feed._id}`)

        // setdikha(value => !value)

    }






    const showPostOpts = () => {
        if (feed.postType == 'product') {
            setshareUrl(`https://keepitupp.herokuapp.com/product/${feed._id}`)
        } else {
            setshareUrl(`https://keepitupp.herokuapp.com/post/${feed._id}`)
        }
        setpostOpts(value => !value)
    }



    const gotoProfileFunc = (user) => {
        console.log(user)
        // sessionStorage.setItem('searchScroll', window.scrollY)
        // navigate(`/${feed.postedBy.username}`)
        gotoProfile(user)
    }

    const [starred, setstarred] = useState(0)


    const getstarValue = (value) => {
        setstarred(value)
    }

    const [avgStar, setavgStar] = useState(0)
    const [lehrado, setlehrado] = useState(false)
    var oks = false

    var timeout
    const omo = () => {
        if (guest == false) {
            oks = false
            timeout = setTimeout(() => {
                if (oks == false) {
                    setlehrado(true)
                }
            }, 1500);
        }

    }

    const oml = () => {
        oks = true
        setlehrado(false)
    }


    const [repost, setrepost] = useState(false)
    const repostFunc = () => {
        if (guest == false) {
            if (hasReposted === false) {
                dispatch({
                    type: SET_REPOST,
                    payload: {
                        status: true,
                        description: feed.description,
                        postimg: feed.postimg,
                        pUsername: feed.postedBy.username,
                        pProfileImg: feed.postedBy.profileImg,
                        pnotificationSettings: feed.postedBy.notificationSettings,
                        pnotificationToken: feed.postedBy.notificationToken,
                        pDate: feed.posted_Date,
                        p_id: feed._id,
                        pPosterId: feed.postedBy._id,
                        p_repostCount: repostCount
                    }
                })
                // sessionStorage.setItem('homeScrollId', feed._id)
                // sessionStorage.setItem('homeScroll', window.scrollY)

                navigate('compose-post')
            }
            else if (hasReposted === true) {
                if (window.confirm("Remove Repost") == true) {
                    // console.log('dispatcch karo bhaiya')
                    dispatch(removeRepost())
                }
            }
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

    const removeRepost = () => async dispatch => {
        sethasReposted(false)
        setrepostCount(repostCount - 1)
        const response = await fetch(`${host}/api/post/removeRepost`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, postId: feed._id }),
        });
        const json = await response.json();


        dispatch({
            type: REMOVE_REPOSTED_POSTS,
            payload: {

                postId: feed._id,
                repostCount: repostCount,
                repost: false
            }
        })

        // console.log(json)
        // dispatch(getstressmsgs())
    }


    const showResultsFunc = (n) => {
        if (guest == false) {
            settotalVotes(totalVotes + 1)
            setshowResults(true)
            setuserselected(n)
            var _one = opt1Votes
            var _two = opt2Votes
            var _three = opt3Votes
            var _four = opt4Votes
            var optSelId = feed.pollOptions[n - 1]._id
            console.log(optSelId, "optSelId")
            setoptionSelectedId(optSelId)
            if (n == 1) {
                console.log('jaago')
                _one = _one + 1
                setOpt1Votes(opt1Votes + 1)

            }
            else if (n == 2) {
                console.log('herhehrhehrehr')
                _two = _two + 1

                setOpt2Votes(opt2Votes + 1)
            }
            else if (n == 3) {
                _three = _three + 1

                setOpt3Votes(opt3Votes + 1)
            }
            else if (n == 4) {
                _four = _four + 1

                setOpt4Votes(opt4Votes + 1)
            }
            dispatch(postPollVote(optSelId))
            dispatch({
                type: SET_POLL_SELECTED,
                payload: {
                    optionSelectedId: optSelId,
                    totalVotes: totalVotes + 1,
                    userselected: n,
                    postId: feed._id,
                    _one: _one,
                    _two: _two,
                    _three: _three,
                    _four: _four,
                }
            })
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

    const postPollVote = (optSelId) => async dispatch => {
        const response = await fetch(`${host}/api/post/postPollVote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userselected, _id, postId: feed._id, optionId: optSelId }),
        });
        const json = await response.json();
        // console.log("json", json)
    }


    const closeRepost = () => {
        window.document.body.style.overflowY = 'scroll'
        window.document.body.style.scrollMargin = 0
        setrepost(false)
        setsendToChat(false)

    }

    // sendtochat
    const [sendToChatUsers, setsendToChatUsers] = useState()
    const [sendToChat, setsendToChat] = useState(false)
    const sendToChatFunc = () => {
        if (guest == false) {
            setsendToChat(true)
            window.document.body.style.overflowY = 'hidden'
            window.document.body.style.scrollMargin = 0
            dispatch(recentChats())
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

    const recentChats = () => async dispatch => {
        const response = await fetch(`${host}/api/chats/recentChats`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id }),
        });
        const json = await response.json();
        // console.log(json)


        if (json[0].recent && json[0].recent == 'false') {
            // console.log('2')
            // setflwng(json[1])
            setsendToChatUsers(json[1])
        } else {
            for (let i = 0; i < json.length; i++) {
                // console.log(json[i].latestMessage.date)
            }
            let sortit = json.sort(function (a, b) {
                return (a.latestMessage.date < b.latestMessage.date) ? -1 : ((a.latestMessage.date > b.latestMessage.date) ? 1 : 0);
            });

            // console.log(sortit)
            let arr = sortit.reverse()
            setsendToChatUsers(arr)
        }
    }


    // delete post
    const deletePostFunc = () => {
        if (window.confirm("Do you want to delete this post?") == true) {
            dispatch(deletePost())
        }
    }

    const deletePost = () => async dispatch => {
        const response = await fetch(`${host}/api/post/delete-post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id, postId: feed._id, }),
        });
        const json = await response.json();

    }

    //newpost
    const newpost = () => async dispatch => {
        const response = await fetch(`${host}/api/post/newpost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: reply, postimg: "", id: _id, repostId: feed._id, isRepost: true }),
        });
        const json = await response.json();
        console.log(json)
        if (json === 'success') {
            window.document.body.style.overflowY = 'scroll'
            window.document.body.style.scrollMargin = 0
            setrepost(false)
            setsendToChat(false)
        }

    }
    const submitRepost = () => {
        dispatch(newpost())
    }



    // share button 
    const [shareUrl, setshareUrl] = useState('https://keepitupp.herokuapp.com/')
    const [share, setshare] = useState(false)
    const [showShareModal, setshowShareModal] = useState(false)
    const shareFunc = () => {
        setsendToChat(false)
        window.document.body.style.overflowY = 'scroll'
        window.document.body.style.scrollMargin = 0
        if (share == true) {
            window.document.body.style.overflowY = 'scroll'
            window.document.body.style.scrollMargin = 0
            setshare(false)
        } else {

            var _url
            if (feed.postType == 'product') {
                _url = `https://keepitupp.herokuapp.com/product/${feed._id}`
            } else {
                _url = `https://keepitupp.herokuapp.com/post/${feed._id}`
            }
            if (navigator.share) {
                navigator.share({
                    title: "Keepitupp",
                    text: "Sharing a post",
                    url: _url

                })
            } else {
                window.document.body.style.overflowY = 'hidden'
                window.document.body.style.scrollMargin = 0
                setshare(true)
            }
        }

    }

    //  unfollow 
    const unfollowFunc = () => {
        dispatch(unfollow())
    }
    const unfollow = () => async dispatch => {
        const response = await fetch(`${host}/api/users/unfollow`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: _id, toUnfollow: feed.postedBy._id }),
        });
        const json = await response.json();
        console.log(json)
        if (json === 'success') {

            toast.info(`Unfollowed ${feed.postedBy.username}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'

            })
        }

    }

    const [_clamp, set_clamp] = useState(301)

    const [star, setstar] = useState(false)

    const clickedStar = (value) => {
        oks = true
        setstar(true)
        setlehrado(false)
        setdoubleclicked(false)
        setrating(value)
        set_rstar(false)

        if (hasRated == false) {
            sethasRated(true)
        }
        // console.log('CLCIK STAR RAN')
    }

    const [_rstar, set_rstar] = useState(false)
    const starFunc = () => {
        if (guest == false) {
            oks = true
            if (star) {
                oks = true
                setstar(false)
                sethasRated(false)
                setrating(0)
                set_rstar(true)
                setlehrado(false)
                setdoubleclicked(false)
            }
            else {
                console.log('kdfjakdfkafdk')

                setstar(true)
                setrating(5)
            }
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

    const [sendPostTo, setsendPostTo] = useState([])
    const sendFunc = (sendTo, notificationToken, notificationSettings) => {

        if (guest == false) {
            let ok = _id.toString()

            // console.log(sendPostTo)
            socket.emit("send_post", { sendTo: sendTo, postId: feed._id, sender: _id, senderUsername: username, notificationToken: notificationToken, notificationSettings: notificationSettings });
            // console.log('sendPostTo', ok)

            if (sendTo) {
                setsendPostTo([...sendPostTo, sendTo])
            }
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







    const [showsearchModal, setshowsearchModal] = useState(false)
    const [search, setsearch] = useState("")

    useEffect(() => {
        let timerout = setTimeout(() => {
            // console.log("HERE")
            let x = search.replace(/\s\s+/g, ' ')
            if (x.length > 0) {
                dispatch(searchUsers())
            } else if (x.length == 0 && showsearchModal) {
                // console.log("beee")
                dispatch(recentChats())
            }
        }, 1000);
        return () => clearTimeout(timerout)
    }, [search])

    const onchange = (e) => {
        setsearch(e.target.value)
        if (showsearchModal == false) {
            setshowsearchModal(true)
        }
    }

    const searchUsers = () => async dispatch => {
        // console.log("rabba")
        const response = await fetch(`${host}/api/users/searchUsers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, input: search }),
        });
        const json = await response.json();
        // console.log("heheheh")
        // console.log(json)
        setsendToChatUsers(json)
        // setposts(json)
    }



    const searchHashTag = (searchfeed) => {
        console.log(searchfeed[0].data)
        var result = searchfeed[0].data.slice(1);
        navigate(`/search/${result}/posts`)
        // alert(searchfeed)
    }
    const searchUser = (searchfeed) => {
        console.log(searchfeed[0].data)
        var result = searchfeed[0].data.slice(1);
        navigate(`/search/${result}`)
        // alert(searchfeed)
    }



    const options = {
        replace: ({ attribs, children }) => {
            if (!attribs) {
                return;
            }

            // if (attribs.id === 'main') {
            //     return <h1 style={{ fontSize: 42 }}>{domToReact(children, options)}</h1>;
            // }

            if (attribs.class === 'texthash') {
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
            if (attribs.class === 'textuser') {
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
        }
    };



    return (
        <>
            {/* {
                share ?
                    <ShareBox shareFunc={shareFunc} shareUrl={shareUrl} />
                    : ''
            } */}
            {
                sendToChat ?

                    <dialog
                        // onMouseLeave={closeRepost}
                        className='toChatDialog' open >
                        <div className='toChatMain' style={{ backgroundColor: "black", borderRadius: "1rem 1rem  0 0 ", padding: "0.5rem 0.5rem 1.5rem 0.5rem", background: "black", opacity: "1", maxHeight: "80vh", overflowY: "scroll", opacity: 1, zIndex: 999 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', position: "sticky", top: 0, alignItems: "center" }}>
                                <div className={sendToChat ? 'shareOpt shareOptActive' : 'shareOpt'} style={{ borderRight: "1px solid rgb(100, 100, 100)" }} >
                                    Message
                                </div>
                                <div className='shareOpt' onClick={shareFunc} >
                                    Share via <AiOutlineShareAlt />
                                </div>
                                <AiOutlineClose color='' size={28} className='delImg' onClick={() => {
                                    window.document.body.style.overflowY = 'scroll'
                                    window.document.body.style.scrollMargin = 0
                                    setsendToChat(false)
                                }} />
                            </div>
                            <div style={{ display: "flex", borderBottom: "1px solid gray", padding: "0.5rem", position: "sticky", top: 0, opacity: 1, }} >
                                <span style={{ fontWeight: 'bold' }} >To :</span>
                                <input onChange={onchange} maxLength={30} placeholder='Search People' type="text" style={{ outline: "none", border: "none", backgroundColor: 'black', caretColor: "white", color: "white", marginLeft: "1rem", flex: 1, fontWeight: 500 }} />
                            </div>
                            <div style={{ height: "50vh", overflowY: "scroll", scrollMargin: 0 }} >

                                {
                                    sendToChatUsers && sendToChatUsers.length > 0 ?
                                        sendToChatUsers.map((rep, i) => {
                                            return (
                                                <>
                                                    {/* <SendItem key={i} rep={rep} sendFunc={sendFunc} _id={_id} >
                                                </SendItem> */}
                                                </>
                                            )
                                        })
                                        : <Spinner></Spinner>
                                }




                            </div>
                        </div>

                    </dialog>
                    : ''
            }
            <div className='testMain' onMouseLeave={oml} style={{ color: "white", }} ref={restorationRef}>
                {
                    feed.description == "" && feed.postimg == "" && feed.isRepost == true ?
                        <div onClick={() => gotoProfileFunc(feed.postedBy.username)} style={{ color: '#808080', fontSize: "12px", display: "flex", fontWeight: "bold" }} >
                            <img alt="img" src={feed.postedBy.profileImg} style={{ height: '1.5rem', width: '1.5rem', borderRadius: '50%', marginRight: '0.2rem', cursor: 'pointer' }} ></img>
                            <div style={{ marginTop: "0.1rem" }} >
                                {feed.postedBy.username} reposted
                            </div>
                            <div className='reply' style={{ display: 'flex', margin: 0, position: "relative", alignItems: "center" }}>

                                <div className='replyIcon' style={{ cursor: "pointer", }} onClick={repostFunc}>
                                    <BsReply color={hasReposted ? "rgb(255, 0, 102)" : ""} style={{ fontSize: "20px", marginTop: "0.1rem" }} ></BsReply>

                                </div>
                                <span title='repost' style={{ opacity: '0.7', fontSize: '14px', userSelect: "none" }}>
                                    {repostCount}
                                </span>





                            </div>
                        </div>
                        : <div className='feedtopinfo' style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                                <img alt="img" onClick={() => gotoProfileFunc(feed.postedBy.username)} src={feed.postedBy.profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                                <p onClick={() => gotoProfileFunc(feed.postedBy.username)} style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className='feedUsername' >{feed.postedBy.username}</p>
                            </div>

                            <div style={{ display: "flex", width: '40%', alignItems: "center" }} >


                                <p style={{ marginBottom: 0, fontSize: '0.7rem', textAlign: 'center', color: "#a3a3a3" }}>

                                    {
                                        feed.posted_Date !== null ?

                                            DateTime.fromISO(feed.posted_Date).toRelative()
                                            : ''
                                    }
                                </p>
                            </div>



                            <div style={postOpts ? { width: '10%', right: 0 } : {}}>
                                <p onClick={showPostOpts} style={{ marginLeft: '0.5rem', marginBottom: 0, display: 'flex', cursor: 'pointer', color: '#a3a3a3', textAlign: 'end' }}>

                                    {
                                        postOpts ?
                                            <AiOutlineClose color='white' size={20} /> : <BsThreeDotsVertical />
                                    }

                                </p>
                                {
                                    postOpts ?
                                        <div style={{ position: "relative" }} onMouseLeave={() => setpostOpts(false)}
                                        >
                                            <div className='postopts' >

                                                <div className='class-postOpts' onClick={shareFunc}  >
                                                    <p style={{ marginBottom: "0rem", cursor: "pointer", fontSize: "0.9rem" }} >Share   </p>
                                                    <span>
                                                        <AiOutlineShareAlt size={16} />
                                                    </span>
                                                </div>
                                                <div className='class-postOpts'  >
                                                    {
                                                        feed.postedBy._id !== _id ?
                                                            <>
                                                                <p style={{ marginBottom: "0rem", cursor: "pointer", fontSize: "0.9rem" }} >Report   </p>
                                                                <span>
                                                                    <BsFlag size={16} />
                                                                </span>
                                                            </>

                                                            : ''
                                                    }

                                                </div>
                                                <div className='class-postOpts'  >
                                                    {
                                                        feed.postedBy._id === _id ?
                                                            <>
                                                                <p onClick={deletePostFunc} style={{ marginBottom: "0rem", cursor: "pointer", fontSize: "0.9rem" }} >Delete   </p>
                                                                <span onClick={deletePostFunc} >
                                                                    <MdOutlineDelete size={16} />
                                                                </span>
                                                            </> : ''
                                                    }

                                                </div>
                                                <div>
                                                    {
                                                        feed.postedBy._id !== _id && guest == false ?
                                                            <div className='class-postOpts' onClick={unfollowFunc}  >
                                                                <>
                                                                    <p style={{ marginBottom: "0rem", cursor: "pointer", fontSize: "0.9rem" }} >Unfollow   </p>
                                                                    <span>
                                                                        <RiUserUnfollowLine size={16} />
                                                                    </span>
                                                                </>

                                                            </div>
                                                            : ''
                                                    }
                                                </div>


                                            </div>
                                        </div>
                                        : ''
                                }

                            </div>
                        </div>
                }


                {/* <hr style={{ color: 'white', margin: 0 }} /> */}
                <div style={{
                    display: 'flex', flexDirection: 'column', color: "white",
                    // padding: '0.5rem',
                    // paddingTop: "0.5rem",
                    justifyContent: 'center'
                }}>
                    <div style={{ display: 'flex', justifyContent: "space-between", width: '100%', color: 'white', flexDirection: "column", padding: "0.5rem" }}>
                        {
                            feed.category && feed.category != "" && feed.category !== 'personal' ?
                                <p style={{ fontSize: '1rem', cursor: 'pointer', borderRadius: "1rem", padding: "0.25rem 0.5rem 0.25rem 0rem", color: "white", fontWeight: "500", marginBottom: '0rem' }}  >{feed.title}</p>
                                : ""
                        }
                        <p style={{ marginBottom: '4px', fontSize: '0.9rem', marginTop: '0.1rem', width: '100%', whiteSpace: 'pre-wrap', wordBreak: "break-word" }}>
                            {parse(feed.description, options)}
                        </p>

                    </div>

                    {
                        feed.postType === 'post' ?
                            <img alt="img" src={feed.postimg} style={{ marginBottom: '4px' }} onDoubleClick={dbclick}
                                className={doubleclicked && showamim ? 'a postImg' : 'postImg'} /> : ''
                    }
                    {
                        feed.postType === 'media' ?
                            <div>
                                <Swiper
                                    className='jkliop'
                                    style={{ width: 'auto', height: "auto", }}
                                    // install Swiper modules
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    // spaceBetween={50}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{ clickable: true }}
                                    scrollbar={{ draggable: true }}
                                // onSwiper={(swiper) => console.log(swiper)}
                                // onSlideChange={() => console.log('slide change')}
                                >
                                    {


                                        feed.postimg.map((img, i) =>
                                            <div key={i}>
                                                <SwiperSlide style={{ width: '100%', backgroundColor: 'gray', borderRadius: "0.5rem" }} >
                                                    <img alt="img" style={{ width: '100%', borderRadius: "0.5rem" }} onDoubleClick={dbclick}
                                                        className={doubleclicked && showamim ? 'a postImg' : 'postImg'} src={feed.postimg[i]} />
                                                </SwiperSlide>
                                                {/* < img src={feed.postimg[i]}  style={{ marginBottom: '4px' }} /> */}
                                            </div>
                                        )
                                    }
                                </Swiper>

                            </div>

                            : ''
                    }
                    {
                        feed.postType == 'poll' && showResults == false && hasVoted == false ?
                            <>
                                <div className='polloptions' onClick={() => showResultsFunc(1)}  >
                                    {feed.pollOptions[0].option}
                                </div>
                                <div className='polloptions' onClick={() => showResultsFunc(2)}  >
                                    {feed.pollOptions[1].option}

                                </div>
                                {feed.pollOptions[2].option != '' ?
                                    <div className='polloptions' onClick={() => showResultsFunc(3)}  >
                                        {feed.pollOptions[2].option}

                                    </div>

                                    : ''
                                }

                                {feed.pollOptions[3].option != '' ?
                                    <div className='polloptions' onClick={() => showResultsFunc(4)}  >
                                        {feed.pollOptions[3].option}
                                    </div>

                                    : ''
                                }

                            </>
                            : ''
                    }
                    {
                        // { color: "white", marginLeft: '0.2rem' }
                        showResults == true ?
                            <>
                                <div style={{
                                    display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", width: "100%", paddingRight: "1rem", alignItems: "center"
                                }} >
                                    <div className='pollbar' style={{ width: (opt1Votes / totalVotes * 100) + '%' }}  >{feed.pollOptions[0].option}</div>
                                    <span style={userselected == 1 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >
                                        {((opt1Votes / totalVotes) * 100).toFixed(0)}%</span>
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", width: "100%", paddingRight: "1rem", alignItems: 'center' }} >
                                    <div className='pollbar' style={{ width: (opt2Votes / totalVotes * 100) + '%' }}  > {feed.pollOptions[1].option}
                                    </div>
                                    <span style={userselected == 2 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >{((opt2Votes / totalVotes) * 100).toFixed(0)}%</span>
                                </div>

                                {
                                    actualOpts > 2 ?
                                        <div style={{
                                            display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", width: "100%", paddingRight: "1rem", alignItems: "center"
                                        }} >
                                            <div className='pollbar' style={{ width: (opt3Votes / totalVotes * 100) + '%' }} >
                                                {feed.pollOptions[2].option}
                                            </div>
                                            <span style={userselected == 3 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >{((opt3Votes / totalVotes) * 100).toFixed(0)}%</span>
                                        </div>
                                        : ''
                                }

                                {
                                    actualOpts > 3 ?
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", width: "100%", paddingRight: "1rem", alignItems: "center" }
                                        } >
                                            <div className='pollbar' style={{ width: (opt4Votes / totalVotes * 100) + '%' }}  >
                                                {feed.pollOptions[3].option}
                                            </div>
                                            <span style={userselected == 4 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >{((opt4Votes / totalVotes) * 100).toFixed(0)}%</span>
                                        </div>

                                        : ''
                                }

                                <div style={{ fontSize: '12px', color: "#949494", marginLeft: "0.5rem" }}  >{totalVotes} votes </div>





                            </>
                            : ''
                    }


                    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', position: "relative" }}>



                        <div className='cmnticon' style={{ marginRight: "0rem" }} onClick={() => b("gotocomments")} title='comments'>
                            <FaRegComment key={i} style={{ fontSize: "17px", margin: '0.5rem', marginTop: '0.6rem', }} />
                            <span style={{ opacity: '0.7', fontSize: '14px', marginTop: '0.25rem', }}>{
                                totalComments
                            }</span>

                        </div>


                        <div title='send to chat' className='sendToChat' onClick={sendToChatFunc} >
                            <IoFlashOutline style={{ fontSize: "21px", margin: '0.5rem' }} ></IoFlashOutline>
                        </div>

                        <div className='gjhnvb'
                            onMouseOver={omo}
                            style={{ display: 'flex', margin: 0, position: "relative", alignItems: "center" }}>


                            {
                                star ?

                                    <div className='stricon' style={{ padding: "0.5rem" }} onClick={starFunc} >

                                        <FaStar color='orange' style={{ fontSize: "22px", cursor: "pointer", }} />
                                    </div>
                                    :
                                    <div className='stricon' style={{ padding: "0.5rem" }} onClick={starFunc}  >
                                        <FaRegStar style={{ fontSize: "22px", cursor: "pointer", }} />
                                    </div>
                            }




                            <span className='hjkiop' title='average star rating' style={{ opacity: '0.7', fontSize: '14px', marginTop: '0.2rem', userSelect: "none" }}>

                                {totalStars}

                            </span>

                            <div onMouseLeave={oml} className={lehrado ? 'hoverReaction lehrado' : 'hoverReaction '} style={{ position: "absolute", color: "white", left: '50%', transform: 'translate(-50%, -50%)', bottom: "6px", boxShadow: "0px 5px 10px 0px rgba(100, 100, 100, 0.5)" }} >
                                <Stars _rstar={_rstar} clickedStar={clickedStar} postId={feed._id} key={i} doubleclicked={doubleclicked} changeDbclick={changeDbclick} userId={_id}
                                    hasRated={hasRated}
                                    rating={rating}
                                    star={star}
                                    postedBy={feed.postedBy}
                                />

                            </div>



                        </div>



                        <div className='reply' style={{ display: 'flex', margin: 0, position: "relative", alignItems: "center" }}>

                            <div className='replyIcon' style={{ cursor: "pointer", }} onClick={repostFunc}>
                                <BsReply color={hasReposted ? "rgb(255, 0, 102)" : ""} style={{ fontSize: "20px", marginTop: "0.1rem" }} ></BsReply>

                            </div>
                            <span title='repost' style={{ opacity: '0.7', fontSize: '14px', userSelect: "none" }}>
                                {repostCount}
                            </span>





                        </div>


                    </div>





                </div>
            </div>
            {/* {
                    flw_Recommendations.map((recomm, i) => {
                        return (
                            <>
                                {
                                    recomm._id == _id ? "" :
                                        <Recomm recomm={recomm} key={i} />
                                }
                            </>

                        )
                    })
                } */}

            {/* {
                dikha ?
                    <>
                        <dialog open style={{ position: 'absolute', border: 'none', color: 'white', zIndex: 999, left: '0%', backgroundColor: "rgba(0,0,0,.85)", height: '100vh', width: '100vw', position: 'fixed', display: 'flex', overflow: 'hidden', justifyContent: 'center', top: '0vh', alignItems: 'center' }}>
                            <Comments />
                        </dialog>

                    </>

                    : ''
            } */}
        </>










    )
}

export default Test2