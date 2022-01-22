import Post from '../../../../../model/postSchema'
import dbConnect from '../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){

    if(req.method === 'POST' && req.body.title ){

        const data = req.body;
        
        const newPost = new Post();
        newPost.no = await Post.countDocuments() + 1;
        newPost.author = data.author;
        newPost.title = data.title;
        newPost.content = data.content;
        newPost.tags = data.tags;
        newPost.comments = data.comments;
        
        newPost.save().then( (post) => {
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