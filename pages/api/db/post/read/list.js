import dbConnect from '../../../../../utils/dbConnect'
import Post from '../../../../../model/postSchema'

dbConnect();

export default function handler(req, res) {


    if(req.method === 'POST'){
        Post.find({}, { _id : true, title : true, author : true, tags : true, date : true, comments : true }).sort({ date : 'desc'}).then((post, err)=>{ //모든 post 조회
            if(!err){
                res.status(200).send(post);
            }else{
                console.log(err);
                res.status(404).send({ error : 'NOT FOUND POST' });   
            }
        }).catch((err)=>{
            console.log(err);
            res.status(404).send({ error : 'DB ERROR' });
        });
    }



}