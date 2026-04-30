
import './App.css'
import MainPage from './pages/MainPage.js'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import OrdersPage from './pages/OrdersPage'
import OrderPage from './pages/OrderPage.js'
import ProfilePage from './pages/ProfilePage'
import ChatsPage from './pages/ChatsPage'
import ChatPage from './pages/ChatPage'

import { Route, Routes} from 'react-router-dom'
import { Toaster } from 'sonner'

function App() {
  return <>
  <Toaster position="top-right" richColors />
  <Routes>
    <Route path='/' element={<MainPage/>}/>
    <Route path='/signup' element={<RegistrationPage/>}/>
    <Route path='/signin' element={<LoginPage/>}/>
    <Route path='/works' element={<OrdersPage/>}/>
    <Route path='/order/:id' element={<OrderPage/>}/>
    <Route path='/profile' element={<ProfilePage/>}/>
    <Route path='/chats' element={<ChatsPage/>}/>
    <Route path='/chat/:id' element={<ChatPage/>}/>
  </Routes>
  </>
}

export default App
