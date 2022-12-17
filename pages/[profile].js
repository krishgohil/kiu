import { useRouter } from 'next/router'
import React from 'react'

const Profile = () => {
    const router = useRouter()
    const { profile } = router.query

    return (
        <div>Profile: {profile}</div>
    )
}

export default Profile