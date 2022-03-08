/* eslint-disable react-hooks/rules-of-hooks */
import cls from 'classnames'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { fetchCoffeStores } from '../../lib/coffe-stores'
import styles from '../../styles/coffee-store.module.css'

export async function getStaticProps(staticProps) {
  const params = staticProps.params

  const coffeStores = await fetchCoffeStores()
  console.log(coffeStores, 'laaaaaaaaaaaaaaaaa')
  return {
    props: {
      coffeStore: coffeStores.find(coffeStore => {
        return coffeStore.id === params.id
      })
    }
  }
}
export async function getStaticPaths() {
  const coffeStores = await fetchCoffeStores()
  return {
    paths: coffeStores.map(coffeStore => `/coffee-store/${coffeStore.id}`),
    fallback: true
  }
}
const coffeStore = ({ coffeStore }) => {
  const router = useRouter()

  const handleUpvoteButton = () => {
    console.log('2')
  }
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  console.log(coffeStore)
  const { name, address, neighborhood } = coffeStore
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'>Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          ></Image>
        </div>
        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/places.svg' width='24' height='24' />
            <p className={styles.text}>{address}</p>
          </div>
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image src='/static/icons/nearMe.svg' width='24' height='24' />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/star.svg' width='24' height='24' />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote
          </button>
          <p>{neighborhood}</p>
        </div>
      </div>
    </div>
  )
}

export default coffeStore
