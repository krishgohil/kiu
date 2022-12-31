import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { host } from '../host'

const Requests = ({ userId, n }) => {
    const router = useRouter()
    const [requests, setrequests] = useState([])
    const [notifications, setnotifications] = useState([])
    const [showrequests, setshowrequests] = useState(false)
    const [shownotifications, setshownotifications] = useState(false)

    useEffect(() => {
        console.log('ran')
        fetch_requests_notis()
    }, [])

    async function fetch_requests_notis() {
        console.log('hello')
        try {
            const response = await fetch(`${host}/api/users/fetch_requests`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ userId }),
            })
            const json = await response.json();
            const { success, finalRqsts, finalNotis } = json
            console.log(json)
            console.log(success)
            console.log(finalRqsts.length)
            console.log(finalNotis)
            if (success === 'true') {
                console.log('here')
                setrequests(finalRqsts.reverse())
                setnotifications(finalNotis)
                // setshownotifications(true)
                setshowrequests(true)
                // let x = notificationCount - 1
                // dispatch({
                //     type: SET_NOTIFICATION_COUNT,
                //     payload: 0
                // })
            }
        } catch (error) {
            console.error(error.message);
        }
    }




    return (
        <>

            <div style={{ display: "flex", overflowY: "scroll", scrollMargin: 0, flexDirection: "column", height: '90vh' }} >

                <div style={{ display: "flex", justifyContent: "space-between", color: 'white', position: "sticky", top: 0, backgroundColor: "#1c1c1c" }} >
                    <div className={showrequests ? "req_noti_back uitaklk" : "req_noti_back"} style={{ borderRight: "1px solid rgb(100, 100, 100)" }} onClick={
                        () => {
                            setshowrequests(true)
                            setshownotifications(false)
                        }
                    }>
                        <span style={{ fontWeight: "600", fontSize: '14px' }} >Requests</span>
                    </div>
                    <div className={shownotifications ? "req_noti_back uitaklk" : "req_noti_back"} onClick={
                        () => {
                            setshownotifications(true)
                            setshowrequests(false)
                        }
                    } >
                        <span style={{ fontWeight: "600", fontSize: '14px' }}  >Notifications</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem' }} onClick={() => router.back()} >
                        <AiOutlineClose size={26} color='red' className='delImg' onClick={n} />
                    </div>
                </div>
                <div style={{ padding: '0.5rem 1rem' }} >

                    {
                        showrequests === true ?
                            <>
                                {
                                    requests.length > 0 ?
                                        requests.map((request, i) => {
                                            return (
                                                <>
                                                    {
                                                        request && request.requester ?
                                                            <RequestItem request={request} key={i} userId={userId} />
                                                            : ""
                                                    }
                                                </>
                                            )
                                        }) :
                                        <div style={{ color: 'gray', fontSize: "1rem", height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                            No new requests
                                        </div>
                                }
                            </>


                            : ""
                    }

                    {
                        shownotifications === true ?

                            <>
                                {notifications.length > 0 ?
                                    notifications.map((noti, i) => {
                                        return (
                                            <>
                                                {
                                                    noti && noti.actioner ?
                                                        <NotifyItem noti={noti} key={i} />
                                                        : ""
                                                }
                                            </>
                                        )
                                    }) :
                                    <div style={{ color: 'gray', fontSize: "1rem", height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        No new notifications
                                    </div>
                                }
                            </>

                            : ""
                        // 
                    }
                </div>

            </div>






        </>
    )
}



export default Requests

export const NotifyItem = ({ noti }) => {
    useEffect(() => {
        console.log('hekksdfjksdjfk')
        console.log(noti)
    }, [noti])

    return (
        <>
            <div className='notiItem' >
                <div style={{ display: "flex", flexDirection: 'column', padding: '0.2rem 0.2rem 0.2rem 0' }} >
                    <img alt="img" src={noti.actioner.profileImg} style={{ height: '2.125rem', width: '2.125rem', borderRadius: '50%', marginRight: '0.6rem' }} ></img>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }} >
                    <p style={{ color: 'white', marginBottom: 0 }} >  <span style={{ fontWeight: "bold" }} >{noti.actioner.username} </span>
                        <span>{noti.action && noti.action === 'followRqst' ? 'requested to follow you' : ''}</span>
                        <span>{noti.action && noti.action === 'gave_social_score' ? 'gave you a social score' : ''}</span>
                    </p>
                </div>


            </div>
        </>
    )
}


export const RequestItem = ({ request, userId }) => {
    const [interacted, setinteracted] = useState(false)
    const [accepted, setaccepted] = useState(false)
    const [declined, setdeclined] = useState(false)
    const [foboRqsted, setfoboRqsted] = useState(false)
    const [showFollowBack, setshowFollowBack] = useState(false)
    const [displayNone, setdisplayNone] = useState(false)

    useEffect(() => {
        console.log(request)
    }, [request])

    useEffect(() => {
        console.log(" ")
    }, [accepted, declined, foboRqsted, showFollowBack, displayNone])



    const acceptOrDeclineRqst = (mandate) => async dispatch => {
        console.log('hello')
        console.log(mandate)
        try {
            console.log(request)
            const response = await fetch(`${host}/api/users/acceptOrDecline-rqst`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ userId, mandate, requestedId: request.requesterId }),
            })
            const json = await response.json();
            console.log(json)
            const { success, alreadyFollows } = json
            console.log(success)
            console.log(alreadyFollows)
            if (success == true && mandate == "accept") {
                console.log("dekh bhai asia ahaihksdfj")
                if (alreadyFollows == false) {
                    console.log("1")
                    setshowFollowBack(true)
                    setaccepted(false)
                    console.log("2")

                } else if (alreadyFollows == true) {
                    console.log("3")

                    setTimeout(() => {
                        setdisplayNone(true)
                    }, 1500);
                }
            } else if (success == true && mandate == "decline") {
                console.log("4")

                setTimeout(() => {
                    setdisplayNone(true)
                }, 500);
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    const follow_back_rqst = (mandate) => async dispatch => {
        console.log('hello')
        console.log(mandate)
        try {
            const response = await fetch(`${host}/api/users/follow_back_rqst`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ userId, requestedId: request.requesterId }),
            })
            const json = await response.json();
            console.log(json)
            const { success } = json
            if (success == true) {
                setTimeout(() => {
                    setdisplayNone(true)
                }, 3500);
            } else if (success == false) {
                setTimeout(() => {
                    setdisplayNone(true)
                }, 500);
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    const acceptRqst = () => {
        // setinteracted(true)
        setaccepted(true)
        let mandate = 'accept'
        dispatch(acceptOrDeclineRqst(mandate))
    }

    const declineRqst = () => {
        // setinteracted(true)
        setdeclined(true)
        let mandate = 'decline'
        dispatch(acceptOrDeclineRqst(mandate))
    }

    const getid = () => {
        console.log(request._id)
    }

    const followBack = () => {
        setfoboRqsted(true)
        dispatch(follow_back_rqst())
    }


    return (
        <>
            {
                request && request.requester && displayNone == false ?
                    <div className='reqItem'>
                        <img alt="img" src={request.requester.profileImg} style={{ height: '2.125rem', width: '2.125rem', borderRadius: '50%', marginRight: '0.6rem' }} ></img>
                        <div style={{ width: '60%' }}>
                            <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>{request.requester.username}</p>
                            <p style={{ marginBottom: 0, fontSize: '0.8rem', marginTop: '0.1rem' }}>{request.requester.name}</p>
                        </div>

                        {
                            !declined && !accepted && !showFollowBack && !foboRqsted ?
                                <button className='username2' onClick={acceptRqst}>{!accepted ? 'Accept' : ''}</button>
                                : ''
                        }
                        {
                            !declined && !accepted && !showFollowBack && !foboRqsted ?
                                <button className='username2' onClick={declineRqst} style={{ marginLeft: '0.5rem', backgroundColor: 'red' }}>{!declined ? 'Decline' : ''}</button>
                                : ''
                        }
                        {/* mandatory buttons ends */}

                        {
                            accepted && !declined && !showFollowBack && !foboRqsted ?
                                <button className='username2'  >
                                    Accepted
                                </button>
                                : ''

                        }


                        {
                            declined && !accepted && !showFollowBack && !foboRqsted ?
                                <button className='username2' style={{ marginLeft: '0.5rem', backgroundColor: 'red' }}>Declined</button>
                                : ''
                        }


                        {
                            showFollowBack && !foboRqsted ?
                                <button className='username2' onClick={followBack} style={{ marginLeft: '0.5rem', }}>
                                    Follow back
                                </button>
                                : ''
                        }

                        {
                            foboRqsted ?
                                <button className='username2' style={{ marginLeft: '0.5rem', backgroundColor: '#f6c900' }}>Requested</button> : ""
                        }




                    </div>
                    : ""
            }


        </>
    )
}

