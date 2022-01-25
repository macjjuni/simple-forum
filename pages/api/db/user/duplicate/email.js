
import User from '../../../../../model/userSchema'
import dbConnect from '../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){
    const email = req.body.email;
    console.log(email);
    if(req.method === 'POST' && email ){
        const check = await User.findOne({ email : email }); //DB 조회
        if(check === null) res.status(200).send({error : null});
        else res.status(200).send({error : 'Registered ID'});
    }else{
        res.status(400).send('404 not found');
    }
}