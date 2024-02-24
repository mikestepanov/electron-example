import { Box } from '@mui/system'
import { useAtom, useSetAtom } from 'jotai'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'

import ConversationChatContainer from 'components/ConversationChatContainer'
import SideBar from 'components/SideBar'

import { SocketContext } from 'contexts/socketContext'

import { selectedChannelIDAtom, usersAtom } from 'lib/jotai'
import { skeletonChannels } from 'lib/skeletonContent'
import { Channel, Channels, Users } from 'lib/types'

// Renders a page where the user can see their conversations
// with a sidebar on the left and the chat on the right
export default function Conversations() {
  const socket = useContext(SocketContext)

  const setUsers = useSetAtom(usersAtom)
  const [channels, setChannels] = useState<Channels>({})
  const [isLoading, setIsLoading] = useState(false)
  const [selectedChannelID, setSelectedChannelID] = useAtom(
    selectedChannelIDAtom,
  )
  // get the selected channel from the state
  // otherwise, get a temporary sksleton channel
  const selectedChannel =
    selectedChannelID != null && channels.hasOwnProperty(selectedChannelID)
      ? channels[selectedChannelID]
      : skeletonChannels['skeleton']

  // when the server sends the conversations and users, we set them in the state
  socket?.on(
    'recieveConversationsAndUsers',
    ({ users, channels }: { users: Users; channels: Channels }) => {
      // if there are no channels, we set the selected the first channel
      if (selectedChannelID == null) {
        setSelectedChannelID(Object.keys(channels)[0])
      }
      setUsers(users)
      setChannels(channels)
      setIsLoading(false)
    },
  )

  // when the server sends a new message, we update the channel in the state
  socket?.on('channelUpdate', (channelID: string, channel: Channel) => {
    setChannels((prevChannels) => ({ ...prevChannels, [channelID]: channel }))
  })

  // request the conversations and users from the server
  useEffect(() => {
    socket?.emit('requestConversationsAndUsers')
    setIsLoading(true)
  }, [])

  return (
    <>
      <Head>
        <title>Conversations</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
          width: '100%',
        }}
      >
        <SideBar
          channels={isLoading ? skeletonChannels : channels}
          isLoading={isLoading}
        />
        <ConversationChatContainer
          channel={selectedChannel}
          isLoading={isLoading}
        />
      </Box>
    </>
  )
}
