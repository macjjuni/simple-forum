import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion"
import Header from '../header'
import Footer from '../footer'

const Layout = ({children}) => {

    const { route } = useRouter();    

    return(
        <>
        <div className='relative max-w-screen-md min-h-screen mx-auto bg-gray-50 pb-10 sha'>
            
            <Header/>
            <AnimatePresence exitBeforeEnter={true}> 
                <motion.div className='p-3'
                key={route} transition={{ease: "easeInOut", duration : 0.3 }}
                initial={animate.initial} animate={animate.animate} exit={animate.exit}>
                    {children}
                </motion.div>
            </AnimatePresence>

            <Footer/>
        </div>  
        </>
    )
}

const animate = {
    initial :{ //none use
        transform : `translateY(-15px)`,
        opacity : 0,
    },
    animate : {
        transform : `translateY(0px)`,
        opacity: 1,
    },
    exit : {
        transform : `translateY(-15px)`,
        opacity: 0,
    }
}


export default Layout