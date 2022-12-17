import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { ToastContainer, toast } from 'react-toastify';
import styles from "../styles/ContactUs.module.css"

const ContactUs = () => {
    const [credentials, setcredentials] = useState({ email: "", feedback: "" })
    const [wait, setwait] = useState(false)
    const [sent, setsent] = useState(false)
    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const send = () => {
        setwait(true)

        console.log("krish deepak gohil")

        const { email, feedback } = credentials;

        let mail = email.toLowerCase()
        let checkemail = mail.match(/\s/g)
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mail.match(regexEmail)) {

        } else {
            setwait(false)

            return toast.error('Invalid Email', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        }

        if (checkemail) {
            setwait(false)

            return (
                toast.error('Spaces are not allowed in mail', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

            )


        }



        if (feedback.length < 20) {
            setwait(false)

            return toast.error('Feedback is too short', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        }

        dispatch(sendFeedback(email, feedback))


    }


    const sendFeedback = (email, feedback) => async dispatch => {
        try {

            const response = await fetch(`${host}/api/feedback/sendFeedback`, {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, feedback })
            });
            const json = await response.json();
            console.log(json)

            if (json.email == email) {
                console.log("saiyaan")
                setsent(true)
                toast('Feedback sent successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                })


            } else {
                setwait(false)
                return toast.warn('Oops Something went wrong', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }


        } catch (error) {
            setwait(false)
            return toast.warn('Oops Something went wrong', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })


        }
    }

    return (
        <>
            <ToastContainer />

            <div className={styles.contactUsMain} >

                <div className={styles.contactUsContent}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }} >
                        <img src="/star-removebg-preview.png" alt="" style={{ width: '5rem', marginRight: "1rem" }} />

                        <h1 style={{ color: "black", marginBottom: "0rem" }} >Contact Us</h1>
                    </div>

                    <h4 style={{ color: "black" }} >
                        Send Us Your Feedback
                    </h4>

                    <div className="mb-3">
                        <input
                            onChange={onchange} placeholder='Email address' type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <TextareaAutosize
                            onChange={onchange}
                            // onChange={(event) => {
                            //     setmessage(event.target.value);
                            // }}
                            minRows={3} maxRows={7}
                            className="form-control"
                            // value={message}
                            style={{ resize: 'none', outline: 'none', padding: '0.5rem', borderRadius: "0.5rem", width: '100%', }} name="feedback" placeholder="Feedback" >

                        </TextareaAutosize>
                    </div>


                    {
                        sent === false ?
                            <div style={{ display: 'flex', justifyContent: 'center' }} >

                                <button disabled={wait ? true : false} onClick={send} type="submit" className="btn btn-primary"  >Send</button>
                            </div>
                            : ""
                    }

                    {
                        sent === true ?
                            <div style={{ display: 'flex', justifyContent: 'center' }} >

                                <button className="btn btn-success"  >Sent</button>
                            </div>
                            : ""
                    }



                </div>

            </div>
        </>

    )
}

export default ContactUs