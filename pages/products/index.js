import { BiUpvote, BiDownvote, BiCategory, BiCommentDetail } from 'react-icons/bi'
import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { FaRegComment, FaRegEdit, FaRegStar, FaStar } from 'react-icons/fa'
import { AiOutlineClose, AiOutlineRight, AiOutlineSend, AiOutlineShareAlt } from 'react-icons/ai'
import { FiExternalLink } from 'react-icons/fi'

import TextareaAutosize from 'react-textarea-autosize';
import Stars from '../../components/Stars'
import { MdBlockFlipped, MdOutlineCopyright, MdOutlineDelete, MdOutlineShoppingCart } from 'react-icons/md'
import { toast } from 'react-toastify';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper'
import { BsArrowLeft, BsFlag, BsReply, BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs'
import { IoFlashOutline, IoOptions } from 'react-icons/io5';
// import io from "socket.io-client";
import { host } from '../../host'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'
import { Spinner } from 'react-bootstrap'
import { useAppContext } from '../../context'
import SendItem from '../../components/SendItem'
import ShareBox from '../../components/ShareBox'

const ENDPOINT = host
// const socket = io.connect(ENDPOINT);

const Products = () => {

    const router = useRouter()
    const { productId } = router.query
    const context = useAppContext()
    const { _id, username, guest } = context.sharedState
    const [productModal, setproductModal] = useState(false)
    const [first, setfirst] = useState()
    const restorationRef = React.useRef(null);
    const [filterModal, setfilterModal] = useState(false)
    const [productsArr, setproductsArr] = useState([])
    const [showproducts, setshowproducts] = useState(false)

    const [nomore, setnomore] = useState(false)

    const [current_pcategory, setcurrent_pcategory] = useState("All")
    const [filterCategory, setfilterCategory] = useState(current_pcategory)
    const [tempfilterCategory, settempfilterCategory] = useState(current_pcategory)
    const [filterStars, setfilterStars] = useState(1)
    const [tempfilterStars, settempfilterStars] = useState(1)
    const [minprice, setminprice] = useState(0)
    const [tempminprice, settempminprice] = useState(0)

    const [maxprice, setmaxprice] = useState(999999999)
    const [tempmaxprice, settempmaxprice] = useState(999999999)
    const keywords = [
        "All",
        "Apparels",
        "Educational",
        "Electronics",
        "Footwear",
        "Food Items",
        "Jewellery",
        "Books & Stationary",
        "Mobile Phones",
        "Mobile Application",
        "Fashion Accessories",
        "Decor",
        "Toys & games",
        "Sports & Fitness",
        "Subscriptions",
        "Software Services",
        "Website",
    ]

    useEffect(() => {

        console.log("router change")

    }, [typeof window !== "undefined" ? window.location.pathname : null])


    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const keyword = queryParams.get('category');
        console.log(keyword);
        setnomore(false)
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        setmaxprice(999999999)
        setminprice(0)
        settempminprice(0)
        settempmaxprice(999999999)
        setproductsArr([])
        setshowproducts(false)
        if (window.location.pathname == '/products') {
            setproductModal(false)
            setcurrent_pcategory("All")
            // console.log("productsArr.length", productsArr)
            fetchproducts()
        }

        // else if (window.location.pathname == `/product/c/${pcategory}`) {
        //   console.log("dhoklla")

        //   setproductModal(false)

        //   for (let i = 0; i < keywords.length; i++) {
        //     if (pcategory == i) {
        //       console.log("haila mila", keywords[i])
        //       dispatch(fetchproducts_by_category(keywords[i], true))
        //       setcurrent_pcategory(keywords[i])


        //     }
        //   }



        // }
        // else if (window.location.pathname == `/product/${productId}`) {
        //   console.log("gggggggggggggg")

        //   setproductModal(true)
        // }








    }, [router.isReady, router.asPath])








    async function fetchproducts(newRender) {
        // console.log("productsArr.length", productsArr)

        let _skip

        if (productsArr && productsArr.length > 0 && !newRender) {
            _skip = productsArr.length
        }

        else {
            _skip = 0
        }

        try {

            console.log("herhe")

            const response = await fetch(`${host}/api/product/fetchproducts`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ skip: _skip }),

            })
            const json = await response.json();
            console.log(json)
            const { products } = json
            console.log(products)

            if (products.length < 1) {
                setnomore(true)
            }
            let sortit = products.sort(function (a, b) {
                return (a.product.totalStarRating > b.product.totalStarRating) ? -1 : ((a.product.totalStarRating < b.product.totalStarRating) ? 1 : 0);
            });

            console.log(sortit)
            setproductsArr(sortit)
            setshowproducts(true)



        } catch (error) {
            console.log(error)
        }
    }
    const fetchproducts_by_category = (pcategory, newRender) => async dispatch => {
        console.log("productsArr.length", pcategory, productsArr)

        let _skip

        if (productsArr && productsArr.length > 0 && !newRender) {
            _skip = productsArr.length
        }
        else if (newRender) {
            // alert("new render")
            if (upp_productResults.length > 0) {
                let exists = false
                for (let n = 0; n < upp_productResults.length; n++) {
                    if (upp_productResults[n].pcategory == pcategory) {
                        exists = true
                        _skip = upp_productResults[n].categoryResults.length
                    }

                    if (n == (upp_productResults.length - 1)) {

                        if (exists == false) {
                            _skip = 0
                        }
                    }


                }
            } else {
                _skip = 0
            }
        }
        else {
            _skip = 0
        }


        try {


            const response = await fetch(`${host}/api/product/fetchproducts_by_category`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pcategory: pcategory, skip: _skip }),

            })
            const json = await response.json();
            console.log(json)
            const { products } = json
            console.log(products)


            if (products.length < 1) {
                setnomore(true)
            }

            let sortit = products.sort(function (a, b) {
                return (a.product.totalStarRating > b.product.totalStarRating) ? -1 : ((a.product.totalStarRating < b.product.totalStarRating) ? 1 : 0);
            });

            console.log("sortit", sortit)
            // setproductsArr(productsArr.concat(products))
            // setshowproducts(true)

            dispatch(
                {
                    type: SET_UPP_PRODUCT_RESULTS,
                    payload: {
                        pcategory: pcategory,
                        categoryResults: products
                    }
                }
            )
        } catch (error) {

        }
    }



    const gotoprdct = (id, goToProductComments) => {
        console.log(current_pcategory)
        // sessionStorage.setItem('productScrollId', feed.product._id)
        sessionStorage.setItem('productScroll', window.scrollY)
        sessionStorage.setItem('productc', current_pcategory)
        if (goToProductComments) {
            sessionStorage.setItem("goToProductComments", true)
            router.push(`/products/${id}`)
        } else {
            router.push(`/products/${id}`)
        }
    }











    var keep = 0
    if (typeof window !== "undefined") {
        window.onscroll = () => {
            // console.log(window.scrollY)
            var stickbar = document.getElementById('stickbar')
            if (stickbar) {
                if (window.scrollY < keep) {
                    stickbar.style.top = "56px"
                    // console.log(stickbar, 'stickbar', keep)
                } else {
                    // console.log("eles")
                    stickbar.style.top = "-56px"
                }
                keep = window.scrollY
            } else {
                console.log("nahiiiiiiiiiiiiiiiiiiiiiiii")
            }

        }
    }




    const fetchAgain = () => {
        console.log("ewasrtdtfhjghhk")


        if (window.location.pathname == '/product') {
            setproductModal(false)
            if (current_pcategory != "All") {
                setcurrent_pcategory("All")
            }
            dispatch(fetchproducts(false))
        }
        else if (window.location.pathname == `/product/${productId}`) {
            setproductModal(true)
        }


    }



    const filterBtnfunc = () => {
        if (!filterModal) { setfilterModal(true) } else {
            setfilterModal(false)
            settempmaxprice(maxprice)
            settempminprice(minprice)

        }
    }


    const saveFilterFunc = () => {
        // setfilterCategory()
        setmaxprice(tempmaxprice)
        setminprice(tempminprice)
        if (current_pcategory != tempfilterCategory) {

            for (let index = 0; index < keywords.length; index++) {
                if (keywords[index] == tempfilterCategory) {
                    if (tempfilterCategory == "All") {
                        navigate(`upp/product`)
                    } else {
                        navigate(`c/${index}`)
                    }
                }
            }
        }
        setfilterModal(false)
        console.log(current_pcategory)
        console.log(tempfilterStars)
        console.log(tempfilterCategory)
    }


    const minFunc = (e) => {
        settempminprice(e.target.value)
    }

    const maxFunc = (e) => {
        settempmaxprice(e.target.value)
    }
    return (

        <>
            <div className='stickbar' id='stickbar' style={{ width: '100%', scrollMargin: 0, scrollbarWidth: 0, display: 'flex' }} >
                <ProductCategoriesBar keywords={keywords} filterBtnfunc={filterBtnfunc} />
                {/* <div>JAIHO</div> */}
            </div>

            <InfiniteScroll

                id='myHeader'
                dataLength={productsArr.length}
                next={fetchAgain}
                hasMore={true}
                className='row'
                loader={
                    !nomore ?
                        <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
                            <Spinner style={{ margin: "1rem 0", color: "skyblue" }} />
                        </div>
                        : <div style={{ height: "60vh" }} ></div>
                }
                // loader={
                //     <div className='spinner-border text-primary d-block mx-auto'></div>
                // }
                style={{ padding: 0, margin: 0, marginBottom: '7vh' }}
            >
                {
                    showproducts ?
                        productsArr && productsArr.length > 0 ?
                            <div className='prdctdiv' style={{ display: "flex", flexWrap: "wrap", boxSizing: "border-box", width: "100%", marginBottom: '0vh', alignItems: "center" }} >
                                {productsArr.map((feed, i) => {
                                    return (
                                        <>

                                            {

                                                feed && feed.product ?
                                                    <SingleProduct key={i} feed={feed} i={i} gotoprdct={gotoprdct} _id={_id} username={username} restorationRef={first == feed._id ? restorationRef : null} guest={guest}
                                                        c={current_pcategory} filterStars={filterStars} filterCategory={filterCategory} minprice={minprice} maxprice={maxprice} />
                                                    : ""
                                            }


                                        </>
                                    )
                                })}
                            </div>
                            :
                            ""

                        :
                        <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
                            <Spinner style={{ margin: "1rem 0", color: "skyblue" }} />
                        </div>
                }
            </InfiniteScroll >


            {
                productModal ?
                    <>
                        <dialog dialog open style={{ position: 'absolute', border: 'none', color: 'white', zIndex: 999, left: '0%', backgroundColor: "#1c1f24", height: '100vh', width: '100vw', position: 'fixed', display: 'flex', overflow: 'hidden', justifyContent: 'center', top: '0vh', }}>
                            {/* <ProductModal /> */}
                        </dialog >


                    </>
                    : ""
            }
            {
                filterModal ?
                    <>
                        <dialog open style={{ position: 'absolute', border: 'none', color: 'white', zIndex: 999, left: '0%', backgroundColor: "rgba(0,0,0,.3)", height: '100vh', width: '100vw', position: 'fixed', display: 'flex', overflow: 'hidden', justifyContent: 'center', top: '0vh', alignItems: "center" }}>
                            <div className='filterMain' >
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ fontSize: "18px", fontWeight: "600" }} >
                                        Filters
                                    </div>
                                    <div className='cancel' onClick={filterBtnfunc}  >
                                        <AiOutlineClose size={28} style={{ marginBottom: '0.4rem' }} className='cancelIcon' />
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", margin: "0.5rem 0" }} >
                                    <div style={{ fontWeight: "500" }}  >Category</div>

                                    <select value={tempfilterCategory} onChange={(e) => settempfilterCategory(e.target.value)} name='category' id="" style={{ outline: "none", backgroundColor: "#19191a", color: "silver", margin: '0.5rem', padding: "0.5rem", border: '1px solid #363636', borderRadius: "1rem", fontSize: "14px" }} >
                                        <option value="All">All</option>
                                        <option value="Apparels">Apparels</option>
                                        <option value="Educational">Educational</option>
                                        <option value="Food Items">Food Items</option>
                                        <option value="Jewellery">Jewellery</option>
                                        <option value="Books & Stationary">Books & Stationary</option>
                                        <option value="Mobile Phones">Mobile Phones</option>
                                        <option value="Mobile Application">Mobile Application</option>
                                        <option value="Fashion Accessories">Fashion Accessories</option>
                                        <option value="Subscriptions">Subscriptions</option>
                                        <option value="Software Services">Software Services</option>
                                        <option value="Website">Website</option>
                                    </select>

                                </div>

                                <div style={{ fontWeight: "500", margin: "1rem 0 0.5rem 0 " }}  >Price Range</div>
                                <div style={{ display: "flex", alignItems: "center", margin: "0.5rem 0" }} >
                                    <div style={{ border: '1px solid #363636', padding: "0.25rem", display: "flex", alignItems: "center", margin: "0 0.5rem" }} >
                                        <span>
                                            ₹
                                        </span>
                                        <input value={tempminprice} onChange={minFunc} min={0} maxLength={9} placeholder='Min' type="number" style={{ border: "none", outline: 'none', backgroundColor: "#16181b", color: "white", caretColor: "white ", marginLeft: "0.5rem", width: "60px" }} />
                                    </div>
                                    to
                                    <div min={0} style={{ border: '1px solid #363636', padding: "0.25rem", display: "flex", alignItems: "center", margin: "0 0.5rem" }} >
                                        <span>
                                            ₹
                                        </span>
                                        <input onChange={maxFunc} value={tempmaxprice == 999999999 ? "" : tempmaxprice} placeholder='Max' type="number" style={{ border: "none", outline: 'none', backgroundColor: "#16181b", color: "white", caretColor: "white ", marginLeft: "0.5rem", width: "60px" }} />
                                    </div>
                                    {/* <button style={{ backgroundColor: "black", color: "white", padding: "0.25rem 0.75rem", border: "1px solid gray ", borderRadius: "0.5rem", fontSize: "15px", margin: "0 0.5rem" }} >Set</button> */}
                                </div>

                                {/* <div style={{ display: "flex", alignItems: "center", margin: "2rem 0 0.5rem 0" }} >
                                    <div style={{ fontWeight: "500", }}  >Average Stars</div>
                                    <select name='category' id="" style={{ outline: "none", backgroundColor: "#19191a", color: "silver", margin: '0 0.5rem', padding: "0.5rem", border: '1px solid #363636', borderRadius: "1rem", fontSize: "14px" }} onChange={(e) => settempfilterStars(e.target.value)} >
                                        <option value={1}>1 & Above ⭐</option>
                                        <option value={2}>2 & Above ⭐</option>
                                        <option value={3}>3 & Above ⭐</option>
                                        <option value={4}>4 & Above ⭐</option>
                                    </select>
                                </div> */}



                                <div style={{ display: "flex", justifyContent: "center", margin: "0.5rem 0" }}  >
                                    <button style={{ backgroundColor: "#0e5abf", color: "white", padding: "0.25rem 0.75rem", border: "none ", borderRadius: "0.5rem", fontSize: "15px", margin: "0 0.5rem" }} onClick={saveFilterFunc} >Apply</button>
                                </div>
                            </div>
                        </dialog>


                    </>
                    : ""
            }


        </>
    )
}

