import Link from 'next/link';
import { useContext } from 'react';
import {ImUser} from 'react-icons/im'
import { UserContext } from '../lib/context';


export default function Navbar({}) {
    const {user, username} = useContext(UserContext);
    
    return (
      <nav className="navbar">
        <ul>
            <li>
                <Link href="/">
                    <button className="btn-logo">Feed</button>
                </Link>
            </li>

            {/* user is signed-in and has username */}
            {username && user && (
                <>
                <li>
                    <Link href="/admin">
                        <button className="btn-blue">Write a Post</button>
                    </Link>
                </li>
                <li>
                    <Link href={`/${username}`}>
                        <img src={user.portrait || '/placeholder.jpg'} alt="My user portait"/>
                    </Link>
                </li>
                </>
            )}

            {/* user is not signed OR has not created username */}
            {! username && (
                <li>
                    <Link href="/intro">
                        <button className="btn-blue">Sign in</button>
                    </Link>
                </li>
            )}
        </ul>
      </nav>
    )
}
  