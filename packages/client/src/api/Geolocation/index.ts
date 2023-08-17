import BaseApi from '../Base'
import { CountryInfo } from './types'

export class GeolocationApi extends BaseApi {
  constructor() {
    super({
      baseURL: 'http://api.geonames.org',
    })
  }

  getCountry(latitude: number, longitude: number) {
    return this.request
      .get<CountryInfo>(
        `/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=codebuster`
      )
      .then(result => {
        return new Intl.DisplayNames('ru', { type: 'region' }).of(
          result.data.countryCode
        )
      })
      .catch(() => '')
  }
}
