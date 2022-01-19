import Link from "next/link"

const Logo = () => {

    return(
        <>
            <h1 className="inline-block text-xl text-white h-8 leading-7">
                <Link href='/' passHref>
                    <a>Simple Forum</a>
                </Link>
            </h1>
        </>
    )
}

export default Logo