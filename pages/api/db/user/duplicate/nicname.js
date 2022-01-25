
import User from '../../../../../model/userSchema'
import dbConnect from '../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){
    const nicname = req.body.nicname;
    console.log(nicname);
    if(req.method === 'POST' && nicname ){
        const check = await User.findOne({ nicname : nicname }); //DB 조회
        if(check === null) res.status(200).send({error : null});
        else res.status(200).send({error : 'Registered Nicname'});
    }else{
        res.status(400).send('404 not found');
    }
}