export default Products


export const SingleProduct = ({ feed, i, gotoprdct, _id, username, guest, restorationRef, c, filterStars, minprice, maxprice }) => {


    const [totalComments, settotalComments] = useState(0)
    const [rated, setrated] = useState(false)
    const [sendToChatUsers, setsendToChatUsers] = useState()
    const [sendToChat, setsendToChat] = useState(false)
    const [sendPostTo, setsendPostTo] = useState([])
    const [star, setstar] = useState(false)
    const [hasRated, sethasRated] = useState(false)
    const [rating, setrating] = useState(0)
    const [_rstar, set_rstar] = useState(false)
    const [repostCount, setrepostCount] = useState(0)
    const [hasReposted, sethasReposted] = useState(false)
    const [tempdeleted, settempdeleted] = useState(false)
    const [totalStars, settotalStars] = useState(0)
    const [avgStar, setavgStar] = useState(0)
    const [lehrado, setlehrado] = useState(false)


    useEffect(() => {
        // console.log(feed)



        // if (window.location.pathname == "/upp/product") {
        if (c == sessionStorage.getItem('productc')) {
            let y = sessionStorage.getItem('productScroll')

            // sessionStorage.removeItem("productScroll")
            // console.log(y)
            // alert(y)
            window.scrollTo({ top: y, left: 0, behavior: "instant" });
        }

        var comments = 0
        var hasRated = false
        var _rating = 0
        var totalstars = 0
        var my_rating = 0

        for (let i = 0; i < feed.product.ratedBy.length; i++) {
            totalstars = feed.product.ratedBy[i].starRating + totalstars

            if (feed.product.ratedBy[i].raterId == _id) {
                hasRated = true
                _rating = feed.product.ratedBy[i].starRating
            }

            if (feed.product.ratedBy[i].raterComment.length > 0) {
                comments = comments + 1
            }

        }

        settotalStars(totalstars)
        sethasRated(hasRated)
        if (hasRated == true) {
            setrating(_rating)
            setstar(true)
        }
        settotalComments(comments)

        console.log(totalstars / feed.product.ratedBy.length)

        if (feed.product.reposts) {
            setrepostCount(feed.product.reposts)
        }

        if (feed.product.reposters) {

            for (let j = 0; j < feed.product.reposters.length; j++) {
                if (feed.product.reposters[j].reposterId == _id) {
                    sethasReposted(true)
                }
            }
        }
    }, [])

    useEffect(() => {
        console.log('here')

        if (feed.product.price < minprice || feed.product.price > maxprice) {
            console.log('here2')
            return (settempdeleted(true))
        } else if (tempdeleted) {
            settempdeleted(false)
        }


    }, [minprice, maxprice])



    const sendFunc = (sendTo, notificationToken, notificationSettings) => {

        let ok = _id.toString()

        // console.log(sendPostTo)
        socket.emit("send_post", { sendTo: sendTo, postId: feed.product._id, sender: _id, senderUsername: username, notificationToken: notificationToken, notificationSettings: notificationSettings });
        // console.log('sendPostTo', ok)

        if (sendTo) {
            setsendPostTo([...sendPostTo, sendTo])
        }


    }



    var oks = false

    var timeout
    const omo = () => {
        if (guest == false) {
            oks = false
            timeout = setTimeout(() => {
                if (oks == false) {
                    setlehrado(true)
                }
            }, 1500);
        }

    }

    const oml = () => {
        oks = true
        setlehrado(false)
    }

    const manja = () => {
        oks = true
        // console.log('chul')
    }

    const setrate = () => {
        setrated(true)
    }
    const sendToChatFunc = () => {
        if (guest == false) {
            setsendToChat(true)
            window.document.body.style.overflowY = 'hidden'
            window.document.body.style.scrollMargin = 0
            if (recentChatsStore && recentChatsStore.length > 0) {
                if (recentChatsStore[0].recent && recentChatsStore[0].recent == 'false') {
                    setsendToChatUsers(recentChatsStore[1])
                } else {
                    setsendToChatUsers(recentChatsStore)
                    // setchatUsers(arr)
                }
            } else {
                dispatch(recentChats())
            }
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

    const recentChats = () => async dispatch => {
        const response = await fetch(`${host}/api/chats/recentChats`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id }),
        });
        const json = await response.json();
        console.log(json)


        if (json[0].recent && json[0].recent == 'false') {
            console.log('2')
            // setflwng(json[1])
            setsendToChatUsers(json[1])
        } else {
            for (let i = 0; i < json.length; i++) {
                console.log(json[i].latestMessage.date)
            }
            let sortit = json.sort(function (a, b) {
                return (a.latestMessage.date < b.latestMessage.date) ? -1 : ((a.latestMessage.date > b.latestMessage.date) ? 1 : 0);
            });
            console.log(sortit)
            let arr = sortit.reverse()
            setsendToChatUsers(arr)
        }
    }


    const removeRepost = () => async dispatch => {
        sethasReposted(false)
        setrepostCount(repostCount - 1)
        const response = await fetch(`${host}/api/post/removeRepost`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, postId: feed.product._id }),
        });
        const json = await response.json();


        dispatch({
            type: REMOVE_REPOSTED_POSTS,
            payload: {

                postId: feed._id,
                repostCount: repostCount,
                repost: false
            }
        })

        // console.log(json)
        // dispatch(getstressmsgs())
    }
    const repostFunc = () => {

        if (guest == false) {
            if (hasReposted === false) {

                sessionStorage.setItem('productScroll', window.scrollY)
                sessionStorage.setItem('productc', c)
                console.log(feed.product.postedBy)
                dispatch({
                    type: SET_REPOST,
                    payload: {
                        status: true,
                        description: feed.product.description,
                        postimg: feed.product.postimg,
                        pUsername: feed.product.postedBy.username,
                        pProfileImg: feed.product.postedBy.profileImg,
                        pnotificationSettings: feed.product.postedBy.notificationSettings,
                        pnotificationToken: feed.product.postedBy.notificationToken,
                        pDate: feed.product.posted_Date,
                        p_id: feed.product._id,
                        pPosterId: feed.product.postedBy._id,
                        p_repostCount: repostCount
                    }
                })
                // sessionStorage.setItem('productScrollId', feed.product._id)
                // sessionStorage.setItem('productScroll', window.scrollY)

                navigate('compose-post')
            }
            else if (hasReposted === true) {
                if (window.confirm("Remove Repost") == true) {
                    // console.log('dispatcch karo bhaiya')
                    dispatch(removeRepost())
                }
            }
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

        // setrepost(true)
        // window.document.body.style.overflowY = 'hidden'
    }

    const starFunc = () => {
        if (guest == false) {
            oks = true
            if (star) {
                oks = true
                setstar(false)
                sethasRated(false)
                setrating(0)
                set_rstar(true)
                setlehrado(false)
                settotalStars(totalStars - rating)
            }
            else {
                console.log('kdfjakdfkafdk')

                setstar(true)
                setrating(5)
                settotalStars(totalStars + 5)

            }
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

    const clickedStar = (value) => {
        oks = true
        setstar(true)
        setlehrado(false)
        if (value > rating) {
            // console.log('here', value)

            settotalStars(totalStars + (value - rating))
        } else if (value < rating) {
            // console.log('else', value)
            settotalStars(totalStars - (rating - value))
        }
        setrating(value)
        set_rstar(false)

        if (hasRated == false) {
            sethasRated(true)
        }
        // console.log(rating, 'CLCIK STAR RAN', value)
    }


    const [shareUrl, setshareUrl] = useState('${host}/api/')
    const [share, setshare] = useState(false)
    const shareVia = () => {
        setsendToChat(false)
        window.document.body.style.overflowY = 'scroll'
        window.document.body.style.scrollMargin = 0

        if (share == true) {
            window.document.body.style.overflowY = 'scroll'
            window.document.body.style.scrollMargin = 0
            setshare(false)
        } else {

            var _url
            _url = `${host}/api/product/${feed.product._id}`
            if (navigator.share) {
                navigator.share({
                    title: "Keepitupp",
                    text: "Sharing a post",
                    url: _url
                })
            }
            else {
                window.document.body.style.overflowY = 'hidden'
                window.document.body.style.scrollMargin = 0
                setshareUrl(`${host}/api/product/${feed.product._id}`)
                setshare(true)
            }
        }
    }


    const [showsearchModal, setshowsearchModal] = useState(false)
    const [search, setsearch] = useState("")

    useEffect(() => {
        let timerout = setTimeout(() => {
            // console.log("HERE")
            let x = search.replace(/\s\s+/g, ' ')
            if (x.length > 0) {
                dispatch(searchUsers())
            } else if (x.length == 0 && showsearchModal) {
                // console.log("beee")/
                // dispatch(recentChats())
                sendToChatFunc()

            }
        }, 1000);
        return () => clearTimeout(timerout)
    }, [search])

    const onchange = (e) => {
        setsearch(e.target.value)
        if (showsearchModal == false) {
            setshowsearchModal(true)
        }
    }

    const searchUsers = () => async dispatch => {
        console.log("rabba")
        const response = await fetch(`${host}/api/users/searchUsers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, input: search }),
        });
        const json = await response.json();
        console.log("heheheh")
        console.log(json)
        setsendToChatUsers(json)
        // setposts(json)
    }

    return (
        <>

            {tempdeleted == false ?
                <div onMouseLeave={oml} className='singlePrdct' ref={restorationRef} >

                    <div onClick={() => gotoprdct(feed.product._id)} style={{ display: "flex", alignItems: "center" }}>

                        <div style={{ display: "flex", alignItems: "center" }}  >

                            <img alt="img" className='prdctImg' src={feed.product.postimg[0]} style={{ marginRight: "1rem" }}  ></img>

                        </div>

                        <div style={{ display: "flex", flexDirection: "column", marginRight: "1rem", justifyContent: 'center' }}  >
                            <div className='prdctTitle'  >{feed.product.title}</div>
                            <div className='prdctTagLine'>{feed.product.tagLine}</div>
                            <div className='prdctDescription' style={{ whiteSpace: 'pre-wrap', wordBreak: "break-word", }} >{feed.product.description}</div>

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                                <div className='prdctprice'  >
                                    ₹{feed.product.price}
                                </div>

                                <div style={{ display: "flex", alignItems: "center" }} >


                                    <BiCategory color='gray' />
                                    <span style={{ color: "gray", fontSize: "12px", marginLeft: '0.1rem', whiteSpace: 'pre-wrap', wordBreak: "break-word", }} >
                                        {feed.product.productCategory}
                                    </span>

                                    {/* <div style={{ display: "flex", alignItems: "center", marginLeft: "1rem", color: "silver", }} >
                                        <span style={{ fontSize: "14px" }}   >
                                            4.2
                                        </span>
                                        <FaStar style={{ fontSize: "14px", cursor: "pointer", }} />
                                    </div> */}
                                </div>
                            </div>

                        </div>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', position: "relative" }}>



                        <div className='cmnticon' style={{ marginRight: "0rem" }} onClick={() => gotoprdct(feed.product._id, "goToProductComments")} title='comments'>
                            <FaRegComment key={i} style={{ fontSize: "17px", margin: '0.5rem', marginTop: '0.6rem', }} />
                            <span style={{ opacity: '0.7', fontSize: '14px', marginTop: '0.25rem', }}>{
                                totalComments
                            }</span>

                        </div>


                        <div title='send to chat' className='sendToChat' onClick={sendToChatFunc} >
                            <IoFlashOutline style={{ fontSize: "21px", }} ></IoFlashOutline>
                        </div>







                        <div className='gjhnvb'
                            onMouseOver={omo}
                            style={{ display: 'flex', margin: 0, position: "relative", alignItems: "center" }}>


                            {
                                star ?

                                    <div className='stricon' style={{ padding: "0.5rem" }} onClick={starFunc} >

                                        <FaStar color='orange' style={{ fontSize: "22px", cursor: "pointer", }} />
                                    </div>
                                    :
                                    <div className='stricon' style={{ padding: "0.5rem" }} onClick={starFunc}  >
                                        <FaRegStar style={{ fontSize: "22px", cursor: "pointer", }} />
                                    </div>
                            }




                            <span className='hjkiop' title='average star rating' style={{ opacity: '0.7', fontSize: '14px', marginTop: '0.2rem', userSelect: "none" }}>

                                {totalStars}

                            </span>

                            <div onMouseLeave={oml} className={lehrado ? 'hoverReaction lehrado' : 'hoverReaction '} style={{ position: "absolute", color: "white", left: '50%', transform: 'translate(-50%, -50%)', bottom: "6px", boxShadow: "0px 5px 10px 0px rgba(100, 100, 100, 0.5)" }} >
                                <Stars _rstar={_rstar} clickedStar={clickedStar} postId={feed.product._id} key={i} userId={_id}
                                    hasRated={hasRated}
                                    rating={rating}
                                    star={star} postedBy={feed.product.postedBy}
                                />

                            </div>



                        </div>






                        <div className='reply' style={{ display: 'flex', margin: 0, position: "relative", alignItems: "center" }}>

                            <div className='replyIcon' style={{ cursor: "pointer", }} onClick={repostFunc}>
                                <BsReply color={hasReposted ? "rgb(255, 0, 102)" : ""} style={{ fontSize: "20px", marginTop: "0.1rem" }} ></BsReply>

                            </div>
                            <span title='repost' style={{ opacity: '0.7', fontSize: '14px', userSelect: "none" }}>
                                {repostCount}
                            </span>





                        </div>





                    </div>

                </div> : ""}

            {
                sendToChat ?

                    <dialog
                        // onMouseLeave={closeRepost}
                        className='toChatDialog' open >
                        <div className='toChatMain' style={{ backgroundColor: "black", borderRadius: "1rem 1rem  0 0 ", padding: "0.5rem 0.5rem 1.5rem 0.5rem", background: "black", opacity: "1", maxHeight: "80vh", overflowY: "scroll", opacity: 1, zIndex: 999 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', position: "sticky", top: 0, alignItems: "center" }}>
                                <div className={sendToChat ? 'shareOpt shareOptActive' : 'shareOpt'} style={{ borderRight: "1px solid rgb(100, 100, 100)" }} >
                                    Message
                                </div>
                                <div className='shareOpt' onClick={shareVia} >
                                    Share via <AiOutlineShareAlt />
                                </div>
                                <AiOutlineClose color='' size={28} className='delImg' onClick={() => {
                                    window.document.body.style.overflowY = 'scroll'
                                    window.document.body.style.scrollMargin = 0
                                    setsendToChat(false)
                                }} />
                            </div>
                            <div style={{ display: "flex", borderBottom: "1px solid gray", padding: "0.5rem", position: "sticky", top: 0, opacity: 1, }} >
                                <span style={{ fontWeight: 'bold' }} >To :</span>
                                <input onChange={onchange} placeholder='Search People' maxLength={30} type="text" style={{ outline: "none", border: "none", backgroundColor: 'black', caretColor: "white", color: "white", marginLeft: "1rem", flex: 1, fontWeight: 500 }} />
                            </div>
                            <div style={{ height: "50vh", overflowY: "scroll", scrollMargin: 0 }} >

                                {
                                    sendToChatUsers && sendToChatUsers.length > 0 ?
                                        sendToChatUsers.map((rep, i) => {

                                            return (
                                                <SendItem rep={rep} key={i} sendFunc={sendFunc} _id={_id} >
                                                </SendItem>

                                            )





                                        })
                                        : ''
                                }




                            </div>
                        </div>

                    </dialog>
                    : ''
            }

            {
                share ?
                    <ShareBox shareFunc={shareVia} shareUrl={shareUrl} />
                    : ''
            }
        </>
    )
}







const RequestOrder = ({ feed, requestOrderFunc }) => {
    useEffect(() => {
        toast(`Chat with Owner`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark'

        })

    }, [])

    const navigate = useNavigate()
    const back = () => {
        requestOrderFunc()
        navigate(-1)
    }
    const [message, setmessage] = useState('')

    const send = () => {

    }
    return (
        <>
            <div style={{ width: "30vw", height: "80vh", backgroundColor: "rgb(26, 26, 32)", position: "relative" }} >
                <div className='specificChatName' >
                    <div onClick={back} style={{ marginLeft: "0.5rem" }} >
                        <BsArrowLeft size={20} />
                    </div>
                    <img alt="img" src={feed.postedBy.profileImg} style={{ height: "5.5vh", borderRadius: "50%", margin: "0 0.5rem" }} />

                    <div style={{ fontSize: "1.1rem" }} >
                        {feed.postedBy.username}
                    </div>
                </div>
                <div className='chatInput' style={{ bottom: 0, padding: '0.5rem', backgroundColor: 'black', position: "absolute", bottom: 0 }} >
                    <TextareaAutosize
                        onChange={(event) => {
                            setmessage(event.target.value)
                        }}
                        minRows={1} maxRows={5}
                        value={message}
                        style={{ resize: 'none', outline: 'none', padding: '0.5rem', backgroundColor: "rgb(19, 20, 26)", caretColor: "white ", color: "white", border: 'none', borderRadius: "0.5rem", width: '100%', }} name="description" placeholder='Express your thoughts ...' >

                    </TextareaAutosize>
                    <button className='sendBtn' onClick={send}  >
                        <AiOutlineSend style={{ color: 'white' }} size={28} />
                    </button>
                </div>

            </div>
        </>
    )
}


const ProductCategoriesBar = ({ keywords, filterBtnfunc }) => {





    const [activeElement, setActiveElement] = useState('All')
    const router = useRouter()
    const goto = (index, value) => {
        let el = document.getElementById("content")
        // const link = value.toLowerCase()
        if (value == "All") {
            router.replace({
                pathname: '/products',
                query: null
            }, undefined, { shallow: true }
            )
        } else {
            router.replace({
                pathname: '/products',
                query: { category: index }
            }, undefined, { shallow: true }
            )
        }


        // window.history.replaceState({ ...window.history.state, as: `/products?category=${index}`, url: `/products?category=${index}` }, '', `/products?category=${index}`);


    }


    return (
        <div style={{ display: "flex", width: "100%", alignItems: "center" }} >
            <div className='categoriesBar' style={{ display: "flex" }} id='content' >

                {
                    keywords.map((value, i) => (

                        <div
                            // to={`/${value}`.toLowerCase()}
                            // to={''value.toLowerCase()} 
                            key={i}
                            onClick={() => goto(i, value)}
                            style={router.pathname == `/product/c/${i}`.toLowerCase() || (router.pathname == "/product" && value == "All") ? { textDecoration: 'none', color: 'white', border: "1.5px solid #1e8ae3" } : { textDecoration: 'none', color: 'white', backgroundColor: "#212121" }} className='too' >
                            {value}
                        </div>


                    ))
                }

            </div >
            <div style={{ padding: "0 0.5rem", height: "6vh", display: 'flex', alignItems: "center", }} onClick={filterBtnfunc} >
                {/* #fafa61 */}
                <IoOptions style={{ cursor: "pointer" }} color='orange' size='22' />
            </div>
        </div>

    )
}
