import { motion } from "framer-motion"

const CustomActiveSocial = ({ src, title, content }) => {
    return (
        <>
            <motion.button className="w-5 h-5 relative btn-tooltip"
                whileHover={{ scale: 1.2 }}
            >
                <a target="__blank" href={content}>
                    <img src={`${src}`} alt={`${title}`} />
                    <div className="tooltip-container tooltip-bottom dark:bg-elements_dark dark:text-slate-400">
                        {title}
                        <div className="arrow-tooltip arrow-tlt-bottom dark:bg-elements_dark dark:text-elements_dark"></div>
                    </div>
                </a>
            </motion.button>
        </>
    )
}

export default CustomActiveSocial