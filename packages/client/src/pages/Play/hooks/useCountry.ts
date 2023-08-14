import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'


const useCountry = () => {
  const [user_country, setCountry] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const geo = navigator.geolocation

    const onChange = (position: GeolocationPosition) => {
      getCountry(position).then(country => setCountry(country))
    }

    const onError = (error: GeolocationPositionError) => {
      setError(error.message)
    }

    if (!geo) {
      setError('Геолокация не поддерживается браузером')
      return
    }

    geo.getCurrentPosition(onChange, onError)
  }, [])

  return { user_country, error }
}

export default useCountry


interface CountryInfo {
  countryCode: string
}

const getCountry = async (position: GeolocationPosition) => {
  return axios
    .get(
      `http://api.geonames.org/countryCodeJSON?lat=${position.coords.latitude}&lng=${position.coords.longitude}&username=codebuster`
    )
    .then((result: AxiosResponse<CountryInfo>) => {
      return new Intl.DisplayNames('ru', { type: 'region' }).of(
        result.data.countryCode
      )
    })
    .catch(() => '')
}
