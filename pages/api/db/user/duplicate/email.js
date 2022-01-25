
import User from '../../../../../model/userSchema'
import dbConnect from '../../../../../utils/dbConnect'


dbConnect();

export default async function handler(req, res){
    
    const email = req.body.email;
    
    console.log(email);
    if(req.method === 'POST' && email ){
 
        User.findOne({ email : target }, (err, _res) => {
            if(_res === null){ //중복된 이메일이 없는 경우
                res.status(200).send({error : null});
            }else{            //중복된 이메일이 있는 경우
                res.status(200).send({error : 'Registered Email'});
            }
        }); 
    
    }else{
        res.status(400).send('404 not found');
    }
}