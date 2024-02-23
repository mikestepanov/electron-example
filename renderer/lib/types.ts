export type Message = {
  id: string
  userID: string
  content: string
  timestamp: string
}

export type Channel = {
  isInDraft: boolean
  isMultiUser: boolean
  name: string
  imageURL: string
  messages: Array<Message>
}

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
