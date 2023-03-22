import { prisma } from '../server/db/client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import LoginComponent from './login'
import styles from '../styles/Home.module.css'


export default function Home(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState(props.posts)

  useEffect(() => {
    setPosts(props.posts)
  }, [props.posts])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('/api/posts', { title, content })
    setPosts([...posts, res.data])
  }

  return (
    <main className={styles.mainBackground}>
      <div>
        <div className={styles.headingAlign}>
          <h1 className={styles.mainHeader}>Retro Bulletin Board</h1>
          <p className={styles.subHeading}>Welcome back to the 90's...</p>
        </div>

        <LoginComponent />

        <div className={styles.formCont}>
          <h2>Create a Post</h2>
          <form
            className={styles.formStyle}
            onSubmit={handleSubmit}>
            <input
              placeholder='Title'
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder='Content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              className={styles.formButton}
              type="submit">Submit</button>
          </form>
        </div>

        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany()

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}
