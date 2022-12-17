import React, { useState } from 'react'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
    const [dnone, setdnone] = useState(false)
    useEffect(() => {
        if (window.location.pathname == "/login" || window.location.pathname == "/signup" || window.location.pathname == "/about" || window.location.pathname == "/contact-us") {
            setdnone(true)
        } else {
            setdnone(false)
        }

    }, [])

    return (
        <>
            <div style={dnone ? { display: "none" } : {}} >
                <Header></Header>
                <div className='app__container'>
                    <Sidebar

                    />

                    <div style={{ width: "100%" }} >
                        {children}
                    </div>


                </div>
            </div>

            <div style={!dnone ? { display: "none", width: "100%" } : { width: "100%" }}  >
                {children}
            </div>
        </>
    )
}

export default Layout