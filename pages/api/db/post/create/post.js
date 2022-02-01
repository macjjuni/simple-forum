import Post from '../../../../../model/postSchema'
import dbConnect from '../../../../../utils/dbConnect'

dbConnect();

export default async function handler(req, res){

    const { session } = req.body;
    
    if(req.method === 'POST' && session ){

        const data = req.body;

        const newPost = new Post();  //글 객체 생성
        newPost.author = data.author;
        newPost.title = data.title;
        newPost.content = data.content;
        newPost.tags = data.tags;

        
        newPost.save().then( (post) => { //글 저장
            console.log(post);
            res.status(200).send({ error : null, id : newPost._id });
        }).catch((err)=>{
            console.log(err);
            res.status(404).send({ error : 'error' });
        });

    }else{
        res.status(404).send({ error : 'error' });
    }

}