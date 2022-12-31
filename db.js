// IT WILL CONNECT TO THE DATABASE WITH THE USE OF MONGOOSE

// const mongoose = require('mongoose');
import { mongoose } from 'mongoose';

const mongoURI = "mongodb+srv://krishdev:krishdevkeep@cluster0.q2ow9.mongodb.net/keepitupp"





const connectToMongo = () => {
    mongoose.set("strictQuery", false);


    mongoose.connect(mongoURI, () => {
        console.log("connected and runs")
    })
}

module.exports = connectToMongo;