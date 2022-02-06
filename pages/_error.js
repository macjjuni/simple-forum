import HeadInfo from "../components/headInfo"
import { useRouter } from "next/router"

export default function Error({ statusCode }) {

    const { push } = useRouter();

    return (
    <>
        <HeadInfo title='404 NOT FOUND'></HeadInfo>
        <div className="404-wrap h-[500px] flex flex-col justify-center items-center">
            <h1 className="block text-xl">{statusCode} Error - Page Not Found</h1>
            <button onClick={(()=> push('/'))} className="block my-5 px-5 py-2 bg-blue-400 rounded-sm">
                Go Home
            </button>
        </div>
        
        
    </>
    )
}

Error.getInitialProps = ({res, err}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

