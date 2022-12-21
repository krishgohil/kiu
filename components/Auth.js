import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../context'
import { host } from '../host'

const Auth = () => {
    const context = useAppContext()

    useEffect(() => {

        console.log(context)
        fetchUniqueUser()

    }, [])


    async function fetchUniqueUser() {
        const token = localStorage.getItem("token")
        // console.log(token)
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

        // if (message && message == 'success') {
        //   let ok = fetchuniqueser._id.toString()

        //   socket.emit("setup", { userId: fetchuniqueser._id });
        //   let a = fetchuniqueser.feed_posts.reverse()
        //   dispatch({
        //     type: GET_USER_DETAILS,
        //     payload: {
        //       name: fetchuniqueser.name,
        //       profileImg: fetchuniqueser.profileImg,
        //       username: fetchuniqueser.username,
        //       bio: fetchuniqueser.bio,
        //       _id: fetchuniqueser._id,
        //       following: fetchuniqueser.following,
        //       followers: fetchuniqueser.followers,
        //       socialScore: fetchuniqueser.socialScore,
        //       posts: fetchuniqueser.posts,
        //       feed: a,
        //       accountType: fetchuniqueser.accountType,
        //       notificationToken: fetchuniqueser.notificationToken,
        //       notificationSettings: fetchuniqueser.notificationSettings,
        //       notificationCount: fetchuniqueser.notificationCount,

        //     }
        //   })
        //   // console.log(path)
        //   // console.log(fetchuniqueser._id)
        //   dispatch(recentChats(fetchuniqueser._id))

        //   if (path == '/login' || path == '/signup') {
        //     // console.log("e lel lelele elleel")

        //     navigate('/')
        //   }

        // }
        // else if (message && message == 'unauthorized') {
        //   localStorage.removeItem('token')
        //   localStorage.removeItem('user id')
        //   localStorage.removeItem('username')
        //   // navigate('/info/about') 
        // }

    }

    return (
        <></>
    )
}

export default Auth