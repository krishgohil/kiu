import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
import { ToastContainer, toast } from 'react-toastify';
// import { SET_GUEST } from '../../redux/actionType'
import { MdOutlineCopyright } from 'react-icons/md'
import Accordion from 'react-bootstrap/Accordion';
// import { Helmet } from 'react-helmet'
import styles from "../styles/About.module.css"
import { useAppContext, useGeneralContext } from '../context';
import { host } from '../host';
import { useRouter } from 'next/router';

const About = () => {

    // const {  } = useSelector(state => state.generalReducer)

    const context = useAppContext()
    const genContext = useGeneralContext()
    // const {  } = genContext.genstate
    const { _id, username,guest } = context.sharedState
    const router = useRouter()



    const gotosignup = () => {
        dispatch(signInTry())
        navigate('/signup')
    }
    const gotologin = () => {
        dispatch(logintry())
        navigate('/login')
    }

    const gotoAbout = () => {
        navigate('/info/about')
    }

    const termOfservice = () => {
        navigate('/info/terms-of-service')
    }

    const gotoPrivacy = () => {
        navigate('/info/privacy')
    }
    const gotoContactUs = () => {
        navigate('/info/contact-us')
    }

    const enterAsGuestFunc = () => {
        console.log("akfdksafkdsl")
        // genContext.setgenstate({ ...genContext.genstate, guest: true })
        context.setsharedState({...context.sharedState,guest:true})



        toast.success(`Continuing as Guest 😄`, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        setTimeout(() => {
            router.push("/")
        }, 1500);
    }


    const homeFunc = () => {
        if (guest == false) {
            navigate("/")
        }
    }

    return (
        <>
            <dialog dialog open style={{ position: 'absolute', border: 'none', color: 'white', zIndex: 999, left: '0%', backgroundColor: "#1c1f24", height: '100vh', width: '100vw', position: 'fixed', display: 'flex', overflow: 'hidden', justifyContent: 'center', top: '0vh', padding: 0 }}>

                <ToastContainer />

                <div className={styles.okj} style={{ color: 'white', height: "100vh" }} >
                    <header style={{
                        display: 'flex', height: "10vh",
                        alignItems: 'center', justifyContent: "space-around",
                    }} >
                        <div style={{ display: "flex", alignItems: 'center', userSelect: "none" }} onClick={homeFunc} >
                            <img alt="img" src="/star-removebg-preview.png" style={{ marginLeft: "0.5rem", width: "3rem" }} />
                            <span className={styles.lpcname} style={{ marginLeft: "0.5rem", fontWeight: "500" }} >Keepitupp</span>
                        </div>
                        {
                            !_id ?

                                <div style={{ display: "flex" }} >
                                    <button
                                        onClick={gotosignup} className={styles.sign_up} style={{

                                            borderRadius: '1rem',
                                            // border: '1px solid rgb(119, 230, 252)',
                                            border: 'none',
                                            padding: "0.25rem 0.75rem",
                                            // backgroundColor: "rgb(0, 0, 0)", color: 'white'
                                        }} >Sign Up</button>
                                    <button className={styles.guest}
                                        onClick={enterAsGuestFunc} style={{
                                            borderRadius: '1rem', border: '1px solid rgb(119, 230, 252)',
                                            border: "none",
                                            padding: "0.25rem 0.75rem",
                                            marginLeft: '1rem'

                                        }} >Guest</button>
                                </div> : ""
                        }
                        {
                            // _id && _id.length == 24 && guest == false ?
                            _id && _id.length == 24 ?
                                <div onClick={() => window.open(`$${host}/${username}`, '_blank')} style={{ fontWeight: "500", cursor: "pointer" }} >
                                    {username}
                                </div>
                                : ""
                        }

                    </header>
                    <div className={styles.ioj} style={{ height: '90vh', overflowY: 'scroll', scrollMargin: 0 }} >


                        <div className={styles.pokl}  >

                            <div className={styles.lplayerone} >
                                <div className={styles.lptitleImg} >
                                    <div className={styles.lpslogan}>
                                        <span style={{ color: "#2bd9bf" }}>People</span> <span style={{ color: "#f74877" }} >Pictures</span> & <span style={{ color: "orange" }} >Products</span>
                                        {/* Make Friends, Explore New Products */}
                                    </div>
                                    <div className={styles.lpimg1div} >
                                        <img alt="img" src="https://res.cloudinary.com/dbyaeywo3/image/upload/v1660816164/Keeptupp%20private/myeyes_souhbq.jpg" className={styles.lpimg1} />
                                    </div>


                                </div>
                                <div className={styles.lpsubdet} >
                                    {/* <div>
                                    <img alt="img" src="/ss1.png" style={{
                                        zIndex: 999, objectFit: "cover", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)"
                                    }} />
                                    <div style={{ fontSize: "22px" }} >
                                        Express your thoughts ...
                                    </div>
                                </div> */}

                                    <div style={{ marginTop: "3rem", fontSize: "30px", fontWeight: "500" }}
                                    >
                                        Bringing People Together
                                    </div>
                                    <img alt="img" src="https://res.cloudinary.com/dbyaeywo3/image/upload/v1660816165/Keeptupp%20private/helena_mwwfho.jpg" style={{
                                        zIndex: 999, objectFit: "cover", width: "100%", marginTop: "1rem"
                                    }} />

                                    <div style={{ fontSize: "28px", fontWeight: "400", marginTop: "1rem" }} >
                                        Connect with more people, build influence, and create compelling content that is distinctly yours.
                                    </div>

                                </div>


                            </div>

                            <div className={styles.lplayertwo}   >
                                <div style={{ marginTop: "5rem", fontSize: "30px", color: "", }} >
                                    <div style={{ fontWeight: "600", }} >  Launch Your Product 🚀</div>
                                    <div style={{ fontFamily: "cursive", marginBottom: "0.5rem" }}  >Beginning of Something Great </div>
                                </div>

                                <Swiper
                                    className={styles.lpprdctswiper}
                                    // className='jkliop'
                                    // style={{ width: '30%', height: "auto", backgroundColor: "#16181b", margin: "0" }}
                                    // install Swiper modules
                                    modules={[Autoplay]}
                                    // spaceBetween={50}
                                    slidesPerView={1}
                                    navigation={false}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{ clickable: false }}
                                    scrollbar={{ draggable: false }}

                                >
                                    <SwiperSlide style={{ margin: "0 0rem", width: '100%', backgroundColor: '#16181b', display: "flex", alignItems: "center" }} >
                                        <img alt="img" style={{ width: '100%', backgroundColor: '#16181b', }}
                                            // onDoubleClick={dbclick}
                                            className={styles.postImg}
                                            // className={doubleclicked && showamim ? 'postImg a' : 'postImg'}
                                            src='https://res.cloudinary.com/dbyaeywo3/image/upload/v1660816168/Keeptupp%20private/shoes_suwvcy.jpg' />

                                    </SwiperSlide>
                                    <SwiperSlide style={{ margin: "0 0rem", width: '100%', backgroundColor: '#16181b', display: "flex", alignItems: "center" }} >
                                        <img alt="img" style={{ width: '100%', backgroundColor: '#16181b', }}
                                            // onDoubleClick={dbclick}
                                            className={styles.postImg}
                                            // className={doubleclicked && showamim ? 'postImg a' : 'postImg'}
                                            src='https://res.cloudinary.com/dbyaeywo3/image/upload/v1660816149/Keeptupp%20private/SS2_jtd9nk.png' />

                                    </SwiperSlide>
                                </Swiper>
                                {/* <img alt="img" src="/shoes.jpg" style={{
                            zIndex: 999, objectFit: "cover", width: "30%", marginTop: "1rem"
                        }} />
                        <img alt="img" src="/SS2.png" style={{
                            zIndex: 999, width: "30%", marginTop: "1rem"
                        }} /> */}

                            </div>


                            <div className={styles.lplayerthree} >

                                <Swiper
                                    // className='jkliop'
                                    className={styles.lpthreeswiper}
                                    // style={{ width: '30%', height: "auto", backgroundColor: "#16181b", margin: "0" }}
                                    // install Swiper modules
                                    modules={[Autoplay]}
                                    // spaceBetween={50}
                                    slidesPerView={1}
                                    navigation={false}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{ clickable: false }}
                                    scrollbar={{ draggable: false }}

                                >
                                    <SwiperSlide style={{ margin: "0 0rem", width: '100%', backgroundColor: '#16181b', display: "flex", alignItems: "center" }} >
                                        <img alt="img" style={{ width: '100%', backgroundColor: '#16181b', }}
                                            // onDoubleClick={dbclick}
                                            className={styles.postImg}
                                            // className={doubleclicked && showamim ? 'postImg a' : 'postImg'}
                                            src='https://res.cloudinary.com/dbyaeywo3/image/upload/v1660816155/Keeptupp%20private/ss5_eztl5m.png' />

                                    </SwiperSlide>

                                </Swiper>




                                <div className={styles.lpthreedetpc}  >
                                    <div style={{ fontWeight: "600", marginBottom: "5rem", }} > Get Your Product Page</div>
                                    <div style={{ fontFamily: "cursive", fontSize: "26px", color: "aliceblue" }}  >Ready to share link _</div>
                                    <div style={{ fontFamily: "cursive", fontSize: "26px", color: "aliceblue" }}  >To all other Social Medias</div>
                                </div>
                                <div className={styles.lpthreedetmob} style={{ fontFamily: "cursive", fontSize: "26px", color: "aliceblue", marginTop: "1rem" }}  >Ready to share link _</div>
                                <div className={styles.lpthreedetmob} style={{ fontFamily: "cursive", fontSize: "26px", color: "aliceblue", marginBottom: "2rem" }}  >To all other Social Medias</div>

                            </div>





                            <div style={{ display: "flex", justifyContent: "center" }} >
                                <div className={styles.lpmission} >
                                    <div style={{ fontWeight: "500", marginBottom: "2rem", }} >
                                        Read Review Rethink
                                    </div >
                                    Our Mission Is to Empower    Educate &  Entertain People


                                </div>
                            </div>
                            <div className={styles.lplayerfour} >
                                <div className=''  >
                                    <div style={{ fontSize: "20px", fontFamily: "cursive", marginBottom: "0.5rem" }} >
                                        Read About Cryptos
                                    </div>
                                    <img alt="img" style={{ backgroundColor: '#16181b', }}
                                        src='https://res.cloudinary.com/dbyaeywo3/image/upload/v1660816153/Keeptupp%20private/ss7_lnjdwp.png' />
                                </div>
                                <div className={styles.lplayerfourcard}  >
                                    <div className={styles.kadllkfjalkd} >
                                        <div style={{ fontSize: "22px", fontFamily: "cursive", marginBottom: "0.5rem" }} >
                                            Express your thoughts ...
                                        </div>
                                        <img alt="img" className={styles.plplayerfourimg} src="https://res.cloudinary.com/dbyaeywo3/image/upload/v1660816147/Keeptupp%20private/ss1_rttj4t.png" style={{
                                            zIndex: 999, objectFit: "cover", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)"
                                        }} />

                                    </div>

                                </div>


                            </div>
                            <div className={styles.lplayerfive} style={{ padding: "2rem 0", display: "flex", justifyContent: "center" }} >

                                <div className={styles.lplayerfiveSec}>
                                    <div style={{ fontSize: "20px", fontFamily: "cursive", marginBottom: "0.5rem" }} >
                                        Review Movies
                                    </div>
                                    <img alt="img" src="https://res.cloudinary.com/dbyaeywo3/image/upload/v1660816158/Keeptupp%20private/rev_dpwggb.png" style={{
                                        zIndex: 999, objectFit: "cover", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
                                        width: "100%"
                                    }} />
                                </div>

                            </div>


                            <div style={{ width: "100%", height: '90vh', background: "url(https://web-images.credcdn.in/_next/assets/images/home-page/trust-bg.jpg)", overflowY: "scroll", scrollMargin: 0 }} >
                                <Accordion style={{ width: "90%", margin: "auto" }} >
                                    <Accordion.Item eventKey="0" style={{ margin: "0.5rem 0" }} >
                                        <Accordion.Header  >Accordion Item #1</Accordion.Header>
                                        <Accordion.Body style={{ backgroundColor: "white", color: "black" }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                <Accordion style={{ width: "90%", margin: "auto" }} >
                                    <Accordion.Item eventKey="1" style={{ margin: "0.5rem 0" }} >
                                        <Accordion.Header  >Accordion Item #1</Accordion.Header>
                                        <Accordion.Body style={{ backgroundColor: "white", color: "black" }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                <Accordion style={{ width: "90%", margin: "auto" }} >
                                    <Accordion.Item eventKey="2" style={{ margin: "0.5rem 0" }} >
                                        <Accordion.Header  >Accordion Item #1</Accordion.Header>
                                        <Accordion.Body style={{ backgroundColor: "white", color: "black" }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                <Accordion style={{ width: "90%", margin: "auto" }} >
                                    <Accordion.Item eventKey="3" style={{ margin: "0.5rem 0" }} >
                                        <Accordion.Header  >Accordion Item #1</Accordion.Header>
                                        <Accordion.Body style={{ backgroundColor: "white", color: "black" }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                <Accordion style={{ width: "90%", margin: "auto" }} >
                                    <Accordion.Item eventKey="4" style={{ margin: "0.5rem 0" }} >
                                        <Accordion.Header  >Accordion Item #1</Accordion.Header>
                                        <Accordion.Body style={{ backgroundColor: "white", color: "black" }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                <Accordion style={{ width: "90%", margin: "auto" }} >
                                    <Accordion.Item eventKey="5" style={{ margin: "0.5rem 0" }} >
                                        <Accordion.Header  >Accordion Item #1</Accordion.Header>
                                        <Accordion.Body style={{ backgroundColor: "white", color: "black" }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                <Accordion style={{ width: "90%", margin: "auto" }} >
                                    <Accordion.Item eventKey="6" style={{ margin: "0.5rem 0" }} >
                                        <Accordion.Header  >Accordion Item #1</Accordion.Header>
                                        <Accordion.Body style={{ backgroundColor: "white", color: "black" }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                <Accordion style={{ width: "90%", margin: "auto" }} >
                                    <Accordion.Item eventKey="7" style={{ margin: "0.5rem 0" }} >
                                        <Accordion.Header  >Accordion Item #1</Accordion.Header>
                                        <Accordion.Body style={{ backgroundColor: "white", color: "black" }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                <Accordion style={{ width: "90%", margin: "auto" }} >
                                    <Accordion.Item eventKey="8" style={{ margin: "0.5rem 0" }} >
                                        <Accordion.Header  >Accordion Item #1</Accordion.Header>
                                        <Accordion.Body style={{ backgroundColor: "white", color: "black" }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>

                                </Accordion>
                                <Accordion style={{ width: "90%", margin: "auto" }} >
                                    <Accordion.Item eventKey="9" style={{ margin: "0.5rem 0" }} >
                                        <Accordion.Header  >Accordion Item #1</Accordion.Header>
                                        <Accordion.Body style={{ backgroundColor: "white", color: "black" }}>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>



                            {/* <div className='lplayerfive' style={{ paddingTop: "2rem", display: "flex", justifyContent: "center" }} >
                            <div className='lplayerfiveSec'>
                                <div style={{ fontSize: "28px", fontFamily: "cursive", marginBottom: "0.5rem" }} >
                                    Post Fun
                                </div>
                                <img alt="img" src="/fun.jpg" style={{
                                    zIndex: 999, objectFit: "cover", boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.5)",
                                    width: "80%"
                                }} />
                            </div>

                        </div> */}
                        </div>




                        <footer className={styles.lpfooter} >
                            <div className={styles.lpfooterlone}  >

                                <div style={{ textAlign: "center" }} >
                                    <img alt="img" src='/star-removebg-preview.png' style={{ width: "10rem", userSelect: "none" }} ></img>
                                    <h3 style={{ marginBottom: "1rem", userSelect: "none" }} >Keepitupp</h3>
                                    <p style={{ width: "80%", margin: "0 auto" }} >We are creating a Safe , Secure and Trust based Social Media</p>
                                </div>

                                <div style={{ color: "silver", cursor: "pointer" }} >
                                    <p onClick={termOfservice} >Terms of Service</p>
                                    <p onClick={gotoPrivacy} >Privacy</p>
                                    <p onClick={gotoContactUs} >Contact Us</p>
                                    <p onClick={gotoAbout}>About</p>
                                </div>
                            </div>
                            <div style={{
                                marginTop: '2rem',
                                color: "gray", textAlign: "center"
                            }} >
                                Copyright <MdOutlineCopyright /> <span>Keepitupp</span> 2022 @All rights reserved
                            </div>
                        </footer>

                    </div>
                </div>
            </dialog>

        </>

    )
}

export default About