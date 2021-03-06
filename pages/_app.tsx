import '../styles/globals.css'
import Navbar from '../components/Navbar'
import {Toaster} from 'react-hot-toast'
import {UserContext} from '../lib/context'
import {useUserData} from '../lib/hooks'


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
