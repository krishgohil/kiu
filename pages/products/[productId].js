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
import io from "socket.io-client";
import { host } from '../../host'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'
import { Spinner } from 'react-bootstrap'
import { useAppContext } from '../../context'



const ProductModal = () => {
  const router = useRouter()
  const context = useAppContext()
  const { _id, username, profileImg } = context
  const [feed, setfeed] = useState([])
  const { productId } = router.query
  const [cmntlytics, setcmntlytics] = useState(0)

  const [comments, setcomments] = useState([])

  const [comment, setcomment] = useState('')
  useEffect(() => {
    // console.log(productId)
    console.log("helo")
    let gotocomments = sessionStorage.getItem("goToProductComments")
    console.log(gotocomments)
    let x = sessionStorage.removeItem("goToProductComments")
    // dispatch(fetchUniqProduct(gotocomments))
    fetchUniqProduct()
  }, [productId])



  const onchange = (e) => {
    setcomment(e.target.value)
  }


  const [star, setstar] = useState(false)

  const clickedStar = (value) => {
    setstar(true)
    setrating(value)
    set_rstar(false)

    if (hasRated == false) {
      sethasRated(true)
    }
    // console.log('CLCIK STAR RAN')
  }

  const [_rstar, set_rstar] = useState(false)

  const [totalComments, settotalComments] = useState(0)

  const [hasRated, sethasRated] = useState(false)
  const [rating, setrating] = useState(0)
  const [avgStar, setavgStar] = useState(0)
  async function fetchUniqProduct(gotocomments) {

    try {

      const response = await fetch(`${host}/api/product/fetchUniqProduct`, {
        // const response = await fetch("${host}/api/post/fetchUniqProduct", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: productId }),
      })
      const json = await response.json();
      // console.log(json)
      setfeed(json)
      var comments = 0
      var hasRated = false
      var _rating = 0
      var arr = []
      var avgstar = 0
      var totalstars = 0

      for (let i = 0; i < json[0].ratedBy.length; i++) {
        totalstars = json[0].ratedBy[i].starRating + totalstars
        // console.log('lllllllllllllllllllllllllllllllllllll')
        if (json[0].ratedBy[i].raterId == _id) {
          console.log(json[0].ratedBy[i].starRating)
          hasRated = true
          _rating = json[0].ratedBy[i].starRating
        }

        if (json[0].ratedBy[i].raterComment.length > 0) {
          arr.push(json[0].ratedBy[i])
          comments = comments + 1
        }

      }

      avgstar = totalstars / json[0].ratedBy.length
      setavgStar(avgstar)

      sethasRated(hasRated)
      if (hasRated == true) {
        setrating(_rating)
        setstar(true)
      }
      settotalComments(comments)
      setcomments(arr)
      setcmntlytics(arr.length)

      if (gotocomments) {
        setshowallComments(true)
      }

      dispatch(similarAndMore(json[0].productCategory, json[0].postedBy))

    } catch (error) {

    }
  }

  const goToProfile = () => {
    navigate(`/${feed[0].username}`)
  }

  const close = () => {
    navigate(-1)
  }


  const [req, setreq] = useState(false)
  const requestOrderFunc = (id) => {
    if (guest == false) {
      if (req == true) {
        setreq(false)
      } else {
        // console.log(id)
        dispatch(checkIfChat(id))
        // setreq(true)
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


  const [moreFrom, setmoreFrom] = useState()
  const [similar, setsimilar] = useState()

  const similarAndMore = (productCategory, postedBy) => async dispatch => {
    // console.log("postedBy", postedBy)
    // console.log("productCategory", productCategory)
    const response = await fetch(`${host}/api/product/similarAndMore`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productCategory: productCategory, postedBy: postedBy }),
    });
    const json = await response.json();

    // console.log(json)
    setmoreFrom(json.moreFrom)
    setsimilar(json.similar)
    // localStorage.setItem('l', 'prdct')
  }
  const checkIfChat = (id) => async dispatch => {

    console.log(id)
    // console.log(_id)

    if (id != _id && id.length == 24 && _id.length == 24) {
      const response = await fetch(`${host}/api/chats/checkIfChat`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: _id, receiverId: id }),
      });
      const json = await response.json();
      // console.log(json)
      localStorage.setItem('l', 'prdct')

      dispatch({
        type: SET_PRDCT_CHAT,
        payload: {
          img: feed[0].postimg[0],
          title: feed[0].title,
          tagLine: feed[0].tagLine,
          price: feed[0].price,
          discountedPrice: feed[0].discountedPrice,
          productCategory: feed[0].productCategory,
          ownerId: feed[0].postedBy._id,
          _id: feed[0]._id,
          chatId: json._id
        }
      })
      navigate(`/chats/${json._id}`)
    }
    else if (id == _id) {
      toast.info('Cannot send message to yourself !', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'

      })
    }



    // setchatUsers(json)
  }


  const postCmnt = () => async dispatch => {

    if (guest == false) {
      try {
        const response = await fetch(`${host}/api/post/postComment`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId: feed[0]._id, comment: comment, userId: _id })
        })
        const json = await response.json();
        // console.log(json)
        setcomment('')

      } catch (error) {
        console.log(error)

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


  const [liked, setliked] = useState(false)
  const [disliked, setdisliked] = useState(false)
  const [showComments, setshowComments] = useState(false)

  const clickLike = () => {
    if (guest == false) {
      setdisliked(false)
      if (liked) {
        setliked(false)
        // dispatch(liketocomment())

      } else {
        setliked(true)
        // dispatch(liketocomment())
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

  const clickDislike = () => {

    if (guest == false) {
      setliked(false)

      if (disliked) {
        setdisliked(false)
      } else {
        setdisliked(true)
        // dispatch(disliketocomment())
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

  const clickComment = () => {
    console.log('clickComment')
    // setshowReplyInput(value => !value)
  }

  const editProductFunc = () => {
    dispatch({
      type: SET_EDIT_PRODUCT,
      payload: {
        status: true,
        productId: feed[0]._id
        // description: feed.product.description,
        // postimg: feed.product.postimg,
        // pUsername: feed.product.postedBy.username,
        // pProfileImg: feed.product.postedBy.profileImg,
        // pDate: feed.product.posted_Date,
        // p_id: feed.product._id,
        // pPosterId: feed.product.postedBy._id
      }
    })
    navigate("/compose-post")
  }

  const [showallComments, setshowallComments] = useState(false)
  const readAllFunc = () => {
    if (showallComments) {
      setshowallComments(false)
    } else {
      setshowallComments(true)
    }
  }

  return (
    <>

      {
        feed && feed.length > 0 ?

          feed.map((feed, i) =>
            <>
              <dialog dialog open style={{ position: 'absolute', border: 'none', color: 'white', zIndex: 999, left: '0%', backgroundColor: "#1c1f24", height: '100vh', width: '100vw', position: 'fixed', display: 'flex', overflow: 'hidden', justifyContent: 'center', top: '0vh', padding: 0 }}>
                <div className='modalprdct' key={i} >
                  <div className='byuser'  >

                    <div className='pmgoback' style={{ padding: "0.2rem" }} >
                      <BsArrowLeft size={24} color='silver' onClick={() => router.back(-1)} ></BsArrowLeft>
                    </div>

                    {
                      feed.postedBy._id == _id ?
                        <div onClick={editProductFunc} style={{ display: "flex", alignItems: "center" }}>
                          <span style={{ marginRight: "0.5rem" }}>
                            Edit Product
                          </span>
                          <FaRegEdit />
                        </div>
                        : ""
                    }


                    <div style={{ display: "flex", alignItems: "center" }} onClick={() => navigate(`/${feed.postedBy.username}`)} >
                      BY
                      <span style={{ color: "silver", fontWeight: "500", marginLeft: "0.5rem", }} >
                        {feed.postedBy.username}
                      </span>
                      <img alt="img" style={{ width: "2rem", height: "2rem", borderRadius: "50%", marginLeft: "0.5rem" }} src={feed.postedBy.profileImg} />
                    </div>
                  </div>
                  <div className='phead'  >
                    <div style={{ display: "flex", alignItems: 'center' }} >
                      <img alt="img" className='pmImg' src={feed.postimg[0]}
                      />

                      <div style={{ margin: "0 1rem", whiteSpace: 'pre-wrap', wordBreak: "break-word" }} >
                        <h3>
                          {feed.title}
                        </h3>
                        <div className='pmtaglinepc' >
                          {feed.tagLine}
                        </div>
                      </div>
                    </div>



                  </div>


                  <div className='pmpricevisit' >
                    {
                      feed.price > 0 ?
                        <>
                          <div className='pmprice' onClick={() => requestOrderFunc(feed.postedBy._id)} >

                            <span  >₹</span>
                            <span style={{ marginRight: "0.5rem", marginLeft: "0.25rem", color: "white", fontWeight: "500" }} >{feed.price}</span >
                            <s style={{ color: "#ededed" }} > <span style={{ color: "" }} >₹</span> {feed.discountedPrice}</s>
                          </div>

                        </> :
                        <div className='pmprice' onClick={() => requestOrderFunc(feed.postedBy._id)} >
                          Free
                        </div  >
                    }

                    <div onClick={() => window.open(`${feed.link}`, '_blank')
                    } className='pvisit' style={{ fontWeight: "500", borderLeft: "1px solid gray", padding: "0.5rem", display: "flex", alignItems: 'center', cursor: "pointer" }} >
                      <span>
                        Visit
                      </span>

                      <span style={{ margin: "0 0 0.25rem 0.5rem" }} ><FiExternalLink size={15} /></span>
                    </div>
                  </div>



                  <div className='pmimages'  >
                    <Swiper
                      className='jkliop'
                      style={{ width: 'auto', height: "auto", backgroundColor: "#16181b", }}
                      // install Swiper modules
                      modules={[Navigation, Pagination, Scrollbar, A11y]}
                      // spaceBetween={50}
                      slidesPerView={window.innerWidth < 801 ? 1 : 4}
                      navigation
                      pagination={{ clickable: true }}
                      scrollbar={{ draggable: true }}
                    // onSwiper={(swiper) => console.log(swiper)} 
                    // onSlideChange={() => console.log('slide change')}
                    >
                      {


                        feed.postimg.map((img, i) =>
                          <div key={i}>
                            <SwiperSlide style={{ width: '100%', borderRadius: "0.5rem", padding: "0.25rem", backgroundColor: "#16181b", }} >
                              <img alt="img" style={{ width: '100%', borderRadius: "0.5rem" }}
                                //  onDoubleClick={dbclick}
                                className='postImg' src={feed.postimg[i]} />
                            </SwiperSlide>
                            {/* < img src={feed.postimg[i]}  style={{ marginBottom: '4px' }} /> */}
                          </div>
                        )
                      }
                    </Swiper>

                  </div>

                  <h6 style={{ padding: "0.5rem", marginTop: "1rem" }} >
                    About this product
                  </h6>
                  <div className='pmdesc' >
                    {feed.description}
                  </div>


                  <div className='pmrevrelated'  >

                    <div className='revmain' >
                      <div style={{ padding: "0.5rem", margin: "0.5rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }} >

                        <span style={{ fontWeight: "500", }} >Comments</span>
                        <span style={{ marginRight: "2rem", fontSize: "14px", }} onClick={readAllFunc}  >Read All <AiOutlineRight></AiOutlineRight> </span>
                      </div>

                      <div onClick={readAllFunc}>
                        {
                          comments && comments.length > 0 ?
                            comments.map((comment, i) =>
                              comment.raterComment.length > 0 && i < 2 ?
                                ""
                                : ""
                            )
                            :
                            <div style={{ display: 'flex', justifyContent: "center", height: '25vh', alignItems: 'center', color: "white", fontWeight: '600' }} >
                              No Comments Yet
                            </div>
                        }


                      </div>






                    </div>

                    <div className='relatedprdcts' >
                      <div style={{ position: "sticky", top: 0, padding: "0.5rem", backgroundColor: "#16181b", }} >
                        More from
                        <span style={{ fontWeight: '500', marginLeft: '0.25rem' }} >
                          {feed.postedBy.username}
                        </span>
                        <img alt="img" style={{ width: "2rem", height: "2rem", borderRadius: "50%", marginLeft: "0.5rem" }} src={feed.postedBy.profileImg} />
                      </div>
                      <div className='prdctdiv' style={{ display: "flex", flexWrap: "wrap", boxSizing: "border-box", width: "100%", alignItems: "center", width: "100%" }} >
                        {
                          moreFrom && Array.isArray(moreFrom)
                            ?
                            <>
                              {
                                moreFrom.map((more, i) => {

                                  return (
                                    <div key={i}
                                      onClick={() => navigate(`/product/${more._id}`)}
                                      className='singlePrdct' style={{ width: "100%" }} >
                                      <div style={{ display: "flex", alignItems: "center", }}  >

                                        <img alt="img" className='prdctImg' src={more.postimg[0]} style={{ marginRight: "1rem" }}  ></img>
                                      </div>

                                      <div style={{ display: "flex", flexDirection: "column", marginRight: "1rem", justifyContent: 'center' }}  >
                                        <div className='prdctTitle'  >{more.title}</div>
                                        <div className='prdctTagLine'>{more.tagLine}</div>

                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                                          <div className='prdctprice'  >
                                            ₹{more.price}
                                          </div>
                                          <div>
                                            <BiCategory color='gray' />
                                            <span style={{ color: "gray", fontSize: "12px", marginLeft: '0.1rem' }} >
                                              {more.productCategory}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                }




                                )
                              }

                            </>

                            : ""
                        }

                      </div>
                    </div>


                  </div>


                  <h6 style={{ margin: "2rem 0 1rem 0.5rem" }} >More On Keepitupp :</h6>
                  <Swiper
                    className='jkliop'
                    style={{ width: 'auto', height: "auto", backgroundColor: "#16181b", alignItems: "flex-start" }}
                    // install Swiper modules
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    // spaceBetween={50}
                    slidesPerView={window.innerWidth < 801 ? 2 : 4}
                    navigation={true}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}

                  >
                    {
                      similar && Array.isArray(similar) ?
                        similar.map((simi, i) => {
                          return (
                            <SwiperSlide key={i} style={{ margin: "0 0rem", width: '100%', backgroundColor: '#16181b', borderRadius: "0.5rem", padding: "0 0.25rem", alignItems: "flex-start" }} >
                              <div
                                onClick={() => navigate(`/product/${simi._id}`)}
                                className='singlePrdct' style={{ width: "100%", backgroundColor: 'black', padding: "0.5rem", borderRadius: "0.5rem", margin: "0", }} >
                                <div style={{ display: "flex", justifyContent: 'center' }}  >

                                  <img alt="img" className='prdctImg' src={simi.postimg[0]} style={{ margin: "0 0 0.5rem 0", }}  ></img>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center' }}  >
                                  <div className='prdctTitle' style={{ textAlign: "center" }} >{simi.title}</div>

                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                                    <div className='prdctprice'  >
                                      ₹{simi.price}
                                    </div>
                                    <div>
                                      <BiCategory color='gray' />
                                      <span style={{ color: "gray", fontSize: "12px", marginLeft: '0.1rem' }} >
                                        {simi.productCategory}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </SwiperSlide>
                          )
                        })


                        : ""
                    }


                  </Swiper>


                  <div style={{
                    //  height: "20vh", backgroundColor: "royalblue",
                    marginTop: '2rem',
                    color: "gray", textAlign: "center"
                  }} >
                    Copyright <MdOutlineCopyright /> <span>Keepitupp</span> 2022 @All rights reserved
                  </div>


                  {

                    feed.price > 0 ?
                      <div style={{ position: "sticky", bottom: 0, display: "flex", justifyContent: 'flex-end', padding: '0.5rem', zIndex: 999 }}>
                        <span onClick={() => requestOrderFunc(feed.postedBy._id)} style={{ backgroundColor: '#0e5abf', padding: '0.5rem', borderRadius: '0.5rem', cursor: "pointer" }} >

                          Request Order <MdOutlineShoppingCart size={20} />
                        </span>
                      </div>
                      : ''
                  }


                  {
                    req ?
                      <dialog open style={{ position: 'absolute', border: 'none', color: 'white', zIndex: 999, left: '0%', backgroundColor: "rgba(0,0,0,.85)", height: '100vh', width: '100vw', position: 'fixed', display: 'flex', overflow: 'hidden', justifyContent: 'center', top: '0vh', alignItems: "center" }}>
                        <RequestOrder feed={feed} requestOrderFunc={requestOrderFunc} />
                      </dialog>
                      : ""
                  }

                  {
                    showallComments ?
                      <dialog className='prdctAllCmntsDia' open >
                        <div className='allCmntsMain' style={{ maxHeight: "90vh", backgroundColor: "#16181b", padding: '0.5rem 0.5rem 0 0.5rem', }} >
                          <div style={{ display: "flex", justifyContent: "space-between" }} >
                            <div style={{ fontWeight: "500", }} >
                              Comments
                            </div>
                            <AiOutlineClose onClick={readAllFunc} size={25} />
                          </div>
                          <div style={{ minHeight: '60vh' }}>
                            {
                              comments && comments.length > 0 ?
                                comments.map((comment, i) =>
                                  comment.raterComment.length > 0 ?
                                    <CommentItem key={i} comment={comment} userId={_id} postId={feed._id}
                                    //    fetchcomments={fetchcomments} 
                                    />
                                    : ""
                                )
                                :
                                <div style={{ display: 'flex', justifyContent: "center", height: '55vh', alignItems: 'center', color: "white", fontWeight: '600' }} >
                                  No Comments Yet
                                </div>
                            }


                          </div>
                          {
                            _id && _id.length > 0 && guest == false ?
                              <div style={{ position: "sticky", bottom: "0" }} >
                                <div style={{ backgroundColor: 'inherit', display: "flex", paddingTop: "0.5rem", marginLeft: "0.5rem", alignItems: 'center', }} >
                                  <img alt="img" src={profileImg} style={{
                                    height: '2.5rem',
                                    width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem'
                                  }} ></img>
                                  <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between', width: '80%', alignItems: "center" }}>

                                    <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                                      <div style={{ margin: 0, display: 'flex', flexDirection: 'row', overflowY: 'scroll' }}>

                                        <Stars _rstar={_rstar} clickedStar={clickedStar} postId={feed._id} key={i}
                                          userId={_id}
                                          hasRated={hasRated}
                                          rating={rating}
                                          star={star}
                                        />

                                      </div>
                                    </div>

                                    {
                                      star ?
                                        <div>
                                          <MdBlockFlipped
                                            onClick={() => set_rstar(true)}
                                            color='gray'
                                            size={24} />
                                        </div> : ''
                                    }




                                  </div>

                                </div>
                                <div style={{ width: "100%  ", display: 'flex', alignItems: 'center', }} >
                                  <TextareaAutosize onChange={onchange} value={comment} maxRows={3} style={{ caretColor: 'white', color: 'white', outline: 'none', border: 'none', borderBottom: '1px solid gray', bottom: 0, padding: '0.5rem', margin: '0.5rem', marginRight: '1rem', width: "80%", resize: 'none', }} className='sskassdf' />

                                  <button style={{ border: '1px solid black', padding: '0.5rem 1rem 0.5rem 1rem', marginRight: '0.5rem', borderRadius: '0.5rem', backgroundColor: '#0095f6', color: 'white', fontWeight: 'bold' }}
                                    onClick={() => dispatch(postCmnt())}
                                  >Post</button>


                                </div>
                              </div>

                              : ""
                          }
                        </div>
                      </dialog>
                      : ""
                  }



                </div>
              </dialog >

            </>
          )


          : <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
            <Spinner style={{ margin: "1rem 0", color: "skyblue" }} />
          </div>
      }

    </>
  )
}
export default ProductModal
