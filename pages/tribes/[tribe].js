import { useRouter } from 'next/router'
import React from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { BsArrowLeft } from 'react-icons/bs'
import { MdPhotoCameraFront, MdSettings } from 'react-icons/md'

const Tribe = () => {
    const router = useRouter()
    const { tribe } = router.query
    return (
        <>


            {/* Tribe:{tribe} */}

            <>




                <div style={{
                    display: 'flex',
                    width: '100%',
                    // backgroundColor: 'whitesmoke',
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    position: "relative"

                }}
                >



                    <div
                        id='lop'
                        className='srchRow'
                    // style={{width :'70%'}}
                    >
                        <div className='gobackPC' style={{ position: "fixed", top: '56px', width: "inherit", backgroundColor: "black", maxWidth: "inherit", zIndex: "9", }} >
                            <div onClick={() => router.back()} style={{ marginLeft: '1rem', color: 'silver' }}  >
                                <BsArrowLeft size={20} />
                            </div>
                            <div>
                                <p onClick={() => window.scrollTo(0, 0)
                                } style={{ margin: '0 1rem', fontWeight: "500", cursor: "pointer", color: "silver" }} >
                                    Startups
                                    {/* {router.asPath === `/${profile}?kwiks` ? " / kwiks" : ""}
                                    {router.asPath === `/${profile}?products` ? " / products" : ""}
                                    {router.asPath === `/${profile}?media` ? " / media" : ""} */}

                                </p>


                            </div>
                        </div>

                        <Col
                            // ref={ref}
                            className='searchedprofileContainer'>



                            <Row className='basicinfo' style={{ display: 'flex', justifyContent: "space-between", }}>
                                <img alt="img" className='profileimg' src='https://pbs.twimg.com/profile_banners/1236853105855057920/1672495473/1500x500' style={{ borderRadius: "0", width: "100%", border: "none" }} ></img>
                                <Col lg={6} xs={4} style={{ display: 'flex', flexDirection: 'column', }}>
                                    <img alt="img" className='profileimg' src='https://styles.redditmedia.com/t5_2qp4r/styles/communityIcon_gn6rddpl1go21.png?width=256&s=40b2ad225d606e0172ce34a544692090a3b266a3' ></img>
                                </Col>


                                <Col lg={2} xs={2}>
                                    <Col style={{ marginTop: '1rem', display: 'flex' }} className='flwng'>
                                        <p style={{ cursor: 'pointer' }} className='flwng'>Following</p>
                                    </Col>

                                    <Col style={{ marginTop: '1rem', display: 'flex', }} className='flwrs'>
                                        <p style={{ cursor: 'pointer' }} className='flwrs' >Followers</p>
                                    </Col>

                                    <Col style={{ marginTop: '1rem', display: 'flex' }} className='sscore' >
                                        <p style={{ cursor: 'pointer' }} className='sscore'>SocialScore</p>
                                    </Col>

                                </Col>
                                <Col lg={2} xs={2} >
                                    <Col style={{ marginTop: '1rem', display: "flex" }} ><p style={{ fontWeight: 'bold', cursor: 'pointer' }} className='flwng' >5</p></Col>
                                    <Col style={{ marginTop: '1rem', display: "flex" }} ><p style={{ fontWeight: 'bold', cursor: 'pointer' }} className='flwrs' >5</p></Col>
                                    <Col style={{ marginTop: '1rem', display: "flex" }} ><p style={{ fontWeight: 'bold', cursor: 'pointer' }} className='sscore' >
                                        5 </p>
                                    </Col>
                                </Col>4

                            </Row>

                            <div style={{ maxWidth: '80%' }} >
                                <p className='searcheduserName' >TRIBE NAME
                                    {/* <span className='usnmlg' style={{ fontWeight: "500", marginLeft: "0.25rem" }} >
                                @{searcheduserinfo.username}
                            </span> */}
                                </p>
                                <div className='searcheduserBio' style={{ whiteSpace: 'pre-wrap', wordBreak: "break-word", }}>
                                    BIO BIO BIO
                                    {/* {searcheduserinfo.bio} */}
                                    {/* {parse(searcheduserinfo.bio, options)}</div> */}


                                </div>
                            </div>



                            <Row className='numbers'>


                                {
                                    true ?
                                        <>
                                            <Col lg={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <>
                                                    <div style={{ display: 'flex', alignItems: "center", marginLeft: '1rem' }} >
                                                        <MdSettings size={24} color='silver' />
                                                    </div>
                                                    {/* <div className='mobnotifyIcon' onClick={n}  >
                                                <MdOutlineNewReleases color='white' size={24} />
                                            </div> */}

                                                    <button className='editprofilebtn'
                                                    // onClick={handleEditButton}
                                                    >Tribe Settings</button>

                                                </>
                                            </Col>
                                            {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }} >

                                        <MdSettings size={24} />
                                    </div> */}
                                        </>
                                        :
                                        <div >

                                            {
                                                isFollowing && !hasRequested ?
                                                    <Col style={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", marginRight: "2rem" }}>

                                                        <button className='dsfdsfsd'
                                                            onClick={() => requestOrderFunc(searcheduserinfo._id)}
                                                            style={{ backgroundColor: "#212121", margin: "0 0 0.5rem 0.5rem", fontWeight: "500", color: "white", fontSize: "12px", padding: "0.25rem 0.5rem", borderRadius: "6px" }}

                                                        >                                                                    Chat <IoFlashOutline size={14} />
                                                        </button>
                                                        <button className='dsfdsfsd'
                                                            onClick={handleUnfollowClick}
                                                            style={{ backgroundColor: "#212121", margin: "0 0.5rem 0.5rem 0.5rem", fontWeight: "500", color: "white", fontSize: "12px", padding: "0.25rem 0.5rem", borderRadius: "6px" }}

                                                        >Following</button>

                                                    </Col>
                                                    :
                                                    ""
                                            }
                                            {
                                                !isFollowing && hasRequested ?
                                                    <Col style={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", marginRight: "2rem" }}>

                                                        <button className='dsfdsfsd'
                                                            onClick={() => requestOrderFunc(searcheduserinfo._id)}
                                                            style={{ backgroundColor: "#212121", margin: "0 0 0.5rem 0.5rem", fontWeight: "500", color: "white", fontSize: "12px", padding: "0.25rem 0.5rem", border: "none", borderRadius: "6px" }}

                                                        >                                                                    Chat <IoFlashOutline size={14} />
                                                        </button>
                                                        <button className='dsfdsfsd'
                                                            onClick={handleCancelRequest}
                                                            style={{ margin: "0 0.5rem 0.5rem 0.5rem", fontWeight: "500", color: "white", fontSize: "12px", padding: "0.25rem 0.5rem", border: "none", borderRadius: "6px", backgroundColor: "#212121" }}

                                                        >Requested</button>

                                                    </Col>
                                                    :
                                                    ""
                                            }
                                            {
                                                !isFollowing && !hasRequested ?
                                                    <Col style={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", marginRight: "2rem" }}>

                                                        <button className='dsfdsfsd'
                                                            onClick={() => requestOrderFunc(searcheduserinfo._id)}
                                                            style={{ backgroundColor: "#212121", margin: "0 0 0.5rem 0.5rem", fontWeight: "500", color: "white", fontSize: "12px", padding: "0.25rem 0.5rem", border: "none", borderRadius: "6px" }}

                                                        >                                                                    Chat <IoFlashOutline size={14} />
                                                        </button>
                                                        <button className='dsfdsfsd'
                                                            onClick={handleFollowClick}
                                                            style={{ backgroundColor: "dodgerblue", margin: "0 0.5rem 0.5rem 0.5rem", fontWeight: "500", color: "white", fontSize: "12px", padding: "0.25rem 0.5rem", border: "none", borderRadius: "6px" }}
                                                        >Follow</button>
                                                    </Col>
                                                    :
                                                    ""
                                            }

                                        </div>

                                }

                            </Row>
                            <hr style={{ margin: '0.25rem' }} />

                            <Row style={{ opacity: "1", display: 'flex', justifyContent: "center", }} >
                                <Col id='krish' className='segmain'   >
                                    <p className={true ? 'seg segactive ' : 'seg'} style={{ marginBottom: 0, fontWeight: 'bold', background: 'hidden', opacity: 1 }} >All</p>

                                    <p className={false ? 'seg segactive' : 'seg'} style={{ marginBottom: 0, fontWeight: 'bold' }} >
                                        {/* Photos */}
                                        <MdPhotoCameraFront size={25} />
                                    </p>


                                </Col>
                            </Row>

                            <hr style={{ margin: '0rem' }} />






                            <div style={{}} >

                                POSTS HERE
                                {/* {userposts.length > 0 ?
                                    userposts.map((post, i) => {
                                        return (
                                            <>
                                                {
                                                    (post.content != null || post.content != undefined) ?
                                                        <>
                                                            {router.asPath === `/${profile}` && post.content.isDeleted == false ?

                                                                <AllOpts key={i} _id={_id} i={i} feed={post} showkwiks={showkwiks} showposts={showposts} showall={showall} searcheduserinfo={searcheduserinfo} /> : ""
                                                            }

                                                            {router.asPath === `/${profile}?kwiks` && post.content.postType == "kwik" && post.content.isDeleted == false ?

                                                                <AllOpts key={i} _id={_id} i={i} feed={post} showkwiks={showkwiks} showposts={showposts} showall={showall} searcheduserinfo={searcheduserinfo} /> : ""
                                                            }
                                                            {router.asPath === `/${profile}?products` && post.content.postType == "product" && post.content.isDeleted == false ?

                                                                <AllOpts key={i} _id={_id} i={i} feed={post} showkwiks={showkwiks} showposts={showposts} showall={showall} searcheduserinfo={searcheduserinfo} /> : ""
                                                            }

                                                            {showposts && post.content.isDeleted == false && (post.content.postType == "media" || post.content.postType == "post") ?

                                                                <AllOpts key={i} _id={_id} i={i} feed={post} showkwiks={showkwiks} showposts={showposts} showall={showall} searcheduserinfo={searcheduserinfo} /> : ""
                                                            }

                                                        </>


                                                        : ''
                                                }

                                            </>
                                        )
                                    }).reverse()
                                    :
                                    <div>
                                        {
                                            noPosts ?
                                                <div style={{ color: "black", display: 'flex', justifyContent: 'center', alignItems: "center", marginTop: '1rem' }}>
                                                    <div style={{ backgroundColor: "white", padding: "1rem", borderRadius: '1rem', border: '1px solid black', fontWeight: 'bold' }} >
                                                        No posts
                                                    </div>
                                                </div>
                                                :
                                                <div style={{ margin: "auto", width: "100%", textAlign: "center" }}>
                                                    <Spinner style={{ margin: "1rem 0", color: "skyblue" }} />
                                                </div>
                                        }
                                    </div>

                                } */}


                            </div>




                        </Col>




                    </div>


                    <div className='recommendation' style={{ width: '30%', marginLeft: '10%' }}>
                        <div style={{ color: 'black', margin: "1rem", }}>
                            {/* {
                                        flw_Recommendations && flw_Recommendations.length > 0 ?
                                            <div style={{
                                                border: "1px  red", maxHeight: '60vh', padding: '0.5rem', overflowY: 'scroll', scrollMargin: 0, backgroundColor: 'whitesmoke',
                                                backgroundColor: 'rgb(15,15,15)',
                                                borderRadius: "2rem"
                                            }}>
                                                {

                                                    flw_Recommendations.map((recomm, i) => {
                                                        return (
                                                            <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', cursor: 'pointer' }}>
                                                                {
                                                                    !recomm.profileImg || recomm.profileImg === '' ?
                                                                        <FaUserCircle color='white' style={{ height: '3.125rem', width: '3.125rem', borderRadius: '50%', marginRight: '0.6rem' }} />
                                                                        :
                                                                        <img alt="img" src={recomm.profileImg} style={{ height: '3.125rem', width: '3.125rem', borderRadius: '50%', marginRight: '0.6rem' }} ></img>

                                                                }
                                                                <div style={{ width: '60%' }}  >
                                                                    <p onClick={() => gotoprofile(recomm.username)} style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', color: "white" }}>{recomm.username}</p>
                                                                    <p onClick={() => gotoprofile(recomm.username)} style={{ marginBottom: 0, fontSize: '0.8rem', marginTop: '0.1rem', color: "white" }}>{recomm.name}</p>
                                                                </div>
                                                                <button onClick={followFunc} className='username2' >Follow</button>
                                                            </div>
                                                        )
                                                    })
                                                }



                                            </div>
                                            : ""
                                    } */}

                            <p style={{ fontSize: "12px" }} className='info_tos' onClick={() => navigate('/info/terms-of-service')}  >Terms of Service
                            </p>
                            <p style={{ fontSize: "12px" }} className='info_about' onClick={() => navigate('/info/about')}  >

                                About
                            </p>
                            <p style={{ fontSize: "12px" }} className='info_privacy' onClick={() => navigate('/info/privacy')}  >
                                Privacy
                            </p>
                            <p className='info_privacy'>
                                @All rights reserved
                            </p>

                        </div>
                    </div>
                </div >


            </>
            

            
        </>
    )
}

export default Tribe