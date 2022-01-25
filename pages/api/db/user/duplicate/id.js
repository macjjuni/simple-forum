
import User from '../../../../../model/userSchema'
import dbConnect from '../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){
    const id = req.body.id;
    console.log(id);
    
    if(req.method === 'POST' && id ){
        const check = await User.findOne({ id : id }); //DB 조회
        if(check === null) res.status(200).send({error : null});
        else res.status(200).send({error : 'Registered ID'});
    }else{
        res.status(400).send('404 not found');
    }
}