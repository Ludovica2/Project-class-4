import React, { useEffect } from 'react';
import { motion } from "framer-motion"
import { FaSearch } from 'react-icons/fa';
import { useClickOutside } from '../../hooks/useClickOutside';

function Chat() {
    const { active: isOpenOptionsMenu, setActive: setIsOpenOptionsMenu, elRef: optionsRef} = useClickOutside(false)
    const dummyData = {
        contacts: [
            { id: 1, name: 'John Doe', message: 'Hey there!', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww', isOnline: true },
            { id: 2, name: 'Jane Smith', message: 'How are you?', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww', isOnline: false },
            { id: 3, name: 'Morne Taylor', message: 'Bye, Good night', avatar: 'https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww', isOnline: false },
            { id: 4, name: 'Natasha Engineer', message: "Let's catch up ", avatar: 'https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww', isOnline: false },
            { id: 5, name: 'Victoria Ashes', message: 'Completed.', avatar: 'https://images.unsplash.com/photo-1520295187453-cd239786490c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww', isOnline: false },
        ],
        chats: [
            { id: 1, message: 'Hello!', timestamp: '10:00 AM', type: 'received' },
            { id: 2, message: 'Hi, how are you?', timestamp: '10:02 AM', type: 'sent' },
            { id: 3, message: "I'm fine. What about you?", timestamp: '10:03 AM', type: 'received' },
            { id: 4, message: "I'm also fine", timestamp: '10:04 AM', type: 'sent' },
            { id: 5, message: "I'm getting error in my code", timestamp: '10:05 AM', type: 'received' },
            { id: 6, message: 'Send me the code, I will look it into it', timestamp: '10:02 AM', type: 'sent' },
        ]
    };

    const toggleOptionsChat = () => {
        setIsOpenOptionsMenu(true);
    }

    useEffect(() => {
            document.title = "Chat - Found!";
    }, []);

    return (
        <div className='flex w-full h-screen'>
            <div className='w-1/6 bg-primayColor text-white overflow-auto'>
             <div className='flex items-center bg-white p-2 w-11/12 mx-auto mt-4 rounded-md mb-1'>
            <FaSearch />
            <input className='bg-transparent p-2 w-full focus:outline-none' placeholder='Cerca persona...' />
          </div>
                {dummyData.contacts.map(contact => (
                    <div key={contact.id} className='flex items-center p-4 hover:bg-primayColor_Hover cursor-pointer'>
                        <img className='h-10 w-10 rounded-full object-cover' src={contact.avatar} alt={`Profile picture of ${contact.name}`} />
                        <div className='ml-4'>
                            <p>{contact.name}</p>
                            <p className='text-white'>{contact.message}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex-1 flex flex-col'>
                <div className='p-4 flex items-center border-b'>
                  <img className='h-10 w-10 rounded-full object-cover' src={'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fHww'} alt={`Profile picture of john doe`} />

                    <span className='ml-4'>Chat con John Doe</span>
                    <div className='flex'>
                        <div className="p-2 mr-2 justify-center relative cursor-pointer" onClick={toggleOptionsChat}>
                            <i className="fa-solid fa-ellipsis"></i>
                            {
                                isOpenOptionsMenu && (
                                    <motion.div ref={optionsRef} className="flex flex-col absolute top-9 -left-3 px-2 w-64 bg-white border border-slate-100 z-10"
                                        initial={{ y: -8 }}
                                        animate={{ y: "calc(0vw + 5%)" }}
                                    >
                                        <button className='flex mt-2 border-b border-b-slate-100 group'>
                                            <div>
                                                <i className="fa-solid fa-eraser text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                            </div>
                                            <div className='flex flex-col ml-2'>
                                                <h3 className='text-sm font-semibold text-start'>Svuota Chat</h3>
                                                <span className='mb-2 text-xs text-text_secondaryColor group-hover:text-secondaryColor_Hover'>Pulisci la chat</span>
                                            </div>
                                        </button>
                                        <button className='flex mt-2 border-b border-b-slate-100 group'>
                                            <div>
                                                <i className="fa-solid fa-ban text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                            </div>
                                            <div className='flex flex-col ml-2'>
                                                <h3 className='text-sm font-semibold text-start'>Segnala e Blocca</h3>
                                                <span className='mb-2 text-xs text-text_secondaryColor text-start group-hover:text-secondaryColor_Hover'>Segnala e blocca l'utente</span>
                                            </div>
                                        </button>
                                        <button className='flex mt-2 border-b border-b-slate-100 group'>
                                            <div>
                                                <i className="fa-regular fa-circle-xmark text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                            </div>
                                            <div className='flex flex-col ml-2'>
                                                <h3 className='text-sm font-semibold text-start'>Elimina la chat</h3>
                                                <span className='mb-2 text-xs text-text_secondaryColor text-start group-hover:text-secondaryColor_Hover'>Elimina definitivamente la chat</span>
                                            </div>
                                        </button>
                                    </motion.div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='flex-1 p-4 overflow-auto'>
                    {dummyData.chats.map(chat => (
                        <div key={chat.id} className={`flex ${chat.type === 'sent' ? 'justify-end' : 'justify-start'}`}> 
                            <div className={`rounded-lg px-6 py-2 ${chat.type === 'sent' ? 'bg-primayColor text-white' : 'bg-secondaryColor'} my-1`}>
                                <p>
                                {chat.message}
                                </p>
                               <span className='text-[12px]'> {chat.timestamp}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='p-4 flex'>
                    <input className='flex-1 border p-2 rounded-lg focus:outline-none' type='text' placeholder='Scrivi un messaggio...' />
                    <button className='ml-2 bg-primayColor px-4 rounded-lg'><i class="fa-regular fa-paper-plane  text-white"></i></button>
                </div>
            </div>
        </div>
    );
}

export default Chat;