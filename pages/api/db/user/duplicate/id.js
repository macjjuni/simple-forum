
import User from '../../../../../model/userSchema'
import dbConnect from '../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){
    const target = req.body.id;
    console.log(target);
    if(req.method === 'POST' && target ){
        const getData = await User.findOne({ id : target }); //DB 조회
        if(getData === null) res.status(200).send({error : null});
        else res.status(200).send({error : 'Registered ID'});
    }else{
        res.status(400).send('404 not found');
    }
}