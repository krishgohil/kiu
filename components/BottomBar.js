
import React, { useEffect, useState } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { MdAdd, MdAddCircle, MdAddCircleOutline, MdHome, MdNewReleases, MdOutlineHome, MdOutlineLocalFireDepartment, MdPeopleOutline, MdSportsTennis, } from 'react-icons/md'
// import Requests from '../requests/Requests';
import { AiFillFire, AiOutlineClose, AiOutlineFire, AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { toast } from 'react-toastify';
import { RiAddCircleLine, RiHome2Line, RiSearch2Line, RiShoppingCartLine } from 'react-icons/ri';
import { useAppContext, useGeneralContext } from '../context';
import { useRouter } from 'next/router';
import Link from 'next/link';

const BottomBar = ({ navbar, category, overflowhidden, search, addpost, showsrchBar }) => {
    const [showComposePost, setshowComposePost] = useState(false)
    const [dikha, setdikha] = useState(false)

    const router = useRouter()
    const { profile } = router.query

    const n = () => {
        setdikha(value => !value)
    }
    // const { username, _id, profileImg, guest } = useSelector(state => state.auth2)
    const context = useAppContext()
    const genContext = useGeneralContext()
    const { _id, username, profileImg, guest } = context.sharedState
    // const { guest } = genContext.genstate

    const setcategory = () => async dispatch => {
        console.log('chennai', category)
        sessionStorage.setItem("currentcategory", category)
        dispatch({
            type: SET_CATEGORY,
            payload: category
        })
    }

    const handleAddClick = () => {
        addpost()
    }



    const handlecancel = () => {
        setshowComposePost(false)
        // overflowhidden()
        router.push(-1)
    }

    const gotoprofile = () => {
        console.log('lop')
        if (guest == false) {
            router.push(`/${username}`)
        } else {
            toast.info(`SignUp to access all features`, {
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

    const searchfunc = () => {
        // if (categoryfromstore && categoryfromstore == 'profile') {
        //     router.push('/')
        // }
        search()
    }

    return (
        <>


            <div className='bBarDiv' style={{ position: 'fixed', bottom: 0, width: '100vw', height: '7vh', display: 'flex', alignItems: 'center', zIndex: 990 }}>



                <Link href='/products' style={!showsrchBar && router.pathname == "/products" ? { textDecoration: 'none', color: 'white', display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "space-evenly", height: "7vh", width: '20vw', cursor: "pointer", fontWeight: "600", backgroundColor: "rgb(30,30,30)" } : { textDecoration: 'none', color: '#f0f0f0', display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "space-evenly", height: "7vh", width: '20vw', cursor: "pointer" }} >
                    <RiShoppingCartLine size={23} />
                    <span style={{ fontSize: "11px", }} >
                        Products
                    </span>
                    {/* <span style={{ padding: "0.5rem", fontWeight: "bold" }} >
                        T
                    </span> */}
                </Link>

                <div style={{ textDecoration: 'none', color: '#f0f0f0', display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "space-evenly", height: "7vh", width: '20vw', cursor: "pointer" }} >
                    <RiAddCircleLine color='#f0f0f0' size={23} onClick={handleAddClick} />
                    <span style={{ fontSize: "11px", color: '#f0f0f0' }} >
                        Add
                    </span>
                </div>


                {/* <Link href='/tribes' style={!showsrchBar && router.pathname == "/tribes" ? { textDecoration: 'none', color: 'white', display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "space-evenly", height: "7vh", width: '20vw', cursor: "pointer", fontWeight: "600", backgroundColor: "rgb(30,30,30)" } : { textDecoration: 'none', color: '#f0f0f0', display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "space-evenly", height: "7vh", width: '20vw', cursor: "pointer" }} >
                    <MdPeopleOutline size={23} color='#f0f0f0' position="relative" style={{ marginTop: "" }} />
                    <span style={{ fontSize: "11px", color: "#f0f0f0", }} >
                        Tribes
                    </span>
                </Link> */}
                <Link href="/" onClick={() => search()} style={!showsrchBar && router.pathname == "/" ? { textDecoration: 'none', color: '#f0f0f0', display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "space-evenly", height: "7vh", width: '20vw', cursor: "pointer", fontWeight: "600", backgroundColor: "rgb(30,30,30)" } : { textDecoration: 'none', color: 'white', display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "space-evenly", height: "7vh", width: '20vw', cursor: "pointer", }} >
                    {/* <MdHome size={25} /> */}
                    <RiHome2Line size={23} color='#f0f0f0' position="relative" style={{ marginTop: "" }} />
                    {/* <MdHome size={26} color='#f0f0f0' /> */}
                    <span style={{ fontSize: "11px", color: "#f0f0f0", }} >
                        Home
                    </span>
                </Link>
                {/* <div style={{ textDecoration: 'none', color: '#f0f0f0', display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "space-evenly", height: "7vh", width: '20vw', cursor: "pointer" }}>

                    <AiOutlineFire color='#f0f0f0' size={21} onClick={handleAddClick} />
                    <span style={{ fontSize: "11px", color: '#f0f0f0', }} >
                        Dhooms
                    </span>
                </div> */}
                <div onClick={searchfunc} style={showsrchBar ? { textDecoration: 'none', color: '#f0f0f0', display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "space-evenly", height: "7vh", width: '20vw', cursor: "pointer", fontWeight: "600", backgroundColor: "rgb(30,30,30)" } : { textDecoration: 'none', color: 'white', display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "space-evenly", height: "7vh", width: '20vw', cursor: "pointer", }}>

                    <RiSearch2Line size={23} color='#f0f0f0' />
                    <span style={{ fontSize: "11px", color: '#f0f0f0', }} >
                        Search
                    </span>
                </div>

                <div onClick={gotoprofile} className='mobprofimg' style={!showsrchBar && router.pathname == `/${username}` ? { textDecoration: 'none', color: '#f0f0f0', display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "space-evenly", height: "7vh", width: '20vw', cursor: "pointer", fontWeight: "600", backgroundColor: "rgb(30,30,30)" } : { textDecoration: 'none', color: 'white', display: "flex", alignItems: "center", flexDirection: 'column', justifyContent: "space-evenly", height: "7vh", width: '20vw', cursor: "pointer", }} >
                    {
                        profileImg && profileImg !== '' ?
                            <img alt="img" className='profimg' style={{ height: '2rem', width: '2rem', cursor: "pointer", borderRadius: '50%', backgroundColor: 'white', }} src={profileImg} /> :
                            <FaUserCircle color='#f0f0f0' style={{ height: '2rem', width: '2rem', cursor: "pointer", borderRadius: '50%' }} />
                    }
                </div>




            </div>





        </>


    )
};

export default BottomBar;
