import Link from 'next/link'
import React from 'react'
import { useAppContext, useGeneralContext } from '../context'


const FrndRecommendation = () => {
    const context = useAppContext()
    const genContext = useGeneralContext()

    const { _id } = context.sharedState
    const { guest } = genContext.genstate
    // const { flw_Recommendations } = useSelector(state => state.generalReducer)
    // const navigate = useNavigate()



    const gotoAbout = () => {
        navigate('/info/about')
    }

    const termOfservice = () => {
        alert("kdf")
        navigate('/info/terms-of-service')
    }

    const gotoPrivacy = () => {
        navigate('/info/privacy')
    }
    return (
        <div className='recommendation' style={{ width: '30%' }}>
            <div style={{ color: 'black', margin: "1rem", }}>

                <div style={
                    // flw_Recommendations.length > 0 ?
                    false ?
                        {
                            maxHeight: '60vh', padding: '0.5rem', overflowY: 'scroll', scrollMargin: 0, borderRadius: "2rem",
                            backgroundColor: 'rgb(15,15,15)', marginBottom: "1rem"
                        } : {}}>
                    {/* {flw_Recommendations.map((recomm, i) => {
                        return (
                            <>
                                {
                                    recomm._id == _id ? "" :
                                        <Recomm recomm={recomm} key={i} guest={guest} />
                                }
                            </>

                        )
                    })} */}
                </div>


                <Link href='/terms-of-service' style={{ fontSize: "12px", display: "block", textDecoration: "none", marginBottom: "0.5rem" }} className='info_tos'  >Terms of Service
                </Link>
                <Link href='/about' style={{ fontSize: "12px", display: "block", textDecoration: "none", marginBottom: "0.5rem" }} className='info_about'  >
                    About
                </Link>
                <Link href='/privacy' style={{ fontSize: "12px", display: "block", textDecoration: "none", marginBottom: "0.5rem" }} className='info_privacy'  >
                    Privacy
                </Link>
                <Link href='/contact-us' style={{ fontSize: "12px", display: "block", textDecoration: "none", marginBottom: "0.5rem" }} className='info_privacy'  >
                    Contact Us
                </Link>
                <p style={{ fontSize: "12px", }} className='info_privacy'>
                    @All rights reserved
                </p>

            </div>
        </div>
    )
}

export default FrndRecommendation