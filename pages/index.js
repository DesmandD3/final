import { prisma } from '../server/db/client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import LoginComponent from './login'
import styles from '../styles/Home.module.css'
import React from "react";
import Lottie from "lottie-react";
import mario from "../public/mario.json";


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
       {/* <Lottie
            animationData={mario}
            loop={true}
            className={styles.marioStyle} /> */}

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

        <div className={styles.postBoard}>
          {posts.map((post) => (
            <div key={post.id} className={styles.postCard}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
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
