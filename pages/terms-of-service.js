import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'

const TermsOfService = () => {
    const router = useRouter()

    return (
        <>


            <div style={{ backgroundColor: 'whitesmoke', height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", color: 'black' }}  >


                <div style={{ backgroundColor: "white", height: "95vh", width: "90vw", border: "1px solid #8557fa", borderRadius: "1rem", overflowY: "scroll", padding: "1rem" }}  >
                    <BsArrowLeft size={24} onClick={() => router.back()} />
                    <h1>Terms Of Service</h1>
                    <p>
                        These Terms of Service (“Terms”) govern your access to and use of our services, including our various websites, SMS, APIs, email notifications, applications, buttons, widgets, ads, commerce services, and our other covered services that link to these Terms (collectively, the “Services”), and any information, text, links, graphics, photos, audio, videos, or other materials or arrangements of materials uploaded, downloaded or appearing on the Services (collectively referred to as “Content”). By using the Services you agree to be bound by these Terms.
                    </p>

                    <h3>
                        1. Who May Use the Services
                    </h3>
                    <p>
                        You may use the Services only if you agree to form a binding contract with Keepitupp and are not a person barred from receiving services under the laws of the applicable jurisdiction. In any case, you must be at least 13 years old to use the Services.If you are accepting these Terms and using the Services on behalf of a company, organization, government, or other legal entity, you represent and warrant that you are authorized to do so and have the authority to bind such entity to these Terms, in which case the words “you” and “your” as used in these Terms shall refer to such entity.
                    </p>

                    <h3>
                        2. Privacy
                    </h3>
                    <p>
                        Our <Link href="https://keepitupp.herokuapp.com/info/privacy" style={{ textDecoration: 'none', color: "blue" }} >Privacy Policy</Link> describes how we handle the information you provide to us when you use our Services. You understand that through your use of the Services you consent to the collection and use (as set forth in the Privacy Policy) of this information, including the transfer of this information.
                    </p>

                    <h3>
                        3. Content on the Services
                    </h3>
                    <p>
                        You are responsible for your use of the Services and for any Content you provide, including compliance with applicable laws, rules, and regulations. You should only provide Content that you are comfortable sharing with others. Any use or reliance on any Content or materials posted via the Services or obtained by you through the Services is at your own risk. We do not endorse, support, represent or guarantee the completeness, truthfulness, accuracy, or reliability of any Content or communications posted via the Services or endorse any opinions expressed via the Services. You understand that by using the Services, you may be exposed to Content that might be offensive, harmful, inaccurate or otherwise inappropriate, or in some cases, postings that have been mislabeled or are otherwise deceptive. All Content is the sole responsibility of the person who originated such Content. We may not monitor or control the Content posted via the Services and, we cannot take responsibility for such Content.
                    </p>

                    <h3>
                        4. Using the Services
                    </h3>
                    <p>
                        You may use the Services only in compliance with these Terms and all applicable laws, rules and regulations.

                        Our Services evolve constantly. As such, the Services may change from time to time, at our discretion. We may stop (permanently or temporarily) providing the Services or any features within the Services to you or to users generally. We also retain the right to create limits on use and storage at our sole discretion at any time. We may also remove or refuse to distribute any Content on the Services, limit distribution or visibility of any Content on the service, suspend or terminate users, and reclaim usernames without liability to you.
                    </p>
                </div>
            </div>
        </>

    )
}

export default TermsOfService