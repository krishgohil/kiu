import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import { AiFillEye, AiOutlineClose, AiOutlineShareAlt } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { IoFlashOutline } from 'react-icons/io5'
import { host } from "../host"
import io from "socket.io-client";
import styles from "../styles/VideoHorizontal.module.css"
import { useRouter } from 'next/router'


const ENDPOINT = host
const socket = io.connect(ENDPOINT);

const PromotedVideos = ({ video, revFunc }) => {
    const router = useRouter()


    const gotoProfile = () => {
        router.push(`/${video.postedBy.username}`)
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

            var _url = `http://localhost:3000/upp/youtube/${video?.ytid}`
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

        let url = `https://keepitupp.herokuapp.com/upp/youtube/${video?.ytid}`

        console.log(shareUrl)
        socket.emit("send_post", { sendTo: sendTo, sender: _id, senderUsername: username, ytlink: url, });
        // console.log('sendPostTo', ok)

        if (sendTo) {
            setsendPostTo([...sendPostTo, sendTo])
        }


    }
    const goToChannel = () => {
        window.open(`https://www.youtube.com/channel/${video?.channelId}`, '_blank')
    }

    const goToVideo = () => {
        window.open(`https://www.youtube.com/watch?v=${video?.ytid}`, '_blank')

    }

    return (
        <div>

            <div style={{ margin: 0, padding: 0 }} >
                <div className={styles.yt} style={{ padding: 0 }}  >


                    <div className={styles.ytRow}  >

                        <div className={styles.ytdiv}  >

                            <img alt="img"
                                onClick={goToVideo}
                                style={{ paddingTop: '0.5rem', paddingBottom: "0.5rem", cursor: 'pointer', }}
                                src={video.thumbnail}
                                className={styles.vh_thumbnail}
                            />

                            <div className={styles.ytduration}  >
                                <span>
                                    {/* {<video src="" className="dura"></video>tion} */}
                                    {moment.utc((moment.duration(video.duration).asSeconds()) * 1000).format('mm:ss')}
                                </span>
                            </div>



                        </div>

                        <div className={styles.ytdetail} >
                            <p className={styles.ytTitle} style={{ fontWeight: "400", marginBottom: "0.5rem", cursor: 'pointer', }}
                                onClick={() => revFunc(video.ytid)}
                            >
                                {video.title}
                            </p>

                            <div style={{ display: "flex", cursor: 'pointer', }}
                                onClick={() => revFunc(video.ytid)}
                            >
                                <p style={{ fontSize: "0.8rem" }} >
                                    <AiFillEye />
                                    {/* {numeral(views).format('0.a')} Views • */}
                                </p>
                                <p style={{ fontSize: "0.8rem", marginLeft: '0.5rem' }} >
                                    {video.publishedAt}
                                    {/* {DateTime.fromISO(video.items[0].snippet.publishedAt).toRelative()} */}
                                </p>

                            </div>


                            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', }} >
                                <img style={{ width: '1.8rem', borderRadius: '50%', cursor: 'pointer', }}
                                    src={video.channelIcon}
                                    onClick={goToChannel}
                                    effect='blur' />
                                <span style={{ fontSize: "14px", marginLeft: '0.5rem', cursor: 'pointer', }}
                                    onClick={goToChannel}
                                >
                                    {video.channelTitle}
                                </span>

                            </div>
                            <div className={styles.ytdesc} >
                                {video.description}
                            </div>

                            <div style={{ cursor: 'pointer', marginTop: "0.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}  >
                                <div style={{ display: "flex", }} >
                                    <div className={styles.cmnticon} style={{}} title='comments' onClick={() => revFunc(video.ytid)}
                                    >
                                        <FaRegComment style={{ fontSize: "18px", margin: '0.5rem', marginTop: '0.6rem', }} />

                                    </div>


                                    <div title='send to chat' className={styles.sendToChat}
                                        onClick={sendToChatFunc}
                                    >
                                        <IoFlashOutline style={{ fontSize: "21px", margin: '0.5rem' }} ></IoFlashOutline>
                                    </div>

                                </div>

                                <div className={styles.feedtopinfo} style={{ display: 'flex', alignItems: 'center', paddingBottom: '0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', width: '50%' }} onClick={gotoProfile}>
                                        <span style={{ color: "silver", marginRight: "4px" }} >By</span>
                                        <img alt="img"
                                            //  onClick={goToProfile} 
                                            src={video.postedBy.profileImg}
                                            style={{ height: '2rem', width: '2rem', borderRadius: '50%', marginRight: '0.6rem', cursor: 'pointer' }} ></img>
                                        <p
                                            // onClick={goToProfile} 
                                            style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', }} className={styles.feedUsername} >
                                            {video.postedBy.username}
                                        </p>
                                    </div>

                                </div>
                            </div>


                        </div>


                        <div className={styles.ytdetailmob} >
                            <div className={styles.temp}  >
                                <img className={styles.mobChannelIcon}
                                    src={video.channelIcon}
                                    onClick={goToChannel}
                                    effect='blur' />
                            </div>

                            <div className={styles.mobview}  >
                                <div className={styles.mobTitle} >
                                    {video.title}
                                </div>
                                <div className={styles.mobchannel} >
                                    <div>
                                        {video.channelTitle}•
                                    </div>


                                    <div style={{ marginLeft: "0.8rem" }} >
                                        {/* {numeral(views).format('0.a')} Views • */}
                                    </div>

                                    <div style={{ marginLeft: "0.8rem" }} >
                                        {video.publishedAt}
                                        {/* {DateTime.fromISO(video.items[0].snippet.publishedAt).toRelative()} */}

                                    </div>
                                </div>

                                <div style={{ cursor: 'pointer', display: "flex", alignItems: "center", justifyContent: "space-between" }}  >

                                    <div style={{ display: "flex", }} >
                                        <div className={styles.cmnticon} style={{}} title='comments'
                                        >
                                            <FaRegComment style={{ fontSize: "18px", margin: '0.5rem', marginTop: '0.6rem', }} />

                                        </div>

                                        <div title='send to chat' className={styles.sendToChat}
                                            onClick={sendToChatFunc}
                                        >
                                            <IoFlashOutline style={{ fontSize: "21px", margin: '0.5rem' }} ></IoFlashOutline>
                                        </div>

                                        <div className={`${styles.feedtopinfo} ${styles.smallscreen}`} style={{ alignItems: 'center', paddingBottom: '0', justifyContent: "flex-end", width: "100%" }}>
                                            <div style={{ display: 'flex', alignItems: 'center', }} onClick={gotoProfile}>
                                                <span style={{ color: "silver", marginRight: "4px" }} >By</span>
                                                <img alt="img"
                                                    //  onClick={goToProfile} 
                                                    style={{ width: "2rem" }}
                                                    className={styles.mobpostedbyimg}
                                                    src={video.postedBy.profileImg} ></img>
                                                <p
                                                    // onClick={goToProfile} 
                                                    style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', whiteSpace: 'pre-wrap', wordBreak: "break-word" }} className={styles.feedUsername} >
                                                    {video.postedBy.username}
                                                </p>


                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>





                        </div>



                    </div>


                </div>

            </div>
        </div>
    )
}

export default PromotedVideos