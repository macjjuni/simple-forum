import User from '../../../../../model/userSchema'
import dbConnect from '../../../../../utils/dbConnect'
import bcrypt from "bcryptjs/dist/bcrypt";


dbConnect();

export default async function handler(req, res){

    const nicname = req.body.nicname;

    if(req.method === 'POST' && nicname ){
        const userPw = req.body.pw;
        const dbPw = await User.findOne({ nicname : nicname }, { pw : true}); //pw compare
        const verify = await bcrypt.compare(userPw, dbPw.pw); //비밀번호 체크

        if( verify ){ // 유저 인증

            const del = await Post.findOneAndDelete({ nicname : nicname });
            if(del){
                res.status(200).send({error : null});
            }else{
                res.status(200).send({error : 'DELETE FAILED'});
            }

        }else{
            res.status(200).send({error : 'INCORRECT PASSWORD' });
        }
    }else{
        res.status(404).send('error');
    }

}