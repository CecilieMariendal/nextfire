import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';


export default function Navbar() {
    const {user, username} = useContext(UserContext);
    const [isAtTop, setIsAtTop] = useState(true);
    
    useEffect(() => {
        const navbarHeight = document.querySelector('nav.navbar').clientHeight;
        const handleScroll = () => {
            setIsAtTop(document.documentElement.scrollTop < navbarHeight);
        }

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    
    return (
        
      <nav className={'navbar ' + (isAtTop ? '' : 'fixed')}>
        <ul>
            <li className="logo">
                <Link href="/">
                  Feed
                </Link>
            </li>

            {username && user && (
                <>
                <li className="link">
                    <Link href="/admin">
                        Write a Post
                    </Link>
                </li>
                <li>
                    <Link href={`/${username}`}>
                        <>
                        <img src={user.portrait || '/placeholder.jpg'} alt="My user portait"/>
                        <div>
                            <span>{user.displayName}</span>
                            <span className="username">@{username}</span>
                        </div>
                        </>
                    </Link>
                </li>
                </>
            )}

            {! username && (
                <li className="link">
                    <Link href="/intro">
                        Sign in
                    </Link>
                </li>
            )}
        </ul>
      </nav>
    );
}
  