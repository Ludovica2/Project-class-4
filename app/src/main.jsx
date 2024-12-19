import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import store from './store/index.js'
import { ToastContainer } from 'react-toastify';
import { RoleProvider } from './provider/Role.jsx';
import { SocketProvider } from './provider/Socket.jsx';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './provider/Language.jsx';


createRoot(document.getElementById('root')).render(
    <ReduxProvider store={store}>
        <BrowserRouter>
            <SocketProvider>
                <RoleProvider>
                    <LanguageProvider>
                        <App />
                        <Toaster position="top-right" />
                        <ToastContainer />
                    </LanguageProvider>
                </RoleProvider>
            </SocketProvider>
        </BrowserRouter>
    </ReduxProvider>
)