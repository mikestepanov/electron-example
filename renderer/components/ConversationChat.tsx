import { Box } from '@mui/system'
import { Channel } from '../lib/types'
import { Skeleton, Typography } from '@mui/material'
import ConversationChatInput from './ConversationChatInput'

type Props = {
  channel: Channel
  isLoading: boolean
}

// Renders the main chat area for a conversation,
// right of the sidebar
export default function ConversationChat(props: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 'calc(100% - 420px)',
      }}
    >
      {/* TODO - adjust after testing */}
      <Box sx={{ height: 'calc(100% - 120px)' }}>
        {props.channel.messages.map((message, index) => {
          return (
            <Box key={index}>
              {props.isLoading ? (
                <Skeleton variant="rectangular" width={210} height={60} />
              ) : (
                <Typography>{message.message}</Typography>
              )}
            </Box>
          )
        })}
        {props.channel.isGettingNewComment && (
          <Typography>Loading new message...</Typography>
        )}
      </Box>
      <ConversationChatInput />
    </Box>
  )
}
