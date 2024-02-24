import { Box } from '@mui/system'
import { Channel } from '../lib/types'
import { Typography } from '@mui/material'
import ConversationChatInput from './ConversationChatInput'
import { SocketContext } from '../contexts/socketContext'
import { useContext } from 'react'
import { useAtomValue } from 'jotai'
import { selectedChannelIDAtom, userIDAtom } from '../lib/jotai'
import ChatTextbox from './ChatTextbox'
import ConversationHeader from './ConversationHeader'

type Props = {
  channel: Channel
  isLoading: boolean
}

// Renders the main chat area for a conversation,
// right of the sidebar
export default function ConversationChat(props: Props) {
  const selectedChannelID = useAtomValue(selectedChannelIDAtom)
  const userID = useAtomValue(userIDAtom)
  const socket = useContext(SocketContext)

  // sends a message to the server to the selected channel
  const handleSendMessage = (content: string) => {
    socket?.emit('sendMessage', {
      userID: userID,
      channelID: selectedChannelID,
      content,
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 'calc(100% - 360px)',
      }}
    >
      {/* TODO - adjust after testing */}
      <Box sx={{ height: 'calc(100% - 120px)' }}>
        <ConversationHeader
          channel={props.channel}
          isLoading={props.isLoading}
        />
        {props.channel.messages.map((message, index) => {
          return (
            <Box key={index}>
              <ChatTextbox
                inMultiUserChannel={props.channel.isMultiUser}
                message={message}
                isFromCurrentUser={message.userID === userID}
                isLoading={props.isLoading}
              />
            </Box>
          )
        })}
        {props.channel.isInDraft && (
          <Typography>Loading new message...</Typography>
        )}
      </Box>
      <ConversationChatInput
        isLoading={props.isLoading}
        onTyping={() => {}}
        onSendMessage={handleSendMessage}
      />
    </Box>
  )
}
