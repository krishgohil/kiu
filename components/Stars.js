import React, { useEffect, useState } from 'react';
import { FaRegStar, FaStar } from "react-icons/fa";


const Stars = ({ star, doubleclicked, postId, userId, hasRated, rating, clickedStar, _rstar, postedBy }) => {

    const stars = Array(5).fill(0)
    const [starRating, setstarRating] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);









    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const handleClick = (value, alreadyCalculated) => {
        setstarRating(value)




    }

    const updateRating = (num, totalStarCalc) => async dispatch => {

        console.log(num)
        console.log(postId)

        console.log(postedBy)
        try {
            const response = await fetch(`${host}/api/post/update_rating`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: postId, rating: num, userId: userId, hasRated: hasRated, totalStarCalc: totalStarCalc, postedByNotificationSettings: postedBy.notificationSettings.stars, postedByNotificationToken: postedBy.notificationToken, username: username, postedByUserId: postedBy._id })
            })
            const json = await response.json();
            console.log(json)
        } catch (error) {
            console.log(error)

        }

    }


    const removeStar = (num) => async dispatch => {

        // console.log('step 2')
        var _starRating = 0

        if (starRating) {
            _starRating = starRating
        }

        try {
            const response = await fetch(`${host}/api/post/removeStar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: postId, userId: userId, starRating: _starRating })
            })
            const json = await response.json();
            console.log(json)
            setstarRating(0)


        } catch (error) {
            console.log(error)

        }

    }








    return (
        <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ margin: 0, display: 'flex', flexDirection: 'row', overflowY: 'scroll' }}>
                {/* <span style={{color:'white'}}>POST</span> */}
                {stars.map((_, index) => {
                    return (
                        <>
                            {
                                (hoverValue || starRating) > index ?
                                    <FaStar
                                        className='starClass'
                                        key={index}
                                        size={24}
                                        onClick={() => { return (handleClick(index + 1)) }}
                                        onMouseOver={() => handleMouseOver(index + 1)}
                                        onMouseLeave={handleMouseLeave}
                                        color='orange'

                                        style={{
                                            padding: '0rem', margin: '0.5rem', cursor: "pointer"
                                        }}
                                    /> :
                                    <FaRegStar
                                        className='starClass'
                                        key={index}
                                        size={24}
                                        onClick={() => { return (handleClick(index + 1)) }}
                                        onMouseOver={() => handleMouseOver(index + 1)}
                                        onMouseLeave={handleMouseLeave}
                                        color='gray'

                                        style={{
                                            padding: '0rem', margin: '0.5rem', cursor: "pointer"
                                        }}
                                    />

                            }

                        </>
                    )
                })}

            </div>



        </div>
    )


};

export default Stars;



