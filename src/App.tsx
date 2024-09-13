import { PrimeReactProvider } from 'primereact/api';
import './App.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";

import NavBar from './components/navBar';
import 'primeicons/primeicons.css';
import UserLandingPage from './screens/userLandingPage';
import { AuthProvider, useAuth } from './context/authContext';
import AdminLandingPage from './screens/adminLandingPage';
import { Message } from 'primereact/message';

function App() {


  return (
    <>
      <PrimeReactProvider>
        <AuthProvider>
          <div className='flex justify-content-center p-2'>
            <Message text="This is a demo version of a live client project, created to showcase functionality and design !!" />
          </div>
          {/* <hr /> */}
          <LandinPage />
        </AuthProvider>
      </PrimeReactProvider>
    </>
  )
}

const LandinPage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <NavBar />
      {isLoggedIn ? (<>
        <AdminLandingPage />
      </>) : (<>
        <UserLandingPage />
      </>)}

    </>
  )
}

export default App
