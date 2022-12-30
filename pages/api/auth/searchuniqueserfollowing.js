// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const User = require('../../../models/User')



export default async function searchUniqueUserFollowing(req, res) {
    await connectToMongo();
    try {
        const { isFollowingId } = req.body
        let listofFollowingArr = []
        for (let index = 0; index < isFollowingId.length; index++) {
            let tempid = isFollowingId[index].isFollowingId
            let getuser = await User.findById({ _id: tempid }, { profileImg: 1, username: 1, _id: 1 })
            if (getuser) {
                listofFollowingArr.push(getuser)
            }

        }
        // console.log('********************************************************************************')
        // console.log(listofFollowingArr)
        res.json(listofFollowingArr)

    } catch (error) {
        console.error(error.message)

    }




}
