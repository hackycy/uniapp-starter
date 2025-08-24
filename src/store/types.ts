export interface UserProfile {
  uid: string
  unionid?: string
  avatar?: string
  nickname?: string
  openid?: string
  [x: string]: any
}

export interface UserState {
  token?: string
  profile?: UserProfile
}
