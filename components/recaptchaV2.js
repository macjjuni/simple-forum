import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios'

const ReCaptchaV2 = ({setReCaptchaChk}) => {

    const recaptchaRef = useRef(null); 

    const handleSubmit = async () => {
        const token = await recaptchaRef.current.getValue();
        const { data } = await axios({
            method : 'post',   
            url : '/api/recaptchachk',
            data : {
                token : token
            }
        });
        if(data.status === true) setReCaptchaChk(true);
    }

    return(
        <>
            <ReCAPTCHA className="w-[305px] h-[78px] mx-auto mt-8"
                ref={recaptchaRef}
                onExpired={()=> { setReCaptchaChk(false); }}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SECRET}
                size='normal'
                onChange={handleSubmit}
            />
        </>
    )
}

export default ReCaptchaV2