import { Box } from '@mui/system'
import { Channel } from '../lib/types'
import { useAtomValue } from 'jotai'
import { userIDAtom } from '../lib/jotai'
import ChatTextbox from './ChatTextbox'
import SomeoneIsTyping from './SomeoneIsTyping'
import { useEffect, useRef } from 'react'

type Props = {
  channel: Channel
}

// Renders the main chat area for a conversation
export default function ConversationChatContainer(props: Props) {
  const userID = useAtomValue(userIDAtom)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView()
    }
    // on channel change, scroll to the bottom of the chat
  }, [props.channel.messages.length, props.channel.isInDraft])

  return (
    <Box
      sx={{
        overflowY: 'auto',
      }}
    >
      {props.channel.messages.map((message, index) => {
        return (
          <ChatTextbox
            key={index}
            inMultiUserChannel={props.channel.isMultiUser}
            message={message}
            isFromCurrentUser={message.userID === userID}
          />
        )
      })}
      {props.channel.isInDraft && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '60px',
            alignItems: 'center',
            height: '100px',
          }}
        >
          <SomeoneIsTyping />
        </Box>
      )}
      <div ref={messagesEndRef} />
    </Box>
  )
}
