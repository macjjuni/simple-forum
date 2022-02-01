import Post from '../../../../../model/postSchema'
import dbConnect from '../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){

    const { id } = req.query; // post._id
    const { index, content, author } = req.body; //삭제 대상 index
    
    if(req.method === 'POST' && author ){

        //기존 댓글 정보 가져오기
        Post.findOne({ _id : id }, {comments : true}, (err, post)=> {

            if(!err){

                if(post.comments[index].author === author){ //댓글 작성자 인증
                    
                    const comments = post.comments;
                    comments.splice(index, 1, { content : content, author : author }); //댓글 업데이트
                    //해당 Post에서 댓글 업데이트
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