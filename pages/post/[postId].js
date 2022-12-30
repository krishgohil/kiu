


import React, { useEffect, useRef, useState } from 'react';
import Stars from '../../components/Stars';
import { BiUpvote, BiDownvote } from 'react-icons/bi'
import { AiOutlineClose, AiOutlineShareAlt } from 'react-icons/ai';
import { BsFlag, BsReply, BsStarFill, BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import TextareaAutosize from 'react-textarea-autosize';
import { DateTime } from 'luxon'
import { BiCommentDetail } from 'react-icons/bi'
import { MdOutlineDelete, MdBlockFlipped } from 'react-icons/md'
import 'react-toastify/dist/ReactToastify.css';
import { IoFlashOutline } from 'react-icons/io5';
import { host } from '../../host'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import parse from 'html-react-parser';
import { ToastContainer, toast } from 'react-toastify';
import { useAppContext } from '../../context';
import { useRouter } from 'next/router';
import { Modal, Spinner } from 'react-bootstrap';
import Head from 'next/head';
import SendItem from '../../components/SendItem';
import ShareBox from '../../components/ShareBox';



// const host = 'https://keepitupp.herokuapp.com/api'

const Comments = (props) => {
  const [show, setshow] = useState(true)
  const router = useRouter()
  const { postId } = router.query
  const context = useAppContext()
  const { username, _id, profileImg } = context.sharedState
  const [feed, setfeed] = useState([])
  const [cmntlytics, setcmntlytics] = useState(0)


  const [comment, setcomment] = useState('')


  const [actualOpts, setactualOpts] = useState(2)
  const [totalVotes, settotalVotes] = useState(0)
  const [opt1Votes, setOpt1Votes] = useState(0)
  const [opt2Votes, setOpt2Votes] = useState(0)
  const [opt3Votes, setOpt3Votes] = useState(0)
  const [opt4Votes, setOpt4Votes] = useState(0)
  const [hasVoted, sethasVoted] = useState(false)
  const [optionSelectedId, setoptionSelectedId] = useState('')

  const [showStarredByModal, setshowStarredByModal] = useState(false)
  const [showComments, setshowComments] = useState(false)

  const path = router.asPath
  const ref = useRef()

  useEffect(() => {
    console.log(postId)
    if (postId && feed.length == 0) {
      let goToPostComments = sessionStorage.getItem("goToPostComments")
      fetchUniqPost(goToPostComments)
    }


    console.log(path)

    if (path == `/post/${postId}/starredby` && showStarredByModal == false) {
      console.log("true karo")
      setshowStarredByModal(true)
    } else if (path == `/post/${postId}` && showStarredByModal == true) {
      console.log("false kro")
      setshowStarredByModal(false)
    }

  }, [postId, path, showStarredByModal])


  useEffect(() => {

    if (feed && feed.length > 0 && showComments && window.innerWidth < 601) {
      let a = document.getElementById("commentSection")
      console.log(a)
      if (a) {
        ref.current?.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
      setshowComments(false)
    } else {
      console.log(showComments, "Akfjaksjfdklsfjksdjfksjfklsjfkjsdkljldkjfksj", feed)
    }
  }, [feed, showComments])



  const onchange = (e) => {
    setcomment(e.target.value)
  }


  const [star, setstar] = useState(false)

  const clickedStar = (value) => {
    setstar(true)
    setrating(value)
    set_rstar(false)

    if (hasRated == false) {
      sethasRated(true)
    }
    console.log('CLCIK STAR RAN')
  }

  const [_rstar, set_rstar] = useState(false)
  const starFunc = () => {
    if (star) {
      setstar(false)
      sethasRated(false)
      setrating(0)
      set_rstar(true)
    }
    else {
      console.log('kdfjakdfkafdk')

      setstar(true)
      setrating(5)
    }
  }
  const [totalComments, settotalComments] = useState(0)

  const [hasRated, sethasRated] = useState(false)
  const [rating, setrating] = useState(0)
  const [avgStar, setavgStar] = useState(0)
  const [totalStars, settotalStars] = useState(0)
  const [repostCount, setrepostCount] = useState(0)
  const [hasReposted, sethasReposted] = useState(false)

  async function fetchUniqPost(goToPostComments) {

    console.log('FEETCH UNIQ POST', postId)
    try {

      const response = await fetch(`${host}/api/post/fetchUniqPost`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: postId }),
      })
      const json = await response.json();
      console.log(json)
      setfeed(json)
      // if (json && json[0].ratedBy.length > 0) {

      // }

      if (json[0].postType == 'poll') {

        var actual = 0

        for (let i = 0; i < json[0].pollOptions.length; i++) {
          if (json[0].pollOptions[i].option.length > 0) {
            // alert("saki saki")
            var has_voted = false
            for (let j = 0; j < json[0].pollOptions[i].voters.length; j++) {

              if (_id == json[0].pollOptions[i].voters[j].voterId) {
                sethasVoted(true)
                let a = i + 1
                setuserselected(a)
                setshowResults(true)
              }

            }
            actual = actual + 1
            if (i == 0) {
              // console.log(json[0].pollOptions[i].voters.length)
              setOpt1Votes(json[0].pollOptions[i].voters.length)
            }
            else if (i == 1) {
              // console.log(json[0].pollOptions[i].voters.length)
              setOpt2Votes(json[0].pollOptions[i].voters.length)
            }
            else if (i == 2) {
              // console.log(json[0].pollOptions[i].voters.length)
              setOpt3Votes(json[0].pollOptions[i].voters.length)
            }
            else if (i == 3) {
              // console.log(json[0].pollOptions[i].voters.length)
              setOpt4Votes(json[0].pollOptions[i].voters.length)
            }
          }

        }
        setactualOpts(actual)
        settotalVotes(json[0].pollVotes)
      }

      var comments = 0
      var hasRated = false
      var _rating = 0
      var arr = []
      var avgstar = 0
      var totalstars = 0
      for (let i = 0; i < json[0].ratedBy.length; i++) {
        totalstars = json[0].ratedBy[i].starRating + totalstars
        console.log('lllllllllllllllllllllllllllllllllllll')
        if (json[0].ratedBy[i].raterId == _id) {
          console.log(json[0].ratedBy[i].starRating)
          hasRated = true
          _rating = json[0].ratedBy[i].starRating
        }

        if (json[0].ratedBy[i].raterComment.length > 0) {
          arr.push(json[0].ratedBy[i])
          comments = comments + 1
        }

      }

      avgstar = totalstars / json[0].ratedBy.length
      if (Number.isNaN(avgstar) == false) {
        setavgStar(avgstar.toFixed(2))
      }

      sethasRated(hasRated)
      if (hasRated == true) {
        setrating(_rating)
        setstar(true)
      }
      settotalStars(totalstars)
      settotalComments(comments)
      setcomments(arr)
      setcmntlytics(arr.length)
      setstarredBy(json[0].ratedBy)
      if (json[0].reposts) {
        setrepostCount(json[0].reposts)
      }

      if (json[0].reposters) {

        for (let j = 0; j < json[0].reposters.length; j++) {
          if (json[0].reposters[j].reposterId == _id) {
            sethasReposted(true)
          }
        }
      }




      if (goToPostComments) {
        console.log(goToPostComments)
        sessionStorage.removeItem("goToPostComments")
        setshowComments(true)
      }
    } catch (error) {

    }
  }

  // useEffect(() => {
  //   if (hasVoted == false && feed[0]) {
  //     for (let i = 0; i < pollOptedPosts.length; i++) {

  //       if (feed[0]._id === pollOptedPosts[i].postId) {

  //         settotalVotes(pollOptedPosts[i].totalVotes)
  //         setuserselected(pollOptedPosts[i].userselected)
  //         setoptionSelectedId(pollOptedPosts[i].optionSelectedId)
  //         sethasVoted(true)
  //         setshowResults(true)
  //         setOpt1Votes(pollOptedPosts[i]._one)
  //         setOpt2Votes(pollOptedPosts[i]._two)
  //         setOpt3Votes(pollOptedPosts[i]._three)
  //         setOpt4Votes(pollOptedPosts[i]._four)
  //       }
  //     }
  //   }
  // }, [])

  const [comments, setcomments] = useState([])
  const goToProfile = () => {
    // console.log(feed[0])
    router.push(`/${feed[0].postedBy.username}`)
  }

  const close = () => {
    router.back()
  }


  // stars
  const stars = Array(5).fill(0)
  const [starRating, setstarRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [dikha, setdikha] = useState(false)
  const [prevRating, setprevRating] = useState(0)



  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const handleClick = (value) => {
    setstarRating(value)
  }


  async function fetchcomments() {
    try {
      console.log(comment._id)
      console.log(postId)

      const response = await fetch(`${host}/api/post/fetchcomments`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId })
      })
      const json = await response.json();
      console.log(json)
      setcomments(json.ratedBy)
      for (let i = 0; i < json.ratedBy.length; i++) {

        if (json.ratedBy[i]._id == comment._id) {
          // console.log(json.ratedBy[0].replies)
        }
      }



    } catch (error) {
      console.log(error)

    }
  }
  async function postCmnt() {



    try {
      const response = await fetch(`${host}/api/post/postComment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: postId, comment: comment, userId: _id, username: username, notificationSettings: feed[0].postedBy.notificationSettings, notificationToken: feed[0].postedBy.notificationToken })
      })
      const json = await response.json();
      console.log(json)
      if (json.modifiedCount > 0) {
        setcomment('')
        fetchcomments()
      }
    } catch (error) {
      console.log(error)
    }
  }


  const [starredBy, setstarredBy] = useState()
  const showStarredByFunc = () => {
    if (showStarredByModal) {
      // setshowStarredByModal(false)         
      navigate(-1)
    } else {
      navigate(`${window.location.pathname}/starredby`)
      setshowStarredByModal(true)
    }

  }
  const gotoPostFunc = () => {
    sessionStorage.setItem('homeScrollId', feed._id)
    sessionStorage.setItem('homeScroll', window.scrollY)
    // alert(feed[0].repost.postType)
    console.log(feed[0])
    if (feed[0].repost.postType == "media" || feed[0].repost.postType == "kwik" || feed[0].repost.postType == "post" || feed[0].repost.postType == "poll") {
      navigate(`post/${feed[0].repost._id}`)
    }
    else if (feed[0].repost.postType == "product") {
      navigate(`/upp/product/${feed[0].repost._id}`)
    }
  }

  const [showResults, setshowResults] = useState(false)
  const [userselected, setuserselected] = useState(false)
  const showResultsFunc = (n) => {
    if (guest == false) {
      settotalVotes(totalVotes + 1)
      setshowResults(true)
      setuserselected(n)
      var _one = opt1Votes
      var _two = opt2Votes
      var _three = opt3Votes
      var _four = opt4Votes
      var optSelId = feed[0].pollOptions[n - 1]._id
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
          postId: feed[0]._id,
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
      body: JSON.stringify({ userselected, _id, postId: feed[0]._id, optionId: optSelId }),
    });
    const json = await response.json();
    console.log("json", json)
  }



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

  async function recentChats() {
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
      socket.emit("send_post", { sendTo: sendTo, postId: feed[0]._id, sender: _id, senderUsername: username, notificationToken: notificationToken, notificationSettings: notificationSettings });
      // console.log('sendPostTo', ok)

      if (sendTo) {
        setsendPostTo([...sendPostTo, sendTo])
      }
    }



  }




  const [shareUrl, setshareUrl] = useState('https://keepitupp.herokuapp.com/')
  const [share, setshare] = useState(false)

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
      _url = `https://keepitupp.herokuapp.com/post/${feed[0]._id}`
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
        setshareUrl(`https://keepitupp.herokuapp.com/post/${feed[0]._id}`)
        setshare(true)
      }
    }
  }



  const repostFunc = () => {
    if (guest == false) {
      if (hasReposted === false) {

        dispatch({
          type: SET_REPOST,
          payload: {
            status: true,
            description: feed[0].description,
            postimg: feed[0].postimg,
            pUsername: feed[0].postedBy.username,
            pProfileImg: feed[0].postedBy.profileImg,
            pnotificationSettings: feed[0].postedBy.notificationSettings,
            pnotificationToken: feed[0].postedBy.notificationToken,
            pDate: feed[0].posted_Date,
            p_id: feed[0]._id,
            pPosterId: feed[0].postedBy._id,
            p_repostCount: repostCount
          }
        })
        sessionStorage.setItem('homeScrollId', feed[0]._id)
        sessionStorage.setItem('homeScroll', window.scrollY)

        navigate('/compose-post')
        // navigate(`${window.location.pathname}/compose-post`)
      }
      else if (hasReposted === true) {
        if (window.confirm("Remove Repost") == true) {
          // console.log('dispatcch karo bhaiya')
          // dispatch(removeRepost())
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

  async function removeRepost() {
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


  return (
    <>
      <ToastContainer />

      <dialog open style={{ position: 'absolute', border: 'none', color: 'white', zIndex: 999, left: '0%', backgroundColor: "rgba(0,0,0,.85)", height: '100vh', width: '100vw', position: 'fixed', display: 'flex', overflow: 'hidden', justifyContent: 'center', top: '0vh', alignItems: 'center', padding: 0 }}>


        {

          feed.length > 0 ?

            feed.map((feed, i) =>
              <>
                <Head>
                  <title>{feed?.title.length > 0 ? feed?.title : props.description} : {props.postedBy.username} | Post / Keepituppp</title>
                  <meta name="description" content={feed?.description ? feed.description : "Keepitupp post and comments"} />
                  <meta
                    name="keywords"
                    content={`Keepitupp Post, ${feed.postedBy.username},Social media, fun ,movies ,products ,news`}
                  />
                </Head>
                <div className='uniqDiv' style={window.location.pathname == `/post/${postId}/compose-post` ? { display: "none" } : {}} >
                  {
                    showStarredByModal ?
                      <dialog className='starredByModal' open >
                        <div className='starredByMain' style={{ maxHeight: "90vh", backgroundColor: "#16181b", padding: '0.5rem 0.5rem 0 0.5rem', zIndex: "999", color: "white" }} >
                          <div style={{ display: "flex", justifyContent: "space-between" }} >
                            <div style={{ fontWeight: "500", }} >
                              Starred By
                            </div>
                            <AiOutlineClose onClick={showStarredByFunc} size={25} />
                          </div>
                          {
                            starredBy && starredBy.length > 0 ?
                              starredBy.map((sby, i) =>
                                <>
                                  <div style={{ display: 'flex', alignItems: 'center', width: '70%', margin: "0.5rem 0" }} onClick={() => navigate(`/${sby.rater.username}`)} >
                                    <img alt="img" src={sby.rater.profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                                    <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', color: 'white' }} className='cmntUsername' >{sby.rater.username}</p>
                                  </div>
                                </>
                              )
                              :
                              <div style={{ display: 'flex', justifyContent: "center", height: '50vh', alignItems: 'center', color: "white", fontWeight: '600' }} >
                                No Stars Yet
                              </div>
                          }
                        </div>
                      </dialog>
                      : ""
                  }

                  <div className='cmntPostInfo' style={{ borderRadius: "0.5rem 0 0 0.5rem", color: "white" }} >
                    <div style={{ display: 'flex', backgroundColor: 'background-color: rgb(21, 20, 20)', alignItems: 'center', padding: "0.25rem", paddingBottom: '0.5rem', borderBottom: "1px solid rgb(41, 41, 41)" }}>

                      <div style={{ display: 'flex', alignItems: 'center', width: '60%', color: "white" }}>
                        <img alt="img" src={feed.postedBy.profileImg} onClick={goToProfile} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                        <p onClick={goToProfile} style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className='feedUsername' >{feed.postedBy.username}</p>
                      </div>

                      <p style={{ width: '30%', marginBottom: 0, fontSize: '0.7rem', textAlign: 'center', color: "#a3a3a3" }}>
                        {
                          feed.posted_Date !== null ?

                            DateTime.fromISO(feed.posted_Date).toRelative()
                            : ''
                        }
                      </p>
                    </div>

                    <div style={{ marginTop: "0.5rem", padding: "0.25rem" }}>


                      {
                        feed.title && feed.title.length > 0 && feed.title != "undefined" ?
                          <div style={{ color: "white", fontWeight: "600", fontSize: "1rem", }}>
                            {feed.title}
                          </div>
                          : ""
                      }
                      {
                        feed.description && feed.description.length > 0 && feed.title != "description" ?
                          <div style={{ color: "white", fontSize: "0.9rem" }}>
                            {parse(feed.description)}
                          </div>
                          : ""
                      }

                      <div style={{ width: '100%' }}>
                        {
                          feed && feed.postimg && feed.postimg.length > 0 ?
                            <Swiper
                              className='jkliop'
                              style={{ width: 'auto', height: "auto", backgroundColor: "#16181b", }}
                              modules={[Navigation, Pagination, Scrollbar, A11y]}
                              slidesPerView={1}
                              navigation
                              pagination={{ clickable: true }}
                              scrollbar={{ draggable: true }}
                            >
                              {


                                feed.postimg.map((img, i) =>
                                  <div key={i}>
                                    <SwiperSlide style={{ width: '100%', borderRadius: "0.5rem", padding: "0.25rem", backgroundColor: "#16181b", }} >
                                      <img alt="img" style={{
                                        width: '100%',
                                      }} src={img} />
                                    </SwiperSlide>

                                  </div>
                                )
                              }
                            </Swiper>
                            : ""
                        }


                      </div>

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
                        feed.isRepost == true ?
                          <>
                            {
                              feed && feed.repost && feed.repost.isDeleted == false ?
                                <div onClick={gotoPostFunc} style={feed.description == "" && feed.postimg == '' && feed.isRepost == true ? { color: "white" } : { color: "white", marginLeft: "5%", border: "1px solid rgb(31, 31, 31)", borderRadius: '0.5rem' }} >

                                  <div style={{ padding: "0.5rem", borderRadius: "0.5rem", backgroundColor: '#090909' }} >



                                    <div className='feedtopinfo' style={{ display: 'flex', alignItems: 'center', paddingBottom: '0.5rem' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                                        <img alt="img" src={feed.repost.postedBy.profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                                        <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className='feedUsername' >{feed.repost.postedBy.username}</p>
                                      </div>

                                      <p style={{ width: '30%', marginBottom: 0, fontSize: '0.7rem', textAlign: 'center', color: "#a3a3a3" }}>
                                        {
                                          feed.posted_Date !== null ?

                                            DateTime.fromISO(feed.posted_Date).toRelative()
                                            : ''
                                        }
                                      </p>


                                    </div>

                                    {/* <hr style={{ color: 'white', margin: 0 }} /> */}
                                    <div style={{
                                      display: 'flex', flexDirection: 'column', backgroundColor: 'black', color: "white",
                                      // padding: '0.5rem',
                                      // paddingTop: "0.5rem",
                                      justifyContent: 'center'
                                    }}>
                                      <div style={{ width: '100%', color: 'white' }}>
                                        <p style={{ marginBottom: '4px', fontSize: '0.9rem', marginTop: '0.1rem', width: '100%' }}>
                                          {parse(feed.repost.description.slice(0, 300))}
                                          {
                                            feed.repost.description.length > 300 ?
                                              <span style={{ color: 'skyblue', marginLeft: "0.25rem" }} >read more</span> : ''
                                          }
                                        </p>


                                      </div>

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

                                        >
                                          {


                                            feed.repost.postimg.map((img, i) =>
                                              <div key={i}>
                                                <SwiperSlide style={{ width: '100%', backgroundColor: '', borderRadius: "0.5rem" }} >
                                                  <img alt="img" style={{ width: '100%', borderRadius: "0.5rem" }}
                                                    className='postImg' src={img} />
                                                </SwiperSlide>
                                              </div>
                                            )
                                          }
                                        </Swiper>
                                      </div>


                                      <hr style={{ color: 'black', margin: 0 }} />

                                    </div>
                                  </div>
                                </div>
                                : ''


                            }
                            {
                              feed.ytlink && feed.ytlink.length > 0 ?
                                <div style={{ color: "skyblue", marginLeft: "5%", border: "1px solid rgb(31, 31, 31)", borderRadius: '0.5rem', padding: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word", cursor: "pointer" }}  >
                                  {feed.ytlink}
                                </div>
                                : ""
                            }
                          </>


                          :
                          ""
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
                      <div style={{ display: "flex", marginTop: "1rem", justifyContent: "space-around", borderTop: "1px solid rgb(41,41,41)", padding: '0.25rem 0', borderBottom: "1px solid rgb(41,41,41)" }} >

                        <div className='reply' style={{ display: 'flex', margin: 0, position: "relative", alignItems: "center" }}>

                          <div className='replyIcon' style={{ cursor: "pointer", padding: '0' }} onClick={repostFunc} >
                            <BsReply size={20} color={hasReposted ? "rgb(255, 0, 102)" : ""} style={{ verticalAlign: "baseline", marginTop: '0.2rem' }} ></BsReply>

                          </div>
                          <span title='average star rating' style={hasReposted ? { marginLeft: "0.5rem", color: "rgb(255, 0, 102)" } : { marginLeft: "0.5rem" }}>
                            {repostCount}
                          </span>





                        </div>

                        <div style={{ display: "flex", cursor: "pointer", padding: "0", alignItems: "center" }} className='sendToChat' onClick={sendToChatFunc} >
                          <IoFlashOutline size={20} style={{}} />
                        </div>

                        {/* <BsReply color='white' size={20} style={{}} ></BsReply> */}



                        <div style={{ color: "silver", cursor: "pointer", display: "flex", alignItems: "center" }} onClick={showStarredByFunc}>
                          <span style={{ color: "white", marginRight: "0.2rem" }} >
                            {totalStars}
                          </span> stars
                        </div>
                        <div style={{ color: "silver", display: "flex", alignItems: "center" }}>
                          Avg
                          <BsStarFill style={{}} size={17} color='silver' />
                          <span style={{ color: "white", marginLeft: "0.2rem" }} >
                            {avgStar}
                          </span>
                        </div>

                      </div>

                    </div>
                  </div>
                  <div ref={ref} id="commentSection" className='commentSection' style={{}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', height: '5vh', alignItems: 'center', color: "silver" }}>
                      <div style={{ display: "flex", alignItems: 'center', }} >

                        <span style={{ marginLeft: '1rem', fontWeight: '500' }}>Comments </span>
                        <span style={{ color: 'gray', marginLeft: '0.2rem' }} >
                          {cmntlytics}
                        </span>
                        <span style={{ marginLeft: '1rem', fontWeight: '500' }}>Views </span>
                        <span style={{ color: 'gray', marginLeft: '0.2rem' }} >
                          {feed.views == 0 ? 1 : feed.views}
                        </span>



                      </div>

                      <div style={{ display: "flex", padding: "0 0.5rem" }} >

                        <AiOutlineClose onClick={close} style={{ cursor: 'pointer', color: "white" }} size={24} />

                      </div>
                    </div>
                    <div className='jfkslxk'  >
                      <div style={{ display: "flex", paddingTop: "0.5rem", marginLeft: "0.5rem", alignItems: 'center', }} >
                        <img alt="img" src={profileImg} style={{
                          height: '2.5rem',
                          width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem'
                        }} ></img>
                        <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: "center" }}>

                          <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ margin: 0, display: 'flex', flexDirection: 'row', overflowY: 'scroll' }}>

                              <Stars _rstar={_rstar} clickedStar={clickedStar} postId={feed._id} key={i}
                                userId={_id}
                                hasRated={hasRated}
                                rating={rating}
                                postedBy={feed.postedBy}
                                star={star}
                              />

                            </div>
                          </div>




                          {
                            star ?
                              <div>
                                <MdBlockFlipped
                                  style={{ marginRight: "0.5rem" }}
                                  onClick={() => set_rstar(true)}
                                  color='gray'
                                  size={24} />
                              </div> : ''
                          }

                        </div>

                      </div>
                      <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: "space-between" }} >
                        <TextareaAutosize onChange={onchange} value={comment} maxRows={3} style={{ caretColor: 'white', color: 'white', outline: 'none', border: 'none', borderBottom: '1px solid black', bottom: 0, padding: '0.5rem', margin: '0.5rem', width: "100%", resize: 'none', backgroundColor: "rgb(15, 15, 15)", borderRadius: '8px' }} />


                        <button style={{ border: '1px solid black', padding: '0.5rem 1rem 0.5rem 1rem', marginRight: '0.5rem', borderRadius: '0.5rem', backgroundColor: '#0095f6', color: 'white', fontWeight: 'bold' }}
                          onClick={() => postCmnt()}
                        >Post</button>


                      </div>
                    </div>

                    {/* <hr /> */}
                    <div className='uihjkl'>

                      {
                        comments && comments.length > 0 ?
                          comments.map((comment, i) =>
                            comment.raterComment.length > 0 ?
                              <CommentItem key={i} comment={comment} userId={_id} postId={postId} fetchcomments={fetchcomments} />

                              : ""
                          )
                          :
                          <div style={{ display: 'flex', justifyContent: "center", height: '55vh', alignItems: 'center', color: "white", fontWeight: '600' }} >
                            No Comments Yet
                          </div>
                      }


                    </div>

                    {/* <div style={{ backgroundColor: 'rgb(17, 19, 26) ', display: "flex", paddingTop: "0.5rem", marginLeft: "0.5rem", alignItems: 'center', }} >
                                <img alt="img" src={profileImg} style={{
                                    height: '2.5rem',
                                    width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem'
                                }} ></img>
                                <div style={{ backgroundColor: 'rgb(17, 19, 26)', margin: 0, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: "center" }}>

                                    <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ margin: 0, display: 'flex', flexDirection: 'row', overflowY: 'scroll' }}>

                                            <Stars _rstar={_rstar} clickedStar={clickedStar} postId={feed._id} key={i}
                                                userId={_id}
                                                hasRated={hasRated}
                                                rating={rating}
                                                star={star}
                                            />

                                        </div>
                                    </div>




                                    {
                                        star ?
                                            <div>
                                                <MdBlockFlipped
                                                    style={{ marginRight: "0.5rem" }}
                                                    onClick={() => set_rstar(true)}
                                                    color='gray'
                                                    size={24} />
                                            </div> : ''
                                    }

                                </div>

                            </div>
                            <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: "space-between" }} >
                                <TextareaAutosize onChange={onchange} value={comment} maxRows={3} style={{ caretColor: 'white', color: 'white', outline: 'none', border: 'none', borderBottom: '1px solid black', bottom: 0, padding: '0.5rem', margin: '0.5rem', width: "80%", resize: 'none', backgroundColor: "rgb(17, 19, 26) " }} />


                                <button style={{ border: '1px solid black', padding: '0.5rem 1rem 0.5rem 1rem', marginRight: '0.5rem', borderRadius: '0.5rem', backgroundColor: '#0095f6', color: 'white', fontWeight: 'bold' }}
                                    onClick={() => dispatch(postCmnt())}
                                >Post</button>


                            </div> */}





                  </div>
                </div>


              </>
            )
            :
            <div className='uniqDiv'  >
              <div style={{ textAlign: "end" }} >
                <AiOutlineClose onClick={close} style={{ cursor: 'pointer' }} size={28} />
              </div>

              <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
                <Spinner style={{ margin: "1rem 0", color: "skyblue" }} />
              </div>
            </div>
        }


        <ForBot props={props}></ForBot>



        {
          sendToChat ?

            <dialog
              // onMouseLeave={closeRepost}
              className='toChatDialog' open >
              <div className='toChatMain' style={{ backgroundColor: "black", borderRadius: "1rem", padding: "0.5rem 0.5rem 1.5rem 0.5rem", background: "black", opacity: "1", maxHeight: "80vh", overflowY: "scroll", opacity: 1, zIndex: 999 }}>
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
                  <input onChange={onchange} placeholder='Search People' type="text" style={{ outline: "none", border: "none", backgroundColor: 'black', caretColor: "white", color: "white", marginLeft: "1rem", flex: 1, fontWeight: 500 }} />
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
                      : ''
                  }




                </div>
              </div>

            </dialog>
            : ''
        }

        {
          share ?
            <ShareBox shareVia={shareVia} shareUrl={shareUrl} />
            : ''
        }
      </dialog>









    </>

  )
}


export default Comments




export async function getServerSideProps(context) {

  console.log("wesrtyui", context.params)
  const response = await fetch(`${host}/api/post/fetchUniqPost`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId: context.params.postId }),
  })
  const json = await response.json();
  console.log(json, "fjkjskdjflkasjdkfjaskjfkjaslkd")

  return {
    props: json[0],
  }

}

export const ForBot = ({ props }) => {
  return (
    <div style={{ display: "none" }}>
      <Head>
        <title>{props?.title.length > 0 ? props?.title : props.description} : {props.postedBy.username} | Post / Keepitupp</title>
        <meta name="description" content={props?.description ? props.description : "Keepitupp post and comments"} />
        <meta
          name="keywords"
          content={`Keepitupp Post, ${props.postedBy.username},Social media, fun ,movies ,products ,news`}
        />
      </Head>
      <div className='uniqDiv'  >


        <div className='cmntPostInfo' style={{ borderRadius: "0.5rem 0 0 0.5rem", color: "white" }} >
          <div style={{ display: 'flex', backgroundColor: 'background-color: rgb(21, 20, 20)', alignItems: 'center', padding: "0.25rem", paddingBottom: '0.5rem', borderBottom: "1px solid rgb(41, 41, 41)" }}>

            <div style={{ display: 'flex', alignItems: 'center', width: '60%', color: "white" }}>
              <img alt="img" src={props.postedBy.profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
              <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className='feedUsername' >{props.postedBy.username}</p>
            </div>

            <p style={{ width: '30%', marginBottom: 0, fontSize: '0.7rem', textAlign: 'center', color: "#a3a3a3" }}>
              {
                props.posted_Date !== null ?

                  DateTime.fromISO(props.posted_Date).toRelative()
                  : ''
              }
            </p>
          </div>

          <div style={{ marginTop: "0.5rem", padding: "0.25rem" }}>


            {
              props.title && props.title.length > 0 && props.title != "undefined" ?
                <div style={{ color: "white", fontWeight: "600", fontSize: "1rem", }}>
                  {props.title}
                </div>
                : ""
            }
            {
              props.description && props.description.length > 0 && props.title != "description" ?
                <div style={{ color: "white", fontSize: "0.9rem" }}>
                  {parse(props.description)}
                </div>
                : ""
            }

            <div style={{ width: '100%' }}>
              {
                props && props.postimg && props.postimg.length > 0 ?
                  <Swiper
                    className='jkliop'
                    style={{ width: 'auto', height: "auto", backgroundColor: "#16181b", }}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                  >
                    {


                      props.postimg.map((img, i) =>
                        <div key={i}>
                          <SwiperSlide style={{ width: '100%', borderRadius: "0.5rem", padding: "0.25rem", backgroundColor: "#16181b", }} >
                            <img alt="img" style={{
                              width: '100%',
                            }} src={img} />
                          </SwiperSlide>

                        </div>
                      )
                    }
                  </Swiper>
                  : ""
              }


            </div>

            <>
              <div className='polloptions' onClick={() => showResultsFunc(1)}  >
                {props.pollOptions[0]?.option}
              </div>
              <div className='polloptions' onClick={() => showResultsFunc(2)}  >
                {props.pollOptions[1]?.option}

              </div>
              {props.pollOptions[2]?.option != '' ?
                <div className='polloptions' onClick={() => showResultsFunc(3)}  >
                  {props.pollOptions[2]?.option}

                </div>

                : ''
              }

              {props.pollOptions[3]?.option != '' ?
                <div className='polloptions' onClick={() => showResultsFunc(4)}  >
                  {props.pollOptions[3]?.option}
                </div>

                : ''
              }

            </>





            {
              props.isRepost == true ?
                <>
                  {
                    props && props.repost && props.repost.isDeleted == false ?
                      <div onClick={gotoPostFunc} style={props.description == "" && props.postimg == '' && props.isRepost == true ? { color: "white" } : { color: "white", marginLeft: "5%", border: "1px solid rgb(31, 31, 31)", borderRadius: '0.5rem' }} >

                        <div style={{ padding: "0.5rem", borderRadius: "0.5rem", backgroundColor: '#090909' }} >



                          <div className='feedtopinfo' style={{ display: 'flex', alignItems: 'center', paddingBottom: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                              <img alt="img" src={props.repost.postedBy.profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                              <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className='feedUsername' >{props.repost.postedBy.username}</p>
                            </div>

                            <p style={{ width: '30%', marginBottom: 0, fontSize: '0.7rem', textAlign: 'center', color: "#a3a3a3" }}>
                              {
                                props.posted_Date !== null ?

                                  DateTime.fromISO(props.posted_Date).toRelative()
                                  : ''
                              }
                            </p>


                          </div>

                          {/* <hr style={{ color: 'white', margin: 0 }} /> */}
                          <div style={{
                            display: 'flex', flexDirection: 'column', backgroundColor: 'black', color: "white",
                            // padding: '0.5rem',
                            // paddingTop: "0.5rem",
                            justifyContent: 'center'
                          }}>
                            <div style={{ width: '100%', color: 'white' }}>
                              <p style={{ marginBottom: '4px', fontSize: '0.9rem', marginTop: '0.1rem', width: '100%' }}>
                                {parse(props.repost.description.slice(0, 300))}
                                {
                                  props.repost.description.length > 300 ?
                                    <span style={{ color: 'skyblue', marginLeft: "0.25rem" }} >read more</span> : ''
                                }
                              </p>


                            </div>

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

                              >
                                {


                                  props.repost.postimg.map((img, i) =>
                                    <div key={i}>
                                      <SwiperSlide style={{ width: '100%', backgroundColor: '', borderRadius: "0.5rem" }} >
                                        <img alt="img" style={{ width: '100%', borderRadius: "0.5rem" }}
                                          className='postImg' src={img} />
                                      </SwiperSlide>
                                    </div>
                                  )
                                }
                              </Swiper>
                            </div>


                            <hr style={{ color: 'black', margin: 0 }} />

                          </div>
                        </div>
                      </div>
                      : ''


                  }
                  {
                    props.ytlink && props.ytlink.length > 0 ?
                      <div style={{ color: "skyblue", marginLeft: "5%", border: "1px solid rgb(31, 31, 31)", borderRadius: '0.5rem', padding: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word", cursor: "pointer" }}  >
                        {props.ytlink}
                      </div>
                      : ""
                  }
                </>


                :
                ""
            }


            <div style={{ display: "flex", marginTop: "1rem", justifyContent: "space-around", borderTop: "1px solid rgb(41,41,41)", padding: '0.25rem 0', borderBottom: "1px solid rgb(41,41,41)" }} >

              <div className='reply' style={{ display: 'flex', margin: 0, position: "relative", alignItems: "center" }}>

                <div className='replyIcon' style={{ cursor: "pointer", padding: '0' }}  >
                  <BsReply size={20} style={{ verticalAlign: "baseline", marginTop: '0.2rem' }} ></BsReply>

                </div>
                <span title='average star rating' style={{ marginLeft: "0.5rem", color: "rgb(255, 0, 102)" }}>
                </span>





              </div>

              <div style={{ display: "flex", cursor: "pointer", padding: "0", alignItems: "center" }} className='sendToChat' >
                <IoFlashOutline size={20} style={{}} />
              </div>

              {/* <BsReply color='white' size={20} style={{}} ></BsReply> */}



              <div style={{ color: "silver", cursor: "pointer", display: "flex", alignItems: "center" }} >
                <span style={{ color: "white", marginRight: "0.2rem" }} >
                </span> stars
              </div>
              <div style={{ color: "silver", display: "flex", alignItems: "center" }}>
                Avg
                <BsStarFill style={{}} size={17} color='silver' />
                <span style={{ color: "white", marginLeft: "0.2rem" }} >
                </span>
              </div>

            </div>

          </div>
        </div>
        <div id="commentSection" className='commentSection' style={{}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '5vh', alignItems: 'center', color: "silver" }}>
            <div style={{ display: "flex", alignItems: 'center', }} >

              <span style={{ marginLeft: '1rem', fontWeight: '500' }}>Comments </span>
              <span style={{ color: 'gray', marginLeft: '0.2rem' }} >
              </span>

              <div title='average star' style={{ display: "flex", alignItems: 'center', marginLeft: "1rem", }}  >

                <span style={{ color: 'gray', marginLeft: '0.2rem' }} >

                </span>
              </div>

            </div>

            <div style={{ display: "flex", padding: "0 0.5rem" }} >

              <AiOutlineClose style={{ cursor: 'pointer', color: "white" }} size={24} />

            </div>
          </div>
          <div className='jfkslxk'  >
            <div style={{ display: "flex", paddingTop: "0.5rem", marginLeft: "0.5rem", alignItems: 'center', }} >
              <img alt="img" style={{
                height: '2.5rem',
                width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem'
              }} ></img>
              <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: "center" }}>

                <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ margin: 0, display: 'flex', flexDirection: 'row', overflowY: 'scroll' }}>

                    <Stars
                    />

                  </div>
                </div>





              </div>

            </div>
            <div style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: "space-between" }} >
              <TextareaAutosize maxRows={3} style={{ caretColor: 'white', color: 'white', outline: 'none', border: 'none', borderBottom: '1px solid black', bottom: 0, padding: '0.5rem', margin: '0.5rem', width: "100%", resize: 'none', backgroundColor: "rgb(15, 15, 15)", borderRadius: '8px' }} />


              <button style={{ border: '1px solid black', padding: '0.5rem 1rem 0.5rem 1rem', marginRight: '0.5rem', borderRadius: '0.5rem', backgroundColor: '#0095f6', color: 'white', fontWeight: 'bold' }}
              >Post</button>


            </div>
          </div>

          <div className='uihjkl'>




          </div>
        </div>
      </div>
    </div >
  )
}



