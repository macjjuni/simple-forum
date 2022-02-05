
const LazyImage = ({src, alt, width, height}) => {

    const onLoadImg = (e) => {
        const observer = new IntersectionObserver(obsHandler, { threshold : 0.5 });
        observer.observe(e.target);
    }

    const obsHandler = ((entries) => {
        const target = entries[0];
        if(target.isIntersecting){ 
            target.target.classList.add('fade');
        }
    })

    return(
        <>
            <img src={src} 
                alt={alt} 
                onLoad={onLoadImg}
                className="thumb-img opacity-0 inline-block" 
                width={width} height={height} />
        </>
    )
}

export default LazyImage