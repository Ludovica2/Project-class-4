import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ReviewBox = ({ review }) => {
    const { token } = useSelector((state) => state.auth);

    const formatPostAuthorName = (user) => {
        return user.role == "user" ? `${user.first_name} ${user.last_name}` : user?.metadata?.company_name;
    }

    return (
        <div className="bg-white shadow rounded-lg p-3 flex items-start w-full gap-2">
            <div className="flex">
                <Link className="cursor-pointer flex items-center justify-center" to={`/app/profile/${review.author.nickname.replace("@", "")}`}>
                    <div style={{ backgroundImage: `url(${review.author.avatar}?token=${token})` }} className="imgProfile-notification bg-cover bg-center"></div>
                </Link>
            </div>
            <div className="flex flex-col">
                <Link className="cursor-pointer flex items-center justify-start" to={`/app/profile/${review.author.nickname.replace("@", "")}`}>
                    <h3 className="dark:text-white">
                        {formatPostAuthorName(review.author)} - <span className='text-xs text-black font-bold self-end ml-1 mb-[2px] dark:text-slate-300'> @{review.author.nickname}</span>
                        {
                            review.author.role == "business" && (
                                <i className="fa-solid fa-certificate text-primaryColor ml-2"></i>
                            )
                        }
                    </h3>
                </Link>
                <div className="">
                    {
                        Array.from(new Array(review.rating)).map((_, i) => (
                            <button className="cursor-default">
                                <i className={`fa-solid fa-star ${i < (review.rating) ? "text-yellow-300" : "text-text_secondaryColor"}`}></i>
                            </button>
                        ))
                    }
                    
                </div>
                <div className="mt-2">
                    <p>{review.content}</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewBox