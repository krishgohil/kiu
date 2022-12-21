import React, { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import request from '../api';

import VideoHorizontal, { YtModal } from '../components/VideoHorizontal'
import { FaRegComment, FaRegStar, FaStar } from "react-icons/fa";
import { AiFillEye, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { host } from '../host'
import { IoFlashOutline } from 'react-icons/io5'
import { DateTime } from 'luxon'
import { toast } from 'react-toastify'
import { useYtContext } from '../context';
import PromotedVideos from '../components/PromotedVideos';

const Youtube = () => {
  const context = useYtContext()
  const [uniqVid, setuniqVid] = useState()
  const [showUniqDialog, setshowUniqDialog] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [videos, setvideos] = useState([])
  const a = () => {
    // console.log('here', context)
    getPopularVideos()
  }

  const [showModal, setshowModal] = useState(false)
  const [showVideos, setshowVideos] = useState(false)

  useEffect(() => {

    getPopularVideos()


  }, [])



  async function getPopularVideos() {
    const { data } = await request('/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'IN',
        maxResults: 3,
        pageToken: context.ytstate.nextPageToken,
      },
    })

    let ad = [...videos, ...data.items]
    setvideos([...videos, ...data.items])



    let obj2 = {
      videos: [...context.ytstate.videos, ...data.items],
      nextPageToken: data.nextPageToken,
      promotedVideosStore: context.ytstate.promotedVideosStore
    }

    console.log(obj2)
    console.log(context.ytstate.nextPageToken)
    context.setytstate(obj2)

    setshowVideos(true)
    // console.log(data)
  }
  const fetchUniqYtvid = (rpostid) => async dispatch => {

    console.log('FEETCH UNIQ PRODUCT')
    try {
      // console.log(_id)

      const response = await fetch(`${host}/api/youtube/fetchUniqYtvid`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ytId: ytid, userId: _id }),
      })
      const json = await response.json();
      // console.log(json)
      setuniqVid(json)
      setshowUniqDialog(true)
      // setshowUniqProduct(true)
    } catch (error) {

    }
  }




  const close = () => {
    setshowUniqDialog(false)
    console.log('uniqmodal vala close')
    // alert('isne kiya 2')

    // navigate('/upp/youtube')
    navigate(-1)
  }


  const g = () => {
    console.log(uniqVid, 'uniqvid')
    console.log(modalIsOpen, 'mopen', showUniqDialog)
    dispatch(fetchUniqYtvid())


  }

  const c = () => {
    console.log('discooooooo')
    setshowUniqDialog(false)
  }

  const t = () => {
    console.log(
      'gigliilili'
    )
    setModalIsOpen(true)
  }



  const [yt, setyt] = useState(true)
  const [bykeepituppers, setbykeepituppers] = useState(false)

  const [promote, setpromote] = useState(false)

  const adf = () => {
    {
      setpromote(true)
      setbykeepituppers(false)
    }
  }




  const [ytUrl, setytUrl] = useState("")

  const [ytType, setytType] = useState("video")
  const findFunc = () => {

    let z = youtube_parser(ytUrl)
    console.log(z)
    dispatch(getVideoById(z))




  }
  const [channelIcon, setChannelIcon] = useState(null)
  const [vidData, setvidData] = useState()
  const [showVideo, setshowVideo] = useState(false)
  const getVideoById = id => async dispatch => {
    try {
      const { data } = await request('/videos', {
        params: {
          part: 'snippet,statistics,contentDetails',
          id: id,
        },
      })
      console.log(data)
      setvidData(data)
      setshowVideo(true)


      const get_channel_icon = async () => {
        const {
          data: { items },
        } = await request('/channels', {
          params: {
            part: 'snippet',
            id: data.items[0].snippet.channelId,
          },
        })
        setChannelIcon(items[0].snippet.thumbnails.default)
      }
      get_channel_icon()

    } catch (error) {
      console.log(error.message)

    }
  }

  const onChangeUrl = (e) => {
    setytUrl(e.target.value)
  }

  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  }


  const promote_video = (rpostid) => async dispatch => {

    try {

      const response = await fetch(`${host}/api/youtube/promote_video`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: vidData, channelIcon: channelIcon, userId: _id }),
      })
      const json = await response.json();

      console.log(json)

      if (json.result && json.result == "success") {
        setpromote(false)
        setshowVideo(false)
        setbykeepituppers(true)
        setyt(false)
        toast.success(`Video Promoted`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
        })
      } else {
        console.log("sdfjkadsdhfkjasf")
      }
      // console.log(json)
      // setuniqVid(json)
      // setshowUniqDialog(true)
      // setshowUniqProduct(true)
    } catch (error) {

    }
  }

  const [promotedVideos, setpromotedVideos] = useState([])
  async function fetch_promoted_videos() {
    try {

      const response = await fetch(`${host}/api/youtube/fetch_promoted_videos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skip: promotedVideos.length }),
      })
      const json = await response.json();
      console.log(json)
      setpromotedVideos(promotedVideos.concat(json))

    } catch (error) {

    }
  }


  const promoteFunc = () => {
    dispatch(promote_video())
  }

  const revFunc = (id) => {
    setshowModal(true)
    navigate(`/upp/youtube/${id}`)
  }

  const fetchAgain = () => {
    fetch_promoted_videos()
  }

  return (
    <>
      <div className='stickba' style={{ height: "6vh", padding: "0.5rem", top: "8vh", zIndex: 99, backgroundColor: "black" }} >

        <div className='pop' style={{ display: "flex", width: "100%", justifyContent: "space-evenly ", alignItems: "center" }} >

          <div
            onClick={() => {
              setshowVideos(true)
              setbykeepituppers(false)
              setyt(true)
            }}
            className='op' style={yt ? { backgroundColor: "#212121", flex: 0.5, textAlign: "center" } : { flex: 0.5, textAlign: "center" }} >
            Trending
          </div>
          <div onClick={() => {

            setbykeepituppers(true)
            setyt(false)
            setshowVideos(false)
            fetchAgain()
          }} className='op' style={bykeepituppers ? { backgroundColor: "#212121", flex: 0.5, textAlign: "center" } : { flex: 0.5, textAlign: "center" }} >
            By Keepituppers
          </div>


          <div>

          </div>
        </div>
      </div >
      {
        showVideos ?
          <InfiniteScroll

            id='myHeader'
            dataLength={videos.length
            }
            next={a}
            hasMore={true}
            className='row'
            loader={
              < div className='spinner-border text-danger d-block mx-auto' ></div >
            }
            style={{ padding: 0, margin: 0, marginBottom: '7vh' }}
          >

            {
              context.ytstate.videos.map(video => (
                <VideoHorizontal video={video} key={video.id} g={g} c={c} t={t} />
              ))
            }


          </InfiniteScroll >
          : ""
      }




      {
        showModal ?
          <YtModal />
          :
          ""
      }

      {
        bykeepituppers ?
          <>


            <InfiniteScroll
              id='myHeader'
              dataLength={promotedVideos.length}
              next={fetchAgain}
              hasMore={true}
              className='row'
              // loader={
              //   <div className='spinner-border text-danger d-block mx-auto'></div>
              // }
              style={{ padding: 0, margin: 0, marginBottom: '7vh' }}
            >

              <div style={{ margin: "1rem 0", textAlign: "end" }} >
                <button onClick={adf} style={promote ? { backgroundColor: "red", padding: "0.15rem 0.5rem", color: "white", fontWeight: "500", border: "none", fontSize: "0.9rem", margin: "0 0.5rem" } : { backgroundColor: "red", padding: "0.15rem 0.5rem", color: "white", fontWeight: "500", border: "none", fontSize: "0.9rem", margin: "0 0.5rem" }} >
                  +Promote
                </button>
              </div>

              {promotedVideos.map(video => (
                <>
                  <PromotedVideos video={video} key={video.id} g={g} c={c} t={t} revFunc={revFunc} />
                </>
              ))}


            </InfiniteScroll>
          </> : ""
      }

      {
        promote ?
          <div style={{ width: "100%", display: "flex", flexDirection: "column", minHeight: "50vh", marginTop: "2rem", overflowY: "scroll", scrollMargin: 0 }} >
            <div style={{ margin: "1rem auto" }} >
              Enter Video Url
            </div>
            <div style={{ width: '100%', display: "flex", alignItems: "center" }} >
              <input onChange={onChangeUrl} type="text" style={{ border: "none", outline: "none", backgroundColor: "rgb(29,29,29)", padding: "0.5rem", cursor: "pointer", caretColor: "white", color: "white", width: '100%' }} placeholder="https://www.youtube.com/watch?v=jNQXAC9IVRw" />

              <button onClick={findFunc} style={{ backgroundColor: "red", padding: "0.5rem", color: "white", fontWeight: "500", border: "none", boxSizing: "border-box" }} >
                <AiOutlineSearch size={18} />
              </button>
            </div>

            {
              showVideo ?
                <>
                  <Promotedvids video={vidData} channelIcon={channelIcon} />

                  <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }} >

                    <button onClick={() => {
                      // navigate(-1)
                      setshowVideo(false)
                      setpromote(false)
                      setbykeepituppers(true)
                      setyt(false)


                    }} style={{ backgroundColor: "gray", padding: "0.5rem", color: "white", fontWeight: "500", border: "none", boxSizing: "border-box", fontSize: "0.9rem", borderRadius: "0.5rem" }} >
                      Cancel
                    </button>

                    <button onClick={promoteFunc} style={{ backgroundColor: "#0e5abf", padding: "0.5rem", color: "white", fontWeight: "500", border: "none", boxSizing: "border-box", fontSize: "0.9rem", borderRadius: "0.5rem" }} >
                      Promote
                    </button>
                  </div>
                </>
                : ""
            }



          </div>
          : ""
      }

    </>
  )
}

export default Youtube





const Promotedvids = ({ video, channelIcon }) => {
  return (
    <>

      <div style={{ margin: 0, padding: 0 }} >

        <div className='yt' style={{ padding: 0 }}  >

          <div className='ytRow'  >

            <div className='ytdiv'  >

              <img alt="img"
                // onClick={handleClick}
                style={{ paddingTop: '0.5rem', paddingBottom: "0.5rem", cursor: 'pointer', }}
                src={video.items[0].snippet.thumbnails.medium.url}
                className={`videoHorizontal__thumbnail`}
              />

              <div className='ytduration'  >
                <span>
                  {/* {video.items[0].contentDetails.duration} */}
                  {moment.utc((moment.duration(video.items[0].contentDetails.duration).asSeconds()) * 1000).format('mm:ss')}
                </span>
              </div>



            </div>

            <div className='ytdetail' >
              <p className='ytTitle' style={{ fontWeight: "400", marginBottom: "0.5rem", cursor: 'pointer', }}
              // onClick={revFunc}
              >
                {video.items[0].snippet.title}
              </p>

              <div style={{ display: "flex", cursor: 'pointer', }}
              // onClick={revFunc}
              >
                <p style={{ fontSize: "0.8rem" }} >
                  <AiFillEye />
                  {/* {numeral(views).format('0.a')} Views • */}
                </p>
                <p style={{ fontSize: "0.8rem", marginLeft: '0.5rem' }} >
                  {DateTime.fromISO(video.items[0].snippet.publishedAt).toRelative()}
                </p>

              </div>


              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', }} >
                <img style={{ width: '1.8rem', borderRadius: '50%', cursor: 'pointer', }}
                  src={channelIcon?.url}
                  // src={channelIcon?.url} onClick={goToChannel} 
                  effect='blur' />
                <span style={{ fontSize: "14px", marginLeft: '0.5rem', cursor: 'pointer', }}
                // onClick={goToChannel}
                >
                  {video.items[0].snippet.channelTitle}
                </span>

              </div>
              <div className='ytdesc' >
                {video.items[0].snippet.description}
              </div>


            </div>


            <div className='ytdetailmob' >
              <div className='temp'  >
                <img className='mobChannelIcon'
                  src={channelIcon?.url}
                  //  onClick={goToChannel}
                  effect='blur' />
              </div>

              <div className='mobview'  >
                <div className='mobTitle' >
                  {video.items[0].snippet.title}
                </div>
                <div className='mobchannel' >
                  <div>
                    {video.items[0].snippet.channelTitle}•
                  </div>


                  <div style={{ marginLeft: "0.8rem" }} >
                    {/* {numeral(views).format('0.a')} Views • */}
                  </div>

                  <div style={{ marginLeft: "0.8rem" }} >
                    {/* {DateTime.fromISO(publishedAt).toRelative()} */}
                    {DateTime.fromISO(video.items[0].snippet.publishedAt).toRelative()}

                  </div>
                </div>

                {/* <div style={{ cursor: 'pointer', display: "flex", alignItems: "center", justifyContent: "flex-end" }}  >
                                    <div className='cmnticon' style={{}} title='comments'
                                    // onClick={revFunc}
                                    >
                                        <FaRegComment style={{ fontSize: "18px", margin: '0.5rem', marginTop: '0.6rem', }} />
                                      

                                    </div>


                                    <div title='send to chat' className='sendToChat'
                                    // onClick={sendToChatFunc}
                                    >
                                        <IoFlashOutline style={{ fontSize: "21px", margin: '0.5rem' }} ></IoFlashOutline>
                                    </div>
                                </div> */}
              </div>





            </div>



          </div>


        </div>

      </div>
    </>
  )
}

