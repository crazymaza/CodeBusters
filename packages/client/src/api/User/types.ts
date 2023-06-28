export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

export interface UserRequest {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}
