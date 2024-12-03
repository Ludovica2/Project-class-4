import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

const CustomSlideInput = ({ title, name, onChange}) => {
    const [values, setValues] = useState({
        title,
        isActive: false,
        content: ""
    });

    const toggleActive = () => setValues((values) => ({...values, isActive: !values.isActive}));

    const handleInput = (event) => {
        setValues((values) => ({...values, content: event.target.value}));
    };

    useEffect(() => {
        onChange({name, value:values});
    }, [values]);

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div className="flex justify-between min-w-36">
                    <label htmlFor="insta" className="mr-4 text-dark"> {title} </label>
                    <div className="switch dark:bg-zinc-600" data-ison={values.isActive} onClick={toggleActive}>
                        <motion.div className={"w-5 h-5 rounded-[40px]" + (values.isActive ? " bg-primayColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                    </div>
                </div>
                <input type="text" value={values.content} onInput={handleInput} className="min-w-80 input_readOnly" readOnly={!values.isActive} />
            </div>
        </>
    )
}

export default CustomSlideInput