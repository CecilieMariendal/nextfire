import Link from 'next/link';

export default function Navbar({}) {
    const user = true;
    const username = true;

    return (
      <nav className="navbar">
        <ul>
            <li>
                <Link href="/">
                    <button className="btn-logo">Feed</button>
                </Link>
            </li>

            {/* user is signed-in and has username */}
            {username && (
                <>
                <li>
                    <Link href="/admin">
                        <button className="btn-blue">Write a Post</button>
                    </Link>
                </li>
                <li>
                    <Link href={`/${username}`}>
                        <img src={user?.portait} alt="My user portait"/>
                    </Link>
                </li>
                </>
            )}

            {/* user is not signed OR has not created username */}
            {username === null && (
                <li>
                    <Link href="/enter">
                        <button className="btn-blue">Sign in</button>
                    </Link>
                </li>
            )}
        </ul>
      </nav>
    )
}
  