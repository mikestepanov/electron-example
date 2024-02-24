import Head from 'next/head'
import SideBar from '../components/SideBar'
import { Box } from '@mui/system'
import { SocketContext } from '../contexts/socketContext'
import { useContext, useEffect, useState } from 'react'
import { Channel, Channels, Users } from '../lib/types'
import { useAtomValue, useSetAtom } from 'jotai'
import { selectedChannelIDAtom, usersAtom } from '../lib/jotai'
import { loadingChannels } from '../lib/loadingContent'
import ConversationChatContainer from '../components/ConversationChatContainer'

// Renders a page where the user can see their conversations
// with a sidebar on the left and the chat on the right
export default function Conversations() {
  const socket = useContext(SocketContext)

  const setUsers = useSetAtom(usersAtom)
  const [channels, setChannels] = useState<Channels>({})
  const [isLoading, setIsLoading] = useState(false)
  const selectedChannelID = useAtomValue(selectedChannelIDAtom)
  const selectedChannel =
    selectedChannelID != null && channels[selectedChannelID]
      ? channels[selectedChannelID]
      : loadingChannels[0]

  // when the server sends the conversations and users, we set them in the state
  socket?.on(
    'recieveConversationsAndUsers',
    ({ users, channels }: { users: Users; channels: Channels }) => {
      setUsers(users)
      setChannels(channels)
      setIsLoading(false)
    }
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
          channels={isLoading ? loadingChannels : channels}
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
