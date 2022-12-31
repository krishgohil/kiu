import React, { useEffect, useState } from 'react'
import { AiFillCheckCircle, AiOutlineMail } from 'react-icons/ai'
import { MdOutlineLock } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../styles/Login.module.css"
import { host } from '../host'
import { useAppContext, useGeneralContext } from '../context';
import { useRouter } from 'next/router';


const Login = () => {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const [wait, setwait] = useState(false)
    const [loginAttempts, setloginAttempts] = useState(0)
    const [loginAfterBan, setloginAfterBan] = useState(false)
    const context = useAppContext()
    const genContext = useGeneralContext()
    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const router = useRouter()











    async function handleSubmit(e) {
        e.preventDefault();
        var date = new Date()
        date.setMinutes(date.getMinutes() + 30);
        setwait(true)
        // console.log("krish deepak gohil")

        const { email, password } = credentials;

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


            // alert('Spaces are not allowed in email')
        }


        let checkpass = password.match(/\s/g)

        if (checkpass) {
            setwait(false)

            return (
                toast.error('Invalid Password', {
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

        if (password.length < 8) {
            setwait(false)

            return toast.error('Invalid Password', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        }



        log_in(email, password)
    }

    const forgotfunc = () => {
        navigate('/password-reset')
    }

    const gotosignup = () => {
        navigate('/signup')

    }

    async function log_in(email, password) {
        console.log("here")
        try {

            const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const json = await response.json();
            console.log(json)

            if (json.success == true) {
                // console.log("saiyaan")

                toast('Logged in successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,

                })
                setTimeout(() => {
                    // console.log("tu jo chule pyaar se aaram se mar jau")
                    localStorage.setItem("token", json.accessToken);
                    // localStorage.setItem("user id", json.user._id);
                    context.setsharedState({
                        ...context.sharedState,
                        _id: json.user._id,
                        name: json.user.name,
                        profileImg: json.user.profileImg
                    });

                    router.push("/")

                    // dispatch({
                    //     type: LOGIN_SUCCESS2,
                    //     payload: {
                    //         accessToken: json.accessToken,
                    //         name: json.user.name,
                    //         profileImg: json.user.profileImg,
                    //     },
                    // })
                }, 1800);

            }
            else if (json.success == false && json.error == "mail_sent") {
                setwait(false)
                return toast.error('We have sent you a confirmation email', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
            else if (json.success == false) {
                setwait(false)
                let a = json.updateLoginAttempts.loginAttempts + 1
                // console.log(json.updateLoginAttempts.loginAttempts)
                let d = new Date()
                let b = json.updateLoginAttempts.tempLoginBanTill
                if (Date.parse(d) < Date.parse(b)) {
                    //start is less than End
                    // console.log(b, "Ban kar behen k lode ko", d)
                    // console.log(Date.parse(b))
                    // console.log(Date.parse(d))
                    setloginAfterBan(true)

                } else {
                    console.log("Bhai kuch date ka lafda hai")
                    setloginAfterBan(false)

                }
                // console.log(a)
                setloginAttempts(a)
                return toast.error('Invalid Password or Email', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }

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



    const enterAsGuestFunc = () => {
        console.log("akfdksafkdsl")
        // dispatch({
        //     type: SET_GUEST,
        //     payload: true
        // })

        // genContext.setgenstate({ ...genContext.genstate, guest: true })
        context.setsharedState({...context.sharedState,guest:true})

        toast.success(`Continuing as Guest 😄`, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        setTimeout(() => {
            router.push("/")
        }, 2400);
    }




    return (
        <>
            <dialog dialog open style={{ position: 'absolute', border: 'none', color: 'white', zIndex: 999, left: '0%', backgroundColor: "#1c1f24", height: '100vh', width: '100vw', position: 'fixed', display: 'flex', overflow: 'hidden', justifyContent: 'center', top: '0vh', padding: 0 }}>

                <ToastContainer />
                <div className={styles.logindiv} >

                    {
                        !loginAfterBan ?
                            <div className={styles.subdiv}  >
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }} >
                                    <img alt="img" src="/star-removebg-preview.png" style={{ width: '5rem', marginRight: "1rem" }} />

                                    <h1 style={{ color: "dodgerblue", marginBottom: "0rem" }} >Login</h1>
                                </div>

                                <div className="mb-3">
                                    <label style={{ color: 'black' }} htmlFor="email" className="form-label"> <AiOutlineMail color='#007bff' size={20} /> Email address</label>
                                    <input placeholder='Email address' onChange={onchange} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                                <div className="mb-1">
                                    <label style={{ color: 'black' }} htmlFor="password" className="form-label"> <MdOutlineLock color='#007bff' size={20} /> Password</label>
                                    <input placeholder='Password' onChange={onchange} type="password" className="form-control" id="password" name="password" minLength={8} required />
                                </div>

                                <div style={{ display: "flex", fontSize: '0.9rem', color: 'gray', margin: "0 0 0.5rem 0.25rem" }} >
                                    <span style={{ cursor: 'pointer' }} onClick={forgotfunc} >Forgot Password ?</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center' }} >

                                    <button type="submit" onClick={handleSubmit} className="btn btn-primary" disabled={wait ? true : false} style={{ fontWeight: "600", fontSize: "18px", padding: "6px 24px", borderRadius: "20px" }} >Login</button>
                                </div>



                                <div style={{ color: "gray", fontSize: "14px", marginTop: "1rem" }} >
                                    <div>Don&apos;t have an account?</div>

                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                                        <button onClick={gotosignup} style={{ border: "1px solid gray", padding: "0.25rem 1rem", borderRadius: "1rem", backgroundColor: "green", fontWeight: "500", color: "white" }} >Sign Up Now</button>
                                        <button onClick={enterAsGuestFunc} style={{ border: "1px solid gray", padding: "0.25rem 0.5rem", borderRadius: "1rem", backgroundColor: "orangered", fontWeight: "500", color: "white" }} >
                                            Continue as guest 🧝‍♂️
                                        </button>
                                    </div>
                                </div>
                                {/* <div style={{ display: "flex", color: "gray", fontSize: "0.8rem", }} >

                        <span>Don't have an account?</span>
                        <span onClick={gotosignup} style={{ color: "black", cursor: "pointer", marginLeft: "0.1rem" }} >Sign Up Now</span>

                    </div> */}


                            </div>
                            :
                            <div style={{ color: "white", fontWeight: "600", fontSize: "24px" }} >
                                Login after 30 mins
                            </div>
                    }


                </div>
            </dialog>

        </>
    )
}

export default Login


export const ForgotPassword = () => {
    const dispatch = useDispatch()

    const [emailsent, setemailsent] = useState(false)
    const [email, setemail] = useState('')

    const mailfunc = (e) => {
        setemail(e.target.value)
    }

    const [disablebtn, setdisablebtn] = useState(false)


    const [showLoader, setshowLoader] = useState(false)
    const sendMail = () => {
        console.log(email, "email")
        setdisablebtn(true)
        setshowLoader(true)
        dispatch(resetpassword())
    }

    const resetpassword = () => async dispatch => {
        const response = await fetch(`${host}/api/auth/resetpassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const json = await response.json();
        if (json == "sent") {
            setemailsent(true)
            setshowLoader(false)

            toast.success('We have sent you a mail', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            })
        }
        else if (json == "incorrect") {
            setshowLoader(false)

            toast.warn('Account not found', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            })
        }
        else if (json == "fail") {
            setshowLoader(false)

            toast.error('Oops something went wrong', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            })
        }
    }
    return (
        <dialog dialog open style={{ position: 'absolute', border: 'none', color: 'white', zIndex: 999, left: '0%', backgroundColor: "#1c1f24", height: '100vh', width: '100vw', position: 'fixed', display: 'flex', overflow: 'hidden', justifyContent: 'center', top: '0vh', padding: 0 }}>

            <div style={{ background: "linear-gradient(45deg, rgb(18, 186, 155), rgb(19, 127, 152), rgb(7, 83, 165))", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", color: "black" }} >
                <ToastContainer />


                <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', backgroundColor: "#e8e8e8", padding: "2rem", borderRadius: '1rem' }} >
                    <img alt="img" src="/star-removebg-preview.png" style={{ width: '5rem', margin: "auto", marginBottom: "1rem" }} />

                    <h1>Password Reset</h1>
                    <p style={{ margin: 0 }} >Enter your email address that you used to register. </p>
                    <p>We&apos;ll send you an email with a link to reset your password.</p>
                    <div className="mb-3">
                        <label style={{}} htmlFor="email" className="form-label"> <AiOutlineMail size={20} />   Email address</label>
                        <input placeholder='enter your email address here' onChange={mailfunc} required type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" style={{ textTransform: 'lowercase' }} />
                        <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
                    </div>

                    {
                        showLoader ?
                            <div style={{ width: "100%", height: "0vh", display: "flex", justifyContent: 'center', alignItems: "center", marginBottom: "1.5rem" }} >
                            </div> :
                            ""
                    }



                    {
                        emailsent === false ?
                            <div style={{ display: 'flex', justifyContent: 'center' }} >
                                <button disabled={disablebtn ? true : false} className={disablebtn ? "sendmailbtn sendmailbt-disable" : "sendmailbtn"} onClick={sendMail} >Send</button>
                            </div>
                            : ""
                    }

                    {
                        emailsent === true ?
                            <div style={{ fontSize: "22px", fontWeight: "600" }} >
                                Email Sent  <AiFillCheckCircle size={32} color='#07b023' />
                            </div>
                            : ""
                    }


                </div>



            </div>
        </dialog>

    )
}
