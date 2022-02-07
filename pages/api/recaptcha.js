import axios from 'axios'
const SECRET_KEY = process.env.RECAPTCHA_SECRET;


export default async function recaptchaChk(req, res) {
  
    const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
    const TOKEN = req.body.token;

    const { data } = await axios(VERIFY_URL,
      {
        method : 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        params : { 
          secret : SECRET_KEY,
          response : TOKEN 
        }
      });
      
    console.log(data);
    
    if(data.success === true){
      res.status(200).json({ status : true });
    }else{
      res.status(200).json({ status : false });
    }
}