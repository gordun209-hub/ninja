/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head'
import Image from 'next/image'

import Banner from '../components/Banner'
import Card from '../components/Card.jsx'
import { fetchCoffeStores } from '../lib/coffe-stores'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const coffeStoresData = await fetchCoffeStores()
  return {
    props: {
      coffeStoresData
    }
  }
}

export default function Home({ coffeStoresData }) {
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
          {coffeStoresData && (
            <>
              <h2 className={styles.heading2}>Torronto stores</h2>
              <div className={styles.cardLayout}>
                {coffeStoresData.map(coffeStor => {
                  return (
                    <Card
                      key={coffeStor.id}
                      name={coffeStor.name}
                      imgUrl={
                        coffeStor.imgUrl ||
                        'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
                      }
                      href={`/coffee-store/${coffeStor.id}`}
                      className={styles.card}
                    />
                  )
                })}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
