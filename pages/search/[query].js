import React, { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify';

import { host } from '../../Host'
import { BiCategory } from 'react-icons/bi'
import { FaRegComment, FaRegStar, FaStar } from 'react-icons/fa'
import { IoFlashOutline } from 'react-icons/io5'
import Stars from '../../components/Stars'
import { BsReply } from 'react-icons/bs'
import { AiOutlineClose, AiOutlineShareAlt } from 'react-icons/ai'
import { useAppContext, useGeneralContext } from '../../context';
import { useRouter } from 'next/router';
import Head from 'next/head';
import FrndRecommendation from '../../components/FrndRecommendation';
import Test2 from '../../components/Test2';


const SearchScreen = () => {
    const context = useAppContext()
    const genContext = useGeneralContext()
    const router = useRouter()

    const { query } = router.query

    // const { post_search_results, product_search_results } = useSelector(state => state.generalReducer)
    // const { videos, loading } = useSelector(state => state.searchedVideos)

    const { _id, username } = context.sharedState
    const { flw_Recommendations, pollOptedPosts, starred_posts, reposted_posts, guest, product_search_results } = genContext.genstate

    const [showPeople, setshowPeople] = useState(true)
    const [showProducts, setshowProducts] = useState(false)
    const [showPosts, setshowPosts] = useState(false)

    const [posts, setposts] = useState([])
    const [profiles, setprofiles] = useState([])
    const [products, setproducts] = useState([])
    useEffect(() => {
        console.log(query)
        // if (showPeople == false) {
        //    setshowProducts(false)
        //    setshowPosts(false)
        //    setshowPeople(true)
        // } else if (showPeople == true) {
        //    dispatch(searchUsers())
        // }
        // dispatch(searchPosts())
    }, [query])


    const [searching, setsearching] = useState(false)

    useEffect(() => {

        // if (showPeople && profiles.length == 0) {
        //    setsearching(true)


        // }
        // else if (showProducts && products.length == 0) {

        //    setsearching(true)

        // }
        // else if (showPosts && posts.length == 0) {
        //    setsearching(true)


        // }
        let x = router.asPath.replace(/%20/g, " ")

        if (router.asPath == `/search/${query}` || x == `/search/${query}`) {
            console.log("krishna ki mahima hai")
            setshowProducts(false)
            setshowPosts(false)
            setsearching(true)
            setshowPeople(true)
            searchUsers()



        } else if (router.asPath == `/search/${query}?posts` || x == `/search/${query}?posts`) {
            // console.log(query, "gita ki garima hai", post_search_results)
            setshowPeople(false)
            setshowProducts(false)
            setshowPosts(true)
            setsearching(true)
            if (false
                // post_search_results && post_search_results.length > 0
            ) {
                let alreadyExists = false
                for (let t = 0; t < post_search_results.length; t++) {
                    if (post_search_results[t].search == query) {
                        alreadyExists = true
                        console.log("set kiya")
                        setposts(post_search_results[t].results)
                        setsearching(false)

                    }

                    if (t == (post_search_results.length - 1) && !alreadyExists) {
                        searchPosts()
                    }
                }
            } else {
                console.log("fetch kiya")
                searchPosts()
            }


        } else if (router.asPath == `/search/${query}?products` || x == `/search/${query}?products`) {
            setshowPosts(false)
            setshowPeople(false)
            setshowProducts(true)
            setsearching(true)
            if (product_search_results && product_search_results.length > 0) {
                let alreadyExists = false
                for (let t = 0; t < product_search_results.length; t++) {
                    if (product_search_results[t].search == query) {
                        alreadyExists = true
                        console.log("set kiya")
                        setproducts(product_search_results[t].results)
                        setsearching(false)

                    }

                    if (t == (product_search_results.length - 1) && !alreadyExists) {
                        searchProducts()
                    }
                }
            } else {
                console.log("fetch kiya")
                searchProducts()
            }


        }
        //  else {
        //    console.log(query,"dil kyu ye mera shor kare", router.asPath)
        // }
    }, [router.asPath])




    useEffect(() => {
        console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddddd")

        if (router.asPath == `/search/${query}?posts` && posts.length > 0) {
            console.log("postspostspostspostspostspostsposts")

            let a = sessionStorage.getItem("searchScrollPosts")
            if (a) {
                console.log("gigitigigitigigiti")

                window.scrollTo({ top: a, left: 0, behavior: "instant" });
                sessionStorage.removeItem("searchScrollPosts")
            }
        } else if (router.asPath == `/search/${query}?products` && products.length > 0) {
            console.log("productsproductsproductsproductsproductsproducts")

            let a = sessionStorage.getItem("searchScrollProducts")
            if (a) {
                window.scrollTo({ top: a, left: 0, behavior: "instant" });
                sessionStorage.removeItem("searchScrollProducts")

            }
        }
        else if (router.asPath == `/search/${query}` && profiles.length > 0) {
            console.log("pppppppppppppppppp")

            let a = sessionStorage.getItem("searchScroll")
            if (a) {

                window.scrollTo({ top: a, left: 0, behavior: "instant" });
                sessionStorage.removeItem("searchScroll")

            }
        }


    }, [posts, products, profiles])







    async function searchProducts() {
        console.log("rabba")
        const response = await fetch(`${host}/api/users/searchProducts`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, input: query }),
        });
        const json = await response.json();
        console.log("heheheh")
        console.log(json)
        setproducts(json)
        setsearching(false)

        // dispatch({
        //     type: SET_PRODUCT_SEARCH_RESULTS,
        //     payload: {
        //         search: query,
        //         results: json
        //     }
        // })

    }

    async function searchPosts() {
        console.log("rabba")
        const response = await fetch(`${host}/api/users/searchPosts`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, input: query }),
        });
        const json = await response.json();
        console.log("heheheh")
        console.log(json)
        setposts(json)
        setsearching(false)



        // dispatch({
        //     type: SET_POST_SEARCH_RESULTS,
        //     payload: {
        //         search: query,
        //         results: json
        //     }
        // })

    }


    async function searchUsers() {
        console.log("rabba")
        const response = await fetch(`${host}/api/users/searchUsers`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, input: query }),
        });
        const json = await response.json();
        console.log("heheheh")
        console.log(json)
        setprofiles(json)
        // setposts(json)
        setsearching(false)

    }





    const gotoProfile = (user) => {
        console.log(router.asPath)
        if (router.asPath == `/search/${query}?posts`) {
            sessionStorage.setItem("searchScrollPosts", window.scrollY)
        } else if (router.asPath == `/search/${query}?products`) {
            sessionStorage.setItem("searchScrollProducts", window.scrollY)
        } else if (router.asPath == `/search/${query}`) {
            sessionStorage.setItem("searchScroll", window.scrollY)
        }
        router.push(`/${user}`)
    }


    const [productModal, setproductModal] = useState(false)


    const gotoContent = (id) => {
        setproductModal(true)

        if (router.asPath == `/search/${query}?posts`) {
            sessionStorage.setItem("searchScrollPosts", window.scrollY)

            router.push(`/post/${id}`)
        } else if (router.asPath == `/search/${query}?products`) {
            sessionStorage.setItem("searchScrollProducts", window.scrollY)
            router.push(`/products/${id}`)
        }
    }






    return (
        <>
            {/* <Helmet>
            <title> {`${query}`}</title>
            <meta name="description" content="Search Keepitupp"  /> */}
            {/* </Helmet> */}

            <div className="srchMain" style={{ position: "relative" }} >


                <Head>
                    <title> {query ? query : ""} / Keepitupp</title>
                    <meta
                        name="keywords"
                        content={`search ${query ? query : "keepitupp"}`}
                    />
                </Head>

                {/* <div>{query}</div> */}


                <div style={{
                    display: 'flex', flexDirection: 'row', boxSizing: 'border-box', justifyContent: 'center', position: "relative",
                    scrollMargin: 0, margin: 0,
                }}   >
                    <div className='centertest3'>
                        <div className="searchResultCategory">
                            <div className={router.asPath === `/search/${query}` ? "srCat srCatActive" : "srCat"} onClick={() => {
                                // setshowProducts(false)
                                // setshowPosts(false)
                                // setshowPeople(true)
                                router.push((`/search/${query}`))

                            }} >People</div>
                            <div className={router.asPath === `/search/${query}?posts` ? "srCat srCatActive" : "srCat"} onClick={() => {
                                // setshowPeople(false)
                                // setshowProducts(false)
                                // setshowPosts(true)
                                router.push((`/search/${query}?posts`))
                            }}  >Posts</div>
                            <div className={router.asPath === `/search/${query}?products` ? "srCat srCatActive" : "srCat"} onClick={() => {
                                // setshowPeople(false)
                                // setshowPosts(false)
                                // setshowProducts(true)
                                router.push((`/search/${query}?products`))

                            }} >Products</div>
                            {/* <div className={showPeople ? "srCat":""} ></div> */}

                        </div>
                        {
                            showPosts ?
                                posts.length > 0 ?
                                    posts.map((post, i) => {
                                        return (
                                            <Test2 feed={post} key={i} gotoProfile={gotoProfile} gotoContent={gotoContent} />
                                        )
                                    }) :
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontWeight: "600" }} >
                                        {
                                            searching ?
                                                <div style={{ width: "100%", textAlign: "center" }}>
                                                    <Spinner style={{ margin: "40vh 0", color: "skyblue" }} />
                                                </div>
                                                : "No Results"
                                        }

                                    </div>
                                :
                                ""
                        }

                        {
                            showPeople ?
                                profiles.length > 0 ?
                                    profiles.map((profile, i) => {
                                        return (
                                            <div className='srchresultProf' key={i} style={{ display: "flex", padding: "0.5rem", }} >
                                                <img alt="img" onClick={() => gotoProfile(profile.username)} src={profile.profileImg} style={{ width: "3rem", height: "3rem", borderRadius: "50%", marginRight: '0.6rem', cursor: 'pointer' }} />
                                                <div style={{ display: "flex", flexDirection: "column" }} >
                                                    <div onClick={() => gotoProfile(profile.username)} style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>{profile.username}</div>
                                                    <div onClick={() => gotoProfile(profile.username)} style={{ marginBottom: 0, fontSize: '0.8rem', marginTop: '0.1rem', cursor: 'pointer' }}>{profile.name}</div>
                                                    <div style={{ marginBottom: 0, fontSize: '11px', marginTop: '0.1rem', cursor: 'pointer' }}>{profile.bio}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontWeight: "600" }} >
                                        {
                                            searching ?
                                                <div style={{ width: "100%", textAlign: "center" }}>
                                                    <Spinner style={{ margin: "40vh 0", color: "skyblue" }} />
                                                </div> : "No Results"
                                        }

                                    </div>

                                :
                                <>

                                </>
                        }

                        {
                            showProducts ?
                                <div className='prdctdiv' style={{ display: "flex", flexWrap: "wrap", boxSizing: "border-box", width: "100%", marginBottom: '20vh', alignItems: "center" }} >
                                    {products.map((feed, i) => {
                                        return (
                                            <>
                                                <SingleProduct key={i} feed={feed} i={i} gotoContent={gotoContent} _id={_id} username={username} />
                                            </>
                                        )
                                    })}
                                </div>

                                :
                                <>
                                    {
                                        searching ?
                                            <div style={{ width: "100%", textAlign: "center" }}>
                                                <Spinner style={{ margin: "40vh 0", color: "skyblue" }} />
                                            </div> : ""
                                    }
                                </>
                        }


                    </div>



                    <FrndRecommendation />

                </div>













                {/* for youtube */}
                {
                    router.asPath == `/searchyt/${query}` ? <Container >

                        {!loading ? (
                            videos?.map(video => (
                               <>
                                {/* <YtsearchResults
                                    video={video}
                                    key={video.id.videoId}
                                    searchScreen='searchscreen'
                                    query={query}
                                /> */}
                               </>
                            ))
                        ) : ""
                        }
                    </Container> :
                        ""
                }

            </div>


        </>
    )
}

