import { GeolocationApi } from '@/api/Geolocation'
import { useEffect, useState } from 'react'

const useCountry = () => {
  const [userCountry, setCountry] = useState('')
  const [error, setError] = useState('')
  const geolocationAPI = new GeolocationApi()

  useEffect(() => {
    const geo = navigator.geolocation

    const onChange = (position: GeolocationPosition) => {
      geolocationAPI
        .getCountry(position.coords.latitude, position.coords.longitude)
        .then(country => {
          if (country) {
            setCountry(country)
          }
        })
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

  return { userCountry, error }
}

export default useCountry
