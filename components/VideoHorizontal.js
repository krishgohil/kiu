import React, { useEffect } from 'react'
import { useState } from 'react';
import { BsArrowUpRight, BsReply, BsStarFill } from 'react-icons/bs'
import request from '../api'
import { DateTime } from 'luxon'
import { FaRegComment, FaRegStar, FaStar } from "react-icons/fa";
import styles from "../styles/VideoHorizontal.module.css"
import moment from 'moment'
import numeral from 'numeral'

import { AiOutlineClose, AiFillLike, AiFillDislike, AiFillEye, AiOutlineShareAlt } from 'react-icons/ai';
import { IoFlashOutline } from 'react-icons/io5';
import { host } from "../host"
import io from "socket.io-client";
import parse from 'html-react-parser';

// const ENDPOINT = 'https://keepitupp.herokuapp.com'
const ENDPOINT = host
const socket = io.connect(ENDPOINT);
const VideoHorizontal = ({ video, searchScreen, input, g, c, t }) => {

    const [showDialog, setshowDialog] = useState(false)

    const {
        id,
        snippet: {
            channelId,
            channelTitle,
            title,
            publishedAt,
            thumbnails: { medium },
            description
        },
        contentDetails,
    } = video














    const handleClick = () => {

        // console.log(id.kind)
        if (id.kind === 'youtube#channel') {
            window.open(`https://www.youtube.com/channel/${channelId}`, '_blank')


        }

        else if (searchScreen && input) {
            // window.open(`https://www.youtube.com/results?search_query=${input}`)
            // console.log(id.videoId)
            window.open(`https://www.youtube.com/watch?v=${id.videoId}`, '_blank')
        } else {
            console.log('binte dil')
            window.open(`https://www.youtube.com/watch?v=${id}`, '_blank')
        }
        // dispatch(getVideoById(id))
        //  'https://www.youtube.com/watch?v=JyRTCBlyFqU'
    }

    const goToChannel = () => {
        window.open(`https://www.youtube.com/channel/${channelId}`, '_blank')
    }


    const [views, setViews] = useState(null)
    const [duration, setDuration] = useState(null)
    const [channelIcon, setChannelIcon] = useState(null)

    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss')

    const _videoId = id?.videoId || contentDetails?.videoId || id


    const isVideo = !(id.kind === 'youtube#channel')


    useEffect(() => {
        const get_video_details = async () => {
            const {
                data: { items },
            } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: _videoId,
                },
            })
            if (isVideo) {
                setDuration(items[0].contentDetails.duration)
                setViews(items[0].statistics.viewCount)
            }

        }
        get_video_details()
    }, [isVideo, _videoId])









    useEffect(() => {
        const get_channel_icon = async () => {
            const {
                data: { items },
            } = await request('/channels', {
                params: {
                    part: 'snippet',
                    id: channelId,
                },
            })
            setChannelIcon(items[0].snippet.thumbnails.default)
        }
        get_channel_icon()
    }, [channelId])


    const revFunc = () => {
        // console.log(path)
        // console.log(description)
        // setshowDialog(true)
        // navigate(`/upp/youtube/${id.videoId}`)
        // alert('clicked here')    
        console.log(id, "id", id.videoId, "???????????", path, " fdf", input)
        let x = path.replace(/%20/g, " ")
        if (path === '/upp/youtube' || x === `/searchyt/${input}`) {
            console.log("maru man mor bani dhangat kare")
            setshowDialog(true)
            dispatch({
                type: SET_YT_VIDEO_INFO,
                payload: {
                    img: medium.url,
                    title: title,
                    description: description,
                    publishedAt: publishedAt,
                    channelTitle: channelTitle,
                    channelIcon: channelIcon?.url,
                    channelId: channelId,
                    id: id,
                    idVideoId: id.videoId
                }
            })
            if (x === `/searchyt/${input}`) {
                console.log(id.videoId, "id.videoId")
                navigate(`/upp/youtube/${id.videoId}`)

            } else {
                navigate(`${id}`)

            }
        }
        else if (path === '/search') {
            console.log('sharnarthi0000000000000000000000')
            navigate(`/upp/youtube/${id.videoId}`)
            setshowDialog(true)
        }
        // console.log(id.videoId, 'ehheheheh')
        // console.log(id)
    }








    const [sendToChatUsers, setsendToChatUsers] = useState()
    const [sendToChat, setsendToChat] = useState(false)
    const sendToChatFunc = () => {
        setsendToChat(true)
        window.document.body.style.overflowY = 'hidden'
        window.document.body.style.scrollMargin = 0
        dispatch(recentChats())
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
        }
    }

    const [shareUrl, setshareUrl] = useState('https://keepitupp.herokuapp.com/')
    const [share, setshare] = useState(false)
    const shareFunc = () => {
        setsendToChat(false)
        window.document.body.style.overflowY = 'scroll'
        window.document.body.style.scrollMargin = 0
        if (share == true) {
            window.document.body.style.overflowY = 'scroll'
            window.document.body.style.scrollMargin = 0
            setshare(false)
        } else {

            var _url = `http://localhost:3000/upp/youtube/${ytid}`
            // if (feed.content.postType == 'product') {
            //     _url = `https://keepitupp.herokuapp.com/product/${feed.content._id}`
            // } else {
            //     _url = `https://keepitupp.herokuapp.com/post/${feed.content._id}`
            // }
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
            setshareUrl(_url)
        }

    }

    const [sendPostTo, setsendPostTo] = useState([])
    const sendFunc = (sendTo) => {

        let ok = _id.toString()

        let url = `https://keepitupp.herokuapp.com/upp/youtube/${id}`

        console.log(shareUrl)
        socket.emit("send_post", { sendTo: sendTo, sender: _id, senderUsername: username, ytlink: url, });
        // console.log('sendPostTo', ok)

        if (sendTo) {
            setsendPostTo([...sendPostTo, sendTo])
        }


    }

    return (
        <>
            {/* {
                share ?
                    <ShareBox shareFunc={shareFunc} shareUrl={shareUrl} />
                    : ''
            }
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
                                <div className='shareOpt' onClick={shareFunc} >
                                    Share via <AiOutlineShareAlt />
                                </div>
                                <AiOutlineClose color='' size={28} className='delImg' onClick={() => {
                                    window.document.body.style.overflowY = 'scroll'
                                    window.document.body.style.scrollMargin = 0
                                    setsendToChat(false)
                                }
                                } />
                            </div>
                            <div style={{ display: "flex", borderBottom: "1px solid gray", padding: "0.5rem", position: "sticky", top: 0, opacity: 1, }} >
                                <span style={{ fontWeight: 'bold' }} >To :</span>
                                <input placeholder='Search People' maxLength={30} type="text" style={{ outline: "none", border: "none", backgroundColor: 'black', caretColor: "white", color: "white", marginLeft: "1rem", flex: 1, fontWeight: 500 }} />
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
                                        : <Loader></Loader>
                                }




                            </div>
                        </div>

                    </dialog>
                    : ''
            } */}
            <div style={{ margin: 0, padding: 0 }} >
                <div className={styles.yt} style={{ padding: 0 }}  >

                    <div className={styles.ytRow}  >

                        <div className={styles.ytdiv}  >
                            {
                                id.kind === 'youtube#channel' ?
                                    <img alt="img"
                                        onClick={handleClick}
                                        style={{ paddingTop: '0.5rem', paddingBottom: "0.5rem", cursor: 'pointer', }}
                                        src={medium.url}
                                        className={`${styles.vh_thumbnail} ${styles.br50}`}
                                    />
                                    : <img alt="img"
                                        onClick={handleClick}
                                        style={{ paddingTop: '0.5rem', paddingBottom: "0.5rem", cursor: 'pointer', }}
                                        src={medium.url}
                                        className={styles.vh_thumbnail}
                                    />
                            }

                            <div className={styles.ytduration}  >
                                <span>
                                    {_duration}
                                </span>
                            </div>



                        </div>

                        <div className={styles.ytdetail} >
                            <p className={styles.ytTitle} style={{ fontWeight: "400", marginBottom: "0.5rem", cursor: 'pointer', }} onClick={revFunc}>{title}
                            </p>

                            <div style={{ display: "flex", cursor: 'pointer', }} onClick={revFunc}>
                                <p style={{ fontSize: "0.8rem" }} >
                                    <AiFillEye /> {numeral(views).format('0.a')} Views •
                                </p>
                                <p style={{ fontSize: "0.8rem", marginLeft: '0.5rem' }} >
                                    {DateTime.fromISO(publishedAt).toRelative()}
                                </p>

                            </div>
                            {/* <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'flex-start', alignItems: "center" }} >
                            <MdAdd className='ytAddRev' onClick={addRev} />
                        </div> */}

                            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', }} >
                                <img style={{ width: '1.8rem', borderRadius: '50%', cursor: 'pointer', }} src={channelIcon?.url} onClick={goToChannel} effect='blur' />
                                <span style={{ fontSize: "14px", marginLeft: '0.5rem', cursor: 'pointer', }} onClick={goToChannel}>
                                    {channelTitle}
                                </span>
                            </div>
                            <div className={styles.ytdesc} onClick={revFunc}>
                                {description}
                            </div>
                            <div style={{ cursor: 'pointer', marginTop: "0.5rem", display: "flex", alignItems: "center" }}  >
                                <div className={styles.cmnticon} style={{}} title='comments' onClick={revFunc}>
                                    <FaRegComment style={{ fontSize: "18px", margin: '0.5rem', marginTop: '0.6rem', }} />
                                    {/* <span style={{ margin: '0.1rem', opacity: '0.7', fontSize: '0.8rem', marginTop: '0.5rem', }}>20</span> */}

                                </div>


                                <div title='send to chat' className={styles.sendToChat} onClick={sendToChatFunc} >
                                    <IoFlashOutline style={{ fontSize: "21px", margin: '0.5rem' }} ></IoFlashOutline>
                                </div>
                            </div>

                        </div>


                        <div className={styles.ytdetailmob} >
                            <div className={styles.temp} >
                                <img className={styles.mobChannelIcon} src={channelIcon?.url} onClick={goToChannel} effect='blur' />
                            </div>

                            <div className={styles.mobview}  >
                                <div className={styles.mobTitle} onClick={revFunc}>
                                    {title}
                                </div>
                                <div className={styles.mobchannel} onClick={revFunc}>
                                    <div>

                                        {channelTitle}•
                                    </div>


                                    <div style={{ marginLeft: "0.8rem" }} >
                                        {numeral(views).format('0.a')} Views •
                                    </div>

                                    <div style={{ marginLeft: "0.8rem" }} >
                                        {DateTime.fromISO(publishedAt).toRelative()}
                                    </div>
                                </div>
                                <div style={{ cursor: 'pointer', display: "flex", alignItems: "center", justifyContent: "flex-end" }}  >
                                    <div className={styles.cmnticon} style={{}} title='comments' onClick={revFunc}>
                                        <FaRegComment style={{ fontSize: "18px", margin: '0.5rem', marginTop: '0.6rem', }} />

                                    </div>


                                    <div title='send to chat' className={styles.sendToChat} onClick={sendToChatFunc}>
                                        <IoFlashOutline style={{ fontSize: "21px", margin: '0.5rem' }} ></IoFlashOutline>
                                    </div>
                                </div>
                            </div>


                        </div>



                    </div>


                </div>

            </div>





        </>






    )
}

export default VideoHorizontal




