import styles from '../../styles/Post.module.css'
import { firestore, getUserWithUsername, postToJson } from "../../lib/firebase";

export const getStaticProps({params}) {
  const {userid, slug} = params;

  const userDoc = await getUserWithUsername(userid);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJson(await postRef.get());
    path = postRef.path;
  }

  return {
      props: {post, path},
      revalidate: 5000,
  }
}


export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const {slug, username} = doc.data();

    return {
      params: {username, slug},
    }
  });

  return {
    // must be in this format: paths: [{params: {username, slug}}],
    paths,
    fallback: 'blocking',
  }
}


export default function PostPage({}) {
    return (
      <main className={styles.container}>
      </main>
    )
  }
  