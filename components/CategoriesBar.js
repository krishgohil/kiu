import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useFeedContext } from '../context';


const CategoriesBar = ({ extra, sethomeScroll }) => {
    const router = useRouter()
    useEffect(() => {
       
    }, [router.isReady])

    const context_feed = useFeedContext()
    const {category} = context_feed.feedstate

    const keywords = [
        // 'Home',
        // 'Product',
        'Fun',
        'News',
        'Science-Tech',
        'Cryptos',
        'Sports',
        'Movies',
        'Stocks',
        'Books',
        'Destress',
        'Youtube',
    ]

    const [activeElement, setActiveElement] = useState('All')
    const goto = (value) => {
        let el = document.getElementById("content")
        // console.log(el.scrollWidth)
        // console.log(window.scrollX)
        window.scrollTo({ top: 0, left: el.scrollWidth, behavior: "instant" });
        const link = value.toLowerCase()
        console.log("kdjskfjalk")
        if (router.asPath == "/") { sethomeScroll() };
        
        context_feed.setfeedstate({ ...context_feed.feedstate, category: link })
        router.push(`/${link}`)



    }


    var keep = 0
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
        }

    }

    return (
        <div className='stickbar' id='stickbar' style={{ width: '100%', scrollMargin: 0, scrollbarWidth: 0, }} >
            <div className='categoriesBar' id='content' >

                {
                    keywords.map((value, i) => (

                        <div
                            // to={`/upp/${value}`.toLowerCase()}
                            // to={'/upp'value.toLowerCase()} 
                            onClick={() => goto(value)}
                            style={router.asPath == `/${value}`.toLowerCase() ? { textDecoration: 'none', color: 'white', border: "2px solid #1e8ae3" } : { textDecoration: 'none', color: 'white', backgroundColor: "#212121" }} key={i} className='too' >
                            {value}
                        </div>
                    ))
                }
            </div >
        </div >
    )
}

export default CategoriesBar