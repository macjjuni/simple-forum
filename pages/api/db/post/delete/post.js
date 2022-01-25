import { defaultTo } from 'lodash';
import Post from '../../../../../model/postSchema'
import dbConnect from '../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){

    const id = req.body.id;
    
    if(req.method === 'POST' && id ){
            
        const check = await Post.findOneAndDelete({ no : id});
        if(check) res.status(200).send({ error : null }); //삭제 성공
        else res.status(404).send({ error : 'DELETE FAILED' }); //삭제 실패
        
    }else{
        res.status(404).send({ error : 'error' });
    }
    
}