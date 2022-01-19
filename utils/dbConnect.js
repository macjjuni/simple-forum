import mongoose from "mongoose"

export default function dbConnect() {

    mongoose.connect(process.env.MONGODB_URI,  { useNewUrlParser: true, useUnifiedTopology: true}, (err) =>{
        if(!err){
            console.log('Connect Success!')
        }else{
            console.log(err);
        }
    });

}