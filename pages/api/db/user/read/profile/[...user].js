import dbConnect from "../../../../../../utils/dbConnect"
import User from "../../../../../../model/userSchema"


dbConnect();

export default async function handler(req, res){

    const { user } = req.query; 
    const target = req.body;

    if(req.method === 'POST' && user[0] === target.user){

        User.findOne({ nicname : user }, { profile_image : true}, (err, user) => {
            if(!err){
                console.log(user);
                res.status(200).send({ error : null, profile : user.profile_image });
            }else{
                console.log(err);
                res.status(400).send('NOT FOUND DB');
            }
            
        });
        
    }else{
        res.status(400).send('404 NOT FOUND');
    }


}