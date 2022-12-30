// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const User = require('../../../models/User')



export default async function searchUniqueUserFollowers(req, res) {
    await connectToMongo();
    try {
        const { followedById } = req.body
        console.log(followedById)
        let listofFollowingArr = []
        for (let index = 0; index < followedById.length; index++) {
            console.log(followedById[index].followedById)
            let tempid = followedById[index].followedById
            let getuser = await User.findById(tempid)
            if (getuser) {
                listofFollowingArr.push(getuser)
            }

        }
        console.log('********************************************************************************')
        console.log(listofFollowingArr)
        res.json(listofFollowingArr)

    } catch (error) {
        console.error(error.message)

    }




}
