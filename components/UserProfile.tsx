import { useContext } from 'react';
import { UserContext } from '../lib/context';
import styles from '../styles/User.module.css'
import SignOutButton from './SignOutButton';

export default function UserProfile({user}) {
    const {username} = useContext(UserContext);

    return (
        <div className={styles.profile}>
            <img src="/placeholder.jpg" className="card-img-center" />
            <p className="username">@{user.username}</p>
            <h1>{user.displayName ?? 'Anonymous User'}</h1>

            {user.username === username && <SignOutButton/>}
        </div>
    );    
}