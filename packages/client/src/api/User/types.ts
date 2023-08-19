export interface SigninData {
  login: string
  password: string
}

export interface SignupData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface UserInfo {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export interface UserAuthOptions {
  isOauth?: boolean
}

export interface UserUpdateModel {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

export type OAuthRequestServiceParams = {
  redirect_uri: string
}

export type OAuthRequestParams = {
  code: string
}

export type OAuthResponseService = {
  service_id: string
}
