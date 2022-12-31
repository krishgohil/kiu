import React, { useEffect, useState } from 'react';
import Stars from './Stars';
import { BiUpvote, BiDownvote, BiCategory } from 'react-icons/bi'
import { AiOutlineClose, AiOutlineLink, AiOutlineShareAlt } from 'react-icons/ai';
import { BsFlag, BsReply, BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegComment, FaRegStar, FaStar } from "react-icons/fa";
import { DateTime } from 'luxon'
import { MdOutlineDelete, MdLink, MdPermMedia } from 'react-icons/md'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiSendPlaneLine, RiShoppingCartLine, RiUserUnfollowLine } from 'react-icons/ri';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { IoFlashOutline } from 'react-icons/io5';
// const host /api= 'https://keepitupp.herokuapp.com/api'
import { host } from '../host'
import parse, { domToReact } from 'html-react-parser';
import { useRouter } from 'next/router';
import { useAppContext, useGeneralContext } from '../context';


// const host /api= 'https://keepitupp.herokuapp.com/api'
// const ENDPOINT = 'https://keepitupp.herokuapp.com'
// const socket = io.connect(host);

const AllOpts = ({ feed, restorationRef, g, c, i, showall, showposts, showkwiks, showprdcts }) => {
    const [doubleclicked, setdoubleclicked] = useState(false);
    const [showamim, setshowamim] = useState(true);
    const [ratedByUser, setratedByUser] = useState(false);
    const [dikha, setdikha] = useState(false)
    const [postOpts, setpostOpts] = useState(false)
    const [rated, setrated] = useState(false)


    const router = useRouter()
    const context = useAppContext()
    const genContext = useGeneralContext()

    const { username, _id, profileImg,guest } = context.sharedState
    // const { guest } = genContext.genstate
    // const { pollOptedPosts, starred_posts, recentChatsStore } = useSelector(state => state.generalReducer)


    const [actualOpts, setactualOpts] = useState(2)
    const [tempdeleted, settempdeleted] = useState(false)
    const [totalVotes, settotalVotes] = useState(0)
    const [opt1Votes, setOpt1Votes] = useState(0)
    const [opt2Votes, setOpt2Votes] = useState(0)
    const [opt3Votes, setOpt3Votes] = useState(0)
    const [opt4Votes, setOpt4Votes] = useState(0)
    const [optionSelectedId, setoptionSelectedId] = useState('')
    const [totalComments, settotalComments] = useState(0)
    const [hasVoted, sethasVoted] = useState(false)
    const [showanim, setshowanim] = useState(false);


    const [repostCount, setrepostCount] = useState(0)
    const [hasReposted, sethasReposted] = useState(false)
    const [totalStars, settotalStars] = useState(0)



    useEffect(() => {
        console.log(feed)
        if (restorationRef) {

            // console.log('malhari', restorationRef)
            restorationRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
        } else {
            // console.log('alauddin')
        }
        // console.log(path)
        let z = sessionStorage.getItem('homeScrollId')

        if (feed.content && feed.content.avgStarRating) {
            var result = (feed.content.avgStarRating - Math.floor(feed.content.avgStarRating)) !== 0;
            if (result) {
                // console.log('HAS DECIMAL ')
                setavgStar(feed.content.avgStarRating.toFixed(2))
            }
            else {
                // setavgStar(feed.content.avgStarRating)
                // console.log('does not have a decimal')
            }
        }





        let y = sessionStorage.getItem('profileScroll')
        // alert("scroll")
        window.scrollTo({ top: y, left: 0, behavior: "instant" });

        if (feed.content.postType == 'poll') {

            var actual = 0

            for (let i = 0; i < feed.content.pollOptions.length; i++) {
                if (feed.content.pollOptions[i].option.length > 0) {
                    var has_voted = false
                    for (let j = 0; j < feed.content.pollOptions[i].voters.length; j++) {

                        if (_id == feed.content.pollOptions[i].voters[j].voterId) {
                            sethasVoted(true)
                            let a = i + 1
                            setuserselected(a)
                            setshowResults(true)
                        }

                    }
                    actual = actual + 1
                    if (i == 0) {
                        // console.log(feed.content.pollOptions[i].voters.length)
                        setOpt1Votes(feed.content.pollOptions[i].voters.length)
                    }
                    else if (i == 1) {
                        // console.log(feed.content.pollOptions[i].voters.length)
                        setOpt2Votes(feed.content.pollOptions[i].voters.length)
                    }
                    else if (i == 2) {
                        // console.log(feed.content.pollOptions[i].voters.length)
                        setOpt3Votes(feed.content.pollOptions[i].voters.length)
                    }
                    else if (i == 3) {
                        // console.log(feed.content.pollOptions[i].voters.length)
                        setOpt4Votes(feed.content.pollOptions[i].voters.length)
                    }
                }

            }
            setactualOpts(actual)
            settotalVotes(feed.content.pollVotes)
        }


        var comments = 0
        var hasRated = false
        var _rating = 0
        var totalstars = 0

        for (let i = 0; i < feed.content.ratedBy.length; i++) {
            totalstars = feed.content.ratedBy[i].starRating + totalstars

            if (feed.content.ratedBy[i].raterId == _id) {
                // console.log(feed.content.ratedBy[i].starRating)
                hasRated = true
                _rating = feed.content.ratedBy[i].starRating
            }

            if (feed.content.ratedBy[i].raterComment.length > 0) {
                comments = comments + 1
            }

        }



        settotalStars(totalstars)
        sethasRated(hasRated)
        if (hasRated == true) {
            setrating(_rating)
            setstar(true)
        }
        if (feed.content.reposts) {
            setrepostCount(feed.content.reposts)
        }
        settotalComments(comments)


        if (feed.content.reposters) {

            for (let j = 0; j < feed.content.reposters.length; j++) {
                if (feed.content.reposters[j].reposterId == _id) {
                    sethasReposted(true)
                }
            }
        }


    }, [feed])

    // useEffect(() => {
    //     if (starred_posts && starred_posts.length > 0) {
    //         // console.log("sa")
    //         for (let s = 0; s < starred_posts.length; s++) {
    //             // console.log("re")

    //             if (starred_posts[s].postId == feed.content._id && rating != starred_posts[s].stars) {
    //                 // console.log("ga")
    //                 // sethasRated(true)
    //                 // setstar(true)
    //                 if (starred_posts[s].stars > 0) {
    //                     sethasRated(true)
    //                     setstar(true)
    //                 } else {
    //                     sethasRated(false)
    //                     setstar(false)
    //                 }
    //                 if (starred_posts[s].stars > rating) {
    //                     // console.log(totalStars, 'here', starred_posts[s].stars)
    //                     setrating(starred_posts[s].stars)

    //                     settotalStars(totalStars + (starred_posts[s].stars - rating))
    //                 } else if (starred_posts[s].stars < rating) {
    //                     // console.log(totalStars, 'else', starred_posts[s].stars)
    //                     setrating(starred_posts[s].stars)

    //                     settotalStars(totalStars - (rating - starred_posts[s].stars))
    //                 }
    //             }
    //         }
    //     }



    // }, [starred_posts, repostCount])

    // useEffect(() => {


    //     if (hasVoted == false) {
    //         for (let i = 0; i < pollOptedPosts.length; i++) {
    //             if (feed.content._id === pollOptedPosts[i].postId) {
    //                 settotalVotes(pollOptedPosts[i].totalVotes)
    //                 setuserselected(pollOptedPosts[i].userselected)
    //                 setoptionSelectedId(pollOptedPosts[i].optionSelectedId)
    //                 sethasVoted(true)
    //                 setshowResults(true)
    //                 setOpt1Votes(pollOptedPosts[i]._one)
    //                 setOpt2Votes(pollOptedPosts[i]._two)
    //                 setOpt3Votes(pollOptedPosts[i]._three)
    //                 setOpt4Votes(pollOptedPosts[i]._four)

    //             }
    //         }
    //     }
    // }, [pollOptedPosts])


    const [hasRated, sethasRated] = useState(false)
    const [rating, setrating] = useState(0)








    const dbclick = () => {
        if (guest == false) {
            console.log('doubleclick')
            clearTimeout()
            setdoubleclicked(true)
            setshowamim(true)

            setTimeout(() => {
                setshowamim(false)
            }, 3000);
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

    // window.onscroll = () => {
    //     console.log(window.scrollY)
    // }


    const b = () => {
        if (guest == false) {
            console.log(dikha, '+++++++++++++++++++')
            if (dikha === true) {
                // navigate(-1)
            }
            else if (dikha === false) {
                // g(dikha)
                setdikha(true)
                sessionStorage.setItem('profileScroll', window.scrollY)

                if (showall) { sessionStorage.setItem('showall', true) }
                else if (showkwiks) { sessionStorage.setItem('showkwiks', true) }
                else if (showposts) { sessionStorage.setItem('showposts', true) }
                else if (showprdcts) { sessionStorage.setItem('showprdcts', true) }

                if (feed.content.postType == "kwik" || feed.content.postType == "media") {
                    console.log("suhana")
                    router.push(`/post/${feed.content._id}`)
                } else if (feed.content.postType == "product") {
                    console.log("shaheen")
                    router.push(`/products/${feed.content._id}`)
                }
            }
            // setdikha(value => !value)
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

    const gotoPostFunc = () => {
        // sessionStorage.setItem('homeScrollId', feed._id)
        sessionStorage.setItem('profileScroll', window.scrollY)
        // alert(feed[0].repost.postType)
        // console.log(feed)
        if (feed.content.repost.postType == "media" || feed.content.repost.postType == "kwik" || feed.content.repost.postType == "post" || feed.content.repost.postType == "poll") {
            setdikha(true)
            router.push(`/post/${feed.content.repost._id}`)
        }
        else if (feed.content.repost.postType == "product") {
            setdikha(true)
            router.push(`/products/${feed.content.repost._id}`)
        }
    }







    const showPostOpts = () => {
        if (feed.content.postType == 'product') {
            setshareUrl(`https://keepitupp.herokuapp.com/product/${feed.content._id}`)
        } else {
            setshareUrl(`https://keepitupp.herokuapp.com/post/${feed.content._id}`)
        }
        setpostOpts(value => !value)
    }



    const goToProfile = () => {
        sessionStorage.setItem('homeScrollId', feed.content._id)
        console.log(feed.content._id)
        if (_id !== feed.content.postedBy._id){
            router.push(`/${feed.content.postedBy.username}`)
        }else{
            window.scrollTo(0, 0)
        }
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

    const manja = () => {
        oks = true
        console.log('chul')
    }

    const repostFunc = () => {
        if (guest == false) {
            dispatch({
                type: SET_REPOST,
                payload: {
                    status: true,
                    description: feed.content.description,
                    postimg: feed.content.postimg,
                    pUsername: feed.content.postedBy.username,
                    pProfileImg: feed.content.postedBy.profileImg,
                    pDate: feed.content.posted_Date,
                    p_id: feed.content._id,
                    pPosterId: feed.content.postedBy._id
                }
            })
            sessionStorage.setItem('profileScrollId', feed.content._id)
            sessionStorage.setItem('profileScroll', window.scrollY)

            navigate('compose-post')
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

        // if (_id == feed.content.postedBy._id) {
        // } else { navigate('/compose-post') }
    }


    const [showResults, setshowResults] = useState(false)
    const [userselected, setuserselected] = useState(false)

    const [bar1Width, setbar1Width] = useState(0)
    const showResultsFunc = (n) => {
        if (guest == false) {
            settotalVotes(totalVotes + 1)
            setshowResults(true)
            setuserselected(n)
            var _one = opt1Votes
            var _two = opt2Votes
            var _three = opt3Votes
            var _four = opt4Votes
            console.log(opt1Votes, '1')
            console.log(opt2Votes, '2')
            console.log(opt3Votes, '3')
            console.log(opt4Votes, '4')
            var optSelId = feed.content.pollOptions[n - 1]._id
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
                    postId: feed.content._id,
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
            body: JSON.stringify({ userselected, _id, postId: feed.content._id, optionId: optSelId }),
        });
        const json = await response.json();
        console.log("json")
        console.log(json)

        // dispatch(getstressmsgs())
    }




    // delete post
    const deletePostFunc = () => {
        if (window.confirm("Do you want to delete this post?") == true) {
            settempdeleted(true)
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
            body: JSON.stringify({ _id, postId: feed.content._id, }),
        });
        const json = await response.json();

    }






    // share button 
    const [shareUrl, setshareUrl] = useState('https://keepitupp.herokuapp.com/')
    const [share, setshare] = useState(false)

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
            body: JSON.stringify({ id: _id, toUnfollow: feed.content.postedBy._id }),
        });
        const json = await response.json();
        console.log(json)
        if (json === 'success') {

            toast.info(`Unfollowed ${feed.content.postedBy.username}`, {
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
        console.log('CLCIK STAR RAN')
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




















    // sendtochat
    const [sendToChatUsers, setsendToChatUsers] = useState()
    const [sendToChat, setsendToChat] = useState(false)

    const sendToChatFunc = () => {
        if (guest == false) {
            setsendToChat(true)
            window.document.body.style.overflowY = 'hidden'
            window.document.body.style.scrollMargin = 0
            if (recentChatsStore && recentChatsStore.length > 0) {
                if (recentChatsStore[0].recent && recentChatsStore[0].recent == 'false') {
                    setsendToChatUsers(recentChatsStore[1])
                } else {
                    setsendToChatUsers(recentChatsStore)
                    // setchatUsers(arr)
                }
            } else {
                dispatch(recentChats())
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
            console.log('2')
            // setflwng(json[1])
            setsendToChatUsers(json[1])

        } else {
            for (let i = 0; i < json.length; i++) {
                console.log(json[i].latestMessage.date)
            }

            let sortit = json.sort(function (a, b) {
                return (a.latestMessage.date < b.latestMessage.date) ? -1 : ((a.latestMessage.date > b.latestMessage.date) ? 1 : 0);
            });


            console.log(sortit)
            let arr = sortit.reverse()
            setsendToChatUsers(arr)

            // setchatUsers(arr)
        }




    }

    const [sendPostTo, setsendPostTo] = useState([])
    const sendFunc = (sendTo, notificationToken, notificationSettings) => {

        if (guest == false) {

            let ok = _id.toString()

            // console.log(sendPostTo)
            socket.emit("send_post", { sendTo: sendTo, postId: feed.content._id, sender: _id, senderUsername: username, notificationToken: notificationToken, notificationSettings: notificationSettings });
            // console.log('sendPostTo', ok)

            if (sendTo) {
                setsendPostTo([...sendPostTo, sendTo])
            }
        }



    }



    // share 
    const shareVia = () => {
        setsendToChat(false)
        window.document.body.style.overflowY = 'scroll'
        window.document.body.style.scrollMargin = 0
        if (share == true) {
            window.document.body.style.overflowY = 'scroll'
            window.document.body.style.scrollMargin = 0
            setshare(false)
        } else {

            var _url
            _url = `https://keepitupp.herokuapp.com/post/${feed.content._id}`
            if (navigator.share) {
                navigator.share({
                    title: "Keepitupp",
                    text: "Sharing a post",
                    url: _url
                })
            }
            else {
                window.document.body.style.overflowY = 'hidden'
                window.document.body.style.scrollMargin = 0
                setshareUrl(`https://keepitupp.herokuapp.com/post/${feed.content._id}`)
                setshare(true)
            }
        }
    }


    const [showsearchModal, setshowsearchModal] = useState(false)
    const [search, setsearch] = useState("")

    useEffect(() => {
        let timerout = setTimeout(() => {
            console.log("HERE")
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


    const searchHashTag = (searchfeed) => {
        console.log(searchfeed[0].data)
        var result = searchfeed[0].data.slice(1);
        navigate(`/search/${result}/posts`)
        // alert(searchfeed)
    }
    const searchUser = (searchfeed) => {
        console.log(searchfeed[0].data)
        let resultUser = searchfeed[0].data.slice(1);
        navigate(`/${resultUser}`)
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



            {
                feed.content.isDeleted == false && tempdeleted == false && feed.content.postedBy != null
                    // && () 
                    ?
                    feed.content.postType != 'product' ?
                        <div onMouseLeave={oml} className='maindiv' id='md' style={{ color: "white" }} ref={restorationRef}>
                            <div style={{ marginRight: "0.2rem", display: "flex" }} >
                                {
                                    feed.content.category && feed.content.category != "" && feed.content.category !== 'personal' ?
                                        <p style={{ marginBottom: 0, fontSize: '0.7rem', cursor: 'pointer', borderRadius: "1rem", padding: "0.25rem 0.5rem 0.25rem 0.5rem", color: "white", backgroundColor: '#19191a', fontWeight: "4500", margin: '0.5rem 0' }}  >{feed.content.category}</p>
                                        : ""
                                }
                            </div>


                            {
                                feed.content.description == "" && feed.content.postimg.length == 0 && feed.content.isRepost == true ?
                                    <div className='feedtopinfo' style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }} >
                                        <div onClick={goToProfile} style={{ color: '#808080', fontSize: "12px", display: "flex", fontWeight: "bold", width: "50%" }} >
                                            <img alt="img" src={feed.content.postedBy.profileImg} style={{ height: '1.5rem', width: '1.5rem', borderRadius: '50%', marginRight: '0.2rem', cursor: 'pointer' }} ></img>
                                            <div style={{}} >
                                                {feed.content.postedBy.username} reposted
                                            </div>
                                            <div style={{}} >
                                                <BsReply size={15} className='reply' color='#808080' style={{ marginLeft: "0.1rem" }} ></BsReply>
                                            </div>

                                        </div>
                                        <div style={{ display: "flex", width: '40%', alignItems: "center" }} >


                                            <p style={{ marginBottom: 0, fontSize: '0.7rem', textAlign: 'center', color: "#a3a3a3" }}>

                                                {
                                                    feed.content.posted_Date !== null ?

                                                        DateTime.fromISO(feed.content.posted_Date).toRelative()
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

                                                            <div className='class-postOpts' onClick={shareVia}  >
                                                                <p style={{ marginBottom: "0rem", cursor: "pointer", fontSize: "0.9rem" }} >Share   </p>
                                                                <span>
                                                                    <AiOutlineShareAlt size={16} />
                                                                </span>
                                                            </div>
                                                            <div className='class-postOpts'  >
                                                                {
                                                                    feed.content.postedBy._id !== _id ?
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
                                                                    feed.content.postedBy._id === _id ?
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
                                                                    feed.content.postedBy._id !== _id && guest == false ?
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
                                            <img alt="img" onClick={goToProfile} src={feed.content.postedBy.profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                                            <p onClick={goToProfile} style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className='feedUsername' >{feed.content.postedBy.username}</p>


                                        </div>

                                        <div style={{ display: "flex", width: '40%', alignItems: "center" }} >


                                            <p style={{ marginBottom: 0, fontSize: '0.7rem', textAlign: 'center', color: "#a3a3a3" }}>

                                                {
                                                    feed.content.posted_Date !== null ?

                                                        DateTime.fromISO(feed.content.posted_Date).toRelative()
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

                                                            <div className='class-postOpts' onClick={shareVia}  >
                                                                <p style={{ marginBottom: "0rem", cursor: "pointer", fontSize: "0.9rem" }} >Share   </p>
                                                                <span>
                                                                    <AiOutlineShareAlt size={16} />
                                                                </span>
                                                            </div>
                                                            <div className='class-postOpts'  >
                                                                {
                                                                    feed.content.postedBy._id !== _id ?
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
                                                                    feed.content.postedBy._id === _id ?
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
                                                                    feed.content.postedBy._id !== _id && guest == false ?
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
                                        feed.content.category && feed.content.category != "" && feed.content.category !== 'personal' ?
                                            <p style={{ fontSize: '1rem', cursor: 'pointer', borderRadius: "1rem", padding: "0.25rem 0.5rem 0.25rem 0rem", color: "white", fontWeight: "500", marginBottom: '0rem' }}  >{feed.content.title}</p>
                                            : ""
                                    }
                                    <p className="clamp" style={{ marginBottom: '4px', fontSize: '0.9rem', marginTop: '0.1rem', width: '100%' }}>
                                        <span onClick={b} style={{ whiteSpace: 'pre-wrap', wordBreak: "break-word", }}  >
                                            {parse(feed.content.description.slice(0, _clamp), options)}
                                        </span>

                                        {

                                            feed.content.description.length > 301 && _clamp == 301 ?
                                                <span style={{ marginLeft: "0.25rem", color: "lightblue" }} onClick={() => set_clamp(3000)}  >
                                                    read more
                                                </span>
                                                : ''
                                        }
                                        {
                                            _clamp == 3000 ?
                                                <span style={{ marginLeft: "0.25rem", color: "lightblue" }} onClick={() => set_clamp(301)}  >
                                                    read less
                                                </span>
                                                : ""
                                        }
                                    </p>

                                </div>

                                {
                                    feed.content.postType === 'post' ?
                                        <img alt="img" src={feed.content.postimg} style={{ marginBottom: '4px' }} onDoubleClick={dbclick}
                                            className={doubleclicked && showanim ? 'postImg a' : 'postImg'} /> : ''
                                }
                                {
                                    feed.content.postType === 'media' ?
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


                                                    feed.content.postimg.map((img, i) =>
                                                        <div key={i} style={{ position: "relative" }} >
                                                            <SwiperSlide style={{ width: '100%', backgroundColor: '', }} >
                                                                <img alt="img" style={{ width: '100%', }} onDoubleClick={dbclick}
                                                                    className={doubleclicked && showanim ? 'postImg a' : 'postImg'} src={feed.content.postimg[i]} />
                                                                <div style={{ position: "absolute", top: "50%", left: "50%", transform: 'translate(-50%, -50%)' }} className={showanim ? "starAnimation" : "starAnimationOff"} >
                                                                    <FaStar />
                                                                </div>
                                                            </SwiperSlide>
                                                        </div>
                                                    )
                                                }
                                            </Swiper>

                                        </div>

                                        : ''
                                }
                                {
                                    feed.content.postType == 'poll' && showResults == false && hasVoted == false ?
                                        <>
                                            <div className='polloptions' onClick={() => showResultsFunc(1)}  >
                                                {feed.content.pollOptions[0].option}
                                            </div>
                                            <div className='polloptions' onClick={() => showResultsFunc(2)}  >
                                                {feed.content.pollOptions[1].option}

                                            </div>
                                            {feed.content.pollOptions[2].option != '' ?
                                                <div className='polloptions' onClick={() => showResultsFunc(3)}  >
                                                    {feed.content.pollOptions[2].option}

                                                </div>

                                                : ''
                                            }

                                            {feed.content.pollOptions[3].option != '' ?
                                                <div className='polloptions' onClick={() => showResultsFunc(4)}  >
                                                    {feed.content.pollOptions[3].option}
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
                                                padding: "0.5rem", display: "flex", justifyContent: "space-between", width: "100%", paddingRight: "1rem", alignItems: "center"
                                            }} >
                                                <div className='pollbar' style={{ width: (opt1Votes / totalVotes * 100) + '%' }}  >{feed.content.pollOptions[0].option}</div>
                                                <span style={userselected == 1 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >
                                                    {((opt1Votes / totalVotes) * 100).toFixed(0)}%</span>
                                            </div>

                                            <div style={{ padding: "0.5rem", display: "flex", justifyContent: "space-between", width: "100%", paddingRight: "1rem", alignItems: 'center' }} >
                                                <div className='pollbar' style={{ width: (opt2Votes / totalVotes * 100) + '%' }}  > {feed.content.pollOptions[1].option}
                                                </div>
                                                <span style={userselected == 2 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >{((opt2Votes / totalVotes) * 100).toFixed(0)}%</span>
                                            </div>

                                            {
                                                actualOpts > 2 ?
                                                    <div style={{
                                                        padding: "0.5rem", display: "flex", justifyContent: "space-between", width: "100%", paddingRight: "1rem", alignItems: "center"
                                                    }} >
                                                        <div className='pollbar' style={{ width: (opt3Votes / totalVotes * 100) + '%' }} >
                                                            {feed.content.pollOptions[2].option}
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
                                                            {feed.content.pollOptions[3].option}
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
                                    feed.content.isRepost == true ?
                                        <>
                                            {
                                                feed.content && feed.content.repost && feed.content.repost.isDeleted == false ?
                                                    <div onClick={gotoPostFunc} style={feed.content.description == "" && feed.content.isRepost == true ? { color: "white", marginLeft: "5%", border: "1px solid rgb(31,31,31)", borderRadius: '0.5rem', padding: "0.5rem", backgroundColor: '#090909' } : { color: "white", marginLeft: "5%", border: "1px solid rgb(31,31,31)", borderRadius: '0.5rem', padding: "0.5rem", backgroundColor: '#090909' }} ref={restorationRef}>

                                                        <div style={{ padding: "0.5rem", borderRadius: "0.5rem", backgroundColor: '#090909' }} >



                                                            <div className='feedtopinfo' style={{ display: 'flex', alignItems: 'center', padding: '0.5rem' }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                                                                    <img alt="img" src={feed.content.repost.postedBy.profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                                                                    <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className='feedUsername' >{feed.content.repost.postedBy.username}</p>
                                                                </div>

                                                                <p style={{ width: '30%', marginBottom: 0, fontSize: '0.7rem', textAlign: 'center', color: "#a3a3a3" }}>
                                                                    {
                                                                        feed.content.posted_Date !== null ?

                                                                            DateTime.fromISO(feed.content.posted_Date).toRelative()
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
                                                                        {parse(feed.content.repost.description.slice(0, 300))}
                                                                        {
                                                                            feed.content.repost.description.length > 300 ?
                                                                                <span style={{ color: 'skyblue', marginLeft: "0.25rem" }} >read more</span> : ''
                                                                        }
                                                                    </p>


                                                                </div>
                                                                {feed.content.repost.postimg && feed.content.repost.postimg.length > 0 ?
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


                                                                                feed.content.repost.postimg.map((img, i) =>
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
                                                                    feed.content.repost.postType == 'poll' && showResults == false && hasVoted == false ?
                                                                        <>
                                                                            <div className='polloptions'   >
                                                                                {feed.content.repost.pollOptions[0].option}
                                                                            </div>
                                                                            <div className='polloptions'   >
                                                                                {feed.content.repost.pollOptions[1].option}

                                                                            </div>
                                                                            {feed.content.repost.pollOptions[2].option != '' ?
                                                                                <div className='polloptions'   >
                                                                                    {feed.content.repost.pollOptions[2].option}

                                                                                </div>

                                                                                : ''
                                                                            }

                                                                            {feed.content.repost.pollOptions[3].option != '' ?
                                                                                <div className='polloptions'   >
                                                                                    {feed.content.repost.pollOptions[3].option}
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
                                                                                <div className='pollbar' style={{ width: (opt1Votes / totalVotes * 100) + '%' }}  >{feed.content.pollOptions[0].option}</div>
                                                                                <span style={userselected == 1 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >
                                                                                    {(opt1Votes / totalVotes) * 100}%</span>
                                                                            </div>

                                                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", width: "100%", paddingRight: "1rem", alignItems: 'center' }} >
                                                                                <div className='pollbar' style={{ width: (opt2Votes / totalVotes * 100) + '%' }}  > {feed.content.pollOptions[1].option}
                                                                                </div>
                                                                                <span style={userselected == 2 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >{(opt2Votes / totalVotes) * 100}%</span>
                                                                            </div>

                                                                            {
                                                                                actualOpts > 2 ?
                                                                                    <div style={{
                                                                                        display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", width: "100%", paddingRight: "1rem", alignItems: "center"
                                                                                    }} >
                                                                                        <div className='pollbar' style={{ width: (opt3Votes / totalVotes * 100) + '%' }} >
                                                                                            {feed.content.pollOptions[2].option}
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
                                                                                            {feed.content.pollOptions[3].option}
                                                                                        </div>
                                                                                        <span style={userselected == 4 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >{(opt4Votes / totalVotes) * 100}%</span>
                                                                                    </div>

                                                                                    : ''
                                                                            }

                                                                            <div style={{ fontSize: '12px', color: "#949494", marginLeft: "0.5rem" }}  >{totalVotes} votes </div>




                                                                        </>
                                                                        : ''
                                                                }

                                                                {/* <hr style={{ color: 'black', margin: 0 }} /> */}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    : ''


                                            }
                                            {
                                                feed.content.ytlink && feed.content.ytlink.length > 0 ?
                                                    <div style={{ color: "skyblue", marginLeft: "5%", border: "1px solid rgb(31, 31, 31)", borderRadius: '0.5rem', padding: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word", cursor: "pointer" }}  >
                                                        {feed.content.ytlink}
                                                    </div>
                                                    : ""
                                            }
                                        </>


                                        :
                                        ""
                                }


                                <hr style={{ color: 'black', margin: 0 }} />




                                {
                                    feed.content.isRepost && feed.content.description == "" && feed.content.postimg == "" ?
                                        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', position: "relative" }}>



                                            <div className='cmnticon' style={{ marginRight: "0rem" }} onClick={b} title='comments'>
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
                                                    <Stars _rstar={_rstar} clickedStar={clickedStar} postId={feed.content._id} key={i} doubleclicked={doubleclicked} changeDbclick={changeDbclick} userId={_id}
                                                        hasRated={hasRated}
                                                        rating={rating}
                                                        star={star}
                                                        postedBy={feed.content.postedBy}
                                                    />

                                                </div>



                                            </div>






                                            <div className='reply' style={{ display: 'flex', margin: 0, position: "relative", alignItems: "center" }}>

                                                <div className='replyIcon' style={{ cursor: "pointer", }} onClick={repostFunc}>
                                                    <BsReply color={hasReposted ? "rgb(255, 0, 102)" : ""} style={{ fontSize: "20px", marginTop: "0.1rem" }} ></BsReply>

                                                </div>
                                                <span title='average star rating' style={{ opacity: '0.7', fontSize: '14px', userSelect: "none" }}>
                                                    {repostCount}
                                                </span>





                                            </div>





                                        </div> :
                                        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', position: "relative" }}>



                                            <div className='cmnticon' style={{ marginRight: "0rem" }} onClick={b} title='comments'>
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
                                                    <Stars _rstar={_rstar} clickedStar={clickedStar} postId={feed.content._id} key={i} doubleclicked={doubleclicked} changeDbclick={changeDbclick} userId={_id}
                                                        hasRated={hasRated}
                                                        rating={rating}
                                                        star={star}
                                                        postedBy={feed.content.postedBy}
                                                    />

                                                </div>



                                            </div>






                                            <div className='reply' style={{ display: 'flex', margin: 0, position: "relative", alignItems: "center" }}>

                                                <div className='replyIcon' style={{ cursor: "pointer", }} onClick={repostFunc}>
                                                    <BsReply color={hasReposted ? "rgb(255, 0, 102)" : ""} style={{ fontSize: "20px", marginTop: "0.1rem" }} ></BsReply>

                                                </div>
                                                <span title='average star rating' style={{ opacity: '0.7', fontSize: '14px', userSelect: "none" }}>
                                                    {repostCount}
                                                </span>





                                            </div>





                                        </div>
                                }


                            </div>
                        </div>
                        :
                        <div onMouseLeave={oml} style={{ backgroundColor: "#16181b", marginBottom: "0.75rem", width: "inherit" }} >
                            <div onClick={goToProfile} style={{ color: '#808080', fontSize: "12px", display: "flex", fontWeight: "bold", marginLeft: "0.5rem", marginTop: "0.5rem", alignItems: "center" }} >

                                <div style={{ marginTop: "0.2rem" }} >
                                    added a product
                                </div>
                                <div style={{ marginTop: "0.2rem" }} >
                                    <RiShoppingCartLine size={14} className='reply' color='#808080' style={{ marginLeft: "0.3rem" }} ></RiShoppingCartLine>
                                </div>

                            </div>
                            <div className='feedtopinfo' style={{ display: 'flex', alignItems: 'center', padding: '0.5rem', backgroundColor: "#16181b", marginLeft: "0.5rem", marginTop: "0.5rem", marginBottom: "0" }}>
                                <div style={{ display: 'flex', alignItems: 'center', width: '60%', }}>
                                    <img alt="img" src={feed.content.postedBy.profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                                    <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className='feedUsername' >{feed.content.postedBy.username}</p>
                                </div>

                                <p style={{ width: '30%', marginBottom: 0, fontSize: '0.7rem', textAlign: 'center' }}>
                                    {
                                        feed.content.posted_Date !== null ?

                                            DateTime.fromISO(feed.content.posted_Date).toRelative()
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

                                                    <div className='class-postOpts' onClick={shareVia}  >
                                                        <p style={{ marginBottom: "0rem", cursor: "pointer", fontSize: "0.9rem" }} >Share   </p>
                                                        <span>
                                                            <AiOutlineShareAlt size={16} />
                                                        </span>
                                                    </div>
                                                    <div className='class-postOpts'  >
                                                        {
                                                            feed.content.postedBy._id !== _id ?
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
                                                            feed.content.postedBy._id === _id ?
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
                                                            feed.content.postedBy._id !== _id && guest == false ?
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

                                    <img alt="img" onClick={b} className='prdctImg' src={feed.content.postimg[0]} style={{ marginRight: "1rem" }}  ></img>
                                </div>

                                <div onClick={b} style={{ display: "flex", flexDirection: "column", marginRight: "1rem", justifyContent: 'center', width: '100%', cursor: "pointer    " }}  >
                                    <div className='prdctTitle'  >{feed.content.title}</div>
                                    <div className='prdctDescription'>{feed.content.tagLine}</div>

                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "0.5rem" }} >
                                        <div className='prdctprice'  >
                                            ₹{feed.content.price}
                                        </div>
                                        <div>
                                            <BiCategory color='gray' />
                                            <span style={{ color: "gray", fontSize: "12px", margin: '0.1rem' }} >
                                                {feed.content.productCategory}
                                            </span>
                                        </div>

                                    </div>

                                </div>



                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', position: "relative" }}>



                                <div className='cmnticon' style={{ marginRight: "0rem" }} onClick={b} title='comments'>
                                    <FaRegComment key={i} style={{ fontSize: "17px", margin: '0.5rem', marginTop: '0.6rem', }} />
                                    <span style={{ opacity: '0.7', fontSize: '14px', marginTop: '0.25rem', }}>{
                                        totalComments
                                    }</span>

                                </div>


                                <div title='send to chat' className='sendToChat' onClick={sendToChatFunc} >
                                    <IoFlashOutline style={{ fontSize: "21px", }} ></IoFlashOutline>
                                </div>

                                <div className='gjhnvb' onMouseOver={omo} style={{ display: 'flex', margin: 0, position: "relative", alignItems: "center" }}>


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
                                        <Stars _rstar={_rstar} clickedStar={clickedStar} postId={feed.content._id} key={i} doubleclicked={doubleclicked} changeDbclick={changeDbclick} userId={_id}
                                            hasRated={hasRated}
                                            rating={rating}
                                            star={star}
                                            postedBy={feed.content.postedBy}
                                        />

                                    </div>


                                </div>






                                <div className='reply' style={{ display: 'flex', margin: 0, position: "relative", alignItems: "center" }}>

                                    <div className='replyIcon' style={{ cursor: "pointer", }} onClick={repostFunc}>
                                        <BsReply color={hasReposted ? "rgb(255, 0, 102)" : ""} style={{ fontSize: "20px", marginTop: "0.1rem" }} ></BsReply>

                                    </div>
                                    <span title='average star rating' style={{ opacity: '0.7', fontSize: '14px', userSelect: "none" }}>
                                        {repostCount}
                                    </span>





                                </div>





                            </div>
                        </div>

                    : ""
            }


            {/* <hr style={{ color: 'white', margin: 0 }} /> */}



















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
                                <div className='shareOpt' onClick={shareVia} >
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
                                <input onChange={onchange} placeholder='Search People' type="text" style={{ outline: "none", border: "none", backgroundColor: 'black', caretColor: "white", color: "white", marginLeft: "1rem", flex: 1, fontWeight: 500 }} maxLength={30} />
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
                                        : ''
                                }




                            </div>
                        </div>

                    </dialog>
                    : ''
            }

            {/* {
                share ?
                    <ShareBox shareVia={shareVia} shareUrl={shareUrl} />
                    : ''
            } */}






        </>

    )
}

export default AllOpts