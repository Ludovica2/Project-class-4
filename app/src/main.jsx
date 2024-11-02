import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import store from './store/index.js'
import { ToastContainer } from 'react-toastify';
 

createRoot(document.getElementById('root')).render(
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
            <ToastContainer />
        </BrowserRouter>
    </ReduxProvider>
)