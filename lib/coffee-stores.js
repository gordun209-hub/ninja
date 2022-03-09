// initialize unsplash
import { createApi } from 'unsplash-js'

const unsplashApi = createApi({
  accessKey: 'cTq5FkyEcpFgImmtK2XXV7JLF8d3MLyHj3QIbNt0rCU'
})

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`
}

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 40
  })
  const unsplashResults = photos.response.results || []
  return unsplashResults.map(result => result.urls['small'])
}

export const fetchCoffeeStores = async (
  latLong = '43.65267326999575,-79.39545615725015',
  limit = 8
) => {
  try {
    const photos = await getListOfCoffeeStorePhotos()
    const response = await fetch(
      getUrlForCoffeeStores(latLong, 'coffee stores', limit),
      {
        headers: {
          Authorization: 'fsq3JN5b2tD4cmB87vpF+4w7qLjTawCeJyJmIa9Kpis/pEw='
        }
      }
    )
    const data = await response.json()

    return (
      data.results.map((venue, idx) => {
        const neighbourhood = venue.location.neighborhood
        console.log(data, 'data')
        return {
          // ...venue,
          id: venue.fsq_id,
          address: venue.location.address || '',
          name: venue.name,
          neighbourhood:
            (neighbourhood && neighbourhood.length > 0 && neighbourhood[0]) ||
            venue.location.cross_street ||
            '',
          imgUrl: photos[idx]
        }
      }) || []
    )
  } catch (error) {
    console.log('Something went wrong fetching coffee stores', error)
    return []
  }
}
