import Link from "next/link";
import { auth } from '../../lib/firebase';
import AuthCheck from '../../components/AuthCheck';

export default function AdminPage({}) {


    return (
      <main>
        <AuthCheck>
          
        </AuthCheck>
      </main>
    )
  }
  