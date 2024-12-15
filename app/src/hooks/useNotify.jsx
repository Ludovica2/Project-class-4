import { toast } from 'react-hot-toast'
import { config } from '../config/config'
import { useNavigate } from 'react-router-dom';

/**
 * @param {string} token 
 * @returns {(notification: { title: string, content: string, image: string, link: string }) => void}
 */
export const useNotify = (token) => {
    const navigate = useNavigate();

    const notify = (notification) => toast.custom((t) => (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-4 cursor-pointer" onClick={() => navigate(notification.link.replace(config.CLIENT_URL, ""))}>
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <img
                            crossOrigin="anonymous"
                            className="h-10 w-10 rounded-full"
                            src={`${notification.image}?token=${token}`}
                            alt={notification.title}
                        />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            {notification.content}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Close
                </button>
            </div>
        </div>
    ));

    return notify;
}