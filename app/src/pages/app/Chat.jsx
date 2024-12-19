import React, { useEffect, useRef, useState } from 'react';
import { motion } from "framer-motion"
import { FaSearch } from 'react-icons/fa';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import SDK from '../../SDK';
import { addMessage, readMessage, setRooms } from '../../store/slices/chatSlice';
import ChatIsWriting from '../../components/shared/app/ChatIsWriting';
import { toast } from 'react-toastify';
import { formatDistance } from 'date-fns';
import { it } from 'date-fns/locale';
import { useSocket } from '../../provider/Socket';
import { useDictionary } from "../../provider/Language";


const Chat = () => {
    const dispatch = useDispatch();
    const [dictionary] = useDictionary()
    const socket = useSocket();
    const { token, user } = useSelector(state => state.auth);
    const rooms = useSelector(state => state.chat.rooms);
    const [activeRoom, setActiveRoom] = useState(null);
    const { active: isOpenOptionsMenu, setActive: setIsOpenOptionsMenu, elRef: optionsRef } = useClickOutside(false);

    const inputRef = useRef();
    const messagesRef = useRef();

    const scrollMessagesToBottom = () => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }

    const toggleOptionsChat = () => {
        setIsOpenOptionsMenu(true);
    }

    const fetchRooms = async () => {
        // fetch rooms from the server
        const rooms = await SDK.chat.getRooms(token);

        dispatch(setRooms(rooms));
    }

    const handleSendMessage = async (event) => {
        event.preventDefault();

        const { message } = Object.fromEntries(new FormData(event.target));

        if (!message) return;
        
        try {
            const _message = await SDK.chat.createMessage(activeRoom.roomId, { to: activeRoom.roomUser._id, message }, token);

            dispatch(addMessage({ room_id: activeRoom.roomId, message: _message }));

            inputRef.current.value = "";
        } catch(error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        document.title = "Chat - Found!";

        fetchRooms();
    }, []);

    useEffect(() => {
        scrollMessagesToBottom();
    }, [rooms, activeRoom])
    
    useEffect(() => {
        if (activeRoom) {
            socket.emit("read-messages", { room: activeRoom.roomId });
            dispatch(readMessage({ room_id: activeRoom.roomId, to: user._id }));
        }
    }, [activeRoom])

    return (
        <div className='flex justify-center'>
            <div className='flex max-w-[1480px] h-screen w-full shadow'>
                <div className='sm:w-1/4 w-full bg-white overflow-y-auto border-r-[1px]'>
                    <div className='flex items-center bg-slate-100 dark:bg-elements_dark p-2 w-11/12 mx-auto mt-4 rounded-md mb-1 border'>
                        <FaSearch />
                        <input className='bg-transparent p-2 w-full focus:outline-none' placeholder={dictionary.chat.FIND} />
                    </div>
                    { /* Chat list */ }
                    {rooms.map(({ _id, users, messages }) => {
                        const roomUser = users.find(u => u._id != user._id);
                        const name = roomUser.role === "user" ? `${roomUser.first_name} ${roomUser.last_name}` : roomUser.metadata.company_name
                        
                        return (
                            <div onClick={() => setActiveRoom({ roomId: _id, roomUser })} key={_id} className={`flex items-center p-4 hover:bg-gradient-to-r from-secondaryColor via-[#D1D7F0] to-white rounded-xl cursor-pointer${activeRoom?.roomUser._id == roomUser._id ? " bg-gradient-to-r" : ""}`}>
                                <img crossOrigin="anonymous" className='h-10 w-10 rounded-full object-cover hidden md:block' src={`${roomUser.avatar}?token=${token}`} alt={`Profile picture of ${name}`} />
                                <div className='ml-4 flex-1'>
                                    <p className='text-sm font-semibold'>{name}</p>
                                </div>
                                    {
                                        messages && Array.isArray(messages) && messages.filter((m) => m.to._id == user._id && m.is_read == false).length != 0 && (
                                            <div className='flex items-center justify-center rounded-full bg-primaryColor text-xs w-5 h-5 text-center text-white font-bold'>
                                                {messages.filter((m) => m.to._id == user._id && m.is_read == false).length}
                                            </div>
                                        )
                                    }
                            </div>
                        );
                    })}
                </div>
                <div className='flex-1 flex flex-col'>
                    <div className='p-4 flex items-center border-b justify-between'>
                        <div className='flex items-center'>
                            {
                                activeRoom ? (
                                    <>
                                        <img className='h-10 w-10 rounded-full object-cover' src={`${activeRoom.roomUser.avatar}?token=${token}`} alt={`Profile picture of ${activeRoom.roomUser.first_name} ${activeRoom.roomUser.last_name}`} />
                                        <span className='ml-4'>{dictionary.chat.WITH} {
                                            activeRoom.roomUser.role === "user" ? `${activeRoom.roomUser.first_name} ${activeRoom.roomUser.last_name}` : activeRoom.roomUser.metadata.company_name
                                        }</span>
                                    </>
                                ) : (
                                    <>
                                        <span className='ml-4'>{dictionary.chat.START}</span>
                                    </>
                                )
                            }
                        </div>
                        <div className='flex'>
                            <div className="p-2 mr-2 justify-center relative cursor-pointer" onClick={toggleOptionsChat}>
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                {isOpenOptionsMenu && (
                                    <motion.div ref={optionsRef} className="flex flex-col absolute top-9 right-2 px-2 w-64 bg-white border border-slate-100 z-10"
                                        initial={{ y: -8 }}
                                        animate={{ y: "calc(0vw + 5%)" }}
                                    >
                                        <button className='flex mt-2 border-b border-b-slate-100 group'>
                                            <div>
                                                <i className="fa-solid fa-eraser text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                            </div>
                                            <div className='flex flex-col ml-2'>
                                                <h3 className='text-sm font-semibold text-start'>{dictionary.chat.CLEAN}</h3>
                                                <span className='mb-2 text-xs text-text_secondaryColor group-hover:text-secondaryColor_Hover'>{dictionary.chat.CLEAN_CHAT}</span>
                                            </div>
                                        </button>
                                        <button className='flex mt-2 border-b border-b-slate-100 group'>
                                            <div>
                                                <i className="fa-solid fa-ban text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                            </div>
                                            <div className='flex flex-col ml-2'>
                                                <h3 className='text-sm font-semibold text-start'>{dictionary.chat.REPORT}</h3>
                                                <span className='mb-2 text-xs text-text_secondaryColor text-start group-hover:text-secondaryColor_Hover'>{dictionary.chat.REPORT_ACC}</span>
                                            </div>
                                        </button>
                                        <button className='flex mt-2 border-b border-b-slate-100 group'>
                                            <div>
                                                <i className="fa-regular fa-circle-xmark text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                            </div>
                                            <div className='flex flex-col ml-2'>
                                                <h3 className='text-sm font-semibold text-start'>{dictionary.chat.DELETE}</h3>
                                                <span className='mb-2 text-xs text-text_secondaryColor text-start group-hover:text-secondaryColor_Hover'>{dictionary.chat.DELETE_CHAT}</span>
                                            </div>
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div ref={messagesRef} className='flex-1 p-4 overflow-auto bg-slate-100'>
                        { /* Chat messages */}
                        {activeRoom && rooms.find(({ _id }) => _id == activeRoom.roomId)?.messages.map(message => (
                            <div key={message._id} className={`flex ${message.from._id === user._id ? 'justify-end' : 'justify-start'}`}>
                                <div className={`rounded-lg px-6 py-2 ${message.from._id === user._id ? 'bg-primaryColor text-white' : 'bg-slate-200'} my-1`}>
                                    <p>{message.message}</p>
                                    <span className='text-[12px]'>{formatDistance(message.createdAt, new Date())}</span>
                                </div>
                            </div>
                        ))}
                        { /* <ChatIsWriting /> */ }
                    </div>
                    <form className='p-4 flex' onSubmit={handleSendMessage}>
                        <input ref={inputRef} disabled={!activeRoom} name="message" className='flex-1 border p-2 rounded-lg focus:border-transparent focus:outline-transparent disabled:opacity-60' type='text' placeholder='Scrivi un messaggio...' required />
                        <button disabled={!activeRoom} className='ml-2 bg-primaryColor px-4 rounded-lg disabled:opacity-60'>
                            <i className="fa-regular fa-paper-plane text-white"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;