export const CommentItem = ({ comment, userId, postId, fetchcomments }) => {

  const [downvotes, setdownvotes] = useState(0)
  const [upvotes, setupvotes] = useState(0)
  const [replies, setreplies] = useState(0)
  const [tempDeleted, settempDeleted] = useState(false)
  useEffect(() => {
    console.log(comment)
    if (comment.upvotedBy && comment.upvotedBy.length > 0) {
      for (let i = 0; i < comment.upvotedBy.length; i++) {
        if (comment.upvotedBy[i].upvoterId == userId) {
          setupvoted(true)
        }
      }
      setupvotes(comment.upvotedBy.length)
    }

    if (comment.downvotedBy && comment.downvotedBy.length > 0) {
      for (let i = 0; i < comment.downvotedBy.length; i++) {
        if (comment.downvotedBy[i].downvoterId == userId) {
          setdownvoted(true)
        }
      }
      setdownvotes(comment.downvotedBy.length)
    }

    if (comment.replies) {
      setreplies(comment.replies.length)
    }



  }, [comment])

  const [commentOpts, setcommentOpts] = useState(false)
  const [replyOpts, setreplyOpts] = useState(false)
  const [prevResult, setprevResult] = useState()


  const editcommentOpts = () => {
    setcommentOpts(value => !value)
  }

  const editReplyOpts = () => {
    setreplyOpts(value => !value)
  }

  const gotoProfile = () => {
    navigate(`/${comment.username}`)
  }


  const deleteDes = () => {
    setcommentOpts(false)
    settempDeleted(true)
    dispatch(deldescription())
  }

  async function deldescription() {
    try {
      const response = await fetch(`${host}/api/post/deldescription`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId })
      })
      const json = await response.json();
      console.log(json)



    } catch (error) {
      console.log(error)
    }

  }

  const [upvoted, setupvoted] = useState(false)
  const [downvoted, setdownvoted] = useState(false)
  const [showComments, setshowComments] = useState(false)

  const clickUpvote = () => {
    if (downvoted) {
      setdownvoted(false)
      setdownvotes(downvotes - 1)
      remove_downvote_comment()
    }
    if (upvoted) {
      setupvoted(false)
      setupvotes(upvotes - 1)
      remove_upvote_comment()

    } else {
      // alert("koool")
      setupvoted(true)
      setupvotes(upvotes + 1)
      upvote_comment()
    }

  }

  const clickDownvote = () => {

    if (upvoted) {
      console.log("ruc")
      setupvoted(false)
      setupvotes(upvotes - 1)
      remove_upvote_comment()
    }

    if (downvoted) {
      console.log("rdc")

      setdownvoted(false)
      setdownvotes(downvotes - 1)
      remove_downvote_comment()
    } else {
      setdownvoted(true)
      setdownvotes(downvotes + 1)

      downvoteComment()
    }
  }

  const clickComment = () => {
    console.log('clickComment')
    setshowReplyInput(value => !value)
  }


  const [showReplyInput, setshowReplyInput] = useState(false)
  const [showReplies, setshowReplies] = useState(false)
  const [reply, setreply] = useState('')


  const cancelReply = () => {
    setshowReplyInput(false)
  }
  const submitReply = () => {
    setshowReplyInput(false)
    postreply()
  }
  const showRepliesfunc = () => {
    // setshowReplies(!showReplies)
    if (showReplies === false) {
      console.log('dispatch fetch replies')
      fetchreplies()
    }
    else {
      setshowReplies(false)
    }
    console.log(showReplies)
  }

  const setReply = (e) => {
    setreply(e.target.value)
  }




  async function postreply() {
    console.log(userId)
    console.log(comment.cmntId, 'guzaarish', postId)
    try {

      const response = await fetch(`${host}/api/post/postreply`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId, commentId: comment._id, reply })
      })
      const json = await response.json();
      console.log(json)
      fetchreplies()



    } catch (error) {
      console.log(error)

    }
  }





  async function fetchreplies(temp) {
    try {
      console.log(comment._id)
      console.log(postId)

      const response = await fetch(`${host}/api/post/fetchreplies`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId, commentId: comment._id })
      })
      const json = await response.json();
      console.log(json)
      for (let i = 0; i < json.ratedBy.length; i++) {

        if (json.ratedBy[i]._id == comment._id) {
          // console.log(json.ratedBy[0].replies)
          setreplies(json.ratedBy[i].replies)
          setshowReplies(true)
        }
      }



    } catch (error) {
      console.log(error)

    }
  }

  const [tricolon, setTricolon] = useState(false)
  const hoverOnComment = () => {
    setTricolon(true)

  }
  const hoverOutComment = () => {
    setTricolon(false)
    // seteditReview(false)

  }


  async function upvote_comment() {

    console.log(postId)
    console.log(comment)
    console.log(userId)
    try {

      const response = await fetch(`${host}/api/post/upvoteComment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId, commentId: comment._id })
      })
      const json = await response.json();
      console.log(json)
      if (prevResult !== 'like') {
        setprevResult('like')
      }
      // dispatch(fetchcomments())
    } catch (error) {
      console.log(error)
    }

  }
  async function remove_upvote_comment() {

    console.log(postId)
    console.log(comment)
    console.log(userId)
    try {

      const response = await fetch(`${host}/api/post/remove_upvote_comment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId, commentId: comment._id })
      })
      const json = await response.json();
      console.log(json)
      if (prevResult !== 'like') {
        setprevResult('like')
      }
      // dispatch(fetchcomments())
    } catch (error) {
      console.log(error)
    }

  }


  async function downvoteComment() {



    try {

      const response = await fetch(`${host}/api/post/downvoteComment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId, commentId: comment._id, })
      })
      const json = await response.json();
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  async function remove_downvote_comment() {



    try {

      const response = await fetch(`${host}/api/post/remove_downvote_comment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId, commentId: comment._id, })
      })
      const json = await response.json();
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div style={tempDeleted ? { display: 'none' } : { display: 'flex', flexDirection: 'column', marginBottom: "1.5rem" }} onMouseOver={hoverOnComment}
      onMouseLeave={hoverOutComment} >

      <div style={{ display: 'flex', backgroundColor: 'inherit', alignItems: 'center', }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '70%' }}>
          <img alt="img" onClick={gotoProfile} src={comment.rater.profileImg} style={{ height: '2.5rem', width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
          <p onClick={gotoProfile} style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', color: 'white' }} className='cmntUsername' >{comment.rater.username}</p>
        </div>
        <div style={{ color: '#a3a3a3', width: '30%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', }}>
            {DateTime.fromISO(comment.ratedDate).toRelative()}
          </span>
          <span style={{ padding: '0.2rem', cursor: 'pointer' }}>
            {
              tricolon ?
                <>
                  {
                    commentOpts ?
                      <BsThreeDots size={20} onClick={editcommentOpts} /> : <BsThreeDotsVertical onClick={editcommentOpts} />
                  }
                </>
                : ''
            }


          </span>
          {commentOpts ?
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", marginBottom: 0, fontSize: '0.8rem', right: '30%' }}
                className='cmntopts' >

                <p style={{ marginBottom: "0.5rem", display: 'flex', alignItems: 'center' }}>
                  {
                    comment.raterId === userId ?
                      <>
                        <span onClick={deleteDes} style={{ marginRight: '0.5rem', cursor: "pointer" }}>Delete  </span> <MdOutlineDelete onClick={deleteDes} size={14} />
                      </>
                      :
                      <>
                        <span style={{ marginRight: '0.5rem' }}>report  </span> <BsFlag size={14} color='red' />
                      </>
                  }
                </p>

              </div>
            </div>
            : ""
          }
        </div>
      </div>
      <p style={{ color: 'white', marginLeft: '3rem', marginRight: '1rem', fontSize: '0.9rem', marginBottom: '0.4rem', whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >{comment.raterComment}
      </p>

      <div style={{ marginLeft: '3rem' }} >


        <span style={{ marginRight: '3rem', cursor: "pointer" }} onClick={clickUpvote}  >
          <span>
            <BiUpvote size={20} color={upvoted ? 'skyblue' : 'white'} />
          </span>
          <span style={{ fontSize: "0.8rem", color: 'gray', marginLeft: "0.2rem" }} >
            {upvotes}
          </span>
        </span>
        <span style={{ marginRight: '6rem', cursor: "pointer" }} onClick={clickDownvote} >
          <span>
            <BiDownvote size={20} color={downvoted ? 'skyblue' : 'white'} />
          </span>

          <span style={{ fontSize: "0.8rem", color: 'gray', marginLeft: "0.2rem" }} >
            {downvotes}
          </span>
        </span>
        <span onClick={clickComment} style={{ cursor: "pointer" }} >
          <BiCommentDetail size={20} color='white' />
        </span>
      </div>

      {
        showReplyInput ?
          <>
            <TextareaAutosize maxRows={5} onChange={setReply} style={{ display: 'block', width: '100%', outline: 'none', border: 'none', borderBottom: '1px solid black', caretColor: 'white', color: 'white', marginTop: "1rem", padding: '0.25rem', resize: "none", backgroundColor: "rgb(17, 19, 26)" }} />
            {/* <input onChange={setReply} style={{ display: 'block', width: '100%', outline: 'none', border: 'none', borderBottom: '1px solid white', caretColor: 'black', color: 'black', marginTop: "1rem", padding: '0.25rem' }}  ></input> */}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={cancelReply} style={{ border: 'none', color: 'black', padding: '0.5rem', marginLeft: '0.5rem', marginTop: '0.5rem', borderRadius: '0.5rem', fontSize: "0.8rem" }}>CANCEL</button>
              <button onClick={submitReply} style={{ border: 'none', backgroundColor: 'dodgerblue', padding: '0.5rem', marginLeft: '0.5rem', marginTop: '0.5rem', borderRadius: '0.5rem', fontSize: "0.8rem", color: 'white' }}  >REPLY</button>
            </div>
          </>
          : ''
      }
      {
        comment.replies && comment.replies.length > 0 ?
          <button onClick={showRepliesfunc} style={{ marginLeft: '9rem', border: 'none', color: 'silver', backgroundColor: 'inherit', marginTop: "0.5rem", fontSize: "12px" }} >{showReplies ? 'Hide' : "Show"} Replies</button>
          : ''
      }


      {
        showReplies && replies.length > 0 ?
          replies.map((rep, i) => {
            return (
              <Reply key={i} rep={rep} userId={userId} comment={comment} postId={postId} fetchreplies={fetchreplies} />

            )


          })
          : ""


      }


    </div >
  )
}













const Reply = ({ rep, userId, comment, postId, fetchreplies }) => {
  const [upvoted, setupvoted] = useState(false)
  const [downvoted, setdownvoted] = useState(false)
  const [showComments, setshowComments] = useState(false)
  const [replyOpts, setreplyOpts] = useState(false)
  const [tricolon, settricolon] = useState(false)

  useEffect(() => {
    console.log("rur", rep)

    if (rep.upvotedBy && rep.upvotedBy.length > 0) {
      for (let i = 0; i < rep.upvotedBy.length; i++) {
        if (rep.upvotedBy[i].upvoterId == userId) {
          setupvoted(true)
        }
      }
      setupvotes(rep.upvotedBy.length)
    }

    if (rep.downvotedBy && rep.downvotedBy.length > 0) {
      for (let i = 0; i < rep.downvotedBy.length; i++) {
        if (rep.downvotedBy[i].downvoterId == userId) {
          setdownvoted(true)
        }
      }
      setdownvotes(rep.downvotedBy.length)
    }

  }, [rep])


  const gotoProfile = () => {
    navigate(`/${rep.username}`)
  }

  const [upvotes, setupvotes] = useState(0)
  const [downvotes, setdownvotes] = useState(0)
  const [prevResult, setprevResult] = useState()


  const clickUpvote = () => {
    if (downvoted) {
      setdownvoted(false)
      setdownvotes(downvotes - 1)
      console.log("rdr")

      remove_downvote_reply()
    }
    if (upvoted) {
      console.log("rur")

      setupvoted(false)
      setupvotes(upvotes - 1)
      remove_upvote_reply()

    } else {
      setupvoted(true)
      setupvotes(upvotes + 1)
      console.log("ur")

      upvoteReply()
    }


  }

  const clickDownvote = () => {
    if (upvoted) {
      setupvoted(false)
      setupvotes(upvotes - 1)
      remove_upvote_reply()
    }

    if (downvoted) {
      setdownvoted(false)
      setdownvotes(downvotes - 1)
      remove_downvote_reply()

    } else {
      setdownvoted(true)
      setdownvotes(downvotes + 1)
      downvoteReply()
    }
  }

  const editReplyOpts = () => {
    setreplyOpts(value => !value)
  }

  const hoveredOn = () => {
    settricolon(true)
  }

  const hoveredOff = () => {
    settricolon(false)
    setreplyOpts(false)
  }

  const delReplyFunc = () => {
    console.log(rep.replyObjId)
    setreplyOpts(false)
    delreply()
  }

  async function delreply() {
    console.log(comment)
    console.log(rep, 'guzaarish', postId)
    try {

      const response = await fetch(`${host}/api/post/delreply`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, commentId: comment._id, replyId: rep._id })
      })
      const json = await response.json();
      console.log(json)
      fetchreplies()



    } catch (error) {
      console.log(error)

    }
  }



  async function upvoteReply() {

    console.log(postId)
    console.log(comment)
    console.log(userId)
    try {

      const response = await fetch(`${host}/api/post/upvoteReply`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId, commentId: comment._id, replyId: rep._id })
      })
      const json = await response.json();
      console.log(json)
      // if (prevResult !== 'like') {
      //     setprevResult('like')
      // }
      // dispatch(fetchcomments())
    } catch (error) {
      console.log(error)
    }

  }
  async function remove_upvote_reply() {

    console.log(postId)
    console.log(comment)
    console.log(userId)
    try {

      const response = await fetch(`${host}/api/post/remove_upvote_reply`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId, commentId: comment._id, replyId: rep._id })
      })
      const json = await response.json();
      console.log(json)
      if (prevResult !== 'like') {
        setprevResult('like')
      }
    } catch (error) {
      console.log(error)
    }

  }


  async function downvoteReply() {



    try {

      const response = await fetch(`${host}/api/post/downvoteReply`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId, commentId: comment._id, replyId: rep._id })
      })
      const json = await response.json();
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  async function remove_downvote_reply() {



    try {

      const response = await fetch(`${host}/api/post/remove_downvote_reply`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId, commentId: comment._id, replyId: rep._id })
      })
      const json = await response.json();
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div style={{ marginLeft: "3rem", marginBottom: "1rem", color: "white" }} onMouseOver={hoveredOn} onMouseLeave={hoveredOff} >
      <div style={{ display: 'flex', backgroundColor: 'inherit', alignItems: 'center', }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '70%' }}>
          <img alt="img" onClick={gotoProfile} src={rep.replier.profileImg} style={{ height: '2rem', width: '2rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
          <p onClick={gotoProfile} style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', color: 'white' }} className='cmntUsername' >{rep.replier.username}</p>
        </div>
        <div style={{ color: 'white', width: '30%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', }}>
            {DateTime.fromISO(rep.replier.replyDate).toRelative()}
          </span>
          <span style={{ padding: '0.2rem', cursor: 'pointer' }}>
            {
              tricolon ?
                replyOpts ?
                  <BsThreeDots size={20} onClick={editReplyOpts} /> : <BsThreeDotsVertical onClick={editReplyOpts}
                  />
                : ''
            }
          </span>
          {replyOpts ?
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", marginBottom: 0, fontSize: '0.8rem', right: '30%' }}
                className='cmntopts' >

                <p style={{ marginBottom: "0.5rem", display: 'flex', alignItems: 'center' }}>
                  {
                    rep.replierId === userId ?
                      <>
                        <span onClick={delReplyFunc} style={{ marginRight: '0.5rem', cursor: "pointer" }}>Delete  </span> <MdOutlineDelete size={14} />
                      </>
                      :
                      <>
                        <span style={{ marginRight: '0.5rem' }}>report  </span> <BsFlag size={14} color='red' />
                      </>
                  }
                </p>

              </div>
            </div>
            : ""
          }
        </div>
      </div>
      <p style={{ color: 'white', marginLeft: '2.5rem', marginRight: '1rem', fontSize: '0.8rem', marginBottom: '0.4rem' }} >{rep.reply}
      </p>
      <div style={{ marginLeft: '3rem' }} >


        <span style={{ marginRight: '3rem', cursor: "pointer" }} onClick={clickUpvote}  >
          <span>
            <BiUpvote size={18} color={upvoted ? 'skyblue' : 'silver'} />
          </span>
          <span style={{ fontSize: "0.8rem", color: 'gray', marginLeft: "0.2rem" }} >
            {upvotes}
          </span>
        </span>
        <span style={{ marginRight: '6rem', cursor: "pointer" }} onClick={clickDownvote} >
          <span>
            <BiDownvote size={18} color={downvoted ? 'skyblue' : 'silver'} />
          </span>

          <span style={{ fontSize: "0.8rem", color: 'gray', marginLeft: "0.2rem" }} >
            {downvotes}
          </span>
        </span>

      </div>
    </div>
  )
}

