import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom'
import './categoriesBar.scss'

const CategoriesBar = ({ extra,sethomeScroll }) => {
    useEffect(() => {
        // console.log(extra)
        let el = document.getElementById("content")
        // console.log(el.scrollWidth)
        // console.log(window.scrollX)
        el.scrollLeft = el.scrollWidth;
    }, [extra])


    const keywords = [
        // 'Home',
        // 'Product',
        'Fun',
        'News',
        'Science-Tech',
        'Crypto',
        'Sports',
        'Movies',
        'Stocks',
        'Books',
        'Destress',
        'Youtube',
    ]

    const [activeElement, setActiveElement] = useState('All')
    const navigate = useNavigate()
    const goto = (value) => {
        let el = document.getElementById("content")
        // console.log(el.scrollWidth)
        // console.log(window.scrollX)
        window.scrollTo({ top: 0, left: el.scrollWidth, behavior: "instant" });
        const link = value.toLowerCase()
        console.log("kdjskfjalk")   
        if (window.location.pathname == "/") { sethomeScroll() };
        navigate(`/upp/${link}`)


    }


    return (
        <div className='categoriesBar' id='content' >

            {
                keywords.map((value, i) => (

                    <div
                        // to={`/upp/${value}`.toLowerCase()}
                        // to={'/upp'value.toLowerCase()} 
                        onClick={() => goto(value)}
                        style={window.location.pathname == `/upp/${value}`.toLowerCase() ? { textDecoration: 'none', color: 'white', border: "1.5px solid #1e8ae3" } : { textDecoration: 'none', color: 'white',backgroundColor:"#212121" }} key={i} className='too' >
                        {value}
                    </div>
                ))
            }
        </div >
    )
}

export default CategoriesBar