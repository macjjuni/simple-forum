import { useState, useEffect } from "react"

const Footer = () => {

    const [_date, setDate] = useState();
    useEffect(()=>{
        setDate(new Date().getFullYear());
    }, []);

    return(
        <>
            <footer className="absolute bottom-0 left-0 w-full h-10 flex items-center text-center bg-gray-50">
                <p className="text-center text-xs w-full text-gray-300">{_date}. juni-official All rights reserved</p>
            </footer>
        </>
    )
}

export default Footer