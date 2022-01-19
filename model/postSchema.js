import mongoose , { Schema } from "mongoose"

const postSchema = new Schema({
        no : Number,
        author : String,
        title : { type : String, minlength : 1, maxlength : 50},
        content : String,
        tags : [ { type : String, length : 4 } ],
        comments : [ { content : String,  author : String, date : Date }],
        date : { type: Date, default: Date.now }
    },
    {   timestamps: true    }
);


export default mongoose.models.Post || mongoose.model('Post', postSchema)