import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "../../../utils/dbConnect"
import User from '../../../model/userSchema'
import bcrypt from "bcryptjs/dist/bcrypt";

dbConnect();

export default NextAuth({

    providers: [
        CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        id : 'id-pw-credentials',
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.

        credentials: {
            username: { label: "아이디", type: "text", placeholder: "" },
            password: {  label: "비밀번호", type: "password" }
        },
        //로그인 담당 
            async authorize(credentials, req) {

                // 입력된 계정 검증로직
                const id = credentials.username;
                const pw = credentials.password;

                const dbInfo = await User.findOne({ id : id}, {pw : true, nicname : true});
                const verify = await bcrypt.compare(pw, dbInfo.pw); //비밀번호 체크

                console.log('로그인 체크' + verify);

                if(verify){
                    const user = { name : dbInfo.nicname };
                    return user;
                }else{
                    return null;
                }

            }
        })
    ],
    pages:{
        signIn : '/signin'
    },

    secret: process.env.SECRET
})