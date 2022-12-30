import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Container, Modal } from 'react-bootstrap'
import BottomBar from './BottomBar'
import CategoriesBar from './CategoriesBar'
import Header from './Header'
import Post from './Post'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
    const router = useRouter()
    const [cbar, setcbar] = useState(false)
    const [show, setshow] = useState(false)
    function addpost() {
        // router.push('/compose-post')
        setshow(true)
    }

    const [sidebar, toggleSidebar] = useState(false)
    const handleToggleSidebar = () => toggleSidebar(value => !value)

    const sethomeScroll = () => {
        sessionStorage.setItem('homeScroll', window.scrollY)
    }

    useEffect(() => {

        setcbar(true)
    }, [router.isReady])







    return (
        <>
            <div  >
                <Header addpost={addpost} handleToggleSidebar={handleToggleSidebar} ></Header>
                <div className='app__container'>
                    <Sidebar
                        handleToggleSidebar={handleToggleSidebar}
                        sidebar={sidebar}

                    />

                    <Container style={{ padding: 0, margin: 0 }} >

                        {
                           cbar ?
                                <CategoriesBar sethomeScroll={sethomeScroll} /> : ''
                        }
                        {children}
                    </Container>
                </div>
                <div className='bBar' >
                    <BottomBar
                        addpost={addpost}
                    // search={search}
                    // navbar={navbar ? navbar : false}
                    // category={category}
                    // overflowhidden={overflowhidden}
                    />
                </div>
            </div>

            <Modal
                show={show}
                onHide={() => {
                    setshow(false)
                    // router.back()
                }
                }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            // style={{ padding: "0.5rem" }}

            >
                <Post setshow={setshow} ></Post>

            </Modal>

        </>
    )
}

export default Layout