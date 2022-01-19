import dbConnect from '../../../../utils/dbConnect'
import Post from '../../../../model/postSchema'

dbConnect();

export default function handler(req, res) {

    const newPost = new Post();

    posts.find({}).then((post)=>{ //모든 post 조회
        console.log(post);
    }).catch((err)=>{
        console.log(err);
    });

    res.json({ test: 'ok'});


}