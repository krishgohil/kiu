import React, { useEffect, useState } from 'react'
import styles from "../styles/Sidebar.module.css"

import { SiSmartthings } from 'react-icons/si'
import {
    MdExitToApp,
    MdSentimentDissatisfied,
    MdSportsTennis,
    MdHistory,
    MdOutlineHome,
    MdPeopleOutline
} from 'react-icons/md'

import Link from 'next/link'
import { BiMoviePlay } from 'react-icons/bi'
import { AiOutlineStock } from 'react-icons/ai'
import { FaBitcoin, FaBookOpen, FaReact, FaRegLaugh, FaRegNewspaper, FaRegSmileBeam, FaSignInAlt, FaYoutube, FaUserSecret, FaMask } from 'react-icons/fa'

import { RiHome2Line, RiShoppingCartLine } from 'react-icons/ri';
import { useFeedContext } from '../context'




const Sidebar = ({ sidebar, handleToggleSidebar }) => {
    const [active, setactive] = useState(false);
    const context_feed = useFeedContext()
    const { category } = context_feed.feedstate


    const logOutHandler = () => {
        if (window.confirm("Do you want to log out?") == true) {
            dispatch(log_out())
        }
    }


    const activefunc = () => {
        setactive(true)
    }

    const log_out = () => async dispatch => {

        dispatch({
            type: LOG_OUT
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user id')
        localStorage.removeItem('username')


    }


    return (
        <>

            <nav
                className={sidebar ? `${styles.sidebar} ${styles.open}` : `${styles.sidebar}`}
                //  className={styles.sidebar}
                onClick={() => handleToggleSidebar(false)}

            >

                <Link onClick={(e) => {
                    console.log(e.target.value)
                    context_feed.setfeedstate({ ...context_feed.feedstate, category: 'home' })

                }} className={styles.sidelink} href='/'
                    // onClick={() => {
                    //     if (window.location.pathname == "/") { sethomeScroll() };
                    //     sessionStorage.setItem('currentcategory', 'home')
                    // }}
                    style={{ textDecoration: 'none', color: "white", paddingTop: "1rem" }} >
                    <li style={{ textDecoration: 'none' }} className={category === "home" ? `${styles.li} ${styles.active}` : `${styles.li} ${styles.notactive}`}>
                        {/* <MdHome size={23} /> */}
                        <RiHome2Line size={23} />
                        <span className={styles.span} >Home</span>
                    </li>
                </Link>
                <Link onClick={(e) => {
                    console.log(e.target.value)

                    context_feed.setfeedstate({ ...context_feed.feedstate, category: 'tribes' })

                }} className={styles.sidelink} href='/tribes'
                    // onClick={() => {
                    //     if (window.location.pathname == "/") { sethomeScroll() };
                    //     sessionStorage.setItem('currentcategory', 'product')
                    // }}
                    style={{ textDecoration: 'none', color: "white" }} >
                    <li style={{ textDecoration: 'none' }} className={category === "tribes" ? `${styles.li} ${styles.active}` : `${styles.li} ${styles.notactive}`}>
                        <MdPeopleOutline size={23}  />
                        <span className={styles.span} >Tribes</span>
                    </li>
                </Link>
                <Link onClick={(e) => {
                    console.log(e.target.value)

                    context_feed.setfeedstate({ ...context_feed.feedstate, category: 'products' })

                }} className={styles.sidelink} href='/products'
                    // onClick={() => {
                    //     if (window.location.pathname == "/") { sethomeScroll() };
                    //     sessionStorage.setItem('currentcategory', 'product')
                    // }}
                    style={{ textDecoration: 'none', color: "white" }} >
                    <li style={{ textDecoration: 'none' }} className={category === "products" ? `${styles.li} ${styles.active}` : `${styles.li} ${styles.notactive}`}>
                        <RiShoppingCartLine size={23} />
                        <span className={styles.span} >Products</span>
                    </li>
                </Link>


                <Link onClick={(e) => {
                    console.log(e.target.value)

                    context_feed.setfeedstate({ ...context_feed.feedstate, category: 'fun' })

                }} className={styles.sidelink} href='/fun'
                    // onClick={() => {
                    //     if (window.location.pathname == "/") { sethomeScroll() };
                    //     sessionStorage.setItem('currentcategory', 'fun')
                    // }}
                    style={{ textDecoration: 'none', color: "white" }} >
                    <li style={{ textDecoration: 'none' }} className={category === "fun" ? `${styles.li} ${styles.active}` : `${styles.li} ${styles.notactive}`}>
                        <FaRegLaugh size={23} />
                        <span className={styles.span} >Fun</span>
                    </li>
                </Link>


                <Link onClick={(e) => {
                    console.log(e.target.value)

                    context_feed.setfeedstate({ ...context_feed.feedstate, category: 'cryptos' })

                }} className={styles.sidelink} href='/cryptos'
                    // onClick={() => {
                    //     if (window.location.pathname == "/") { sethomeScroll() };
                    //     sessionStorage.setItem('currentcategory', 'crypto')
                    // }}
                    style={{ textDecoration: 'none', color: "white" }}  >
                    <li style={{ textDecoration: 'none' }} className={category === "cryptos" ? `${styles.li} ${styles.active}` : `${styles.li} ${styles.notactive}`}>
                        <FaBitcoin size={23} />
                        <span className={styles.span} >Cryptos</span>
                    </li>
                </Link>




                <Link onClick={(e) => {
                    console.log(e.target.value)

                    context_feed.setfeedstate({ ...context_feed.feedstate, category: 'movies' })

                }} className={styles.sidelink} href='/movies'
                    // onClick={() => {
                    //     if (window.location.pathname == "/") { sethomeScroll() };
                    //     sessionStorage.setItem('currentcategory', 'movies')
                    // }}
                    style={{ textDecoration: 'none', color: "white" }} >
                    <li style={{ textDecoration: 'none' }} className={category === "movies" ? `${styles.li} ${styles.active}` : `${styles.li} ${styles.notactive}`}>
                        <BiMoviePlay size={23} />
                        <span className={styles.span} >Movies</span>
                    </li>
                </Link>

                <Link onClick={(e) => {
                    console.log(e.target.value)

                    context_feed.setfeedstate({ ...context_feed.feedstate, category: 'books' })

                }} className={styles.sidelink} href='/books'
                    // onClick={() => {
                    //     if (window.location.pathname == "/") { sethomeScroll() };
                    //     sessionStorage.setItem('currentcategory', 'books')
                    // }}
                    style={{ textDecoration: 'none', color: "white" }}>
                    <li style={{ textDecoration: 'none' }} className={category === "books" ? `${styles.li} ${styles.active}` : `${styles.li} ${styles.notactive}`}>
                        <FaBookOpen size={23} />
                        <span className={styles.span} >Books</span>
                    </li>
                </Link>

                <Link onClick={(e) => {
                    console.log(e.target.value)

                    context_feed.setfeedstate({ ...context_feed.feedstate, category: 'stocks' })

                }} className={styles.sidelink} href='/stocks'
                    // onClick={() => {
                    //     if (window.location.pathname == "/") { sethomeScroll() };
                    //     sessionStorage.setItem('currentcategory', 'stocks')
                    // }}
                    style={{ textDecoration: 'none', color: "white" }} >
                    <li style={{ textDecoration: 'none' }} className={category === "stocks" ? `${styles.li} ${styles.active}` : `${styles.li} ${styles.notactive}`}>
                        <AiOutlineStock size={23} />
                        <span className={styles.span} >Stocks</span>
                    </li>
                </Link>
                <Link onClick={(e) => {
                    console.log(e.target.value)

                    context_feed.setfeedstate({ ...context_feed.feedstate, category: 'news' })

                }} className={styles.sidelink} href='/news'
                    // onClick={() => {
                    //     if (window.location.pathname == "/") { sethomeScroll() };
                    //     sessionStorage.setItem('currentcategory', 'news')
                    // }}
                    style={{ textDecoration: 'none', color: "white" }} >
                    <li style={{ textDecoration: 'none' }} className={category === "news" ? `${styles.li} ${styles.active}` : `${styles.li} ${styles.notactive}`}>
                        <FaRegNewspaper size={23} />
                        <span className={styles.span} >News</span>
                    </li>
                </Link>

                <Link onClick={(e) => {
                    console.log(e.target.value)

                    context_feed.setfeedstate({ ...context_feed.feedstate, category: 'science-tech' })

                }} className={styles.sidelink} href='/science-tech'
                    // onClick={() => {
                    //     if (window.location.pathname == "/") { sethomeScroll() };
                    //     sessionStorage.setItem('currentcategory', 'science-tech')
                    // }}
                    style={{ textDecoration: 'none', color: "white" }} >
                    <li style={{ textDecoration: 'none' }} className={category === "science-tech" ? `${styles.li} ${styles.active}` : `${styles.li} ${styles.notactive}`}>
                        <FaReact size={23} />
                        <span className={styles.span} >Science-Tech</span>
                    </li>
                </Link>

                <Link onClick={(e) => {
                    console.log(e.target.value)

                    context_feed.setfeedstate({ ...context_feed.feedstate, category: 'sports' })

                }} className={styles.sidelink} href='/sports'
                    // onClick={() => {
                    //     if (window.location.pathname == "/") { sethomeScroll() };
                    //     sessionStorage.setItem('currentcategory', 'sports')
                    // }}
                    style={{ textDecoration: 'none', color: "white" }} >
                    <li style={{ textDecoration: 'none' }} className={category === "sports" ? `${styles.li} ${styles.active}` : `${styles.li} ${styles.notactive}`}>
                        <MdSportsTennis color='white' size={23} />
                        <span className={styles.span} >Sports</span>
                    </li>
                </Link>


                <Link onClick={(e) => {
                    console.log(e.target.value)

                    context_feed.setfeedstate({ ...context_feed.feedstate, category: 'destress' })

                }} className={styles.sidelink} href='/destress'
                    // onClick={() => {
                    //     if (window.location.pathname == "/") { sethomeScroll() };
                    //     sessionStorage.setItem('currentcategory', 'destress')
                    // }}
                    style={{ textDecoration: 'none', color: "white" }} >
                    <li style={{ textDecoration: 'none' }} className={category === "destress" ? `${styles.li} ${styles.active}` : `${styles.li} ${styles.notactive}`}>
                        {/* <GiDistressSignal size={23} /> */}
                        {/* <GiBandit size={23} />  */}
                        {/* <GiBalaclava size={23} /> GiBandit GiBarbute GiBatMask GiBrute */}
                        <FaMask size={23} />
                        <span className={styles.span} >Destress</span>
                    </li>
                </Link>

                <Link onClick={(e) => {
                    console.log(e.target.value)

                    context_feed.setfeedstate({ ...context_feed.feedstate, category: 'youtube' })

                }} className={styles.sidelink} href='/youtube'
                    // onClick={() => {
                    //     if (window.location.pathname == "/") { sethomeScroll() };
                    //     sessionStorage.setItem('currentcategory', 'youtube')
                    // }}
                    style={{ textDecoration: 'none', color: "white" }} >
                    <li style={{ textDecoration: 'none', }} className={category === "youtube" ? `${styles.li} ${styles.active}` : `${styles.li} ${styles.notactive}`}>
                        <FaYoutube size={23} />
                        <span className={styles.span} >Youtube</span>
                    </li>
                </Link>

                <div style={{}} >

                    <Link className={styles.li} style={{ color: "silver", fontSize: "12px", display: "block", border: "1px solid #121417e3", paddingTop: "2px", paddingBottom: "2px" }} href='/about' >About </Link>
                    <Link className={styles.li} style={{ color: "silver", fontSize: "12px", display: "block", border: "1px solid #121417e3", paddingTop: "2px", paddingBottom: "2px" }} href='/terms-of-service' >Terms Of Service </Link>
                    <Link className={styles.li} style={{ color: "silver", fontSize: "12px", display: "block", border: "1px solid #121417e3", paddingTop: "2px", paddingBottom: "2px" }} href='/privacy' >Privacy </Link>
                    <Link className={styles.li} style={{ color: "silver", fontSize: "12px", display: "block", border: "1px solid #121417e3", paddingTop: "2px", paddingBottom: "2px" }} href='/contact-us' >Contact Us </Link>
                    <p className={styles.li} style={{ color: "silver", fontSize: "12px", display: "block", border: "1px solid #121417e3", paddingTop: "2px", paddingBottom: "2px" }} href='/' >@All rights reserved </p>

                </div>



            </nav>
        </>
    )
}

export default Sidebar
