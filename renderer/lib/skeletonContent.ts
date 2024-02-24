import { Channels } from 'lib/types'

export const skeletonChannels: Channels = {
  skeleton: {
    isInDraft: false,
    isMultiUser: false,
    name: '0',
    imageURL: '/images/frost.jpg',
    messages: [],
  },
}

// populate the channels with loading messages
// fon loading state
Array.from({ length: 5 }).forEach((_, i) => {
  skeletonChannels[i] = {
    isInDraft: false,
    isMultiUser: false,
    name: i.toString(),
    imageURL: '/images/frost.jpg',
    messages: [],
  }
})
