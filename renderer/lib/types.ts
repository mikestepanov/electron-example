export type Message = {
  id: string
  userID: string
  message: string
  timestamp: string
}

export type Channel = { isGettingNewComment: boolean; messages: Array<Message> }

export type Channels = {
  [key: string]: Channel
}

export type User = {
  id: string
  name: string
  lastName: string
  phoneNumber: string
  imageURL: string
}

export type Users = {
  [key: string]: User
}
