
import PostFeed from '../components/PostFeed';
import Loader from '../components/Loader';
import MetaTags from '../components/MetaTags';
import { firestore, fromMillisecounds, postToJson } from '../lib/firebase';

import { useState } from 'react';

const LIMIT = 1

export async function getServerSideProps(context) {
  const postQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

    const posts = (await postQuery.get()).docs.map(postToJson);

    return {
      props: {posts},
    }
}


export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);

  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);

    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillisecounds(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);
    
    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false)

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  }
  
  return (
    <main>
      <MetaTags title="Home Page" description="Get the latest posts on our site" />

      <PostFeed posts={posts}/>

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load more</button>
      )}
      
      <Loader show={loading}/>

      {postsEnd && (
        <p>You have reached the end!</p>
      )}
    </main>
  )
}
