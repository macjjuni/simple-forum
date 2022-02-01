import Post from '../../../../../../model/postSchema'
import User from '../../../../../../model/userSchema'
import dbConnect from '../../../../../../utils/dbConnect'

dbConnect();

export default async function handler(req, res){

    const id = req.query.like[0];
    const data = req.body;

    if(req.method === 'POST' && data.user && data.like === 'like' ){

        const post = await Post.findOne({ _id : id }, { _id : true, likeCount : true, likeUser : true }); // Post 데이터
        
        if( post.id === id ){
            let count = post.likeCount;
            const likeUser = post.likeUser;

            if(likeUser.includes(data.user)){ //좋아요 리스트 체크
                const idx = likeUser.indexOf(data.user); //좋아요 배열에 아이디 제거
                likeUser.splice(idx, 1);
                count--; //좋아요 감소
            }else{
                likeUser.push(data.user); //좋아요 배열에 아이디 삽입
                count++; //좋아요 증가
            }

            //좋아요 정보 업데이트
            Post.findOneAndUpdate({ _id : id }, { likeCount : count , likeUser : likeUser }, { new : false }, (err, _res)=> {
                if(!err){
                    res.status(200).send({ error: null});        
                }else{
                    res.status(404).send({ error: 'UPDATE FAILED'}); //업데이트 실패
                }
            });

        }else{
            res.status(404).send({ error: 'CERTIFICATION FAILD'});  //작성자 인증 실패
        }

    }else{
        res.status(404).send({ error: 'NOT FOUND'}); 
    }

}