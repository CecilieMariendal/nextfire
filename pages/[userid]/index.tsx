import PostFeed from "../../components/PostFeed";
import UserProfile from "../../lib/UserProfile";
import { getUserWithUsername, postToJson } from "../../lib/firebase";


export async function getServerSideProps({ query }) {
  const {userid} = query;

  const userDoc = await getUserWithUsername(userid);
  
  // If no user, short circuit to 404 page
  if (! userDoc) {
    return {
      notFound: true,
    };
  }

  let user = userDoc.data();
  let posts = null;

  const postsQuery = userDoc.ref
    .collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(5)

  posts = (await postsQuery.get()).docs.map(postToJson);

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}


export default function UserProfilePage({user, posts}) {
  return (
    <main>
      <UserProfile user={user}/>
      <PostFeed posts={posts}/>
    </main>
  )
}
  