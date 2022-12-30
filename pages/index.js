import Link from 'next/link'
import { Spinner } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import Layout from '../components/Layout'
import { useContext, useEffect, useState } from 'react'
import { useAppContext, useFeedContext, useGeneralContext } from '../context'
import { host } from '../host'
import FeedpostItems from '../components/FeedPostItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast, ToastContainer } from 'react-toastify'
//eyJhbGciOiJIUzI1NiJ9.NjI3YzA0ZjQxYWUxYWNhYjM3NDliYjMw.KF2eD9F5dp3_f1hcMsoSgvA70uxsit1Fl4v2tFBiqtg
export default function Home() {
  const context = useAppContext()
  const genContext = useGeneralContext()
  const { guest } = genContext.genstate
  const { _id, username } = context.sharedState
  const feed_context = useFeedContext()
  const [feed, setfeed] = useState([])

  useEffect(() => {
    // console.log(context.sharedState.feed)
    console.log(feed_context)

    if (guest == true) {
      get_Recomment_Posts()
      toast(`As you don't follow anyone, showing you the lastest posts as they happen ⌛`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"

      })
    } else if (_id) {
      fetchfeed()
    }
  }, [context.sharedState.feed, username, guest])


  async function fetchfeed() {

    if (username) {

      let ids = context.sharedState.feed.slice(feed_context.feedstate.feed_Data.length, (feed_context.feedstate.feed_Data.length + 10))
      try {
        const response = await fetch(`${host}/api/post/fetchfeed`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ feed_postIds: ids, userId: context.sharedState._id })
        })
        const json = await response.json();
        const { feedDataArray } = json
        console.log(feedDataArray)
        setfeed(feedDataArray)
        let obj = {
          feed_Data: [...feed_context.feedstate.feed_Data, ...feedDataArray.reverse()]
        }

        feed_context.setfeedstate(obj)

      } catch (error) {
        console.log(error)
      }

    }
  }

  async function get_Recomment_Posts() {
    try {

      const response = await fetch(`${host}/api/post/getRecommendedPosts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },

      })
      const json = await response.json();

      console.log(json)
      let obj = {
        feed_Data: [...feed_context.feedstate.feed_Data, ...json]
      }

      feed_context.setfeedstate(obj)


    } catch (error) {

    }
  }

  const fetchNew = () => {
    fetchfeed()
  }

  return (
    <>
      <ToastContainer />
      <div onClick={() => {
        // console.log(feed_context)
      }} style={{
        display: 'flex', flexDirection: 'row', boxSizing: 'border-box', justifyContent: 'center', position: "relative"
      }}>
        <div className={styles.feedDiv} style={{}}>
          <div style={{ marginBottom: "90vh" }} >

            <InfiniteScroll

              id='myHeader'
              dataLength={feed_context.feedstate.feed_Data.length}
              next={fetchNew}
              hasMore={true}
              className='row'
              loader={
                <div style={{ width: "100%", textAlign: "center" }}>
                  <Spinner style={{ margin: "40vh 0", color: "skyblue" }} />
                </div>
                }
              style={{ padding: 0, margin: 0, marginBottom: '7vh' }}
            >

              {
                feed_context.feedstate.feed_Data.map((f) => {
                  if (feed && feed.isDeleted == true) {
                    return
                  } else {
                    return (
                      <>
                        <FeedpostItems feed={f} ></FeedpostItems>
                      </>
                    )
                  }

                })
              }



            </InfiniteScroll>



          </div>



        </div>



        <div className={styles.recommendation} style={{ width: '30%' }}>
          <div style={{ color: 'black', margin: "1rem", }}>

            <div style={{
              maxHeight: '60vh', padding: '0.5rem', overflowY: 'scroll', scrollMargin: 0, borderRadius: "2rem",
              backgroundColor: 'rgb(15,15,15)', marginBottom: "1rem"
            }}>
              {/* {flw_Recommendations.map((recomm, i) => {
                return (
                  <>
                    {
                      recomm._id == _id ? "" :
                        <Recomm recomm={recomm} key={i} guest={guest} />
                    }
                  </>

                )
              })} */}
            </div>


            <Link href='/terms-of-service' style={{ fontSize: "12px", color: "rgb(93, 93, 93)", display: "block", textDecoration: "none", marginBottom: "0.5rem" }} className='info_tos'  >Terms of Service
            </Link>
            <Link href='/about' style={{ fontSize: "12px", color: "rgb(93, 93, 93)", display: "block", textDecoration: "none", marginBottom: "0.5rem" }} className='info_about'  >
              About
            </Link>
            <Link href='/privacy' style={{ fontSize: "12px", color: "rgb(93, 93, 93)", display: "block", textDecoration: "none", marginBottom: "0.5rem" }} className='info_privacy'  >
              Privacy
            </Link>
            <Link href='/contact-us' style={{ fontSize: "12px", color: "rgb(93, 93, 93)", display: "block", textDecoration: "none", marginBottom: "0.5rem" }} className='info_privacy'  >
              Contact Us
            </Link>
            <p style={{ fontSize: "12px", color: "rgb(93, 93, 93)", }} className='info_privacy'>
              @All rights reserved
            </p>

          </div>
        </div>
      </div>

    </>
  )
}
