import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios'

const ReCaptchaV2 = ({setReCaptchaChk}) => {

    const recaptchaRef = useRef(null); 

    const handleSubmit = async () => {
        const token = await recaptchaRef.current.getValue();
        const { data } = await axios({
            method : 'post',   
            url : '/api/recaptcha',
            data : {
                token : token
            }
        });
        if(data.status === true) setReCaptchaChk(true);
    }

    return(
        <>
            <div className="recaptcha-wrap relative w-full h-[75px] mt-5">
                <ReCAPTCHA className="absolute top-0 left-[50%] translate-x-[-50%]"
                    ref={recaptchaRef}
                    onExpired={()=> { setReCaptchaChk(false); }}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SECRET}
                    size='normal'
                    onChange={handleSubmit}
                />
            </div>
        </>
    )
}

export default ReCaptchaV2