export default SearchScreen


const SingleProduct = ({ feed, i, gotoContent, _id, username, restorationRef }) => {
    const genContext = useGeneralContext()
    const { guest } = genContext.genstate


        useEffect(() => {
            if (restorationRef) {
                // console.log(restorationRef)

                let z = sessionStorage.getItem('productScrollId')
                let y = sessionStorage.getItem('productScroll')
                // console.log(y)
                // console.log('malhari', restorationRef)
                if (restorationRef.current != null) {
                    // console.log('jaage na sota hai')
                    restorationRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
                } else {
                    if (z == feed._id) {
                        // console.log('insdie')
                        window.scrollTo(0, y);

                    }
                }

            }
            var comments = 0
            var hasRated = false
            var _rating = 0
            var totalstars = 0
            var my_rating = 0

            for (let i = 0; i < feed.ratedBy.length; i++) {
                totalstars = feed.ratedBy[i].starRating + totalstars

                if (feed.ratedBy[i].raterId == _id) {
                    hasRated = true
                    _rating = feed.ratedBy[i].starRating
                }

                if (feed.ratedBy[i].raterComment.length > 0) {
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

            if (feed.reposts) {

                setrepostCount(feed.reposts)
            }

            if (feed.reposters) {

                for (let j = 0; j < feed.reposters.length; j++) {
                    if (feed.reposters[j].reposterId == _id) {
                        sethasReposted(true)
                    }
                }
            }

        }, [])

    // reactions



    const [totalComments, settotalComments] = useState(0)
    const [rated, setrated] = useState(false)
    const [sendToChatUsers, setsendToChatUsers] = useState()
    const [sendToChat, setsendToChat] = useState(false)
    const [sendPostTo, setsendPostTo] = useState([])
    const [star, setstar] = useState(false)
    const [hasRated, sethasRated] = useState(false)
    const [rating, setrating] = useState(0)
    const [_rstar, set_rstar] = useState(false)
    const [totalStars, settotalStars] = useState(0)
    const [hasReposted, sethasReposted] = useState(false)
    const [repostCount, setrepostCount] = useState(0)
    const [tempdeleted, settempdeleted] = useState(false)

    const sendFunc = (sendTo) => {

        let ok = _id.toString()

        // console.log(sendPostTo)
        socket.emit("send_post", { sendTo: sendTo, postId: feed._id, sender: _id, senderUsername: username });
        // console.log('sendPostTo', ok)

        if (sendTo) {
            setsendPostTo([...sendPostTo, sendTo])
        }


    }

    const [avgStar, setavgStar] = useState(0)
    const [lehrado, setlehrado] = useState(false)


    var oks = false

    var timeout
    const omo = () => {
        oks = false
        timeout = setTimeout(() => {
            if (oks == false) {
                setlehrado(true)
            }
        }, 1500);
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
        setsendToChat(true)
        window.document.body.style.overflowY = 'hidden'
        window.document.body.style.scrollMargin = 0
        dispatch(recentChats())
    }

    const repostFunc = () => {
        if (guest == false) {
            if (hasReposted === false) {
                dispatch({
                    type: SET_REPOST,
                    payload: {
                        status: true,
                        description: feed.description,
                        postimg: feed.postimg,
                        pUsername: feed.postedBy.username,
                        pProfileImg: feed.postedBy.profileImg,
                        pnotificationSettings: feed.postedBy.notificationSettings,
                        pnotificationToken: feed.postedBy.notificationToken,
                        pDate: feed.posted_Date,
                        p_id: feed._id,
                        pPosterId: feed.postedBy._id,
                        p_repostCount: repostCount
                    }
                })
                // sessionStorage.setItem('homeScrollId', feed._id)
                // sessionStorage.setItem('homeScroll', window.scrollY)

                router.push('compose-post')
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

    }

    const removeRepost = () => async dispatch => {
        sethasReposted(false)
        setrepostCount(repostCount - 1)
        const response = await fetch(`${host}/api/post/removeRepost`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, postId: feed._id }),
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


    const starFunc = () => {
        oks = true
        if (star) {
            oks = true
            setstar(false)
            sethasRated(false)
            setrating(0)
            set_rstar(true)
            setlehrado(false)
        }
        else {
            console.log('kdfjakdfkafdk')

            setstar(true)
            setrating(5)
        }
    }

    const clickedStar = (value) => {
        oks = true
        setstar(true)
        setlehrado(false)
        if (value > rating) {
            console.log('here', value)

            settotalStars(totalStars + (value - rating))
        } else if (value < rating) {
            console.log('else', value)
            settotalStars(totalStars - (rating - value))
        }
        setrating(value)
        set_rstar(false)

        if (hasRated == false) {
            sethasRated(true)
        }
        console.log(rating, 'CLCIK STAR RAN', value)
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
            _url = `${host}/api/product/${feed._id}`
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
                setshareUrl(`${host}/api/product/${feed._id}`)
                setshare(true)
            }
        }
    }
    return (
        <>
            <div className='singlePrdct' style={{ width: "inherit" }} ref={restorationRef} >

                <div onClick={() => gotoContent(feed._id)} style={{ display: "flex", alignItems: "center" }}>

                    <div style={{ display: "flex", alignItems: "center" }}  >

                        <img alt="img" className='prdctImg' src={feed.postimg[0]} style={{ marginRight: "1rem" }}  ></img>

                    </div>

                    <div style={{ display: "flex", flexDirection: "column", marginRight: "1rem", justifyContent: 'center' }}  >
                        <div className='prdctTitle'  >{feed.title}</div>
                        <div className='prdctTagLine'>{feed.tagLine}</div>
                        <div className='prdctDescription'>{feed.description}</div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                            <div className='prdctprice'  >
                                ₹{feed.price}
                            </div>
                            <div>
                                <BiCategory color='gray' />
                                <span style={{ color: "gray", fontSize: "12px", marginLeft: '0.1rem' }} >
                                    {feed.productCategory}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='pReactions' style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', position: "relative", }}>


                    <div onClick={() => gotoContent(feed._id)} className='cmnticon' style={{ marginRight: "0rem" }} title='comments'>
                        <FaRegComment key={i} style={{ fontSize: "18px", margin: '0.5rem', marginTop: '0.6rem', }} />
                        <span style={{ margin: '0.1rem', opacity: '0.7', fontSize: '0.8rem', marginTop: '0.5rem', }}>{
                            totalComments
                        }</span>

                    </div>


                    <div title='send to chat' className='sendToChat' onClick={sendToChatFunc} >
                        <IoFlashOutline style={{ fontSize: "21px", margin: '0.5rem' }} ></IoFlashOutline>
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
                            <Stars _rstar={_rstar} clickedStar={clickedStar} postId={feed._id} key={i} userId={_id}
                                hasRated={hasRated}
                                rating={rating}
                                star={star}
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

            </div>

            {
                sendToChat ?

                    <dialog
                        // onMouseLeave={closeRepost}
                        className='toChatDialog' open >
                        <div className='toChatMain' style={{ backgroundColor: "black", borderRadius: "1rem", padding: "0.5rem 0.5rem 1.5rem 0.5rem", background: "black", opacity: "1", maxHeight: "80vh", overflowY: "scroll", opacity: 1, zIndex: 999 }}>
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
                                <query placeholder='Search People' type="text" style={{ outline: "none", border: "none", backgroundColor: 'black', caretColor: "white", color: "white", marginLeft: "1rem", flex: 1, fontWeight: 500 }} />
                            </div>
                            <div style={{ height: "50vh", overflowY: "scroll", scrollMargin: 0 }} >

                                {
                                    sendToChatUsers && sendToChatUsers.length > 0 ?
                                        sendToChatUsers.map((rep, i) => {

                                            return (
                                                <>
                                                    {/* <SendItem rep={rep} key={i} sendFunc={sendFunc} _id={_id} >
                                                </SendItem> */}
                                                </>

                                            )





                                        })
                                        : ''
                                }




                            </div>
                        </div>

                    </dialog>
                    : ''
            }

            {/* {
                share ?
                    <ShareBox shareFunc={shareVia} shareUrl={shareUrl} />
                    : ''
            } */}
        </>
    )
}








