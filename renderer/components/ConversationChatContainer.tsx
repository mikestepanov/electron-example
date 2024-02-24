import { Box } from '@mui/system'
import { Channel } from '../lib/types'
import ConversationChatInput from './ConversationChatInput'
import { SocketContext } from '../contexts/socketContext'
import { useContext, useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { selectedChannelIDAtom, userIDAtom } from '../lib/jotai'
import ConversationHeader from './ConversationHeader'
import ConversationChat from './ConversationChat'

type Props = {
  channel: Channel
  isLoading: boolean
}

// Renders conversation header, chat area and chat input
export default function ConversationChatContainer(props: Props) {
  const selectedChannelID = useAtomValue(selectedChannelIDAtom)
  const userID = useAtomValue(userIDAtom)
  const socket = useContext(SocketContext)
  const [isTyping, setIsTyping] = useState(false)

  // sends a message to the server to the selected channel
  const handleSendMessage = (content: string) => {
    setIsTyping(false)
    socket?.emit('sendMessage', {
      userID: userID,
      channelID: selectedChannelID,
      content,
    })
  }

  // sends isDrafting signal to the server
  // to indicate that the user is typing
  useEffect(() => {
    if (selectedChannelID != null) {
      socket?.emit('isDrafting', {
        channelID: selectedChannelID,
        isInDraft: isTyping,
      })
    }
  }, [isTyping])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 'calc(100% - 360px)',
      }}
    >
      <Box
        sx={{
          height: 'calc(100% - 80px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ConversationHeader
          channel={props.channel}
          isLoading={props.isLoading}
        />
        {props.isLoading === false && (
          <ConversationChat channel={props.channel} />
        )}
      </Box>
      <ConversationChatInput
        isLoading={props.isLoading}
        onTyping={setIsTyping}
        onSendMessage={handleSendMessage}
      />
    </Box>
  )
}
