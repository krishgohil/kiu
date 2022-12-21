import React, { useEffect, useState } from 'react'
import styles from "../styles/Sidebar.module.css"

import { SiSmartthings } from 'react-icons/si'
import {
    MdExitToApp,
    MdSentimentDissatisfied,
    MdSportsTennis,
    MdHistory,
    MdOutlineHome
} from 'react-icons/md'

import Link from 'next/link'
import { BiMoviePlay } from 'react-icons/bi'
import { AiOutlineStock } from 'react-icons/ai'
import { FaBitcoin, FaBookOpen, FaReact, FaRegLaugh, FaRegNewspaper, FaRegSmileBeam, FaSignInAlt, FaYoutube, FaUserSecret, FaMask } from 'react-icons/fa'

import { RiHome2Line, RiShoppingCartLine } from 'react-icons/ri';




const Sidebar = () => {
    const [active, setactive] = useState(false);


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
        <nav
            className={styles.sidebar}
        >

            <Link className={styles.sidelink} href='/'
                // onClick={() => {
                //     if (window.location.pathname == "/") { sethomeScroll() };
                //     sessionStorage.setItem('currentcategory', 'home')
                // }}
                style={{ textDecoration: 'none', color: "white", paddingTop: "1rem" }} >
                <li style={{ textDecoration: 'none' }} className={`${styles.li} ${styles.active}`}>
                    {/* <MdHome size={23} /> */}
                    <RiHome2Line size={23} />
                    <span className={styles.span} >Home</span>
                </li>
            </Link>
            <Link className={styles.sidelink} href='/products'
                // onClick={() => {
                //     if (window.location.pathname == "/") { sethomeScroll() };
                //     sessionStorage.setItem('currentcategory', 'product')
                // }}
                style={{ textDecoration: 'none', color: "white" }} >
                <li style={{ textDecoration: 'none' }} className={`${styles.li} ${styles.notactive}`}>
                    <RiShoppingCartLine size={23} />
                    <span className={styles.span} >Products</span>
                </li>
            </Link>


            <Link className={styles.sidelink} href='/fun'
                // onClick={() => {
                //     if (window.location.pathname == "/") { sethomeScroll() };
                //     sessionStorage.setItem('currentcategory', 'fun')
                // }}
                style={{ textDecoration: 'none', color: "white" }} >
                <li style={{ textDecoration: 'none' }} className={`${styles.li} ${styles.notactive}`}>
                    <FaRegLaugh size={23} />
                    <span className={styles.span} >Fun</span>
                </li>
            </Link>


            <Link className={styles.sidelink} href='/cryptos'
                // onClick={() => {
                //     if (window.location.pathname == "/") { sethomeScroll() };
                //     sessionStorage.setItem('currentcategory', 'crypto')
                // }}
                style={{ textDecoration: 'none', color: "white" }}  >
                <li style={{ textDecoration: 'none' }} className={`${styles.li} ${styles.notactive}`}>
                    <FaBitcoin size={23} />
                    <span className={styles.span} >Cryptos</span>
                </li>
            </Link>




            <Link className={styles.sidelink} href='/movies'
                // onClick={() => {
                //     if (window.location.pathname == "/") { sethomeScroll() };
                //     sessionStorage.setItem('currentcategory', 'movies')
                // }}
                style={{ textDecoration: 'none', color: "white" }} >
                <li style={{ textDecoration: 'none' }} className={`${styles.li} ${styles.notactive}`}>
                    <BiMoviePlay size={23} />
                    <span className={styles.span} >Movies</span>
                </li>
            </Link>

            <Link className={styles.sidelink} href='/books'
                // onClick={() => {
                //     if (window.location.pathname == "/") { sethomeScroll() };
                //     sessionStorage.setItem('currentcategory', 'books')
                // }}
                style={{ textDecoration: 'none', color: "white" }}>
                <li style={{ textDecoration: 'none' }} className={`${styles.li} ${styles.notactive}`}>
                    <FaBookOpen size={23} />
                    <span className={styles.span} >Books</span>
                </li>
            </Link>

            <Link className={styles.sidelink} href='/stocks'
                // onClick={() => {
                //     if (window.location.pathname == "/") { sethomeScroll() };
                //     sessionStorage.setItem('currentcategory', 'stocks')
                // }}
                style={{ textDecoration: 'none', color: "white" }} >
                <li style={{ textDecoration: 'none' }} className={`${styles.li} ${styles.notactive}`}>
                    <AiOutlineStock size={23} />
                    <span className={styles.span} >Stocks</span>
                </li>
            </Link>
            <Link className={styles.sidelink} href='/news'
                // onClick={() => {
                //     if (window.location.pathname == "/") { sethomeScroll() };
                //     sessionStorage.setItem('currentcategory', 'news')
                // }}
                style={{ textDecoration: 'none', color: "white" }} >
                <li style={{ textDecoration: 'none' }} className={`${styles.li} ${styles.notactive}`}>
                    <FaRegNewspaper size={23} />
                    <span className={styles.span} >News</span>
                </li>
            </Link>

            <Link className={styles.sidelink} href='/science-tech'
                // onClick={() => {
                //     if (window.location.pathname == "/") { sethomeScroll() };
                //     sessionStorage.setItem('currentcategory', 'science-tech')
                // }}
                style={{ textDecoration: 'none', color: "white" }} >
                <li style={{ textDecoration: 'none' }} className={`${styles.li} ${styles.notactive}`}>
                    <FaReact size={23} />
                    <span className={styles.span} >Science-Tech</span>
                </li>
            </Link>

            <Link className={styles.sidelink} href='/sports'
                // onClick={() => {
                //     if (window.location.pathname == "/") { sethomeScroll() };
                //     sessionStorage.setItem('currentcategory', 'sports')
                // }}
                style={{ textDecoration: 'none', color: "white" }} >
                <li style={{ textDecoration: 'none' }} className={`${styles.li} ${styles.notactive}`}>
                    <MdSportsTennis color='white' size={23} />
                    <span className={styles.span} >Sports</span>
                </li>
            </Link>


            <Link className={styles.sidelink} href='/destress'
                // onClick={() => {
                //     if (window.location.pathname == "/") { sethomeScroll() };
                //     sessionStorage.setItem('currentcategory', 'destress')
                // }}
                style={{ textDecoration: 'none', color: "white" }} >
                <li style={{ textDecoration: 'none' }} className={`${styles.li} ${styles.notactive}`}>
                    {/* <GiDistressSignal size={23} /> */}
                    {/* <GiBandit size={23} />  */}
                    {/* <GiBalaclava size={23} /> GiBandit GiBarbute GiBatMask GiBrute */}
                    <FaMask size={23} />
                    <span className={styles.span} >Destress</span>
                </li>
            </Link>

            <Link className={styles.sidelink} href='/youtube'
                // onClick={() => {
                //     if (window.location.pathname == "/") { sethomeScroll() };
                //     sessionStorage.setItem('currentcategory', 'youtube')
                // }}
                style={{ textDecoration: 'none', color: "white" }} >
                <li style={{ textDecoration: 'none' }} className={`${styles.li} ${styles.notactive}`}>
                    <FaYoutube size={23} />
                    <span className={styles.span} >Youtube</span>
                </li>
            </Link>



        </nav>
    )
}

export default Sidebar
