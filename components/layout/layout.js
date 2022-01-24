import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion"
import Header from '../header'
import Footer from '../footer'

const Layout = ({children}) => {

    const { route } = useRouter();    

    return(
        <>

        <div className='relative bg-white dark:bg-slate-600 dark:text-white transition-bg duration-300 ease-in-out'>
        
            <div className={`wraper max-w-screen-lg ease-in-out mx-auto `}>
                <Header/>
                <div className="wrap w-full min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-7rem)] px-2.5 pt-3.5 pb-10 ">
                    <AnimatePresence exitBeforeEnter={true}> 
                        <motion.div className='py-0 md:py-6' key={route} transition={{ease: [0.17, 0.67, 0.83, 0.67], duration : 0.3 }}
                        initial={animate.initial} animate={animate.animate} exit={animate.exit}>
                        
                            {children}
                        
                        </motion.div>
                    </AnimatePresence>
                </div>
                <Footer/>
            </div>
        
        </div>  
        
        </>
    )
}

const animate = {
    initial :{ //none use
        transform : `translateX(50px)`,
        opacity : 0,
    },
    animate : {
        transform : `translateX(0px)`,
        opacity: 1,
    },
    exit : {
        transform : `translateX(-50px)`,
        opacity: 0,
    }
}


export default Layout