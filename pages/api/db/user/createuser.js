
import User from '../../../../model/userSchema'
import dbConnect from '../../../../utils/dbConnect'
import bcrypt from 'bcryptjs'


dbConnect();

export default async function handler(req, res){

    if(req.method === 'POST'){
        
        const newUser = new User();

        //id, email 중복 점검 필요
        newUser.no = await User.countDocuments() + 1,
        newUser.id = req.body.id,
        newUser.pw = bcrypt.hashSync(req.body.pw, 5), //비밀번호 암호화
        newUser.email = req.body.email,
        newUser.nicname = req.body.nicname,
        newUser.profile_image = 'not yet';

        //DB 저장
        newUser.save().then( (user) => {
            console.log(user);
            res.status(200).send('success create account');
        }).catch((err)=>{
            console.log(err);
            res.status(404).send('error');
        })

    }else{
        res.status(404).send('error');
    }

}