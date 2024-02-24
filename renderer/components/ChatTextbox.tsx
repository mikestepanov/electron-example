import { Box } from '@mui/system'
import { Message } from '../lib/types'
import { Avatar, Skeleton, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { convertToAMPM } from '../utils/conversions'
import { useAtomValue } from 'jotai'
import { usersAtom } from '../lib/jotai'

type Props = {
  message: Message
  isLoading: boolean
  isFromCurrentUser: boolean
  inMultiUserChannel: boolean
}

// Renders a message from the conversation chat
export default function ChatTextbox(props: Props) {
  const users = useAtomValue(usersAtom)

  // only show the avatar if the message is from another user
  // and the comversation is a multi-user comversation
  const avatarUrl =
    props.isFromCurrentUser === false &&
    props.isLoading === false &&
    props.inMultiUserChannel === true
      ? users[props.message.userID]?.imageURL
      : null

  const marginLeftForOtherUser = props.inMultiUserChannel ? '10px' : '20px'

  return (
    <Box
      sx={{
        marginTop: '8px',
      }}
    >
      {props.inMultiUserChannel && props.isFromCurrentUser === false && (
        <Box sx={{ marginLeft: '60px' }}>
          <Typography fontWeight="bold">
            {users[props.message.userID]?.name +
              ' ' +
              users[props.message.userID]?.lastName}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '10px',
        }}
      >
        {avatarUrl != null && (
          <Avatar src={users[props.message.userID]?.imageURL} />
        )}
        <Box
          sx={{
            bgcolor: props.isFromCurrentUser ? blue[600] : grey[400],
            borderRadius: '10px',
            padding: '5px 10px 14px',
            color: props.isFromCurrentUser ? 'white' : 'black',
            marginLeft: props.isFromCurrentUser
              ? 'auto'
              : marginLeftForOtherUser,
            marginRight: props.isFromCurrentUser ? '20px' : 'auto',
            width: 'fit-content',
            maxWidth: '40%',
            position: 'relative',
          }}
        >
          {props.isLoading ? (
            <Skeleton variant="rectangular" width={300} height={30} />
          ) : (
            <Typography>{props.message.content}</Typography>
          )}
          <Typography
            sx={{
              position: 'absolute',
              right: 4,
              bottom: 2,
              fontSize: '0.6rem',
              color: props.isFromCurrentUser ? 'white' : 'black',
            }}
          >
            {props.isLoading ? (
              <Skeleton variant="text" width={40} />
            ) : (
              <>{convertToAMPM(props.message.timestamp)}</>
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
