
import User from '../../../../../../model/userSchema'
import dbConnect from '../../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){
    
    const { user } = req.query;
    const { url } = req.body;

    console.log(user[0])

    if(req.method === 'POST' && user[0] && url){

    User.findOneAndUpdate({ id : user[0] }, { profile_image : url }, { new : true }, (err, _res)=> {

        if(!err){
            console.log('성공');
            res.status(200).send({ error: null});        
        }else{
            res.status(404).send({ error: 'UPDATE FAILED'}); //업데이트 실패
        }

    });

    }else{
        res.status(400).send('404 NOT FOUND');
    }

}