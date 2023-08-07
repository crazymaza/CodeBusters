export type OAuthRequestServiceParams = {
  redirect_uri: string
}

export type OAuthRequestParams = {
  code: string
  redirect_uri: string
}

export type OAuthResponseService = {
  service_id: string
}
