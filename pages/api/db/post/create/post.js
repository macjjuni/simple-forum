import Post from '../../../../../model/postSchema'
import dbConnect from '../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){

    const { session } = req.body;
    
    if(req.method === 'POST' && session ){

        const data = req.body;
        
        const newPost = new Post();  //글 객체 생성
        newPost.no = await Post.countDocuments() + 1;
        newPost.author = data.author;
        newPost.title = data.title;
        newPost.content = data.content;
        newPost.tags = data.tags;
        newPost.comments = data.comments;
        
        newPost.save().then( (post) => { //글 저장
            console.log(post);
            res.status(200).send({ error : null, no : newPost.no });
        }).catch((err)=>{
            console.log(err);
            res.status(404).send({ error : 'error' });
        });

    }else{
        res.status(404).send({ error : 'error' });
    }

}