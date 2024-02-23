import { Box } from '@mui/system'

type Props = {
  children: React.ReactNode
}

// Renders the main chat area for a conversation,
// left of sidebar
export default function ConversationChat(props: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 'max-content',
      }}
    >
      {props.children}
    </Box>
  )
}
