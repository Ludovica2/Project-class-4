import { useDictionary } from "../provider/Language";
import PopUpModal from "./shared/PopUpModal";
import { motion } from "framer-motion"


const SupportTicket = ({ tickets }) => {
    const [dictionary] = useDictionary()

    return (
        <>
            <div className="relative overflow-x-auto m-4 shadow-md sm:rounded-lg">
                <table className="rounded-lg shadow w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="bg-slate-100 rounded-t-lg text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">{dictionary.tickets.DESCRIPTION}</th>
                            <th scope="col" className="px-6 py-3">{dictionary.tickets.DATE}</th>
                            <th scope="col" className="px-6 py-3">{dictionary.tickets.TYPE}</th>
                            <th scope="col" className="px-6 py-3">{dictionary.tickets.STATUS}</th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tickets && tickets.map((item) => (
                                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4">{item.id}</td>
                                    <td className="max-w-52 overflow-x-hidden px-6 py-4">{item.description}</td>
                                    <td className="px-6 py-4">{item.date}</td>
                                    <td className="px-6 py-4">{item.category}</td>
                                    <td className="px-6 py-4">{item.state}</td>
                                    <td className="px-6 py-4"><button><i className="fa-solid fa-trash-can text-primaryColor"></i></button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-6">
                {
                    <PopUpModal title={dictionary.tickets.NEW_TITLE} sizeModal={"lg"}
                        showBtn={(openModal) => {
                            return <button onClick={() => openModal(true)} className="btn min-w-40">{dictionary.tickets.NEW}</button>;
                        }}
                    >
                        {
                            <>
                                <form className="w-full" /* onSubmit={handleSignIn} */>
                                    <div className="flex w-full justify-between mb-8">
                                        <label htmlFor="category" className="mt-1"> {dictionary.tickets.TYPE} </label>
                                        <div>
                                            <select id="category" className="input_field">
                                                <option value="profile">{dictionary.globals.PROFILE}</option>
                                                <option value="feed">{dictionary.globals.FEED}</option>
                                                <option value="calendar">{dictionary.globals.CALENDAR}</option>
                                                <option value="chat">{dictionary.globals.CHAT}</option>
                                                <option value="groups">{dictionary.globals.GROUPS}</option>
                                                <option value="groups">{dictionary.globals.FAVORITES}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="ticketDescription" className="mt-1 mb-2"> {dictionary.tickets.PROBLEM} </label>
                                        <textarea name="ticketDescription" id="ticketDescription" className="input_field"></textarea>
                                    </div>
                                    <div className="mt-8">
                                        <motion.button type="submit" className="btn"
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {dictionary.btn.SEND}
                                        </motion.button>
                                    </div>
                                </form>
                            </>
                        }
                    </PopUpModal>
                }

            </div>
        </>
    )
}

export default SupportTicket