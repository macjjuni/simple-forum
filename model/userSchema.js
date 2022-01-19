import mongoose , { Schema } from "mongoose"

const userSchema = new Schema({
        no : Number,
        id : { type : String, maxlength : 15 },
        pw : { type : String },
        email : { type : String },
        nicname : { type : String, maxlength : 10 },
        profile_image : { type : String },
        date: { type: Date, default: Date.now },
    },
    {   timestamps: true    }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
