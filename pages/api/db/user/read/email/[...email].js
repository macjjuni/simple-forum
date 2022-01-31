
import User from '../../../../../../model/userSchema'
import dbConnect from '../../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){
    const query = req.query;
    const email = query.email[0];

    if(req.method === 'GET' && email[1] ){
        const check = await User.findOne({ email : email }); //DB 조회
        if(check === null) res.status(200).send({error : null});
        else res.status(200).send({error : 'Registered ID'});
    }else{
        res.status(400).send('404 not found');
    }

}