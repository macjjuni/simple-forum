import Image from "next/image";
import { useEffect } from "react";


const LazyImage = ({src, alt, width, height}) => {

    const onLoadImg = (e) => {
        e.target.classList.add('fade');
    }

    return(
        <>
            <Image src={src} alt={alt} className="opacity-0" onLoad={onLoadImg} width={width} height={height} />
        </>
    )
}

export default LazyImage