


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const connectToMongo = require('../../../db')
const User = require('../../../models/User')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT = "kRISHISAGOODBOYXD"


export default async function fetchuniqueser(req, res) {
    await connectToMongo();
    const { profile, token } = req.body

    if (token) {
        console.log(token,"token")
        const verified = jwt.verify(token, JWT);
        console.log("verifiedv", verified);
        try {
            let fetchuniqueser = await User.findOne({ _id: verified }, { email: 0, password: 0, temp_id: 0, confirmation_status: 0, posts: 0 });
            if (fetchuniqueser && fetchuniqueser.logged_in == true) {
                res.json({ fetchuniqueser: fetchuniqueser, message: 'success' })
            } else {
                res.json({ fetchuniqueser: [], message: 'unauthorized' })
            }
        } catch (error) {
            res.json({ message: 'failed' })
            console.error(error.message, "eroor mm")
        }
    }

    else if (profile) {
        try {
            let fetchsearchedusername = await User.findOne({ username: profile }, { email: 0, password: 0, temp_id: 0, confirmation_status: 0, notifications: 0, feed_posts: 0 });
            if (fetchsearchedusername && fetchsearchedusername.logged_in == true) {
                // console.log('authorized')
                res.json({ fetchsearchedusername: fetchsearchedusername, message: 'success' })
            } else {
                res.json({ fetchsearchedusername: [], message: 'user_loggedOut' })
            }
          
        } catch (error) {
            res.json({ message: 'failed' })
            console.error(error.message)
        }
    }

}
