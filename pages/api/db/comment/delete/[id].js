import Post from '../../../../../model/postSchema'
import dbConnect from '../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){

    const { id } = req.query; // post.no
    const { target } = req.body; //삭제 대상 index
    const { author } = req.body; //글 작성자
    
    if(req.method === 'POST' && author ){

        //기존 댓글 정보 가져오기
        Post.findOne({ _id : id }, {comments : true}, (err, post)=> {

            if(!err){                
                
                if(post.comments[target].author === author){ //댓글 작성자 인증
                    
                    const comments = post.comments;
                    comments.splice(target, 1); //댓글 삭제
                    //해당 Post에서 댓글 삭제
                    Post.findOneAndUpdate( { _id : id }, {$set : { comments : comments }}, { new : true }).then(_res=>{
                        res.status(200).send({error : null});
                    }).catch(err=> {
                        res.status(404).send({ error : 'UPDATE FAILD' });
                        console.log(err)
                    });

                }else{
                    res.status(404).send({ error : 'CERTIFICATION FAILD' });
                }

            }else{
                alert(res.data.error);
                res.status(404).send({ error : 'NOT FOUND POST' });
            }
            
        });

    }else{
        res.status(404).send({ error : 'ACCESS ERROR' });
    }

}