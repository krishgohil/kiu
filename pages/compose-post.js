import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Post from '../components/Post'

const Composepost = () => {
    const [show, setshow] = useState(true)
    const [render, setrender] = useState(false)
    const router = useRouter()
    useEffect(() => {
        setrender(true)
    }, [])

    return (
        render ?
            <Modal
                show={show}
                onHide={() => {
                    setshow(false)
                    router.back()
                }
                }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                // style={{ padding: "0.5rem" }}

            >
                <Post></Post>

            </Modal> : ""
    )
}

export default Composepost