import { useEffect } from "react"
import { motion } from "framer-motion";
import { FadeLoader } from "react-spinners"

const Groups = () => {
    useEffect(() => {
        document.title = "Groups - Found!";
    }, []);
    return (
        <>
            <div className="flex flex-col items-center justify-center h-[300px] w-full">

                <motion.h1
                    animate={{ x: [50, 150, 50], opacity: 1, scale: 1 }}
                    transition={{
                        duration: 5,
                        delay: 0.3,
                        ease: [0.5, 0.71, 1, 1.5],
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ scale: 1.2 }}
                    className="mt-20"
                >
                    <p className="text-7xl text-primayColor font-medium italic">COMING SOON...</p>
                </motion.h1>
                <div className="mt-20">
                    <FadeLoader color="#40798C" size={100} />
                </div>
            </div>
        </>
    )
}

export default Groups