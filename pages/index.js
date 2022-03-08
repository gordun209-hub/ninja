/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect } from 'react'

import Banner from '../components/Banner'
import Card from '../components/Card.jsx'
import useTrackLocation from '../hooks/use-track-location'
import { fetchCoffeeStores } from '../lib/coffee-stores'
import { ACTION_TYPES, StoreContext } from '../store/context'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const coffeeStoresData = await fetchCoffeeStores()
  return {
    props: {
      coffeeStoresData
    }
  }
}
export default function Home() {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation()
  const handleOnClick = () => {
    handleTrackLocation()
  }
  const { dispatch, state } = useContext(StoreContext)
  const { coffeeStores, latLong } = state
  useEffect(async () => {
    if (latLong) {
      try {
        const fetchedCoffeeStores = await fetchCoffeeStores(
          latLong.replace(/\s/g, ''),
          30
        )
        dispatch({
          type: ACTION_TYPES.SET_COFFEE_STORES,
          payload: { coffeeStores: fetchedCoffeeStores }
        })
      } catch (error) {
        console.log({ error })
      }
    }
  }, [latLong])
  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>Coffe</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>Coffe Connoiseur</h1>
          <Banner
            buttonText={isFindingLocation ? 'locating' : 'wiev stores nearby'}
            onClick={handleOnClick}
          />
          {locationErrorMsg && <p>Something went wrong : {locationErrorMsg}</p>}
          <div className={styles.heroImage}>
            <Image src='/../public/hero-image.png' width={700} height={400} />
          </div>
          {coffeeStores.length > 0 && (
            <>
              <h2 className={styles.heading2}> stores near me</h2>
              <div className={styles.cardLayout}>
                {coffeeStores.map(coffeStor => {
                  console.log(coffeStor)
                  return (
                    <Card
                      key={coffeStor.id}
                      name={coffeStor.name}
                      imgUrl={coffeStor.imgUrl}
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
