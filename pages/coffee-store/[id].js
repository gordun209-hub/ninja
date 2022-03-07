/* eslint-disable react-hooks/rules-of-hooks */
import cls from 'classnames'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import coffeStoreData from '../../data/coffee-stores.json'
import styles from '../../styles/coffee-store.module.css'

export function getStaticProps(staticProps) {
  const params = staticProps.params
  return {
    props: {
      coffeStore: coffeStoreData.find(coffeStore => {
        return coffeStore.id.toString() === params.id
      })
    }
  }
}
export function getStaticPaths() {
  return {
    paths: coffeStoreData.map(coffeStore => `/coffee-store/${coffeStore.id}`),
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

  const { imgUrl, address, name, neighbourhood } = coffeStore
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
            src={imgUrl}
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
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/nearMe.svg' width='24' height='24' />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src='/static/icons/star.svg' width='24' height='24' />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote
          </button>
          <p>{neighbourhood}</p>
        </div>
      </div>
    </div>
  )
}

export default coffeStore
