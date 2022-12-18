const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImgUpload = new Schema({
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const Img = mongoose.model('Image', ImgUpload);
module.exports = Img