import styles from '../styles/Home.module.css'

import { useSession, signIn, signOut } from "next-auth/react"

import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

export default function LoginComponent() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <div className={styles.loginStyle}>
          Signed in as {session.user.email} <br />
          {session.user.name} <br />
          <img
            src={session.user.image}
            className={styles.profileImg}
          /> <br />
          <button
            className={styles.loginButton}
            onClick={() => signOut()}
            >Sign out</button>
        </div>
      </>
    )
  }
  return (
    <>
      <div className={styles.loginStyle}>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}