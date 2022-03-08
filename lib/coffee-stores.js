// initialize unsplash
import { createApi } from 'unsplash-js'

const unsplashApi = createApi({
  accessKey: 'cTq5FkyEcpFgImmtK2XXV7JLF8d3MLyHj3QIbNt0rCU'
})

const options = {
  method: 'GET',

  headers: {
    Accept: 'application/json',

    Authorization: 'fsq3Ce5OI1kNrM6rk8fBr9G/JljY0YFXvv/Ja8yLHZJiils='
  }
}
const getUrlForCoffeeStores = (latLong, limit, query) =>
  `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`
const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    perPage: 40
  })
  const unsplashResults = photos.response.results
  return unsplashResults.map(result => result.urls['small'])
}
export const fetchCoffeeStores = async (
  latLong = '41.8781%2C-87.6298',
  limit = 10
) => {
  const photos = await getListOfCoffeeStorePhotos()
  const response = await fetch(
    getUrlForCoffeeStores(latLong, limit, 'coffee store'),
    options
  )
  const data = await response.json()
  return data.results.map((result, index) => {
    return {
      name: result.name,
      id: result.fsq_id,
      address: result.location.address || '',
      neighborhood: result.location.neighborhood || location.cross_street || '',
      imgUrl: photos[index]
    }
  })
}
