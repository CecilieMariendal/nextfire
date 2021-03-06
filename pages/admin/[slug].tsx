import styles from '../../styles/Admin.module.css';
import AuthCheck from '../../components/AuthCheck';
import ImageUploader from '../../components/ImageUploader';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { PostType } from '../../@types/post.type';


export default function AdminPostPage({}) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  )
}

function PostManager() {
  const [preview, setPreview] = useState(false);

  const router = useRouter()
  const {slug} = router.query;

  const querySlug = (typeof slug === 'string') ? slug : slug[0];

  const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(querySlug);
  const [post] = useDocumentDataOnce<PostType>(postRef);
  
  
  return (
    <main className={styles.container}>
      {post && (
        <>
        <section>
          <h1>{post.title}</h1>
          <p>ID: {post.slug}</p>

          <PostForm postRef={postRef} defaultValues={post} preview={preview} />
        </section>

        <aside>
          <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
          </aside>
        </>
      )}
    </main>
  )
}


function PostForm({ defaultValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch, formState, errors  } = useForm({ defaultValues, mode: 'onChange' });

  const {isValid, isDirty} = formState;

  const updatePost = async ({content, published}) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success('Post updated successfully!');
  }

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>

        <ImageUploader />

        <textarea name="content" ref={register({
          maxLength: {value: 1000, message: "Content is too long"},
          minLength: {value: 10, message: "Content is too short"},
          required: {value: true, message: "Content is required"}
        })}></textarea>

        {errors.content && <p className="text-danger">{errors.content.message}</p>}

        <fieldset>
          <input className={styles.checkbox} name="published" type="checkbox" ref={register} />
          <label>Published</label>
        </fieldset>

        <button type="submit" className="btn-green" disabled={! isValid || ! isDirty}>
          Save Changes
        </button>
      </div>
    </form>
  )
}
