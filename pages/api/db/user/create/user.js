import User from '../../../../../model/userSchema'
import dbConnect from '../../../../../utils/dbConnect'
import bcrypt from 'bcryptjs'


dbConnect();

export default async function handler(req, res){

    if(req.method === 'POST'){

        const _id = await User.findOne({ id : req.body.id }); //ID 중복 체크
        const _email = await User.findOne({ id : req.body.id }); //Email 중복 체크
        const _nic = await User.findOne({ id : req.body.id }); //Nicname 중복 체크

        if( _id === null && _email === null && _nic === null ){

            const newUser = new User();
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
            });

        }

    }else{
        res.status(404).send('error');
    }

}