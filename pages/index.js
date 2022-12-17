import Link from 'next/link'
import { Spinner } from 'react-bootstrap'
import styles from "../styles/Home.module.css"
import Layout from '../components/Layout'

//eyJhbGciOiJIUzI1NiJ9.NjI3YzA0ZjQxYWUxYWNhYjM3NDliYjMw.KF2eD9F5dp3_f1hcMsoSgvA70uxsit1Fl4v2tFBiqtg
export default function Home() {
  return (
    <>
      <div style={{
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
            <Spinner />
            jjjj Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis corporis ipsa velit voluptate eius libero id itaque quidem laudantium et quia iste soluta quo tempora aut illum, reiciendis excepturi ex quod? Error corrupti id facere nisi? Cumque expedita ad facere voluptate a aliquid, animi quia at ullam ut cupiditate illum iste quos exercitationem et, soluta ab vel nobis aperiam atque odio ex quam optio corrupti? Iusto, corrupti? Fuga debitis at, eligendi magni minima praesentium reiciendis earum distinctio mollitia, cupiditate labore blanditiis aliquid veritatis quod aut accusamus cumque voluptatibus amet veniam eos id commodi illo dolorem. Tenetur nostrum odit soluta optio.jjjj Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis corporis ipsa velit voluptate eius libero id itaque quidem laudantium et quia iste soluta quo tempora aut illum, reiciendis excepturi ex quod? Error corrupti id facere nisi? Cumque expedita ad facere voluptate a aliquid, animi quia at ullam ut cupiditate illum iste quos exercitationem et, soluta ab vel nobis aperiam atque odio ex quam optio corrupti? Iusto, corrupti? Fuga debitis at, eligendi magni minima praesentium reiciendis earum distinctio mollitia, cupiditate labore blanditiis aliquid veritatis quod aut accusamus cumque voluptatibus amet veniam eos id commodi illo dolorem. Tenetur nostrum odit soluta optio.jjjj Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis corporis ipsa velit voluptate eius libero id itaque quidem laudantium et quia iste soluta quo tempora aut illum, reiciendis excepturi ex quod? Error corrupti id facere nisi? Cumque expedita ad facere voluptate a aliquid, animi quia at ullam ut cupiditate illum iste quos exercitationem et, soluta ab vel nobis aperiam atque odio ex quam optio corrupti? Iusto, corrupti? Fuga debitis at, eligendi magni minima praesentium reiciendis earum distinctio mollitia, cupiditate labore blanditiis aliquid veritatis quod aut accusamus cumque voluptatibus amet veniam eos id commodi illo dolorem. Tenetur nostrum odit soluta optio.jjjj Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis corporis ipsa velit voluptate eius libero id itaque quidem laudantium et quia iste soluta quo tempora aut illum, reiciendis excepturi ex quod? Error corrupti id facere nisi? Cumque expedita ad facere voluptate a aliquid, animi quia at ullam ut cupiditate illum iste quos exercitationem et, soluta ab vel nobis aperiam atque odio ex quam optio corrupti? Iusto, corrupti? Fuga debitis at, eligendi magni minima praesentium reiciendis earum distinctio mollitia, cupiditate labore blanditiis aliquid veritatis quod aut accusamus cumque voluptatibus amet veniam eos id commodi illo dolorem. Tenetur nostrum odit soluta optio.jjjj Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis corporis ipsa velit voluptate eius libero id itaque quidem laudantium et quia iste soluta quo tempora aut illum, reiciendis excepturi ex quod? Error corrupti id facere nisi? Cumque expedita ad facere voluptate a aliquid, animi quia at ullam ut cupiditate illum iste quos exercitationem et, soluta ab vel nobis aperiam atque odio ex quam optio corrupti? Iusto, corrupti? Fuga debitis at, eligendi magni minima praesentium reiciendis earum distinctio mollitia, cupiditate labore blanditiis aliquid veritatis quod aut accusamus cumque voluptatibus amet veniam eos id commodi illo dolorem. Tenetur nostrum odit soluta optio.
          </div>


          {/* <Outlet /> */}

        </div>

        {/* <FrndRecommendation flw_Recommendations={flw_Recommendations} /> */}


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
