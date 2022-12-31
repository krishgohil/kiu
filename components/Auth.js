import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAppContext, useGeneralContext } from '../context'
import { host } from '../host'

const Auth = () => {
    const context = useAppContext()
    const genContext = useGeneralContext()
    const { _id ,guest } = context.sharedState
    const [compareId, setcompareId] = useState()
    const router = useRouter()

    useEffect(() => {

        console.log(_id)
        if (_id !== compareId) {
            fetchUniqueUser()
        }
    }, [_id])



    async function fetchUniqueUser() {
        const token = localStorage.getItem("token")
        console.log(token)
        if (token && token.length > 0) {
            const response = await fetch(`${host}/api/auth/fetchuniqueuser`, {
                // const response = await fetch(`${host}/api/auth/fetchuniqueser`, {
                // const response = await fetch('https://keepitupp.herokuapp.com/api/auth/fetchuniqueser', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });
            const json = await response.json();
            // console.log(json)
            const { fetchuniqueser, message } = json
            // console.log(fetchuniqueser)
            // console.log(context)
            let a = fetchuniqueser.feed_posts.reverse()
            // console.log(fetchuniqueser.feed_posts)
            // console.log(a)
            setcompareId(fetchuniqueser._id)

            context.setsharedState(
                {
                    name: fetchuniqueser.name,
                    profileImg: fetchuniqueser.profileImg,
                    username: fetchuniqueser.username,
                    bio: fetchuniqueser.bio,
                    _id: fetchuniqueser._id,
                    following: fetchuniqueser.following,
                    followers: fetchuniqueser.followers,
                    socialScore: fetchuniqueser.socialScore,
                    posts: fetchuniqueser.posts,
                    feed: a,
                    accountType: fetchuniqueser.accountType,
                    notificationToken: fetchuniqueser.notificationToken,
                    notificationSettings: fetchuniqueser.notificationSettings,
                    notificationCount: fetchuniqueser.notificationCount,
                }
            )
            // genContext.setgenstate({ ...genContext.genstate, guest: false })
            context.setsharedState({ ...context.sharedState, guest: false })


        } else if (!token && guest == null) {
            // genContext.setgenstate({ ...genContext.genstate, guest: true })
            context.setsharedState({ ...context.sharedState, guest: true })


        }
        else {
            if (router.pathname !== "/login") {
                // router.push("/login")
            }
        }
    }

    return (
        <></>
    )
}

export default Auth