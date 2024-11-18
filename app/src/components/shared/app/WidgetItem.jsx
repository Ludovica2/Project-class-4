import { Link } from "react-router-dom"

const WidgetItem = ({to = "", img, alt, text}) => {

    return (
        <div className='flex gap-3 items-center'>
            <div>
                <Link to={to}>
                    <img src={img} alt={alt} className='rounded-full max-w-[45px]' />
                </Link>
            </div>
            <div className='flex gap-2'>
                <Link to={to}>
                    <p className='text-sm'>{text}</p>
                </Link>
                <button>
                    <i className="fa-solid fa-suitcase-rolling text-primayColor "></i>
                </button>
            </div>
        </div>
    )
}

export default WidgetItem
