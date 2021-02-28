import { Toaster } from 'react-hot-toast'
import { UserContext } from '../lib/context'
import Navbar from '../components/Navbar'
import { useUserData } from '../lib/hooks'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  const userDate = useUserData();
  
  return (
    <UserContext.Provider value={userDate}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  )
}

export default MyApp
