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
            <div  >
                <Header></Header>
                <div className='app__container'>
                    <Sidebar

                    />

                    <Container style={{ padding: 0, margin: 0 }} >
                        {children}
                    </Container>


                </div>
            </div>

        </>
    )
}

export default Layout