import React, { useEffect, useState } from 'react';
import styles from "../styles/Header.module.css"

import { FaBars } from 'react-icons/fa'
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineNewReleases, MdAddCircle, MdAddCircleOutline } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
// import Post from '../Post/Post';
// import { SET_CATEGORY, SET_REPOST } from '../../redux/actionType';
// import { useDispatch, useSelector } from 'react-redux'
// import Requests from '../requests/Requests';



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoFlashOutline } from 'react-icons/io5';
import { useAppContext, useGeneralContext } from '../context';
import { useRouter } from 'next/router';
import Requests from './Requests';





const Header = ({ handleToggleSidebar, colour, category, overflowhidden, showAddBtn, navbar, showsrchBar, sethomeScroll, addpost }) => {

  const [_input, setInput] = useState('')
  const [dikha, setdikha] = useState(false)
  const [showComposePost, setshowComposePost] = useState(false)
  const [modalno, setmodalno] = useState(0)
  const context = useAppContext()
  const genContext = useGeneralContext()
  const { guest } = genContext.genstate
  const { _id, username, profileImg } = context.sharedState
  const router = useRouter()
  const { query } = router.query

  // const { accessToken, loading } = useSelector(state => state.auth)
  // const profileImg = useSelector(state => state.auth2.profileImg)
  // const { username, _id, guest, notificationCount } = useSelector(state => state.auth2)

  // const { categoryfromstore, unSeenCount } = useSelector(state => state.generalReducer)
  // const currentcategory = sessionStorage.getItem('currentcategory')
  // const [deferredPrompt, setdeferredPrompt] = useState()

  useEffect(() => {
    console.log(guest)
  }, [context, guest])






  // useEffect(() => {
  //   console.log(category)
  //   // console.log(showComposePost)
  //   setInput('')
  //   let abc = sessionStorage.removeItem('currrentcategory')
  //   dispatch(setcategory())


  //   if (window.location.pathname === '/compose-post' && showComposePost === false) {
  //     // console.log('ye chala')
  //     // console.log(username)
  //     setshowComposePost(true)
  //     // router.push(-1)
  //   } else if (window.location.pathname === '/' && showComposePost === true) {
  //     console.log("false ki")
  //     setshowComposePost(false)
  //     dispatch({
  //       type: SET_REPOST,
  //       payload: {
  //         status: false,
  //         description: '',
  //         postimg: '',
  //         pUsername: '',
  //         pProfileImg: '',
  //         pDate: '',
  //       }
  //     })
  //   }
  //   else if (window.location.pathname === `/upp/${category}/compose-post`) {
  //     console.log(category)
  //     setshowComposePost(true)

  //     // router.push(-1)
  //   }
  //   else if (window.location.pathname === `/upp/${category}` && showComposePost === true) {
  //     setshowComposePost(false)
  //     dispatch({
  //       type: SET_REPOST,
  //       payload: {
  //         status: false,
  //         description: '',
  //         postimg: '',
  //         pUsername: '',
  //         pProfileImg: '',
  //         pDate: '',
  //       }
  //     })
  //   }
  //   else if (window.location.pathname === `/${username}/compose-post` && showComposePost === false) {
  //     setshowComposePost(true)
  //   }
  //   else if (window.location.pathname === `/${searchedusername}/compose-post` && showComposePost === false) {
  //     setshowComposePost(true)
  //   }
  //   else if (window.location.pathname === `/${username}` && showComposePost === true) {
  //     setshowComposePost(false)
  //     dispatch({
  //       type: SET_REPOST,
  //       payload: {
  //         status: false,
  //         description: '',
  //         postimg: '',
  //         pUsername: '',
  //         pProfileImg: '',
  //         pDate: '',
  //       }
  //     })
  //   }
  //   else if (window.location.pathname === `/${searchedusername}` && showComposePost === true) {
  //     setshowComposePost(false)
  //     dispatch({
  //       type: SET_REPOST,
  //       payload: {
  //         status: false,
  //         description: '',
  //         postimg: '',
  //         pUsername: '',
  //         pProfileImg: '',
  //         pDate: '',
  //       }
  //     })
  //   }
  //   else if (window.location.pathname === `/search/compose-post`) {
  //     setshowComposePost(true)
  //   }
  //   else if (window.location.pathname === `/post/${postId}/compose-post`) {
  //     setshowComposePost(true)
  //   }







  // }, [accessToken, loading, profileImg, window.location.pathname])

  const gotoprofile = () => {
    if (guest == false) {
      if (window.location.pathname == "/") { sethomeScroll() }

      router.push(`/${username}`)
    } else {
      toast(`SignUp to view your profile`, {
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


  useEffect(() => {
    if (router.asPath !== "/?notifications") {
      window.document.body.style.overflowY = 'scroll'
      window.document.body.style.scrollMargin = 0
      setdikha(false)
    } else {
      window.document.body.style.overflowY = 'hidden'
      window.document.body.style.scrollMargin = 0
      setdikha(true)
    }

  }, [router.isReady, router.asPath])






  // const setcategory = () => async dispatch => {
  //   // console.log(category)
  //   sessionStorage.setItem("currentcategory", category)
  //   dispatch({
  //     type: SET_CATEGORY,
  //     payload: category
  //   })
  // }

  const handleAddClick = () => {
    addpost()
  }

  // const handlecancel = () => {
  //   setshowComposePost(false)
  //   dispatch({
  //     type: SET_REPOST,
  //     payload: {
  //       status: false,
  //       description: '',
  //       postimg: '',
  //       pUsername: '',
  //       pProfileImg: '',
  //       pDate: '',
  //     }
  //   })
  //   router.push(-1)
  // }

  // let a = categoryfromstore ? categoryfromstore : ''
  // if (categoryfromstore) {
  //   // console.log('here1')
  //   a = categoryfromstore
  // } else if (category) {

  //   a = category
  // } else if (currentcategory != 'destress') {
  //   a = currentcategory
  // }
  // else {
  //   a = ''
  // }

  // const placeholder = `Search ${a}`


  const n = () => {
    window.document.body.style.overflowY = 'hidden'
    window.document.body.style.scrollMargin = 0
    router.push(`/?notifications`, undefined, { shallow: true, })


  }


  // const [modal, setmodal] = useState(false)

  // const ja = () => {
  //   router.push('/')
  //   console.log(deferredPrompt)
  //   if (deferredPrompt !== undefined) {
  //     setmodal(value => !value)
  //   }
  // }


  // const gotoChats = () => {

  //   if (guest == false) {
  //     if (window.location.pathname == "/") { sethomeScroll() }
  //     router.push('/upp/chats')
  //   } toast(`SignUp to chat with people`, {
  //     position: "top-center",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark"

  //   })

  // }



  // if (window) {
  //   window.addEventListener('beforeinstallprompt', (e) => {
  //     e.preventDefault();
  //     // console.log("beforeinstallprompt", e)
  //     setdeferredPrompt(e);
  //   });

  // }
  // const install = () => {
  //   // console.log('install', deferredPrompt)


  //   if (deferredPrompt !== undefined) {
  //     deferredPrompt.prompt();


  //     deferredPrompt.userChoice.then((choiceResult) => {

  //       setmodal(false)


  //       deferredPrompt = null;
  //     });
  //   } else {
  //     setmodal(false)
  //   }

  // }

  const gotosignup = () => {
    router.push("/signup")
  }


  const handleSubmit = e => {

    e.preventDefault()
    let x = _input.replace(/\s\s+/g, ' ')
    console.log(query)
    console.log(_input)
    console.log(x)
    console.log(router.asPath)

    if (router.asPath != `/search/${query}` &&
      router.asPath != `/search/${query}?posts` &&
      router.asPath != `/search/${query}?products` && category !== 'product') {
      if (category == "youtube") {
        setInput(x)
        router.push(`/searchyt/${x}`)
      } else {
        setInput(x)
        router.push(`/search/${x}`)
      }
    } else if (router.asPath == `/search/${query}?posts`) {
      if (category == "youtube") {
        setInput(x)
        // router.push(`/searchyt/${x}`)
      } else {
        setInput(x)
        router.push(`/search/${x}?posts`)
      }
    } else if (router.asPath == `/search/${query}?products` || category == 'product') {
      if (category == "youtube") {
        setInput(x)
        // router.push(`/searchyt/${x}`)
      } else {
        setInput(x)
        router.push(`/search/${x}?products`)
      }
    } else if (router.asPath == `/search/${query}`) {
      router.push(`/search/${x}`)
    }


  }


  return (
    <>
      <ToastContainer />


      {
        true ?

          <div className={styles.header} style={showComposePost ? { overflow: 'hidden' } : { backgroundColor: colour }}>




            <div className={styles.company} >
              <FaBars
                className={styles.header_menu}
                size={20}
                onClick={() => handleToggleSidebar()}
                style={{ marginLeft: "1rem" }}
              />
              <img alt="img" className={styles.companyLogo}
                // onClick={ja}
                src="/star-removebg-preview.png" style={{ zIndex: 999 }} />
              <span className={styles.companyName} style={{ color: 'white', fontFamily: 'cursive', marginLeft: "1rem" }}
              // onClick={ja}  
              >
                <b> <>
                  Keepitupp
                </></b>
              </span>

              {/* <img alt="img" className='companyLogo' src="/images/k.png"  style={{ zIndex: 999 }} /> */}
            </div>


            <form className={`${styles.header_form} ${styles.header_srchbar}`}
              onSubmit={handleSubmit}
            >
              <input
                className={styles.header_input}
                type='text'
                // placeholder={placeholder}
                placeholder='Search'
                value={_input}
                onChange={e => setInput(e.target.value)}
                maxLength={100}
              />
              <button type='submit' className={`${styles.sbmtbtn} ${styles.header_button}`}>
                <AiOutlineSearch size={22} />
              </button>
            </form>




            <div className={styles.mobprofimg} >

              {

                true ?
                  <>
                    <div style={{ position: "relative", cursor: "pointer" }} >
                      <MdOutlineNewReleases onClick={n} className={styles.iconHeader} size={25} style={{ marginRight: "0.8rem", backgroundColor: 'black', borderRadius: '50%' }} />
                      {/* {
                        notificationCount && notificationCount > 0 ?
                          <div style={{ position: "absolute", right: "6px", top: "-5px", color: "white", backgroundColor: "red", fontSize: "11px", borderRadius: "50%", padding: " 0 5px" }} >
                            {
                              notificationCount
                            }
                          </div>
                          : ""
                      } */}

                    </div>
                    <div style={{ position: "relative", cursor: "pointer" }} >

                      {/* {
                        unSeenCount.unseen && unSeenCount.unseen > 0 ?
                          <div style={{ position: "absolute", right: "-4px", top: "-5px", color: "white", backgroundColor: "red", fontSize: "11px", borderRadius: "50%", padding: " 0 5px" }} >
                            {
                              unSeenCount.unseen > 9 ?
                                "9" + "+"
                                : unSeenCount.unseen
                            }
                          </div>
                          : ""


                      } */}
                      <IoFlashOutline color='white' size={25} />
                    </div>
                  </>

                  :
                  <>
                    {
                      guest == true ?
                        <button
                          onClick={gotosignup}
                          className={styles.sign_up_header}
                        >Sign Up</button> : ""
                    }
                  </>
              }


            </div>



            <div className={styles.header_icons}>
              {
                guest === false ?
                  <>
                    <div style={{ position: "relative", cursor: "pointer" }}
                    //  onClick={gotoChats}
                    >
                      {/* 
                      {
                        unSeenCount.unseen && unSeenCount.unseen > 0 ?
                          <div style={{ position: "absolute", right: "-4px", top: "-6px", color: "white", backgroundColor: "red", fontSize: "11px", borderRadius: "50%", padding: " 0 5px" }} >
                            {
                              unSeenCount.unseen > 9 ?
                                "9" + "+"
                                : unSeenCount.unseen
                            }
                          </div>
                          : ""


                      } */}

                      <IoFlashOutline className={styles.iconHeader} size={26} />


                    </div>
                    {
                      showAddBtn !== false ?
                        <MdAddCircleOutline size={32} className={styles.iconHeader}
                          onClick={handleAddClick}
                          style={{ marginLeft: '1rem' }} />

                        : ''
                    }

                    <div style={{ position: "relative", cursor: "pointer" }} >
                      {/* {
                        notificationCount && notificationCount > 0 ?
                          <div style={{ position: "absolute", right: "-4px", top: "-6px", color: "white", backgroundColor: "red", fontSize: "11px", borderRadius: "50%", padding: " 0 5px" }} >
                            {
                              notificationCount > 9 ?
                                "9" + "+"
                                : notificationCount
                            }
                          </div>
                          : ""
                      } */}
                      <MdOutlineNewReleases onClick={n} className={styles.iconHeader} size={32} style={{ marginLeft: "1rem", backgroundColor: 'black', borderRadius: '50%' }}
                      />
                    </div>


                    {
                      profileImg !== '' ?
                        <img onClick={() => { router.push(`/${username}`) }} alt="img" className={styles.profimg} style={{ cursor: "pointer", marginLeft: "1rem", borderRadius: '50%', backgroundColor: 'white' }} src={profileImg} /> :
                        <FaUserCircle onClick={() => { router.push(`/${username}`) }} style={{ height: '2rem', width: '2rem', cursor: "pointer", marginLeft: '1rem', borderRadius: '50%' }} />
                    }

                  </>
                  : <>
                    {
                      guest == true ?
                        <button
                          onClick={gotosignup}
                          className={styles.sign_up_header}
                        >Sign Up</button> : ""
                    }
                  </>
              }

            </div>

          </div>
          :

          <div className={styles.mobheader} style={showComposePost ? { overflow: 'hidden' } : { backgroundColor: colour }}>
            <form className={styles._mobsrchbar}
              onSubmit={handleSubmit}
              style={{ width: '100%' }}>
              <input
                autoFocus
                type='text'
                // placeholder={placeholder}
                placeholder='Search'
                value={_input}
                onChange={e => setInput(e.target.value)}
                style={{
                  width: '100%', outline: 'none', border: 'none', fontWeight: "500", background: 'transparent', padding: '0.3rem',
                  color: "#e6f8eb"
                }}
                maxLength={100}
              />
              <button type='submit' style={{ padding: "0 1.25rem", border: 'none', background: "transparent", color: '#e6f8eb' }}  >
                <AiOutlineSearch size={22} />
              </button>
            </form>
          </div>


      }

      {
        router.asPath === "/?notifications" && dikha ?
          <dialog className={styles.req_noti_dialog} style={{padding:0}} open >
            {/* <Post handlecancel={handlecancel} /> */}
            <div className={styles.notiMain} >



              {/* <div style={{ overflow: "scroll", scrollMargin: 0, color: 'black', textAlign: "justify" }}>

                     </div> */}
              <Requests dikha={dikha} userId={_id} n={n} />

            </div>
          </dialog>
          : ''
      }


      {
        showComposePost ?
          <dialog open style={{
            position: 'absolute', border: 'none', color: 'white', zIndex: 999, top: '0%', left: '0%', backgroundColor: "rgba(0,0,0,.6)", height: '100vh', width: '100vw', position: 'fixed', display: 'flex', justifyContent: "center", alignItems: 'center',
          }}>
            {/* <Post handlecancel={handlecancel} /> */}
          </dialog>
          : ''
      }




    </>
  )
}

export default Header
