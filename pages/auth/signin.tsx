import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '@/lib/firebase_init';
import { query, collection, where, getDocs } from 'firebase/firestore';
import credentials from 'next-auth/providers/credentials';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email, password)
    
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    console.log(email, password)
    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data();
    console.log(user)
    if (querySnapshot.empty) {
      return null;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    console.log(result)

    if (result?.ok) {
      router.push('/');
    } else {
      alert('ログインに失敗しました。');
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
