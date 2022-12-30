import React, { useEffect, useState } from 'react'

import { MdDelete } from 'react-icons/md'
import { FaOptinMonster, FaRegEye, FaRegEyeSlash, FaRegStar, FaStar } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";


import { BsThreeDotsVertical, BsThreeDots } from 'react-icons/bs'
import { DateTime } from 'luxon'

import TextareaAutosize from 'react-textarea-autosize';

import { host } from '../host'
import { Spinner } from 'react-bootstrap';



const Scoreinfo = ({ notificationToken, notificationSettings, _id, profile, visitedProfId, profileImg, username }) => {
    const stars = Array(5).fill(0)
    const [starRating, setstarRating] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [result, setresult] = useState([]);
    const [delopts, setdelopts] = useState(false);
    const [show, setshow] = useState(false)


    const [hasRated, sethasRated] = useState(false)
    const [prevRating, setprevRating] = useState(0)

    useEffect(() => {

        console.log(visitedProfId)
        socialscorerdetails()
    }, [])






    async function socialscorerdetails() {
        console.log('inside social score 2')
        const response = await fetch(`${host}/api/post/socialscorerdetails`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ visitedProfId: visitedProfId, userId: _id }),
        });
        const json = await response.json();
        console.log(json)
        // console.log(json.final.length)
        setshow(true)
        setresult(json.socialScores)

        var has_rated = false
        var prev_rating = 0
        for (let i = 0; i < json.socialScores.length; i++) {
            if (json.socialScores[i].scorerId == _id) {
                has_rated = true
                prev_rating = json.socialScores[i].score


            }
        }
        if (has_rated == true) {
            sethasRated(true)
            setprevRating(prev_rating)
            setstarRating(prev_rating)
        }
    }







    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const handleClick = (value) => {
        setstarRating(value)
    }


    const [message, setmessage] = useState('');
    const onchange = (e) => {
        setmessage(e.target.value)
    }

    const postSS = () => {
        setstarRating(0)
        setmessage('')
        console.log(message)
        console.log(starRating)

        var scoreDifference
        if (hasRated && prevRating > 0) {
            scoreDifference = starRating - prevRating
            console.log(notificationSettings, "ajajajaj", notificationToken)
            postsocialscore(scoreDifference)
        } else {
            scoreDifference = starRating
            postsocialscore(scoreDifference)
        }
    }

    const setToZero = () => {
        setstarRating(0)
        if (window.confirm("Do you want to delete this score?") == true) {

            let score = prevRating
            console.log(score)
            dispatch(delscore(score))
        }
    }


    async function postsocialscore(scoreDifference) {
        console.log('post chala')
        const response = await fetch(`${host}/api/post/postsocialscore`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ scorerComment: message, userId: _id, score: starRating, visitedProfId: visitedProfId, hasRated: hasRated, scoreDifference: scoreDifference, notificationToken: notificationToken, notificationSettings: notificationSettings, username: username }),
        });
        const json = await response.json();
        console.log(json)
        socialscorerdetails()
    }

    const fetchscores = () => {
        socialscorerdetails()
    }




    const delscore = (score) => async dispatch => {
        console.log(score)
        console.log('post chala')
        const response = await fetch(`${host}/api/post/delscore`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, visitedProfId: visitedProfId, score: score }),
        });
        const json = await response.json();
        console.log(json)
        fetchscores()

    }
    return (
        <>
            <div style={{ maxHeight: '90vh' }}>
                <div style={{ display: 'flex', flexDirection: "column", marginTop: '0rem', height: "60vh", padding: "0.5rem", overflow: 'scroll', scrollMargin: 0, }}>


                    {result && result.length > 0 && show == true ?
                        result.map((res, i) => (
                            <>
                                <ScorerComment key={i} result={res} _id={_id} visitedProfId={visitedProfId} fetchscores={fetchscores}
                                    prevRating={prevRating}
                                />
                            </>
                        )) :
                        <>
                            {
                                show === false ?
                                    <div style={{ width: "100%", textAlign: "center" }}>
                                        <Spinner style={{ margin: "40vh 0", color: "skyblue" }} />
                                    </div>
                                    : ""
                            }
                        </>
                    }



                    {
                        <div style={{ display: 'flex', marginTop: '0rem', height: "60vh", padding: "0.5rem", overflow: 'scroll', scrollMargin: 0, justifyContent: 'center', alignItems: 'center' }}>

                            {
                                result && result.length === 0 && show == true ?
                                    <>
                                        <p style={{ color: 'white', fontWeight: 'bold' }} >No Social Scores Yet</p>
                                    </>
                                    : ''}
                        </div>
                    }
                </div>



                <hr style={{ margin: 0 }} />
                <div style={{ backgroundColor: 'rgb(14, 15, 16)' }} >
                    <div style={{ display: "flex", paddingTop: "0.5rem", marginLeft: "0.5rem", alignItems: 'center', }} >
                        <img alt="img" src={profileImg} style={{
                            height: '2.5rem',
                            width: '2.5rem', borderRadius: '50%', marginRight: '0.6rem'
                        }} onClick={onclick}></img>
                        <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                            <div style={{ margin: 0, display: 'flex', flexDirection: 'row', overflowY: 'scroll' }}>

                                {stars.map((_, index) => {
                                    return (
                                        <>
                                            {
                                                (hoverValue || starRating) > index ?
                                                    <FaStar
                                                        key={index}
                                                        size={24}
                                                        onClick={() => { return (handleClick(index + 1)) }}
                                                        onMouseOver={() => handleMouseOver(index + 1)}
                                                        onMouseLeave={handleMouseLeave}
                                                        color='orange'

                                                        style={{
                                                            margin: "0.5rem",
                                                            cursor: "pointer",
                                                            padding: '0rem'
                                                        }}
                                                    /> :
                                                    <FaRegStar
                                                        key={index}
                                                        size={24}
                                                        onClick={() => { return (handleClick(index + 1)) }}
                                                        onMouseOver={() => handleMouseOver(index + 1)}
                                                        onMouseLeave={handleMouseLeave}
                                                        color='gray'

                                                        style={{
                                                            margin: "0.5rem",
                                                            cursor: "pointer",
                                                            padding: '0rem'
                                                        }}
                                                    />

                                            }

                                        </>
                                    )
                                })}


                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: "center", right: 0 }} onClick={setToZero} >
                            {
                                starRating !== 0 ?
                                    <FcCancel size={24} />
                                    : ''
                            }
                        </div>
                    </div>
                    <div style={{ width: "100%", display: 'flex', alignItems: 'center' }} >
                        <TextareaAutosize placeholder={`describe ${profile}`} value={message} onChange={onchange} maxRows={5} style={{ caretColor: 'white', outline: 'none', border: 'none', bottom: 0, padding: '0.5rem', margin: '0.5rem', marginRight: 0, width: "80%", resize: 'none', backgroundColor: "rgb(18, 18, 18)", color: "white" }} />


                        <button disabled={message.replace(/\s/g, '').length > 0 && starRating !== 0 ? false : true} style={message.replace(/\s/g, '').length > 0 && starRating !== 0
                            ?

                            { border: '1px solid black', padding: '0.5rem 1rem 0.5rem 1rem', borderRadius: '0.5rem', backgroundColor: '#0095f6', color: 'white', fontWeight: 'bold', margin: '0 0.5rem 0 0.5rem' } :


                            { border: '1px solid black', padding: '0.5rem 1rem 0.5rem 1rem', backgroundColor: '#403f3f', borderRadius: '0.5rem', color: 'white', margin: '0 0.5rem 0 0.5rem' }

                        } onClick={postSS} >Post</button>
                    </div>
                </div>
            </div>


        </>

    )
}

