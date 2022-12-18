import Link from 'next/link'
import { Spinner } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import Layout from '../components/Layout'
import { useContext, useEffect, useState } from 'react'
import { useAppContext } from '../context'
import { host } from '../host'
import FeedpostItems from '../components/FeedPostItem'
//eyJhbGciOiJIUzI1NiJ9.NjI3YzA0ZjQxYWUxYWNhYjM3NDliYjMw.KF2eD9F5dp3_f1hcMsoSgvA70uxsit1Fl4v2tFBiqtg
export default function Home() {
  const context = useAppContext()
  const [feed, setfeed] = useState([])

  useEffect(() => {
    console.log(context.sharedState.feed)
    fetchfeed()
  }, [context.sharedState.feed])


  async function fetchfeed() {

    let ids = context.sharedState.feed.slice(0, 10)


    console.log(ids)
    console.log(host)

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

    } catch (error) {
      console.log(error)

    }
  }


  return (
    <>
      <div onClick={() => {
        console.log(context)
      }} style={{
        display: 'flex', flexDirection: 'row', boxSizing: 'border-box', justifyContent: 'center', position: "relative"
      }}>
        <div className={styles.feedDiv} style={{}}>
          <div style={{ marginBottom: "90vh" }} >

            {/* {
              show_feedPosts ?
                <>

                  < FeedPosts feed_postIds={feed_postIds} userId={_id} flw_recomms={flw_recomms} />
                </>

                :
                <>
                  {

                    userId ? <Spinner /> : ""
                  }


                </>
            } */}
            {
              feed.map((f) => {
                return (
                  <>
                    <div style={{ color: "white" }} ></div>                    <FeedpostItems feed={f} ></FeedpostItems>
                  </>
                )
              })
            }


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
