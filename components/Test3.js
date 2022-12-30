import React, { useEffect, useState } from 'react';
import Stars from './Stars';
import { AiOutlineClose, AiOutlineLink, AiOutlineShareAlt } from 'react-icons/ai';
import { BsFlag, BsReply, BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegComment, FaRegStar, FaStar } from "react-icons/fa";
import { DateTime } from 'luxon'
import { BiCommentDetail } from 'react-icons/bi'
import { MdOutlineDelete, MdLink, MdPermMedia } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiUserUnfollowLine } from 'react-icons/ri';
import parse, { domToReact } from 'html-react-parser';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { IoFlashOutline } from 'react-icons/io5';
import { host } from '../host'
import { useAppContext, useGeneralContext } from '../context';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';



const Test3 = ({ feed, i, restorationRef }) => {
  const [doubleclicked, setdoubleclicked] = useState(false);
  const [showanim, setshowanim] = useState(false);
  const [ratedByUser, setratedByUser] = useState(false);
  const [dikha, setdikha] = useState(false)
  const [postOpts, setpostOpts] = useState(false)
  const [rated, setrated] = useState(false)

  const context = useAppContext()
  const genContext = useGeneralContext()
  const router = useRouter()
  const { username, _id, } = context.sharedState
  const { flw_Recommendations, pollOptedPosts, starred_posts, recentChatsStore, reposted_posts, guest } = genContext.genstate

  let path = router.asPath

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
  const [showResults, setshowResults] = useState(false)
  const [userselected, setuserselected] = useState(false)

  const [bar1Width, setbar1Width] = useState(0)
  const [hasReposted, sethasReposted] = useState(false)
  const [tempdeleted, settempdeleted] = useState(false)
  const [repostCount, setrepostCount] = useState(0)

  const [hasRated, sethasRated] = useState(false)
  const [rating, setrating] = useState(0)

  useEffect(() => {
    // console.log(feed)
    if (restorationRef) {

      // console.log('malhari', restorationRef)
      restorationRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });

    } else {
      // console.log('alauddin')
    }
    let z = sessionStorage.getItem(`${feed.content.category}ScrollId`)
    let y = sessionStorage.getItem(`${feed.content.category}Scroll`)
    if (y) {
      window.scrollTo({ top: y, left: 0, behavior: "instant" });
    }
    // window.scrollTo({ top: y, left: 0, behavior: "instant" });
    // console.log(path)
    // let z = sessionStorage.getItem('homeScrollId')

    if (feed.content && feed.content.avgStarRating) {
      var result = (feed.content.avgStarRating - Math.floor(feed.content.avgStarRating)) !== 0;
      if (result) {
        // console.log('HAS DECIMAL ')
        setavgStar(feed.content.avgStarRating.toFixed(2))
      }
      else {
        setavgStar(feed.content.avgStarRating)
        // console.log('does not have a decimal')
      }
    }




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
        console.log(feed.content.ratedBy[i].starRating)
        hasRated = true
        _rating = feed.content.ratedBy[i].starRating
      }

      if (feed.content.ratedBy[i].raterComment.length > 0) {
        comments = comments + 1
      }

    }
    if (starred_posts && starred_posts.length > 0) {
      // console.log("sa")
      for (let s = 0; s < starred_posts.length; s++) {
        // console.log("re")

        if (starred_posts[s].postId == feed.content._id && _rating != starred_posts[s].stars) {
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


    if (feed.content.reposts) {
      setrepostCount(feed.content.reposts)
    }

    if (feed.content.reposters) {

      for (let j = 0; j < feed.content.reposters.length; j++) {
        if (feed.content.reposters[j].reposterId == _id) {
          sethasReposted(true)
        }
      }
    }


  }, [path, feed.content, starred_posts])

  useEffect(() => {


    if (hasVoted == false) {
      for (let i = 0; i < pollOptedPosts.length; i++) {
        if (feed.content._id === pollOptedPosts[i].postId) {
          settotalVotes(pollOptedPosts[i].totalVotes)
          setuserselected(pollOptedPosts[i].userselected)
          setoptionSelectedId(pollOptedPosts[i].optionSelectedId)
          sethasVoted(true)
          setshowResults(true)
          setOpt1Votes(pollOptedPosts[i]._one)
          setOpt2Votes(pollOptedPosts[i]._two)
          setOpt3Votes(pollOptedPosts[i]._three)
          setOpt4Votes(pollOptedPosts[i]._four)

        }
      }
    }
  }, [pollOptedPosts])

  useEffect(() => {
    for (let rp = 0; rp < reposted_posts.length; rp++) {
      if (feed.content._id == reposted_posts[rp].postId) {
        if (reposted_posts[rp].reposted == true) {
          sethasReposted(true)
          setrepostCount(reposted_posts[rp].repostCount + 1)
        } else {
          sethasReposted(false)
          setrepostCount(reposted_posts[rp].repostCount - 1)
        }

      }


      if (feed.content.isRepost && feed.content.repostId == reposted_posts[rp].postId) {
        settempdeleted(true)
        dispatch({
          type: SET_DELETED_POSTS,
          payload: {
            postId: feed.content._id,
          }
        })
      }
    }
  }, [reposted_posts])









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


  const b = () => {
    // console.log(dikha, '+++++++++++++++++++')
    if (dikha === true) {
      navigate(-1)
    }
    else if (dikha === false) {
      // alert(',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,', feed.content.category)
      console.log(feed.content.category, '+++++++++++++++++++')
      sessionStorage.setItem(`${feed.content.category}ScrollId`, feed.content._id)
      sessionStorage.setItem(`${feed.content.category}Scroll`, window.scrollY)
      setdikha(true)
      navigate(`/post/${feed.content._id}`)
    }
    // setdikha(value => !value)

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
    // console.log(feed.content._id)
    navigate(`/${feed.content.postedBy.username}`)
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

  const [repost, setrepost] = useState(false)
  const repostFunc = () => {
    if (guest == false) {
      if (hasReposted === false) {
        dispatch({
          type: SET_REPOST,
          payload: {
            status: true,
            description: feed.content.description,
            postimg: feed.content.postimg,
            pUsername: feed.content.postedBy.username,
            pProfileImg: feed.content.postedBy.profileImg,
            pnotificationSettings: feed.content.postedBy.notificationSettings,
            pnotificationToken: feed.content.postedBy.notificationToken,
            pDate: feed.content.posted_Date,
            p_id: feed.content._id,
            pPosterId: feed.content.postedBy._id,
            p_repostCount: repostCount

          }
        })
        sessionStorage.setItem('movieScrollId', feed.content._id)
        sessionStorage.setItem('movieScroll', window.scrollY)

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
      body: JSON.stringify({ userId: _id, postId: feed.content._id }),
    });
    const json = await response.json();


    dispatch({
      type: REMOVE_REPOSTED_POSTS,
      payload: {

        postId: feed.content._id,
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
    // console.log("json")
    // console.log(json)

    // dispatch(getstressmsgs())
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
      body: JSON.stringify({ _id, postId: feed.content._id, }),
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
      body: JSON.stringify({ description: reply, postimg: "", id: _id, repostId: feed.content._id, isRepost: true }),
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
      if (feed.content.postType == 'product') {
        _url = `https://keepitupp.herokuapp.com/product/${feed.content._id}`
      } else {
        _url = `https://keepitupp.herokuapp.com/post/${feed.content._id}`
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
      body: JSON.stringify({ id: _id, toUnfollow: feed.content.postedBy._id }),
    });
    const json = await response.json();
    // console.log(json)
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
        // console.log('kdfjakdfkafdk')

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
      socket.emit("send_post", { sendTo: sendTo, postId: feed.content._id, sender: _id, senderUsername: username, notificationToken: notificationToken, notificationSettings: notificationSettings });
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
    navigate(`/${result}`)
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
                <input
                  onChange={onchange}
                  placeholder='Search People' maxLength={30} type="text" style={{ outline: "none", border: "none", backgroundColor: 'black', caretColor: "white", color: "white", marginLeft: "1rem", flex: 1, fontWeight: 500 }} />
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
      {
        feed.content.isDeleted == false ?
          <div onMouseLeave={oml} className='testMain' style={{ color: "white" }} ref={restorationRef}>
            {
              feed.content.description == "" && feed.content.postimg == "" && feed.content.isRepost == true ?
                <div onClick={goToProfile} style={{ color: '#808080', fontSize: "12px", display: "flex", fontWeight: "bold" }} >
                  <img alt="img" src={feed.content.postedBy.profileImg} style={{ height: '1.5rem', width: '1.5rem', borderRadius: '50%', marginRight: '0.2rem', cursor: 'pointer' }} ></img>
                  <div style={{ marginTop: "0.1rem" }} >
                    {feed.content.postedBy.username} reposted
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

                            <div className='class-postOpts' onClick={shareFunc}  >
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
              <div style={{ display: 'flex', justifyContent: "space-between", width: '100%', color: 'white', flexDirection: "column", cursor: "pointer", padding: "0.5rem" }}>
                {
                  feed.content.category && feed.content.category != "" && feed.content.category !== 'personal' ?
                    <p style={{ fontSize: '1rem', cursor: 'pointer', borderRadius: "1rem", padding: "0.25rem 0.5rem 0.25rem 0rem", color: "white", fontWeight: "500", marginBottom: '0rem' }}  >{feed.content.title}</p>
                    : ""
                }
                <p className="clamp" style={{ marginBottom: '4px', fontSize: '0.9rem', marginTop: '0.1rem', width: '100%' }}>
                  <span onClick={b} style={{ whiteSpace: 'pre-wrap', wordBreak: "break-word", }} >
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
                    className={doubleclicked && showanim ? 'a postImg' : 'postImg'} /> : ''
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
                          <div key={i}>
                            <SwiperSlide style={{ width: '100%', backgroundColor: 'gray', borderRadius: "0.5rem" }} >
                              <img alt="img" style={{ width: '100%', borderRadius: "0.5rem" }} onDoubleClick={dbclick}
                                className={doubleclicked && showanim ? 'a postImg' : 'postImg'} src={feed.content.postimg[i]} />
                              <div style={{ position: "absolute", top: "50%", left: "50%", transform: 'translate(-50%, -50%)' }} className={showanim ? "starAnimation" : "starAnimationOff"} >
                                <FaStar />
                              </div>
                            </SwiperSlide>
                            {/* < img src={feed.content.postimg[i]}  style={{ marginBottom: '4px' }} /> */}
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
                      display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", width: "100%", paddingRight: "1rem", alignItems: "center"
                    }} >
                      <div className='pollbar' style={{ width: (opt1Votes / totalVotes * 100) + '%' }}  >{feed.content.pollOptions[0].option}</div>
                      <span style={userselected == 1 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >
                        {((opt1Votes / totalVotes) * 100).toFixed(0)}%</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", width: "100%", paddingRight: "1rem", alignItems: 'center' }} >
                      <div className='pollbar' style={{ width: (opt2Votes / totalVotes * 100) + '%' }}  > {feed.content.pollOptions[1].option}
                      </div>
                      <span style={userselected == 2 ? { color: "skyblue", marginLeft: '0.2rem', fontSize: "12px" } : { color: "white", marginLeft: '0.2rem', fontSize: "12px" }}  >{((opt2Votes / totalVotes) * 100).toFixed(0)}%</span>
                    </div>

                    {
                      actualOpts > 2 ?
                        <div style={{
                          display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", width: "100%", paddingRight: "1rem", alignItems: "center"
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
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", width: "100%", paddingRight: "1rem", alignItems: "center" }
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


              <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', position: "relative", userSelect: "none" }}>



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
                  <span title='repost' style={{ opacity: '0.7', fontSize: '14px', userSelect: "none" }}>
                    {repostCount}
                  </span>
                </div>


              </div>





            </div>
          </div>
          : ""
      }

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

    
    </>










  )
}

export default Test3