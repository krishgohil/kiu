import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import { AiOutlineMail } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlineLock } from 'react-icons/md'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from "../styles/Signup.module.css"

const Signup = (props) => {
    const [show, setshow] = useState(true)
    const [mailmessage, setmailmessage] = useState(false)
    const [mail, setmail] = useState('')
    const [wait, setwait] = useState(false)

    const [credentials, setcredentials] = useState({ _name: "", username: "", _email: "", password: "", bio: "", profileImg: "", _confirmPass: "", birthDate: "", gender: "" })

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }





    async function handleSubmit(e) {
        e.preventDefault();
        setwait(true)

        const { _name, _email, password, username, _confirmPass, birthDate } = credentials;


        let email = _email.toLowerCase()
        let checkemail = email.match(/\s/g)
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(regexEmail)) {
            console.log(" ")
        } else {
            setwait(false)
            return toast.error('Invalid Email', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }


        console.log(checkemail)

        if (checkemail) {
            setwait(false)

            return (
                toast.warn('Email cannot contain spaces', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            )


        }


        let _nametouppercase = _name.toUpperCase()
        let withoutspacename = _nametouppercase.replace(/\s\s+/g, ' ')
        if (withoutspacename.length < 3) {
            setwait(false)

            return (
                toast.error('Enter your full name', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            )

        }
        console.log(withoutspacename.length)



        let checkpass = password.match(/\s/g)
        if (checkpass) {
            setwait(false)

            return (
                toast.warn('Password cannot contain spaces', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            )


        }

        if (password.length < 8) {
            setwait(false)

            return toast.warn('Password should be atleast 8 characters long', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        }


        console.log(password)
        console.log(_confirmPass)




        var expr = /^[a-zA-Z0-9._]*$/;
        if (!expr.test(username)) {
            setwait(false)

            return (
                toast.warn('Username can only contain Alphabets, Numbers, Dots and Underscores', {
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

        if (username.length < 1) {
            setwait(false)

            return toast.error('Invalid Username', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        }

        let name = withoutspacename

        console.log(name)
        console.log(email)

        // console.log(birthDate)
        // console.log(username)


        setmail(email)
        dispatch(signUp(name, email, password, username.toLowerCase()))
    }

    const gotologin = () => {
        navigate('/login')
    }



    const signUp = (name, email, password, username) => async dispatch => {
        console.log(username)
        try {
            dispatch({
                type: LOGIN_REQUEST2
            })
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, username })
            });
            const json = await response.json();
            console.log('k', json)

            if (json.success) {
                setmailmessage(true)
                setshow(false)
                console.log(' successsssssssssssss')
            }
            else if (json.error === "email_exists") {
                setwait(false)

                return toast.error('Account with this Email Already Exists', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
            else if (json.error === "username_exists") {
                setwait(false)

                return toast.error('Username Taken 🙁 Please try other username', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

            }
            console.log('k')



        } catch (error) {
            setwait(false)
            console.log(error)
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
            <dialog dialog open style={{ position: 'absolute', border: 'none', color: 'white', zIndex: 999, left: '0%', backgroundColor: "#1c1f24", height: '100vh', width: '100vw', position: 'fixed', display: 'flex', overflow: 'hidden', justifyContent: 'center', top: '0vh', padding: 0 }}>
                <ToastContainer />


                {
                    show ?
                        <div className={styles.signupdiv} >
                            <div className={styles.supsubdiv}  >
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }} >
                                    <img alt="img" src="/star-removebg-preview.png" style={{ width: '5rem', marginRight: "1rem" }} />

                                    <h1 style={{ color: "dodgerblue", marginBottom: "0rem" }} >Sign Up</h1>
                                </div>


                                <div className="mb-3">
                                    <label style={{ color: 'black' }} htmlFor="_name" className="form-label" maxLength={50}>Name</label>
                                    <input placeholder='Full Name' maxLength={50} required onChange={onchange} type="text" className="form-control" id="_name" name="_name" aria-describedby="name" style={{ textTransform: 'uppercase' }} />
                                </div>


                                <div className="mb-3">
                                    <label style={{ color: 'black' }} htmlFor="email" className="form-label"> <AiOutlineMail size={20} />   Email address</label>
                                    <input placeholder='Your email address here' onChange={onchange} required type="email" className="form-control" id="_email" name="_email" aria-describedby="emailHelp" style={{ textTransform: 'lowercase' }} />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>

                                <div className="mb-3">
                                    <label style={{ color: 'black' }} htmlFor="password" className="form-label"><MdOutlineLock size={20} /> Password</label>
                                    <input maxLength={30} placeholder='Enter a strong password' onChange={onchange} type="password" className="form-control" id="password" name="password" minLength={8} required />
                                </div>


                                <div className="mb-3">
                                    <label style={{ color: 'black' }} htmlFor="username" className="form-label"><FaRegUser size={20} /> Username</label>
                                    <input placeholder='Unique username' maxLength={30} onChange={onchange} type="text" required className="form-control" id="username" name="username" aria-describedby="username" style={{ textTransform: 'lowercase' }} />
                                </div>



                                <div style={{ display: 'flex', justifyContent: 'center' }} >
                                    <button type="submit/" onClick={handleSubmit} className="btn btn-primary" disabled={wait ? true : false} >Submit</button>
                                </div>

                                <div style={{ color: "gray", fontSize: "14px", marginTop: "1rem" }} >
                                    <div>Already have an account?</div>
                                    <button onClick={gotologin} style={{ border: "1px solid gray", padding: "0.25rem 0.5rem", borderRadius: "1rem" }} >Login Now</button>
                                </div>





                            </div>

                        </div>
                        : ''
                }

                {
                    mailmessage ?
                        <>

                            <div className={styles.mailmsgDiv}  >

                                <div className={styles.mailsub} >
                                    <img alt="img" src="/star-removebg-preview.png" style={{ height: '5rem', width: '5rem', margin: "auto", marginBottom: "1rem" }} />
                                    <h3 style={{ color: "indigo", marginBottom: "1rem", textAlign: 'center' }} >We have sent you a mail on
                                        {mail && mail.length > 0 ? " " + mail : ' your registered email address'} to confirm if its you.  </h3>
                                </div>

                            </div>
                        </>
                        : ""
                }


            </dialog>
        </>
    )
}

export default Signup
