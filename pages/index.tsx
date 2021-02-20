import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Loader from '../components/loader';
import toast from 'react-hot-toast';


export default function Home() {
  return (
    <div>
      <Loader show />
      <button onClick={() => toast.success('Cheers')}>
        Toast
      </button>
    </div>
  )
}
