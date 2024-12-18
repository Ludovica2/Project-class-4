import { Link } from "react-router-dom"

const ButtonBack = ({to}) => {
    return (
        <>
            <button className="mt-3 ml-5 self-start">
                <Link to={to}>
                    <i className="fa-solid fa-circle-arrow-left mr-1 text-primaryColor"></i>
                    <span className="text-primaryColor">Indietro</span>
                </Link>
            </button>
        </>
    )
}

export default ButtonBack