import Head from 'next/head'
import Typography from '@mui/material/Typography'
import Link from '../components/Link'
import SideBar from '../components/SideBar'
import ConversationChat from '../components/ConversationChat'
import { Box } from '@mui/system'
import { Fab } from '@mui/material'
import { SocketContext } from '../contexts/socketContext'
import { useContext, useEffect, useState } from 'react'
import EditSection from '../components/EditSection'

// Renders a page where the user can see their conversations
// with a sidebar on the left and the chat on the right
export default function Conversations() {
  const socket = useContext(SocketContext)

  const [users, setUsers] = useState([])
  const [channels, setChannels] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // when the server sends the conversations and users, we set them in the state
  socket?.on('recieveConversationsAndUsers', ({ users, channels }) => {
    setUsers(users)
    setChannels(channels)
    setIsLoading(false)
  })

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
        <SideBar>
          <h1>sidebar</h1>
          <EditSection />
        </SideBar>
        <ConversationChat>
          <h1>chat</h1>
        </ConversationChat>
      </Box>
    </>
  )
}
