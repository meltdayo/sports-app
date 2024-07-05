'use client'
import { db } from '@/lib/firebase_init';
import { getDocs, collection, query, where } from 'firebase/firestore';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {

        const q = query(collection(db, "users"), where("email", "==", credentials?.email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          return null;
        }

        const userDoc = querySnapshot.docs[0];
        const user = userDoc.data();

        if (user && user.password === credentials?.password) {
          return { id: user.id, email: user.email };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});
