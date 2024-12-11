import { Link } from "react-router-dom"

const WidgetItem = ({to = "", img, alt, text}) => {

    return (
        <div className='flex gap-3 items-center'>
            <div>
                <Link to={to}>
                    <img src={img} alt={alt} className='rounded-full max-w-[45px] hover:opacity-70' />
                </Link>
            </div>
            <div className='flex gap-3'>
                <Link to={to}>
                    <p className='text-sm text-dark hover:opacity-70'>{text}</p>
                </Link>
                <button>
                    <i className="fa-solid fa-suitcase-rolling text-primayColor hover:opacity-70"></i>
                </button>
            </div>
        </div>
    )
}

export default WidgetItem
