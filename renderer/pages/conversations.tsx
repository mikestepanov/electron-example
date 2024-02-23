import Head from 'next/head'
import Typography from '@mui/material/Typography'
import Link from '../components/Link'
import SideBar from '../components/SideBar'
import ConversationChat from '../components/ConversationChat'
import { Box } from '@mui/system'
import { SocketContext } from '../contexts/socketContext'
import { useContext, useEffect, useState } from 'react'
import { Channels, Users } from '../lib/types'
import { useAtom } from 'jotai'
import { selectedChannelIDAtom, usersAtom } from '../lib/jotai'
import { loadingChannels } from '../lib/loadingContent'

// Renders a page where the user can see their conversations
// with a sidebar on the left and the chat on the right
export default function Conversations() {
  const socket = useContext(SocketContext)

  const [users, setUsers] = useAtom(usersAtom)
  const [channels, setChannels] = useState<Channels>({})
  const [isLoading, setIsLoading] = useState(false)
  const [selectedChannelID, setSelectedChannelID] = useAtom(
    selectedChannelIDAtom
  )
  const selectedChannel =
    selectedChannelID != null && channels[selectedChannelID]
      ? channels[selectedChannelID]
      : loadingChannels[0]

  // when the server sends the conversations and users, we set them in the state
  socket?.on(
    'recieveConversationsAndUsers',
    ({ users, channels }: { users: Users; channels: Channels }) => {
      // default first channel to be selected
      setSelectedChannelID(Object.keys(channels)[0])
      setUsers(users)
      setChannels(channels)
      setIsLoading(false)
    }
  )

  // request the conversations and users from the server
  useEffect(() => {
    socket?.emit('requestConversationsAndUsers')
    setIsLoading(true)
  }, [])

  console.log('users', users)
  console.log('channels', channels)
  console.log('isLoading', isLoading)

  return (
    <>
      <Head>
        <title>Conversations</title>
      </Head>
      {/*TODO - for testing to remove later */}
      <Typography gutterBottom>
        <Link href="/home">Go to the home page</Link>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
        }}
      >
        <SideBar
          channels={isLoading ? loadingChannels : channels}
          isLoading={isLoading}
        />
        <ConversationChat channel={selectedChannel} isLoading={isLoading} />
      </Box>
    </>
  )
}
