import styles from '../../styles/Post.module.css'
import PostContent from '../../components/PostContent';
import HeartButton from '../../components/HeartButton';
import AuthCheck from '../../components/AuthCheck';
import Link from 'next/link';
import { firestore, getUserWithUsername, postToJson } from "../../lib/firebase";
import { useDocumentData } from 'react-firebase-hooks/firestore';


export async function getStaticProps({params}) {
  const {userid, slug} = params;

  const userDoc = await getUserWithUsername(userid);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    const data = await postRef.get();    

    post = postToJson(data);
    path = postRef.path;
  }


  return {
      props: {post, path},
      revalidate: 5,
  }
}


export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const {slug, username} = doc.data();

    return {
      params: {
        userid: username,
        slug
      },
    };
  });

  return {
    // must be in this format: paths: [{params: {username, slug}}],
    paths,
    fallback: 'blocking',
  }
}


export default function PostPage(props) {  
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;
  

  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>💗 Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>
      </aside>
    </main>
  )
}
  