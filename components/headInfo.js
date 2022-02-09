import Head from "next/head"

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
            <meta name="description" content={headInfo._content}/>
            <meta name="keywords" content={headInfo._keyword} />

            <link rel="shortcut icon" href="/favicon/favicon.ico" />

            <meta property="og:title" content={headInfo._title} />
            <meta property="og:site_name" content={headInfo._title} />
            <meta property="og:url" content="https://www.simple-forun.com/" />
            <meta property="og:description" content={headInfo._content} />
            <meta name="keywords" content={headInfo._keyword} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://www.simple-forum.site/favicon.png"></meta>

            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
            <link rel="manifest" href="favicon/site.webmanifest" />
            <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#000000" />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="theme-color" content="#ffffff" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={true} />
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;900&family=Open+Sans:wght@400;500;800&family=Saira&display=swap" rel="stylesheet" />

            <title>{headInfo._title}</title>
            
            </Head>
        </>
    )
}

export default HeadInfo