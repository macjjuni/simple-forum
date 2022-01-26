import Post from '../../../../../model/postSchema'
import dbConnect from '../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){

    const { id } = req.query;
    const { author } = req.body;

    if(req.method === 'POST' && id && author ){

        //기존 댓글 정보 가져오기
        Post.findOne({ no : id }, {comments : true}, (err, post)=> {
            
            if(!err){
                const data = req.body;
                
                const comments = post.comments;
                //댓글 추가
                comments.push({content : data.comment, author : data.author});
                
                //해당 Post에 댓글 추가
                Post.findOneAndUpdate( { no : id }, {$set : { comments : comments }}, { new : true }).then(_res=>{
                    res.status(200).send({error : null});
                }).catch(err=> {
                    res.status(404).send({ error : 'UPDATE FAILD' });
                    console.log(err)
                });
                
            }else{
                alert(res.data.error);
                res.status(404).send({ error : 'NOT FOUND POST' });
            }
            
        });

    }else{
        res.status(404).send({ error : 'ACCESS ERROR' });
    }

}