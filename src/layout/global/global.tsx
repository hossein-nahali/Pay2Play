import {Outlet} from "react-router";
import {AnimatePresence, motion} from "framer-motion";
import Header from "./components/header/Header.tsx";

export default function Global() {
    return (
        <>
            <Header/>
            <AnimatePresence mode="wait">
                <motion.div key={location.pathname} initial={{opacity: 0, y: 0}} animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 0}} transition={{duration: 0.3}} className={'h-100'}>
                    <Outlet/>
                </motion.div>
            </AnimatePresence>
        </>
    );
}