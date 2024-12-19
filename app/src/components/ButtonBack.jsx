import { Link } from "react-router-dom"
import { useDictionary } from "../provider/Language"

const ButtonBack = ({to}) => {
    const [dictionary] = useDictionary();

    return (
        <>
            <button className="mt-3 ml-5 self-start">
                <Link to={to}>
                    <i className="fa-solid fa-circle-arrow-left mr-1 text-primaryColor"></i>
                    <span className="text-primaryColor">{dictionary.btn.BACK}</span>
                </Link>
            </button>
        </>
    )
}

export default ButtonBack