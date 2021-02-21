import Link from "next/link";
import { auth } from '../../lib/firebase';

export default function AdminPage({}) {


    return (
      <main>
        <Link href="/intro">
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </Link>
      </main>
    )
  }
  