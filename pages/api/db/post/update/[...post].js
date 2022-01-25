import Post from '../../../../../model/postSchema'
import dbConnect from '../../../../../utils/dbConnect'

dbConnect();

export default async function handler(req, res){

    const id = req.query.post[1];
    const data = req.body;


    if(req.method === 'POST' && data.author ){

        const check = await Post.findOne({ no : id}, { author : true }); //작성자 인증
        if(check.author === data.author){

            Post.findOneAndUpdate({ no : id }, { title : data.title, content : data.content, tags : data.tags }, { new : true }, (err, _res)=> {
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