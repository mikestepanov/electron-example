import Head from 'next/head'
import Typography from '@mui/material/Typography'
import Link from '../components/Link'
import SideBar from '../components/SideBar'
import ConversationChat from '../components/ConversationChat'
import { Box } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit'
import { Fab } from '@mui/material'

// Renders a page where the user can see their conversations
// with a sidebar on the left and the chat on the right
export default function Conversations() {
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
          <Fab color="secondary" aria-label="edit">
            <EditIcon />
          </Fab>
        </SideBar>
        <ConversationChat>
          <h1>chat</h1>
        </ConversationChat>
      </Box>
    </>
  )
}
