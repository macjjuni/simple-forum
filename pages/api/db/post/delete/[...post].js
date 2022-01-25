import Post from '../../../../../model/postSchema'
import dbConnect from '../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){

    const id = req.query.post[0];
    const  { author }  = req.body;

    if(req.method === 'POST' && id && author ){
        
        const check = await Post.findOne({no : id}, { author : true});

        if(check.author === author){ //작성자 인증

            const check = await Post.findOneAndDelete({ no : id});
            if(check) res.status(200).send({ error : null }); //삭제 성공
            else res.status(404).send({ error : 'DELETE FAILED' }); //삭제 실패

        }else{
            res.status(404).send({ error: 'CERTIFICATION FAILD'});  //작성자 인증 실패
        }

        
        
    }else{
        res.status(404).send({ error : 'NOT FOUND' });
    }
    
}