import styles from '../styles/User.module.css'

export default function UserProfile({user}) {
    return (
        <div className={styles.profile}>
            <img src="/placeholder.jpg" className="card-img-center" />
            <p className="username">@{user.username}</p>
            <h1>{user.displayName ?? 'Anonymous User'}</h1>
        </div>
    );    
}