import Image from "next/image";


const LazyImage = ({src, alt, width, height}) => {

    const onLoadImg = (e) => {
        e.target.classList.add('fade');
    }

    return(
        <>
            <Image src={src} alt={alt} onLoad={onLoadImg} width={width} height={height} style={{ opacity : 0 }} transition="opacity 1s ease" />
        </>
    )
}

export default LazyImage