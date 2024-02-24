import { Channels } from './types'

export const loadingChannels: Channels = {
  0: {
    isInDraft: false,
    isMultiUser: false,
    name: '0',
    imageURL: '0',
    messages: [],
  },
}

// populate the channels with loading messages
// fon loading state
Array.from({ length: 5 }).forEach((_, i) => {
  loadingChannels[i] = {
    isInDraft: false,
    isMultiUser: false,
    name: i.toString(),
    imageURL: i.toString(),
    messages: [],
  }
})
