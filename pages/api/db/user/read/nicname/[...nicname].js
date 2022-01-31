
import User from '../../../../../../model/userSchema'
import dbConnect from '../../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){
    const query = req.query;
    const nicname = query.nicname[0];
    
    if(req.method === 'GET' && nicname ){
        const check = await User.findOne({ nicname : nicname }); //DB 조회
        if(check === null) res.status(200).send({error : null});
        else res.status(200).send({error : 'Registered Nicname'});
    }else{
        res.status(400).send('404 not found');
    }
}