export default Scoreinfo





export const ScorerComment = ({ result, _id, visitedProfId, fetchscores, prevRating }) => {
    const [tempHidden, settempHidden] = useState(false)

    useEffect(() => {
        console.log(result)
        settempHidden(result.isHidden)
    }, [result])
    const [delopts, setdelopts] = useState(false);

    const del = () => {
        setdelopts(value => !value)
    }

    const delScore = () => {
        if (window.confirm("Do you want to delete this score?") == true) {

            let score = prevRating
            console.log(score)
            delscore(score)
        }
    }

    async function delscore(score) {
        console.log(score)
        console.log('post chala')
        const response = await fetch(`${host}/api/post/delscore`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, visitedProfId: visitedProfId, score: score }),
        });
        const json = await response.json();
        console.log(json)
        fetchscores()

    }






    const [options, setoptions] = useState(false)
    const optFunc = (e) => {
        if (options) {
            setoptions(false)
        } else {
            setoptions(true)
        }
    }

    const hideScoreFunc = (e) => {
        console.log(result)

        hideScore()
    }

    const showScoreFunc = (e) => {
        console.log(result)

        showScore()
    }

    async function hideScore(score) {
        console.log(score)
        console.log('post chala')
        const response = await fetch(`${host}/api/post/hideScore`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, visitedProfId: visitedProfId, commentId: result._id }),
        });
        const json = await response.json();
        console.log(json)
        if (json.modifiedCount > 0) {
            settempHidden(true)
        }


    }

    async function showScore(score) {
        console.log(score)
        console.log('post chala')
        const response = await fetch(`${host}/api/post/showScore`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: _id, visitedProfId: visitedProfId, commentId: result._id }),
        });
        const json = await response.json();
        console.log(json)
        if (json.modifiedCount > 0) {
            settempHidden(false)
        }


    }



    return (
        <div style={(visitedProfId === _id && tempHidden) || (!tempHidden) ? { display: "block" } : { display: "none" }} >

            {
                tempHidden ?
                    <div style={{ marginLeft: "0rem", color: "silver", fontSize: "12px" }} >
                        hidden
                    </div>
                    : ""
            }
            <div style={{ display: "flex", marginBottom: '1rem', width: "100%" }}>

                <div style={{ width: "2.75rem", marginRight: '0.5rem' }} >
                    <img alt="img" src={result.scorer.profileImg} style={{
                        height: '2.75rem',
                        width: '2.75rem', borderRadius: '50%', marginRight: '0.6rem'
                    }} onClick={onclick}></img>
                </div>


                <div style={{ margin: 0, width: '100%' }}>


                    <div style={{ width: "100%", display: 'flex', }} >
                        <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', width: '50%' }}>{result.scorer.username}</p>
                        <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: '0.9rem', display: "flex", alignItems: 'center', width: '20%' }}>{result.score}
                            <span style={{ fontSize: '0.8rem' }} >⭐</span>
                        </p>
                        <p style={{ marginBottom: 0, fontSize: '0.7rem', display: "flex", alignItems: 'center', width: '25%' }} >{DateTime.fromISO(result.scoreDate).toRelative()}</p>

                        {
                            result.scorerId === _id || visitedProfId === _id ?
                                <div style={{ padding: "0 0.5rem" }} >
                                    {
                                        options ? <BsThreeDots onClick={optFunc} size={14} />
                                            :
                                            <BsThreeDotsVertical onClick={optFunc} size={14} />
                                    }
                                </div>
                                : ''
                        }
                        {options ?
                            <div style={{ position: "relative", cursor: "pointer" }}>
                                <div style={{ position: "absolute", marginBottom: 0, fontSize: '0.8rem', right: '30%' }}
                                    className='delScoreopts' >
                                    {
                                        result.scorerId === _id ?
                                            <p onClick={delScore} style={{ marginBottom: "0.5rem", display: 'flex', alignItems: 'center', padding: "0.2rem" }}>
                                                <span style={{}} >Delete</span>
                                                <span style={{ marginLeft: "0.5rem" }}> <MdDelete size={18} /> </span>
                                            </p>
                                            : ""
                                    }

                                    {
                                        visitedProfId === _id && (tempHidden == false) ?
                                            <p onClick={hideScoreFunc} style={{ marginBottom: "0.5rem", display: 'flex', alignItems: 'center', padding: "0.2rem" }}>
                                                <span style={{}} >Hide</span>
                                                <span style={{ marginLeft: "0.5rem" }}> <FaRegEyeSlash size={16} /> </span>
                                            </p>

                                            : ""
                                    }

                                    {
                                        visitedProfId === _id && (tempHidden == true) ?
                                            <p onClick={showScoreFunc} style={{ marginBottom: "0.5rem", display: 'flex', alignItems: 'center', padding: "0.2rem" }}>
                                                <span style={{}} >Show</span>
                                                <span style={{ marginLeft: "0.5rem" }}> <FaRegEye size={16} /> </span>
                                            </p>

                                            : ""
                                    }

                                </div>
                            </div>
                            : ""
                        }
                    </div>

                    <p style={{ marginBottom: 0, fontSize: '0.8rem', marginTop: '0.1rem', width: '100%', marginRight: '3rem', }}>
                        {result.scorerComment}
                    </p>


                </div>

            </div >
        </div>

    )
}