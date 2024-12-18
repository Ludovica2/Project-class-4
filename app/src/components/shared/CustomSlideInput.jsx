import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

const CustomSlideInput = ({ title, name, onChange, social, image, content, isActive }) => {
    const [values, setValues] = useState({
        title,
        isActive,
        image,
        content
    });

    const toggleActive = () => setValues((values) => ({ ...values, isActive: !values.isActive }));

    const handleInput = (event) => {
        setValues((values) => ({ ...values, content: event.target.value }));
    };

    useEffect(() => {
        onChange({ name, value: values });
    }, [values]);

    return (
        <>
            {
                social && (
                    <div className="flex items-center justify-between mb-6 max-xl:flex-col max-xl:items-start">
                        <div className="flex justify-between min-w-36 max-xl:mb-2">
                            <label htmlFor="insta" className="mr-4 text-dark"> {title} </label>
                            <div className="switch dark:bg-zinc-600" data-ison={values.isActive} onClick={toggleActive}>
                                <motion.div className={"w-5 h-5 rounded-[40px]" + (values.isActive ? " bg-primaryColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                            </div>
                        </div>
                        <input type="text" value={values.content} onInput={handleInput} className="min-w-80 input_readOnly max-md:min-w-64" readOnly={!values.isActive} />
                    </div>
                )
            }
            {
                !social && (
                    <div className="flex items-center w-full justify-between mb-8">
                        <span className="text-dark"> {title} </span>
                        <div className="switch dark:bg-zinc-600"  data-ison={values.isActive} onClick={toggleActive}>
                            <motion.div className={"w-5 h-5 rounded-[40px]" + (values.isActive ? " bg-secondaryColor" : " bg-white dark:bg-slate-400")} layout transition={spring} />
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default CustomSlideInput