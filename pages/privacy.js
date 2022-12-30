import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useRouter } from 'next/router'

const Privacy = () => {

    const router = useRouter()
    return (

        <>
            <dialog dialog open style={{ position: 'absolute', border: 'none', color: 'white', zIndex: 999, left: '0%', backgroundColor: "#1c1f24", height: '100vh', width: '100vw', position: 'fixed', display: 'flex', overflow: 'hidden', justifyContent: 'center', top: '0vh', padding: 0 }}>


                <div style={{ backgroundColor: 'whitesmoke', height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", color: 'black' }}   >
                    <div style={{ backgroundColor: "white", height: "95vh", width: "90vw", border: "1px solid #8557fa", borderRadius: "1rem", overflowY: "scroll", padding: "1rem" }}  >
                        <BsArrowLeft size={24} onClick={() => router.back()} />
                        <h1>
                            Privacy Policy.
                        </h1>
                        <p>With that in mind, we’ve written our Privacy Policy as simply as possible to empower you to make informed decisions when you use Keepitupp by making sure you understand and have control over the information we collect, how it’s used, and when it’s shared. </p>


                        <h3>1. What kinds of information do we collect?</h3>
                        <p>
                            <span style={{ fontWeight: "bold" }} >Information and content you provide: </span> We collect the content, communications and other information you provide when you use our Products, including when you sign up for an account, create or share content and message or communicate with others.
                        </p>

                        <p>
                            <span style={{ fontWeight: "bold" }} >Networks and connections: </span> We collect information about the people, accounts, hashtags, Keepitupp groups and Pages that you are connected to and how you interact with them across our Products, such as people you communicate with the most or groups that you are part of.
                        </p>

                        <p>
                            <span style={{ fontWeight: "bold" }} >Your usage: </span> We collect information about how you use our Products, such as the types of content that you view or engage with, the features you use, the actions you take, the people or accounts you interact with and the time, frequency and duration of your activities.
                        </p>


                        <h3>2. How do we use this information?</h3>

                        <p>
                            <span style={{ fontWeight: "bold" }} > Provide, personalise and improve our Products: </span>
                            We use the information that we have to deliver our Products, including to personalise features and content (including your ads) and make suggestions for you (such as groups or events that you may be interested in or topics that you may want to follow) on and off our Products. To create personalised Products that are unique and relevant to you, we use your connections, preferences, interests and activities based on the data that we collect and learn from you and others (including any data with special protections you choose to provide); how you use and interact with our Products; and the people, places or things that you&apos;re connected to and interested in on and off our Products.

                        </p>

                        <h3>3. How is this information shared?</h3>
                        <p>When you share and communicate using our Products, you choose the audience for what you share. For example, when you post on Keepitupp, you select the audience for the post, such as a group, all of your friends, the public or a customised list of people. You should consider who you choose to share with, because people who can see your activity on our Products can choose to share it with others on and off our Products, including people and businesses outside the audience that you shared with. We provide advertisers with reports about the kinds of people seeing their ads and how their ads are performing, but we don&apos;t share information that personally identifies you (information such as your name or email address that by itself can be used to contact you or identifies who you are) unless you give us permission. </p>
                    </div>
                </div>
            </dialog>

        </>

    )
}

export default Privacy