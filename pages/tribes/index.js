import Link from 'next/link'
import React, { useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import styles from "../../styles/Tribes.module.css"
import { useAppContext, useGeneralContext } from '../../context';
import { FaMask } from 'react-icons/fa'
import { useRouter } from 'next/router'
import CreateTribe from '../../components/CreateTribe'

const Tribes = () => {
  const context = useAppContext()
  const { profileImg } = context.sharedState
  const [tribes, settribes] = useState([])
  const [darkMode, setdarkMode] = useState(true)
  const router = useRouter()
  return (
    <>

      <div className='stickba' style={{ height: "6vh", padding: "0.5rem", position: "sticky", top: "56px", zIndex: 99, backgroundColor: "#121417" }} >

        <div className='pop' style={{ display: "flex", width: "100%", justifyContent: "space-evenly " }} >

          <div onClick={() => {
            router.push(`/tribes?feed`, undefined, { shallow: true })
          }} className='op' style={{ backgroundColor: router.asPath === "/tribes?feed" ? "#212121" : "" }} >
            Feed
          </div>
          <div onClick={() => {
            router.push(`/tribes?popular`, undefined, { shallow: true })
          }} className='op' style={{ backgroundColor: router.asPath === "/tribes?popular" ? "#212121" : "" }} >
            Popular
          </div>
          <div onClick={() => { router.push("/tribes") }} className='op' style={{ backgroundColor: router.asPath === "//tribes" ? "#212121" : "" }} >
            Tribes
          </div>
          <div onClick={() => {
            router.push(`/tribes?createtribe`, undefined, { shallow: true })
          }} className='op' style={{ backgroundColor: router.asPath === "/tribes?createtribe" ? "#212121" : "" }} >
            Create Tribe
          </div>


        </div >


      </div >
      {
        router.asPath === "/tribes" ?
          < Row className={styles.cardMainRow} style={{ margin: '0', display: "flex" }}  >


            {/* below code is for how will anonymous accounts will look like */}
            {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "end", width: "auto" }} >
              <FaMask size={13} />

              <img src="http://res.cloudinary.com/dbyaeywo3/image/upload/v1663869209/o812vtiqrymhbqbvbwib.png" alt="" style={{ width: "32px", borderRadius: "50%" }} />
            </div > */}


            <InfiniteScroll
              id='myHeader'
              dataLength={tribes.length}
              // next={fetchNew}
              hasMore={true}
              className={styles.row}

              loader={

                // !nomore 
                true
                  ?
                  <div style={{ textAlign: "center", width: "100%", padding: 0, display: "flex", justifyContent: "center", height: "100px" }} >
                    <Spinner animation="border" color='orange' style={{ color: "orange" }} />
                  </div> : ""
              }
              style={{ padding: 0, margin: 0, display: "flex", justifyContent: "center", }}
            >

              {
                tribes.map((peep, i) =>
                  <Col
                    
                    className={styles.row}
                    lg={3} md={4} xs={6} key={i} style={{ margin: "0 0 1rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                    <Link scroll={false} href={`/${peep.username}`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                      <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                        <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                          <img className={styles.img} style={{ margin: "4px 0" }} src={peep.profileImg} alt="" />
                        </div>


                        <div style={{ padding: "0.5rem" }} >

                          <div style={{ display: "flex" }} >
                            <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>{peep.name}</b></p>
                            {/* <h6>Entrepreneur</h6> */}
                          </div>
                          <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                            {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                            {peep.about}
                          </p>

                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p className={styles.card_p} style={
                              darkMode ?
                                { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                            } >
                              {peep.profession}
                            </p>
                            <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >
                              {peep.totalRatingsLength > 0 ?

                                peep.totalRating / peep.totalRatingsLength : '5'}


                            </p>

                          </div>

                        </div>
                        {/* <p>Architect & Engineer</p> */}
                      </div>
                    </Link>



                  </Col>

                )
              }



              <Col

                className={styles.row}
                lg={3} md={4} xs={6} style={{ margin: "0 0 1rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                <Link scroll={false} href={`/tribes/tribename`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                  <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                    <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                      <img className={styles.img} style={{ margin: "4px 0" }} src={profileImg} alt="" />
                    </div>


                    <div style={{ padding: "0.5rem" }} >

                      <div style={{ display: "flex" }} >
                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>
                          Cricket</b></p>
                        {/* <h6>Entrepreneur</h6> */}
                      </div>
                      <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                        This tribe is all about cricket. From 1940s till now we have a huge cricket fanbase all around the world
                      </p>

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p className={styles.card_p} style={
                          darkMode ?
                            { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                        } >
                          {/* {peep.profession} */}
                          Sports
                        </p>
                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >
                          {/* {peep.totalRatingsLength > 0 ?

                      peep.totalRating / peep.totalRatingsLength : '5'}
                     */}
                          69K Tribals
                        </p>

                      </div>

                    </div>
                    {/* <p>Architect & Engineer</p> */}
                  </div>
                </Link>



              </Col>
              <Col

                className={styles.row}
                lg={3} md={4} xs={6} style={{ margin: "0 0 1rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                <Link scroll={false} href={`/tribes/tribename`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                  <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                    <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                      <img className={styles.img} style={{ margin: "4px 0" }} src="http://res.cloudinary.com/dbyaeywo3/image/upload/v1663869209/o812vtiqrymhbqbvbwib.png" alt="" />
                    </div>


                    <div style={{ padding: "0.5rem" }} >

                      <div style={{ display: "flex" }} >
                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>
                          Cricket</b></p>
                        {/* <h6>Entrepreneur</h6> */}
                      </div>
                      <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                        This tribe is all about cricket. From 1940s till now we have a huge cricket fanbase all around the world
                      </p>

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p className={styles.card_p} style={
                          darkMode ?
                            { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                        } >
                          {/* {peep.profession} */}
                          Sports
                        </p>
                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >
                          {/* {peep.totalRatingsLength > 0 ?

                      peep.totalRating / peep.totalRatingsLength : '5'}
                     */}
                          69K Tribals
                        </p>

                      </div>

                    </div>
                    {/* <p>Architect & Engineer</p> */}
                  </div>
                </Link>



              </Col>
              <Col

                className={styles.row}
                lg={3} md={4} xs={6} style={{ margin: "0 0 1rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                <Link scroll={false} href={`/tribes/tribename`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                  <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                    <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                      <img className={styles.img} style={{ margin: "4px 0" }} src='./icon-384x384.png' alt="" />
                    </div>


                    <div style={{ padding: "0.5rem" }} >

                      <div style={{ display: "flex" }} >
                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>
                          Cricket</b></p>
                        {/* <h6>Entrepreneur</h6> */}
                      </div>
                      <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                        This tribe is all about cricket. From 1940s till now we have a huge cricket fanbase all around the world
                      </p>

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p className={styles.card_p} style={
                          darkMode ?
                            { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                        } >
                          {/* {peep.profession} */}
                          Sports
                        </p>
                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >
                          {/* {peep.totalRatingsLength > 0 ?

                      peep.totalRating / peep.totalRatingsLength : '5'}
                     */}
                          69K Tribals
                        </p>

                      </div>

                    </div>
                    {/* <p>Architect & Engineer</p> */}
                  </div>
                </Link>



              </Col>
              <Col

                className={styles.row}
                lg={3} md={4} xs={6} style={{ margin: "0 0 1rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                <Link scroll={false} href={`/tribes/tribename`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                  <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                    <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                      <img className={styles.img} style={{ margin: "4px 0" }} src={profileImg} alt="" />
                    </div>


                    <div style={{ padding: "0.5rem" }} >

                      <div style={{ display: "flex" }} >
                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>
                          Cricket</b></p>
                        {/* <h6>Entrepreneur</h6> */}
                      </div>
                      <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                        This tribe is all about cricket. From 1940s till now we have a huge cricket fanbase all around the world
                      </p>

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p className={styles.card_p} style={
                          darkMode ?
                            { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                        } >
                          {/* {peep.profession} */}
                          Sports
                        </p>
                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >
                          {/* {peep.totalRatingsLength > 0 ?

                      peep.totalRating / peep.totalRatingsLength : '5'}
                     */}
                          69K Tribals
                        </p>

                      </div>

                    </div>
                    {/* <p>Architect & Engineer</p> */}
                  </div>
                </Link>



              </Col>
              <Col

                className={styles.row}
                lg={3} md={4} xs={6} style={{ margin: "0 0 1rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                <Link scroll={false} href={`/tribes/tribename`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                  <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                    <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                      <img className={styles.img} style={{ margin: "4px 0" }} src="http://res.cloudinary.com/dbyaeywo3/image/upload/v1663869209/o812vtiqrymhbqbvbwib.png" alt="" />
                    </div>


                    <div style={{ padding: "0.5rem" }} >

                      <div style={{ display: "flex" }} >
                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>
                          Cricket</b></p>
                        {/* <h6>Entrepreneur</h6> */}
                      </div>
                      <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                        This tribe is all about cricket. From 1940s till now we have a huge cricket fanbase all around the world
                      </p>

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p className={styles.card_p} style={
                          darkMode ?
                            { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                        } >
                          {/* {peep.profession} */}
                          Sports
                        </p>
                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >
                          {/* {peep.totalRatingsLength > 0 ?

                      peep.totalRating / peep.totalRatingsLength : '5'}
                     */}
                          69K Tribals
                        </p>

                      </div>

                    </div>
                    {/* <p>Architect & Engineer</p> */}
                  </div>
                </Link>



              </Col>
              <Col

                className={styles.row}
                lg={3} md={4} xs={6} style={{ margin: "0 0 1rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                <Link scroll={false} href={`/tribes/tribename`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                  <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                    <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                      <img className={styles.img} style={{ margin: "4px 0" }} src='./icon-384x384.png' alt="" />
                    </div>


                    <div style={{ padding: "0.5rem" }} >

                      <div style={{ display: "flex" }} >
                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>
                          Cricket</b></p>
                        {/* <h6>Entrepreneur</h6> */}
                      </div>
                      <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                        This tribe is all about cricket. From 1940s till now we have a huge cricket fanbase all around the world
                      </p>

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p className={styles.card_p} style={
                          darkMode ?
                            { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                        } >
                          {/* {peep.profession} */}
                          Sports
                        </p>
                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >
                          {/* {peep.totalRatingsLength > 0 ?

                      peep.totalRating / peep.totalRatingsLength : '5'}
                     */}
                          69K Tribals
                        </p>

                      </div>

                    </div>
                    {/* <p>Architect & Engineer</p> */}
                  </div>
                </Link>



              </Col>
              <Col

                className={styles.row}
                lg={3} md={4} xs={6} style={{ margin: "0 0 1rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                <Link scroll={false} href={`/tribes/tribename`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                  <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                    <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                      <img className={styles.img} style={{ margin: "4px 0" }} src={profileImg} alt="" />
                    </div>


                    <div style={{ padding: "0.5rem" }} >

                      <div style={{ display: "flex" }} >
                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>
                          Cricket</b></p>
                        {/* <h6>Entrepreneur</h6> */}
                      </div>
                      <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                        This tribe is all about cricket. From 1940s till now we have a huge cricket fanbase all around the world
                      </p>

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p className={styles.card_p} style={
                          darkMode ?
                            { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                        } >
                          {/* {peep.profession} */}
                          Sports
                        </p>
                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >
                          {/* {peep.totalRatingsLength > 0 ?

                      peep.totalRating / peep.totalRatingsLength : '5'}
                     */}
                          69K Tribals
                        </p>

                      </div>

                    </div>
                    {/* <p>Architect & Engineer</p> */}
                  </div>
                </Link>



              </Col>
              <Col

                className={styles.row}
                lg={3} md={4} xs={6} style={{ margin: "0 0 1rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                <Link scroll={false} href={`/tribes/tribename`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                  <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                    <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                      <img className={styles.img} style={{ margin: "4px 0" }} src="http://res.cloudinary.com/dbyaeywo3/image/upload/v1663869209/o812vtiqrymhbqbvbwib.png" alt="" />
                    </div>


                    <div style={{ padding: "0.5rem" }} >

                      <div style={{ display: "flex" }} >
                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>
                          Cricket</b></p>
                        {/* <h6>Entrepreneur</h6> */}
                      </div>
                      <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                        This tribe is all about cricket. From 1940s till now we have a huge cricket fanbase all around the world
                      </p>

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p className={styles.card_p} style={
                          darkMode ?
                            { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                        } >
                          {/* {peep.profession} */}
                          Sports
                        </p>
                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >
                          {/* {peep.totalRatingsLength > 0 ?

                      peep.totalRating / peep.totalRatingsLength : '5'}
                     */}
                          69K Tribals
                        </p>

                      </div>

                    </div>
                    {/* <p>Architect & Engineer</p> */}
                  </div>
                </Link>



              </Col>
              <Col

                className={styles.row}
                lg={3} md={4} xs={6} style={{ margin: "0 0 1rem 0", padding: "0.5rem", borderRadius: "1rem", }}   >
                <Link scroll={false} href={`/tribes/tribename`} style={{ textDecoration: "none", color: 'inherit', height: "100%", width: "100%" }} >
                  <div className={darkMode ? styles.linkCard_dm : styles.linkCard} style={{ height: "100%", width: "100%" }}  >
                    <div className={styles.imgupdiv} style={darkMode ? { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(70,70,70)" } : { display: "flex", justifyContent: "center", borderRadius: " 0", backgroundColor: "rgb(214,214,214)" }} >
                      <img className={styles.img} style={{ margin: "4px 0" }} src='./icon-384x384.png' alt="" />
                    </div>


                    <div style={{ padding: "0.5rem" }} >

                      <div style={{ display: "flex" }} >
                        <p style={{ textAlign: "center", width: "100%", fontSize: "14px", marginBottom: "0.5rem" }} ><b>
                          Cricket</b></p>
                        {/* <h6>Entrepreneur</h6> */}
                      </div>
                      <p className={styles.ppp} style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                        {/* Student at Veermata Jijabai Technological Institute (VJTI) */}
                        This tribe is all about cricket. From 1940s till now we have a huge cricket fanbase all around the world
                      </p>

                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p className={styles.card_p} style={
                          darkMode ?
                            { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "#212121", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" } : { fontSize: "12px", fontFamily: "sans-serif", marginBottom: "0.5rem", backgroundColor: "rgb(225, 225, 225)", padding: "0.15rem 0.5rem", borderRadius: "16px", whiteSpace: 'pre-wrap', wordBreak: "break-word" }
                        } >
                          {/* {peep.profession} */}
                          Sports
                        </p>
                        <p style={{ fontSize: "13px", fontFamily: "sans-serif", marginBottom: "0.5rem", display: "flex", alignItems: "center", fontWeight: "600", marginLeft: "4px" }} >
                          {/* {peep.totalRatingsLength > 0 ?

                      peep.totalRating / peep.totalRatingsLength : '5'}
                     */}
                          69K Tribals
                        </p>

                      </div>

                    </div>
                    {/* <p>Architect & Engineer</p> */}
                  </div>
                </Link>



              </Col>


            </InfiniteScroll>


          </Row > : ""
      }

      {
        router.asPath === "/tribes?feed" ?
          "Tribes Feed" : ""
      }
      {
        router.asPath === "/tribes?popular" ?
          "Tribes popular" : ""
      }
      {
        router.asPath === "/tribes?createtribe" ?
          <CreateTribe />
          : ""
      }


    </>
  )
}

export default Tribes