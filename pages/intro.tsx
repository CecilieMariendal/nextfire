import { useState, useContext, useCallback, useEffect } from 'react';
import { UserContext } from '../components/context';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { useUserData } from '../lib/hooks';
import debounce from 'lodash.debounce';
import toast from 'react-hot-toast';



export default function IntroPage({}) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      {(user) ? (! username) ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}
    </main>
  )
}


function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  }

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={'/google.png'} alt="Google logo"/>Sign in with Google
    </button>
  )
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>
}


function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const {user, username} = useUserData();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      // Ref both documents
      const userDoc = firestore.doc(`users/${user.uid}`);
      const usernameDoc = firestore.doc(`usernames/${formValue}`);

      // Commit as batch write
      const batch = firestore.batch();
      batch.set(usernameDoc, {uId: user.uid});
      batch.set(userDoc, {username: formValue, photoUrl: null, displayName: null});

      await batch.commit();
    } catch(error) {
    }
    
  };
  
  const onChange = (event) => {
    const val = event.target.value.toLowerCase();
    const regex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    setFormValue(val);
    setIsValid(false);

    if (val.length < 3) {
      setLoading(false);
    }

    if (regex.test(val)) {
      setLoading(true);
    }
  }


  useEffect(() => {
    checkUsername(formValue)
  }, [formValue])


  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const {exists} = await ref.get();

        setIsValid(! exists);
        setLoading(false);
      }
    }, 500),
    [],
  )


  return (
    ! username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input type="text" name="username" placeholder="My username" value={formValue} onChange={onChange}/>
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button type="submit" className="btn-green" disabled={! isValid}>
            Choose
          </button>

          <div>
              Username: {formValue}
              <br />
              Loading: {loading.toString()}
              <br />
              Username Valid: {isValid.toString()}
            </div>
        </form>
      </section>
    )
  );
}


function UsernameMessage({username, isValid, loading}) {
  if (loading) {
    return <p>Checking...</p>
  } else if (isValid) {
    return <p>{username} is available</p>
  } else if (username && ! isValid) {
    return <p>{username} is taken</p>
  } else {
    return <p></p>
  }
}