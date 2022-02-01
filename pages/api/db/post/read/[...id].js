import Post from '../../../../../model/postSchema'

export default async function handler(req, res) {

    if(req.method === 'POST' && req.body.id === 'simple-forum'){
        
        const { id } = req.query;
        const post = await Post.find({ _id : id});
        
        if(post){
            res.status(200).send(post);
        }else{
            res.status(400).send({ error : 'not found post'});
        }

    }else{
        res.status(400).send({ error : 'NOT FOUND'});
    }

}