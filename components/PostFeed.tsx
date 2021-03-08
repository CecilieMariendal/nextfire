import Link from 'next/link';
import { PostType } from '../@types/post.type';
import styles from '../styles/PostFeed.module.css'


export default function PostFeed({ posts, admin = false }) {
    return (posts) ? posts.map((post) => <PostItem post={post} key={post.slug} admin={admin} />) : null;
}


function PostItem({ post, admin = false }: { post: PostType, admin: boolean }) {
    // Word count and read time
    const wordCount = post?.content.trim().split(/\s+/g).length;
    const minutesToRead = (wordCount / 100 + 1).toFixed(0);


    return (
        <Link href={`/${post.username}/${post.slug}`}>
            <a className={styles.card}>
                <h2>{post.title}</h2>
                <footer>
                    <span>{minutesToRead} minutes read</span>
                    <span className="hearts">💗 {post.heartCount || 0} Likes</span>
                </footer>

                {/* If admin view, show extra controls for user */}
                {admin && (
                    <>
                        <Link href={`/admin/${post.slug}`}>
                            <h3>
                                <button className="btn-blue">Edit</button>
                            </h3>
                        </Link>

                        {post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
                    </>
                )}
            </a>
        </Link>
    );
}