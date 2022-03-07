/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head'
import Image from 'next/image'

import Banner from '../components/Banner'
import styles from '../styles/Home.module.css'

export default function Home() {
  const handleOnClick = () => {
    console.log('hi banner')
  }
  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>Coffe</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>Coffe Connoiseur</h1>
          <Banner buttonText='View stores nearby' onClick={handleOnClick} />
          <div className={styles.heroImage}>
            <Image src='/../public/hero-image.png' width={700} height={400} />
          </div>
        </main>
      </div>
    </div>
  )
}
