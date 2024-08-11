import { PrimeReactProvider } from 'primereact/api';
import './App.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";

import NavBar from './components/navBar';
import 'primeicons/primeicons.css';
import UserLandingPage from './screens/userLandingPage';
import { AuthProvider, useAuth } from './context/authContext';
import AdminLandingPage from './screens/adminLandingPage';

function App() {


  return (
    <>
      <PrimeReactProvider>
        <AuthProvider>
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
