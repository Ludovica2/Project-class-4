import PopUpModal from "./shared/PopUpModal";
import { motion } from "framer-motion"


const SupportTicket = ({ tickets }) => {

    return (
        <>
            <div className="relative overflow-x-auto m-4 shadow-md sm:rounded-lg">
                <table className="rounded-lg shadow w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="bg-slate-100 rounded-t-lg text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Descrizione</th>
                            <th scope="col" className="px-6 py-3">Data</th>
                            <th scope="col" className="px-6 py-3">Categoria</th>
                            <th scope="col" className="px-6 py-3">Stato</th>
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
                                    <td className="px-6 py-4"><button><i className="fa-solid fa-trash-can text-primayColor"></i></button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-6">
                {
                    <PopUpModal title={"Inserimento Nuovo Ticket"} sizeModal={"lg"}
                        showBtn={(openModal) => {
                            return <button onClick={() => openModal(true)} className="btn min-w-40">Nuovo Ticket</button>;
                        }}
                    >
                        {
                            <>
                                <form className="w-full" /* onSubmit={handleSignIn} */>
                                    <div className="flex w-full justify-between mb-8">
                                        <label htmlFor="category" className="mt-1"> Categoria </label>
                                        <div>
                                            <select id="category" className="input_field">
                                                <option value="profile">Profilo</option>
                                                <option value="feed">Bacheca</option>
                                                <option value="calendar">Calendario</option>
                                                <option value="chat">Chat</option>
                                                <option value="groups">Gruppi</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="ticketDescription" className="mt-1 mb-2"> Descrivi il problema </label>
                                        <textarea name="ticketDescription" id="ticketDescription" className="input_field"></textarea>
                                    </div>
                                    <div className="mt-8">
                                        <motion.button type="submit" className="btn"
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Inserisci
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