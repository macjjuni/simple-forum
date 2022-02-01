import Post from '../../../../../../model/postSchema'
import User from '../../../../../../model/userSchema'
import dbConnect from '../../../../../../utils/dbConnect'

dbConnect();

export default async function handler(req, res){

    const id = req.query.like[0];
    const data = req.body;

    if(req.method === 'POST' && data.user ){

        const user = await User.findOne({ id : data.user }); // User 계정 인증
        const post = await Post.findOne({ _id : id }, { _id : true, likeCount : true, likeUser : true }); // Post 데이터
        
        if(user.id === data.user && post.id === id ){
            //좋아요 숫자는 프론트단에서 계산 후 값을 가져옴 
            const likeUser = post.likeUser;
            let count = post.likeCount;
            if(data.check === 'plus'){//좋아요 && 좋아요 취소 체크 
                likeUser.push(data.user); //좋아요 배열에 아이디 삽입
                count++;
            }else{ //좋아요 배열에서 제거
                const idx = likeUser.indexOf(data.user);
                likeUser.splice(idx, 1);
                count--;
            }
            console.log(likeUser)
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