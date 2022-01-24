import Head from "next/head"
import Script from "next/script"

const HeadInfo = ({title, keyword, content}) => {

    const headInfo = {
        _title :  title === undefined ? `Simple Forum` : 'Simple Forum - ' + title,
        _keyword : keyword === undefined ? 'React, Nextjs, Portfolio, FrontEnd, Developer ' : 'React, Nextjs, Portfolio, FrontEnd, Developer, ' + keyword,
        _content : content === undefined ? 'This website is a simple forum created by Nextjs.' : 'This website is a simple forum created by Nextjs. ' + content, 
    }

    return(
        <>
            <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
            <meta name="HandheldFriendly" content="true" />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content={headInfo._content}/>
            <meta name="keywords" content={headInfo._keyword} />

            <meta property="og:title" content={headInfo._title} />
            <meta property="og:site_name" content={headInfo._title} />
            <meta property="og:url" content="https://www.juni-official.com/" />
            <meta property="og:description" content={headInfo._content} />
            <meta name="keywords" content={headInfo._keyword} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://www.juni-official.com/static/media/logo.06f29f67.png"></meta>

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;900&family=Open+Sans:wght@400;500;800&display=swap" rel="stylesheet" />

            <title>{headInfo._title}</title>
            
            </Head>
        </>
    )
}

export default HeadInfo