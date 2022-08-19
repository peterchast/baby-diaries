import styles from '@styles/PostList.module.css'
import Image from 'next/image'

export default function PostList({ posts }) {

  return (
    <div className={styles.postlist}>
      {!posts && <div>No posts!</div>}
      <div className={styles.diarylist}>
        {posts.map((post) => {

          const prettyDesc = post.desc.replace("Multimedia Message ", '')

          const prettyDate = new Date(post.due).toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          })

          const shimmer = (w, h) => `
            <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs>
                <linearGradient id="g">
                  <stop stop-color="#EBEBEB" offset="20%" />
                  <stop stop-color="#E0E0E0" offset="50%" />
                  <stop stop-color="#EBEBEB" offset="70%" />
                </linearGradient>
              </defs>
              <rect width="${w}" height="${h}" fill="#EBEBEB" />
              <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
              <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
            </svg>`

          const toBase64 = (str) =>
            typeof window === 'undefined'
              ? Buffer.from(str).toString('base64')
              : window.btoa(str);


          return (
            <div key={post.id} className={styles.diaryentry}>
              <div className={styles.entrytext}>
                <span className={styles.entrydate} dateTime={post.due}>{prettyDate} - </span> <p>{prettyDesc} </p>
              </div>
              <div className={styles.entryphotos}>
                <figure>
                  <Image
                    alt=""
                    src="https://images.unsplash.com/photo-1657299156725-dc862fea3e11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(32, 32))}`}
                    layout='fill'
                    objectFit='cover'
                  />
                </figure>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}