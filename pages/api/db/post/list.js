import dbConnect from '../../../../utils/dbConnect'
import Post from '../../../../model/postSchema'

dbConnect();

export default function handler(req, res) {

    Post.find({}, {title : true, tags : true, date : true, no: true}).sort({ no : 'desc'}).then((post)=>{ //모든 post 조회
        res.status(200).send(post);
    }).catch((err)=>{
        console.log(err);
        res.status(404).json({ error : 'not found post' });
    });

}