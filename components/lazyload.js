import Image from "next/image";


const LazyImage = ({src, alt}) => {

    const onLoadImg = (e) => {
        e.target.classList.add('fade');
    }

    return(
        <>
            <Image src={src} alt={alt} onLoad={onLoadImg} width='100%' height='100%' style={{ opacity : 0 }} transition="opacity 1s ease" />
        </>
    )
}

export default LazyImage