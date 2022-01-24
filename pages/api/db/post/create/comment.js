import Post from '../../../../../model/postSchema'
import dbConnect from '../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){

    if(req.method === 'POST' && req.body.target ){

        const data = req.body;

        //기존 댓글 정보 가져오기
        Post.findOne({ no : data.target }, {comments : true}, (err, post)=> {
            
            if(!err){

                const comments = post.comments;
                //댓글 추가
                comments.push({content : data.comment, author : data.author});
                //DB에 댓글 추가
                Post.findOneAndUpdate( { no : data.target }, {$set : { comments : comments }}, { new : true }).then(_res=>{
                    res.status(200).send({error : null});
                }).catch(err=> {
                    res.status(404).send({ error : 'error' });
                    console.log(err)
                });
                
            }else{
                console.log(err);
                res.status(404).send({ error : 'error' });
            }
            
        });

    }else{
        res.status(404).send({ error : 'error' });
    }

}