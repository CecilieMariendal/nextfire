
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
      
      <div className="card card-info">
        <h2>💡 Nice Going</h2>
        
        <p>Welcome to my little learning project! The app i build with <a href="https://nextjs.org/">Next.js</a>, <a href="https://reactjs.org/">React</a> and <a href="https://firebase.google.com/">Firebase</a>.</p>
        <p>
          Feel free to signup with google and try out the app. When you are signed in you can 📮 create posts and 💗 like content.
          Special thanks to <a href="https://fireship.io/">Fireship.io</a> for getting me started.
        </p>
      </div>

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
