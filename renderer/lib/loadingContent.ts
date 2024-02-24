import { Channels } from './types'

export const loadingChannels: Channels = {}

// populate the channels with loading messages
// fon loading state
Array.from({ length: 16 }).forEach((_, i) => {
  loadingChannels[i] = {
    isInDraft: false,
    isMultiUser: false,
    name: i.toString(),
    imageURL: i.toString(),
    messages: [],
  }
})
