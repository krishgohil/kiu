import React, { useEffect, useRef, useState } from 'react';
import Stars from './Stars';
import { BiCategory } from 'react-icons/bi'
import { AiOutlineClose, AiOutlineLink, AiOutlineShareAlt } from 'react-icons/ai';
import { BsFlag, BsReply, BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { FaMedal, FaRegComment, FaRegStar, FaStar } from "react-icons/fa";
import { DateTime } from 'luxon'
import { MdOutlineDelete, MdLink, MdPermMedia, MdBlockFlipped, MdVerified } from 'react-icons/md'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { host } from '../host'
import { RiShoppingCartLine, RiUserUnfollowLine } from 'react-icons/ri';
import { useLongPress } from 'use-long-press';
import parse, { domToReact } from 'html-react-parser';
import {
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    FacebookIcon, RedditIcon, PinterestIcon,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    TelegramIcon,
    TwitterIcon,
    LinkedinIcon,
    LinkedinShareButton,

} from "react-share";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'


import { IoFlashOutline } from 'react-icons/io5';
import { useCallback } from 'react';
import { useAppContext, useGeneralContext } from '../context';
import { Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';


const FeedpostItems = ({ feed, i, g, c, restorationRef }) => {

    const context = useAppContext()
    const { _id, username, profileImg,guest } = context.sharedState
    const genContext = useGeneralContext()
    // const {guest} = genContext.genstate
    const router = useRouter()




    const [doubleclicked, setdoubleclicked] = useState(false);
    const [showanim, setshowanim] = useState(false);
    const [dikha, setdikha] = useState(false)
    const [postOpts, setpostOpts] = useState(false)
    const [rated, setrated] = useState(false)



    let path = window.location.pathname

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


    const [showResults, setshowResults] = useState(false)
    const [userselected, setuserselected] = useState(false)
    const [repostCount, setrepostCount] = useState(0)
    const [hasReposted, sethasReposted] = useState(false)
    const [hasRated, sethasRated] = useState(false)
    const [rating, setrating] = useState(0)

    const [totalStars, settotalStars] = useState(0)
    const [timeOut, settimeOut] = useState(1500)
    const [repost, setrepost] = useState(false)
    const [avgStar, setavgStar] = useState(0)
    const [lehrado, setlehrado] = useState(false)
    const [starred, setstarred] = useState(0)
    const [sendToChatUsers, setsendToChatUsers] = useState()
    const [sendToChat, setsendToChat] = useState(false)
    const [sendPostTo, setsendPostTo] = useState([])

    const [showsearchModal, setshowsearchModal] = useState(false)
    const [search, setsearch] = useState("")
    const [_clamp, set_clamp] = useState(301)

    const [star, setstar] = useState(false)
    const [shareUrl, setshareUrl] = useState(host)
    const [share, setshare] = useState(false)
    const [showShareModal, setshowShareModal] = useState(false)
    const [tempdeleted, settempdeleted] = useState(false)
    const [_rstar, set_rstar] = useState(false)

    const [enabled, setEnabled] = useState(true);



    useEffect(() => {
        let y = sessionStorage.getItem('homeScroll')
        if (y && window.scrollY < y) {
            window.scrollTo({ top: y, left: 0, behavior: "instant" })
        }

        if (feed && feed.avgStarRating) {
            var result = (feed.avgStarRating - Math.floor(feed.avgStarRating)) !== 0;
            if (result) {
                // console.log('HAS DECIMAL ')
                setavgStar(feed.avgStarRating.toFixed(2))
            }
            else {
                setavgStar(feed.avgStarRating)
                // console.log('does not have a decimal')
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
                            // alert("showResult1", feed._id)

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
        var total_reposts = 0

        for (let i = 0; i < feed.ratedBy.length; i++) {
            totalstars = feed.ratedBy[i].starRating + totalstars

            if (feed.ratedBy[i].raterId == _id) {
                hasRated = true
                _rating = feed.ratedBy[i].starRating
            }

            if (feed.ratedBy[i].raterComment.length > 0) {
                comments = comments + 1
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
    }, [feed])






    const dbclick = () => {
        if (guest == false) {
            setstar(true)
            console.log('doubleclick')
            clearTimeout()
            setdoubleclicked(true)
            setshowanim(true)

            setTimeout(() => {
                setshowanim(false)
            }, 1000);
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

    const setrate = () => {
        setrated(true)
    }

    const changeDbclick = () => {
        // console.log('me chala na bhai')
        setdoubleclicked(false)
    }



    const b = (gotocomments) => {
        // console.log(dikha, '+++++++++++++++++++')
        if (dikha === true) {
            router.back(-1)
        }
        else if (dikha === false) {
            console.log(path)
            // g(dikha)
            sessionStorage.setItem('homeScrollId', feed._id)
            sessionStorage.setItem('homeScroll', window.scrollY)
            setdikha(true)
            if (feed.category == 'product') {

                // let h = document.getElementById('md')
                // console.log(window.scrollY)
                // console.log(sc)
                if (gotocomments) {
                    sessionStorage.setItem("goToProductComments", true)
                }
                console.log(path)

                router.push(`/products/${feed._id}`)

            } else {
                // console.log(sc)
                if (gotocomments) {
                    sessionStorage.setItem("goToPostComments", true)
                }
                console.log(path)

                router.push(`post/${feed._id}`)
            }
        }
        // setdikha(value => !value)

    }






    const showPostOpts = () => {
        if (feed.postType == 'product') {
            setshareUrl(`${host}/api/product/${feed._id}`)
        } else {
            setshareUrl(`${host}/api/post/${feed._id}`)
        }
        setpostOpts(value => !value)
    }



    const goToProfile = (uname) => {
        sessionStorage.setItem('homeScrollId', feed._id)
        sessionStorage.setItem('homeScroll', window.scrollY)
        if (uname) {
            router.push(`/${uname}`)
        } else {
            router.push(`/${feed.postedBy.username}`)
        }
    }



    const getstarValue = (value) => {
        setstarred(value)
    }


    useEffect(() => {
        if (window.innerWidth < 601) {
            settimeOut(500)
        }
    }, [router.isReady])

    var oks = false

    var timeout
    const omo = () => {
        console.log(guest)
        if (guest == false) {
            oks = false
            timeout = setTimeout(() => {
                if (oks == false) {
                    setlehrado(true)
                }
            }, timeOut);
        }

    }

    const oml = () => {
        oks = true
        setlehrado(false)
    }

    const manja = () => {
        oks = true
        // console.log('chul')
    }


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
                sessionStorage.setItem('homeScrollId', feed._id)
                sessionStorage.setItem('homeScroll', window.scrollY)

                router.push('compose-post')
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


        // setrepost(true)
        // window.document.body.style.overflowY = 'hidden'
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





    const [bar1Width, setbar1Width] = useState(0)
    const showResultsFunc = (n) => {
        if (guest == false) {
            settotalVotes(totalVotes + 1)
            // alert("showResult", feed._id)
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
        console.log("json", json)
    }

    const closeRepost = () => {
        window.document.body.style.overflowY = 'scroll'
        window.document.body.style.scrollMargin = 0
        setrepost(false)
        setsendToChat(false)

    }

    // sendtochat

    const sendToChatFunc = () => {
        if (guest == false) {
            setsendToChat(true)
            window.document.body.style.overflowY = 'hidden'
            window.document.body.style.scrollMargin = 0
            // if (recentChatsStore && recentChatsStore.length > 0) {
            //     if (recentChatsStore[0].recent && recentChatsStore[0].recent == 'false') {
            //         setsendToChatUsers(recentChatsStore[1])
            //     } else {
            //         setsendToChatUsers(recentChatsStore)
            //         // setchatUsers(arr)
            //     }
            // } else {
            //     dispatch(recentChats())
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
    const recentChats = () => async dispatch => {
        const response = await fetch(`${host}/api/chats/recentChats`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id }),
        });
        const json = await response.json();
        console.log(json)


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

            // setchatUsers(arr)
        }




    }

    const sendFunc = (sendTo, notificationToken, notificationSettings) => {

        let ok = _id.toString()

        // console.log(sendPostTo)
        // socket.emit("send_post", { sendTo: sendTo, postId: feed._id, sender: _id, senderUsername: username, notificationToken: notificationToken, notificationSettings: notificationSettings });
        // console.log('sendPostTo', ok)

        if (sendTo) {
            setsendPostTo([...sendPostTo, sendTo])
        }


    }

    // delete post
    const deletePostFunc = () => {
        if (window.confirm("Do you want to delete this post?") == true) {
            settempdeleted(true)
            dispatch({
                type: SET_DELETED_POSTS,
                payload: {
                    postId: feed._id,
                }
            })
            dispatch(deletePost())
            toast(`Deleted`, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'
            })
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

    //repost
    const newpost = () => async dispatch => {
        const response = await fetch(`${host}/api/post/newpost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: reply, postimg: "", id: _id, repostId: feed._id, isRepost: true }),
        });
        const json = await response.json();
        // console.log(json)
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

    const ref = useRef()

    const handleImgClick = () => {
        // setshowpreview(true)
        ref.current.click()
    }


    // share button 

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
                _url = `${host}/api/product/${feed._id}`
            } else {
                _url = `${host}/api/post/${feed._id}`
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
        if (_id && guest == false) {
            if (window.confirm(`Unfollow ${feed.postedBy.username} ?`) === true) {
                dispatch(unfollow())
            }
        }
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
        // console.log(json)
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



    const clickedStar = (value) => {
        oks = true
        setstar(true)
        setlehrado(false)
        setdoubleclicked(false)
        if (value > rating) {
            console.log(totalStars, 'here', value)

            settotalStars(totalStars + (value - rating))
        } else if (value < rating) {
            console.log(totalStars, 'else', value)
            settotalStars(totalStars - (rating - value))
        }
        setrating(value)
        set_rstar(false)

        if (hasRated == false) {
            sethasRated(true)
        }
        // console.log(rating, 'CLCIK STAR RAN', value)
    }

    const starFunc = () => {
        if (guest == false) {
            oks = true
            if (star) {
                oks = true
                // alert("practivre")
                setstar(false)
                sethasRated(false)
                setrating(0)
                set_rstar(true)
                setlehrado(false)
                setdoubleclicked(false)
                settotalStars(totalStars - rating)
            }
            else {
                console.log('kdfjakdfkafdk')

                setstar(true)
                setrating(5)
                settotalStars(totalStars + 5)

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







    useEffect(() => {
        let timerout = setTimeout(() => {
            // console.log("HERE")
            let x = search.replace(/\s\s+/g, ' ')
            if (x.length > 0) {
                dispatch(searchUsers())
            } else if (x.length == 0 && showsearchModal) {
                // console.log("beee")
                // dispatch(recentChats())
                sendToChatFunc()
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
        console.log("rabba")
        const response = await fetch(`${host}/api/users/searchUsers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, input: search }),
        });
        const json = await response.json();
        console.log("heheheh")
        console.log(json)
        setsendToChatUsers(json)
        // setposts(json)
    }














    const callback = useCallback(event => {
        console.log('Long pressed!');
    }, []);
    const bind = useLongPress(enabled ? callback : null, {
        onStart: event => setlehrado(true)
        ,
        onFinish: event => console.log('Long press finished'),
        onCancel: event => console.log('Press cancelled'),
        onMove: event => console.log('Detected mouse or touch movement'),
        filterEvents: event => true, // All events can potentially trigger long press
        threshold: 500,
        captureEvent: true,
        cancelOnMovement: false,
        detect: 'both',
    });



    const gotoPostFunc = () => {
        sessionStorage.setItem('homeScrollId', feed._id)
        sessionStorage.setItem('homeScroll', window.scrollY)
        // alert(feed[0].repost.postType)
        console.log(feed)
        if (feed.repost.postType == "media" || feed.repost.postType == "kwik" || feed.repost.postType == "post" || feed.repost.postType == "poll") {
            setdikha(true)
            router.push(`/post/${feed.repost._id}`)
        }
        else if (feed.repost.postType == "product") {
            setdikha(true)
            router.push(`/products/${feed.repost._id}`)
        }
    }






    const sendreport = () => async dispatch => {
        console.log("me agar kahu")
        const response = await fetch(`${host}/api/reports/sendreport`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reportedBy: _id, content: feed._id, contentCreator: feed.postedBy._id }),
        });
        const json = await response.json();
        console.log(json)

        toast.info(`Post Reported`, {
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



    const searchHashTag = (searchfeed) => {
        console.log(searchfeed[0].data)
        var result = searchfeed[0].data.slice(1);
        sessionStorage.setItem('homeScrollId', feed._id)
        sessionStorage.setItem('homeScroll', window.scrollY)
        router.push(`search/${result}/posts`)
        // alert(searchfeed)
    }
    const searchUser = (searchfeed) => {
        console.log(searchfeed[0].data)
        var result = searchfeed[0].data.slice(1);
        sessionStorage.setItem('homeScrollId', feed._id)
        sessionStorage.setItem('homeScroll', window.scrollY)
        router.push(`/${result}`)
        // alert(searchfeed)
    }

    // const options = {
    //     replace: domNode => {
    //         if (domNode.name) {
    //             console.log(domNode)

    //         }
    //         // if (domNode.attribs && domNode.name === 'main') {
    //         //     const props = attributesToProps(domNode.attribs);
    //         //     return <div {...props} />;
    //         // }
    //     }
    // };

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
            {
                share ?
                    <ShareBox shareFunc={shareFunc} shareUrl={shareUrl} />
                    : ''
            }
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
                                <input onChange={onchange} placeholder='Search People' maxLength={30} type="text" style={{ outline: "none", border: "none", backgroundColor: 'black', caretColor: "white", color: "white", marginLeft: "1rem", flex: 1, fontWeight: 500 }} />
                            </div>
                            <div style={{ height: "50vh", overflowY: "scroll", scrollMargin: 0 }} >

                                {
                                    sendToChatUsers && sendToChatUsers.length > 0 ?
                                        sendToChatUsers.map((rep, i) => {

                                            return (
                                                <SendItem key={i} rep={rep} sendFunc={sendFunc} _id={_id} >
                                                </SendItem>

                                            )





                                        })
                                        : <Spinner></Spinner>
                                }




                            </div>
                        </div>

                    </dialog>
                    : ''
            }


            {
                feed.isDeleted == false && tempdeleted == false && feed.postedBy != null
                    // && () 
                    ?
                    feed.postType != 'product' ?
                        <div onMouseLeave={oml} className='maindiv' id='md' style={{ color: "white" }} ref={restorationRef}>
                            <div style={{ marginRight: "0.2rem", display: "flex" }} >
                                {
                                    feed.category && feed.category != "" && feed.category !== 'personal' ?
                                        <p style={{ marginBottom: 0, fontSize: '0.7rem', cursor: 'pointer', borderRadius: "1rem", padding: "0.25rem 0.5rem 0.25rem 0.5rem", color: "white", backgroundColor: '#19191a', fontWeight: "4500", margin: '0.5rem 0' }}  >{feed.category}</p>
                                        : ""
                                }
                            </div>


                            {
                                feed.description == "" && feed.postimg.length == 0 && feed.isRepost == true ?
                                    <div className='feedtopinfo' style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>

                                        <div className='underline' onClick={() => goToProfile(feed.postedBy.username)} style={{ color: '#808080', fontSize: "12px", display: "flex", fontWeight: "bold", cursor: "pointer", width: "50%", alignItems: "center" }} >
                                            <img alt="img" src={feed.postedBy.profileImg} style={{ height: '1.5rem', width: '1.5rem', borderRadius: '50%', marginRight: '0.2rem', cursor: 'pointer' }} ></img>
                                            <div style={{ marginTop: "0.1rem" }} >
                                                {feed.postedBy.username} reposted
                                            </div>
                                            <div style={{}} >
                                                <BsReply size={15} className='reply' color='#808080' style={{ marginLeft: "0.1rem" }} ></BsReply>
                                            </div>

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
                                                                            <p style={{ marginBottom: "0rem", cursor: "pointer", fontSize: "0.9rem" }} onClick={dispatch(sendreport)} >Report   </p>
                                                                            <span>
                                                                                <BsFlag size={16} />
                                                                            </span>
                                                                        </>

                                                                        : ''
                                                                }

                                                            </div>
                                                            <div className='class-postOpts' onClick={deletePostFunc}>
                                                                {
                                                                    feed.postedBy._id === _id ?
                                                                        <>
                                                                            <p style={{ marginBottom: "0rem", cursor: "pointer", fontSize: "0.9rem" }} >Delete   </p>
                                                                            <span  >
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
                                    :

                                    <div className='feedtopinfo' style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                                            <img alt="img" onClick={() => goToProfile(feed.postedBy.username)} src={feed.postedBy.profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                                            <p onClick={() => goToProfile(feed.postedBy.username)} style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className='feedUsername' >{feed.postedBy.username}</p>
                                            <MdVerified color='alicetblue'></MdVerified>
                                            {/* <FaMedal color='dodgerblue'></FaMedal> */}


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
                                                                            <p style={{ marginBottom: "0rem", cursor: "pointer", fontSize: "0.9rem" }} onClick={() => dispatch(sendreport())} >Report   </p>
                                                                            <span>
                                                                                <BsFlag size={16} />
                                                                            </span>
                                                                        </>

                                                                        : ''
                                                                }

                                                            </div>
                                                            <div className='class-postOpts' onClick={deletePostFunc}>
                                                                {
                                                                    feed.postedBy._id === _id ?
                                                                        <>
                                                                            <p style={{ marginBottom: "0rem", cursor: "pointer", fontSize: "0.9rem" }} >Delete   </p>
                                                                            <span  >
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
                                            <p onClick={() => b()} style={{ fontSize: '1rem', cursor: 'pointer', borderRadius: "1rem", padding: "0.25rem 0.5rem 0.25rem 0rem", color: "white", fontWeight: "500", marginBottom: '0rem' }}  >{feed.title}</p>
                                            : ""
                                    }
                                    <p onClick={() => b()} className="clamp" style={{ marginBottom: '4px', fontSize: '0.9rem', marginTop: '0.1rem', width: '100%' }}>
                                        <span style={{ whiteSpace: 'pre-wrap', wordBreak: "break-word", }} >
                                            {/* {feed.description.slice(0, _clamp)} */}
                                            {parse(feed.description.slice(0, _clamp), options)}

                                        </span>

                                        {

                                            feed.description.length > 301 && _clamp == 301 ?
                                                <span style={{ marginLeft: "0.25rem", color: "lightblue" }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        set_clamp(3000)
                                                    }}
                                                >
                                                    read more
                                                </span>
                                                : ''
                                        }
                                        {
                                            _clamp == 3000 ?
                                                <span style={{ marginLeft: "0.25rem", color: "lightblue" }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        set_clamp(301)
                                                    }} >
                                                    read less
                                                </span>
                                                : ""
                                        }
                                        <div onClick={() => window.open(`${feed.link}`, '_blank')} style={{ color: "skyblue", border: "none", whiteSpace: 'pre-wrap', wordBreak: "break-word", cursor: "pointer" }}  >
                                            {
                                                feed.link !== "undefined" && feed.link !== "null" && feed.link != null && feed.link != undefined ?
                                                    feed.link
                                                    : ""
                                            }
                                        </div>
                                    </p>
                                </div>


                                {
                                    feed.postType === 'post' ?
                                        <img alt="img" src={feed.postimg} style={{ marginBottom: '4px' }} onDoubleClick={dbclick}
                                            className={doubleclicked && showanim ? 'postImg a' : 'postImg'} /> : ''
                                }
                                {
                                    feed.postType === 'media' ?
                                        <div  >
                                            <Swiper
                                                className='jkliop'
                                                style={{ width: 'auto', height: "auto", }}
                                                // install Swiper modules
                                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                // spaceBetween={50}
                                                slidesPerView={1}
                                                navigation={true}
                                                autoHeight={true}
                                                pagination={{ clickablez: true }}
                                                scrollbar={{ draggable: true }}
                                                mousewheel={true}
                                                forceToAxis={true}
                                            // onSwiper={(swiper) => console.log(swiper)} style={{  }}
                                            // onSlideChange={() => console.log('slide change')}
                                            >
                                                {
                                                    feed.postimg.map((img, i) =>
                                                        <SwiperSlide key={i} className="ghik" style={{ width: '100%', borderRadius: "0.5rem", }} >
                                                            <img alt="img" style={{ width: '100%', borderRadius: "0rem", }} onDoubleClick={dbclick}
                                                                className={doubleclicked && showanim ? 'postImg a' : 'postImg'} src={feed.postimg[i]} />
                                                            <div style={{ position: "absolute", top: "50%", left: "50%", transform: 'translate(-50%, -50%)' }} className={showanim ? "starAnimation" : "starAnimationOff"} >
                                                                <FaStar />
                                                            </div>
                                                        </SwiperSlide>
                                                    )
                                                }
                                            </Swiper>

                                        </div>

                                        : ''
                                }
                                {
                                    feed.postType == 'poll' && showResults == false && hasVoted == false ?
                                        <div style={{ padding: "0.25rem" }} >
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

                                        </div>
                                        : ''
                                }
                                {
                                    // { color: "white", marginLeft: '0.2rem' }
                                    showResults == true && feed.pollOptions && feed.pollOptions.length > 0 ?
                                        <>
                                            <div style={{
                                                padding: "0.5rem", display: "flex", justifyContent: "space-between", width: "100%", paddingRight: "1rem", alignItems: "center"
                                            }} >
                                                <div className='pollbar' style={{ width: (opt1Votes / totalVotes * 100) + '%' }}  >{feed.pollOptions[0].option}</div>
                                                <span style={userselected == 1 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >
                                                    {((opt1Votes / totalVotes) * 100).toFixed(0)}%</span>
                                            </div>

                                            <div style={{ padding: "0.5rem", display: "flex", justifyContent: "space-between", width: "100%", paddingRight: "1rem", alignItems: 'center' }} >
                                                <div className='pollbar' style={{ width: (opt2Votes / totalVotes * 100) + '%' }}  > {feed.pollOptions[1].option}
                                                </div>
                                                <span style={userselected == 2 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >{((opt2Votes / totalVotes) * 100).toFixed(0)}%</span>
                                            </div>

                                            {
                                                actualOpts > 2 ?
                                                    <div style={{
                                                        padding: "0.5rem", display: "flex", justifyContent: "space-between", width: "100%", paddingRight: "1rem", alignItems: "center"
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
                                                    <div style={{ padding: "0.5rem", display: "flex", justifyContent: "space-between", width: "100%", paddingRight: "1rem", alignItems: "center" }
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
                                {
                                    feed.isRepost == true ?
                                        <>
                                            {
                                                feed && feed.repost && feed.repost.isDeleted == false ?
                                                    <div onClick={gotoPostFunc} style={feed.description == "" && feed.isRepost == true ? { color: "white", marginLeft: "5%", border: "1px solid rgb(31,31,31)", borderRadius: '0.5rem', padding: "0.5rem", backgroundColor: '#090909' } : { color: "white", marginLeft: "5%", border: "1px solid rgb(31,31,31)", borderRadius: '0.5rem', padding: "0.5rem", backgroundColor: '#090909' }} ref={restorationRef}>

                                                        <div style={{}} >



                                                            <div className='feedtopinfo' style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                                                                    <img alt="img" src={feed.repost.postedBy.profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                                                                    <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className='feedUsername' >{feed.repost.postedBy.username}</p>
                                                                </div>

                                                                <p style={{ width: '30%', marginBottom: 0, fontSize: '0.7rem', textAlign: 'center', color: "#a3a3a3" }}>
                                                                    {
                                                                        feed.posted_Date !== null ?

                                                                            DateTime.fromISO(feed.repost.posted_Date).toRelative()
                                                                            : ''
                                                                    }
                                                                </p>


                                                            </div>

                                                            {/* <hr style={{ color: 'white', margin: 0 }} /> */}
                                                            <div style={{
                                                                display: 'flex', flexDirection: 'column', color: "white",
                                                                // padding: '0.5rem',
                                                                // paddingTop: "0.5rem",
                                                                justifyContent: 'center'
                                                            }}>
                                                                <div style={{ width: '100%', color: 'white' }}>
                                                                    <p style={{ marginBottom: '4px', fontSize: '0.9rem', marginTop: '0.1rem', width: '100%' }}>
                                                                        {feed.repost.description.slice(0, 300)} {/* {parse(feed.repost.description.slice(0, 300))} */}
                                                                        {
                                                                            feed.repost.description.length > 300 ?
                                                                                <span style={{ color: 'skyblue', marginLeft: "0.25rem" }} >read more</span> : ''
                                                                        }
                                                                    </p>
                                                                </div>

                                                                {
                                                                    feed.repost.postimg && feed.repost.postimg.length > 0 ?
                                                                        <div>
                                                                            <Swiper
                                                                                className='jkliop'
                                                                                style={{ width: 'auto', height: "auto" }}
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


                                                                                    feed.repost.postimg.map((img, i) =>
                                                                                        <div key={i}>
                                                                                            <SwiperSlide style={{ width: '100%', backgroundColor: '', }} >
                                                                                                <img alt="img" style={{ width: '100%', }} onDoubleClick={dbclick}
                                                                                                    className={doubleclicked && showanim ? 'postImg a' : 'postImg'} src={img} />
                                                                                            </SwiperSlide>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            </Swiper>
                                                                        </div>
                                                                        : ""
                                                                }
                                                                {
                                                                    feed.repost.postType == 'poll' && showResults == false && hasVoted == false ?
                                                                        <>
                                                                            <div className='polloptions'   >
                                                                                {feed.repost.pollOptions[0].option}
                                                                            </div>
                                                                            <div className='polloptions'   >
                                                                                {feed.repost.pollOptions[1].option}

                                                                            </div>
                                                                            {feed.repost.pollOptions[2].option != '' ?
                                                                                <div className='polloptions'   >
                                                                                    {feed.repost.pollOptions[2].option}

                                                                                </div>

                                                                                : ''
                                                                            }

                                                                            {feed.repost.pollOptions[3].option != '' ?
                                                                                <div className='polloptions'   >
                                                                                    {feed.repost.pollOptions[3].option}
                                                                                </div>

                                                                                : ''
                                                                            }

                                                                        </>
                                                                        : ''
                                                                }
                                                                {
                                                                    // { color: "white", marginLeft: '0.2rem' }
                                                                    showResults == true && feed.pollOptions && feed.pollOptions.length > 0 ?
                                                                        <>
                                                                            <div style={{
                                                                                display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", width: "100%", paddingRight: "1rem", alignItems: "center"
                                                                            }} >
                                                                                <div className='pollbar' style={{ width: (opt1Votes / totalVotes * 100) + '%' }}  >{feed.pollOptions[0].option}</div>
                                                                                <span style={userselected == 1 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >
                                                                                    {(opt1Votes / totalVotes) * 100}%</span>
                                                                            </div>

                                                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", width: "100%", paddingRight: "1rem", alignItems: 'center' }} >
                                                                                <div className='pollbar' style={{ width: (opt2Votes / totalVotes * 100) + '%' }}  > {feed.pollOptions[1].option}
                                                                                </div>
                                                                                <span style={userselected == 2 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >{(opt2Votes / totalVotes) * 100}%</span>
                                                                            </div>

                                                                            {
                                                                                actualOpts > 2 ?
                                                                                    <div style={{
                                                                                        display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", width: "100%", paddingRight: "1rem", alignItems: "center"
                                                                                    }} >
                                                                                        <div className='pollbar' style={{ width: (opt3Votes / totalVotes * 100) + '%' }} >
                                                                                            {feed.pollOptions[2].option}
                                                                                        </div>
                                                                                        <span style={userselected == 3 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >{(opt3Votes / totalVotes) * 100}%</span>
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
                                                                                        <span style={userselected == 4 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >{(opt4Votes / totalVotes) * 100}%</span>
                                                                                    </div>

                                                                                    : ''
                                                                            }

                                                                            <div style={{ fontSize: '12px', color: "#949494", marginLeft: "0.5rem" }}  >{totalVotes} votes </div>




                                                                        </>
                                                                        : ''
                                                                }

                                                                <hr style={{ color: 'black', margin: 0 }} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    : ''


                                            }
                                            {
                                                feed.ytlink && feed.ytlink.length > 0 ?
                                                    <div onClick={() => window.open(`${feed.ytlink}`, '_blank')} style={{ color: "skyblue", marginLeft: "5%", border: "1px solid rgb(31, 31, 31)", borderRadius: '0.5rem', padding: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word", cursor: "pointer" }}  >
                                                        {feed.ytlink}
                                                    </div>
                                                    : ""
                                            }
                                        </>


                                        :
                                        ""
                                }


                                <hr style={{ color: 'black', margin: 0 }} />




                                {
                                    feed.isRepost && feed.description == "" && feed.postimg.length == 0 ?

                                        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', position: "relative", marginBottom: "0.5rem" }}>



                                            <div className='cmnticon' style={{ marginRight: "0rem" }} onClick={() => b("gotocomments")} title='comments'>
                                                <FaRegComment key={i} style={{ fontSize: "17px", margin: '0.5rem', marginTop: '0.6rem', }} />
                                                <span style={{ opacity: '0.7', fontSize: '14px', marginTop: '0.25rem', }}>{
                                                    totalComments
                                                }</span>

                                            </div>


                                            <div title='send to chat' className='sendToChat' onClick={sendToChatFunc} >
                                                <IoFlashOutline style={{ fontSize: "21px", }} ></IoFlashOutline>
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
                                        :
                                        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', position: "relative", marginBottom: "0.5rem" }}>



                                            <div className='cmnticon' style={{ marginRight: "0rem" }} onClick={() => b("gotocomments")} title='comments'>
                                                <FaRegComment key={i} style={{ fontSize: "17px", margin: '0.5rem', marginTop: '0.6rem', }} />
                                                <span style={{ opacity: '0.7', fontSize: '14px', marginTop: '0.25rem', }}>{
                                                    totalComments
                                                }</span>

                                            </div>


                                            <div title='send to chat' className='sendToChat' onClick={sendToChatFunc} >
                                                <IoFlashOutline style={{ fontSize: "21px", }} ></IoFlashOutline>
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
                                }



                            </div>
                        </div>
                        :
                        <div onMouseLeave={oml} style={{ backgroundColor: "#16181b", marginBottom: "0.75rem", width: "100%" }} >
                            <div onClick={() => goToProfile(feed.postedBy.username)} style={{ color: '#808080', fontSize: "12px", display: "flex", fontWeight: "bold", marginLeft: "0.5rem", marginTop: "0.5rem", alignItems: "center" }} >

                                <div style={{ marginTop: "0.2rem" }} >
                                    added a product
                                </div>
                                <div style={{ marginTop: "0.2rem" }} >
                                    <RiShoppingCartLine size={14} className='reply' color='#808080' style={{ marginLeft: "0.3rem" }} ></RiShoppingCartLine>
                                </div>

                            </div>
                            <div className='feedtopinfo' style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', backgroundColor: "#16181b", marginLeft: "0.5rem", marginTop: "0.5rem", marginBottom: "0" }}>
                                <div style={{ display: 'flex', alignItems: 'center', width: '60%', }}>
                                    <img alt="img" src={feed.postedBy.profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                                    <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className='feedUsername' >{feed.postedBy.username}</p>
                                </div>

                                <p style={{ width: '30%', marginBottom: 0, fontSize: '0.7rem', textAlign: 'center' }}>
                                    {
                                        feed.posted_Date !== null ?

                                            DateTime.fromISO(feed.posted_Date).toRelative()
                                            : ''
                                    }
                                </p>


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
                                                                    <p style={{ marginBottom: "0rem", cursor: "pointer", fontSize: "0.9rem" }} onClick={dispatch(sendreport)} >Report   </p>
                                                                    <span>
                                                                        <BsFlag size={16} />
                                                                    </span>
                                                                </>

                                                                : ''
                                                        }

                                                    </div>
                                                    <div className='class-postOpts' onClick={deletePostFunc}>
                                                        {
                                                            feed.postedBy._id === _id ?
                                                                <>
                                                                    <p style={{ marginBottom: "0rem", cursor: "pointer", fontSize: "0.9rem" }} >Delete   </p>
                                                                    <span  >
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

                            <div className='feedprdct' style={{ border: 'none', borderTop: "1px solid #474646", borderRadius: "0", }}  >
                                <div style={{ display: "flex", alignItems: "center" }}  >

                                    <img alt="img" onClick={() => b()} className='prdctImg' src={feed.postimg[0]} style={{ marginRight: "1rem" }}  ></img>
                                </div>

                                <div onClick={() => b()} style={{ display: "flex", flexDirection: "column", marginRight: "1rem", justifyContent: 'center', width: '100%' }}  >
                                    <div className='prdctTitle'  >{feed.title}</div>
                                    <div className='prdctDescription'>{feed.tagLine}</div>

                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "0.5rem" }} >
                                        <div className='prdctprice'  >
                                            ₹{feed.price}
                                        </div>
                                        <div>
                                            <BiCategory color='gray' />
                                            <span style={{ color: "gray", fontSize: "12px", margin: '0.1rem' }} >
                                                {feed.productCategory}
                                            </span>
                                        </div>

                                    </div>

                                </div>



                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', position: "relative" }}>



                                <div className='cmnticon' style={{ marginRight: "0rem" }} onClick={() => b("gotocomments")} title='comments'>
                                    <FaRegComment key={i} style={{ fontSize: "17px", margin: '0.5rem', marginTop: '0.6rem', }} />
                                    <span style={{ opacity: '0.7', fontSize: '14px', marginTop: '0.25rem', }}>{
                                        totalComments
                                    }</span>

                                </div>


                                <div title='send to chat' className='sendToChat' onClick={sendToChatFunc} >
                                    <IoFlashOutline style={{ fontSize: "21px", }} ></IoFlashOutline>
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
                                            star={star} postedBy={feed.postedBy}
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

                    :
                    ''
            }


            {
                i == 4 && flw_Recommendations && flw_Recommendations.length > 0 ?
                    <div className='recommMob' >


                        <div style={{ fontWeight: "600", margin: "0.5rem 0 0 0.5rem", fontSize: "14px", color: "silver" }} >Suggested</div>
                        <div style={{ width: "100%", display: "flex", padding: "0.5rem", backgroundColor: "black", overflowX: "scroll", scrollMargin: 0 }} >
                            {
                                flw_Recommendations && flw_Recommendations.length > 0 ?
                                    flw_Recommendations.map((flw, i) => {
                                        return (
                                            <>
                                                <RecommendationItemMob key={i} flw={flw} guest={guest} _id={_id} goToProfile={goToProfile} />
                                            </>
                                        )
                                    })
                                    : ""
                            }





                        </div>
                    </div>
                    : ""
            }






            {
                dikha ?
                    <>
                        <dialog open style={{ position: 'absolute', border: 'none', color: 'white', zIndex: 999, left: '0%', backgroundColor: "rgba(0,0,0,.85)", height: '100vh', width: '100vw', position: 'fixed', display: 'flex', overflow: 'hidden', justifyContent: 'center', top: '0vh', alignItems: 'center' }}>

                            {/* <Comments /> */}
                            {/* <div   */}
                            {/* // style={{ backgroundColor: 'lightgreen', color: 'white', width: '40vw', paddingTop: '1rem', borderRadius: '1rem' }}
                            > */}

                            {/* </div> */}
                        </dialog>

                    </>

                    : ''
            }
        </>

    );
};




export default FeedpostItems;







export const SendItem = ({ rep, sendFunc, _id }) => {
    const [sent, setsent] = useState(false)

    useEffect(() => {
        // console.log(_id)
        // console.log(rep)
    }, [rep])
    return (
        <div>
            {
                rep.latestMessage ?
                    rep.users.map((_user, j) => {
                        return (
                            <>
                                {
                                    _user.user == null || _user.user._id == _id ? "" :
                                        < div key={j} className='feedtopinfo' style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', marginTop: "0rem", justifyContent: "space-between", marginLeft: "0.5rem" }}>
                                            <div style={{ display: 'flex', alignItems: 'center', flex: 0.7 }}>
                                                <img alt="img" src={_user.user.profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                                                <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className='feedUsername' >{_user.user.username}</p>
                                            </div>

                                            <div style={{ display: "flex", justifyContent: "center", flex: 0.3 }} >
                                                <button onClick={() => {
                                                    setsent(true)
                                                    sendFunc(_user.user._id, _user.user.notificationToken, _user.user.notificationSettings)
                                                }} className='flwbtn' style={sent ? { backgroundColor: "gray" } : { backgroundColor: "" }}  >
                                                    {sent == true ? 'Sent' : 'Send'}
                                                </button>
                                            </div>


                                        </div>
                                }
                            </>
                        )

                    }) :
                    <>
                        {
                            rep && rep._id != _id ?
                                < div className='feedtopinfo' style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', marginTop: "0rem", justifyContent: "space-between", marginLeft: "0.5rem", justifyContent: "space-between" }} >
                                    <div style={{ display: 'flex', alignItems: 'center', flex: 0.7 }}>
                                        <img alt="img" src={rep.profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                                        <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className='feedUsername' >{rep.username}</p>
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "center", flex: 0.3 }} >
                                        <button onClick={() => {
                                            setsent(true)
                                            sendFunc(rep._id, rep.notificationToken)
                                        }} className='flwbtn' style={sent ? { backgroundColor: "gray" } : { backgroundColor: "" }}  >
                                            {sent == true ? 'Sent' : 'Send'}
                                        </button>
                                    </div>


                                </div>
                                : ""
                        }

                    </>


            }
        </div>
    )
}


export const ShareBox = ({ shareFunc, shareUrl }) => {
    return (
        <>
            <dialog className='shareDialog' onMouseLeave={shareFunc} open style={{
                border: 'none', color: 'white', zIndex: 999, bottom: '0%', left: '0%',
                backgroundColor: "#1b3b4a", opacity: "0.98",
                height: '50vh', display: 'flex', overflow: 'hidden', justifyContent: 'center', margin: "auto"
            }} >

                <div style={{ width: "100%", backgroundColor: "black", borderRadius: "1rem", padding: "0.5rem 0.5rem 1.5rem 0.5rem", background: "hidden", opacity: "1", border: "1px solid #024b6e", maxHeight: "80vh", overflowY: "scroll" }} >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem', position: "sticky", top: 0, }}>
                        <AiOutlineClose color='white' size={28} className='delImg' onClick={shareFunc} />
                    </div>

                    <div style={{ fontSize: "15px", marginLeft: "5%", borderBottom: "1px solid gray", marginBottom: "1rem" }}>
                        Copy Link  <AiOutlineLink />
                    </div>

                    <div style={{ display: "flex", width: "100%", marginBottom: "1rem" }} >
                        <div style={{ flex: '0.25', textAlign: "center" }} >
                            <div className='shareIcon' >
                                <WhatsappShareButton
                                    url={shareUrl}
                                    quote={'Sharing from keepitupp'}
                                    hashtag={'#portfolio...'}
                                >
                                    <WhatsappIcon size={40} round={true} />
                                </WhatsappShareButton>
                            </div>
                        </div>

                        <div style={{ flex: '0.25', textAlign: "center" }}>
                            <div className='shareIcon' >
                                <FacebookShareButton
                                    url={shareUrl}
                                    quote={'Sharing from keepitupp'}
                                    hashtag={'#keepitupp'}
                                >
                                    <FacebookIcon size={40} round={true} />
                                </FacebookShareButton>
                            </div>
                        </div>
                        <div style={{ flex: '0.25', textAlign: "center" }} >
                            <div className='shareIcon' >
                                <TwitterShareButton
                                    url={shareUrl}
                                    quote={'Sharing from keepitupp'}
                                    hashtag={'#portfolio...'}
                                >
                                    <TwitterIcon size={40} round={true} />
                                </TwitterShareButton>
                            </div>
                        </div>

                        <div style={{ flex: '0.25', textAlign: "center" }}>
                            <div className='shareIcon' >
                                <RedditShareButton
                                    url={shareUrl}
                                    quote={'Sharing from keepitupp'}
                                    hashtag={'#keepitupp'}
                                >
                                    <RedditIcon size={40} round={true} />
                                </RedditShareButton>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", width: "100%", marginBottom: "1rem" }} >
                        <div style={{ flex: '0.25', textAlign: "center" }}>
                            <div className='shareIcon' >
                                <TelegramShareButton
                                    url={shareUrl}
                                    quote={'Sharing from keepitupp'}
                                    hashtag={'#keepitupp'}
                                >
                                    <TelegramIcon size={40} round={true} />
                                </TelegramShareButton>
                            </div>
                        </div>
                        <div style={{ flex: '0.25', textAlign: "center" }}>
                            <div className='shareIcon' >
                                <PinterestShareButton
                                    url={shareUrl}
                                    quote={'Sharing from keepitupp'}
                                    hashtag={'#keepitupp'}
                                >
                                    <PinterestIcon size={40} round={true} />
                                </PinterestShareButton>
                            </div>
                        </div>
                        <div style={{ flex: '0.25', textAlign: "center" }}>
                            <div className='shareIcon' >
                                <LinkedinShareButton
                                    url={shareUrl}
                                    quote={'Sharing from keepitupp'}
                                    hashtag={'#keepitupp'}
                                >
                                    <LinkedinIcon size={40} round={true} />
                                </LinkedinShareButton>
                            </div>
                        </div>
                    </div>





                </div>


            </dialog>
        </>
    )
}


const RecommendationItemMob = ({ flw, guest, _id, goToProfile }) => {
    const [requested, setrequested] = useState(false)
    const dispatch = useDispatch()
    const { flw_Recommendations } = useSelector(state => state.generalReducer)


    const followFunc = (id) => {
        if (guest == false) {
            setrequested(true)
            dispatch(follow(id))
        }
        else if (guest == true || guest == null) {
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


    const follow = (id) => async dispatch => {
        const response = await fetch(`${host}/api/users/follow-rqst`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requestedId: id, userId: _id }),
        });

        const json = await response.json();
        console.log(json)

        if (flw_Recommendations && flw_Recommendations.length > 0) {
            let arr = []
            for (let f = 0; f < flw_Recommendations.length; f++) {
                if (flw_Recommendations[f]._id != id) {
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


    return (
        <>
            <div style={{ border: "1px solid rgb(41, 41, 41)", display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem", margin: "0 0.25rem", borderRadius: "0.4rem" }} >
                <img alt="img" src={flw.profileImg} style={{ height: '6rem', width: '6rem', borderRadius: '50%', cursor: 'pointer', marginBottom: "0.5rem" }} onClick={() => goToProfile(flw.username)} ></img>
                <div style={{ fontWeight: "600", fontSize: "14px", marginBottom: "0.5rem" }} >
                    {flw.username}
                </div>
                {/* <div style={{ fontSize: "14px", marginBottom: "0.5rem" }} >
                                                        {flw.name}
                                                    </div> */}

                {/* <button onClick={followRecommFunc} style={{ backgroundColor: "dodgerblue", padding: "0.25rem 0.75rem", border: "none", color: "white", fontWeight: "bold", fontSize: "14px", borderRadius: "0.4rem" }} >Follow</button> */}

                {
                    requested ?

                        <button className='rqstedbtn' onClick={() => followFunc(flw._id)}>Requested</button>
                        : ''
                }
                {
                    !requested ?

                        <button className='flwbtn' onClick={() => followFunc(flw._id)}>Follow</button>
                        : ''
                }

            </div></>
    )
}