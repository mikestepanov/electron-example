import { Box } from '@mui/system'
import { Message } from '../lib/types'
import { Skeleton, Typography } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import { convertToAMPM } from '../utils/conversions'

type Props = {
  message: Message
  isLoading: boolean
  isFromCurrentUser: boolean
}

// Renders a message from the conversation chat
export default function ChatTextbox(props: Props) {
  return (
    <Box
      sx={{
        bgcolor: props.isFromCurrentUser ? blue[600] : grey[400],
        borderRadius: '10px',
        padding: '5px 10px 14px',
        color: props.isFromCurrentUser ? 'white' : 'black',
        marginLeft: props.isFromCurrentUser ? 'auto' : '20px',
        marginRight: props.isFromCurrentUser ? '0' : 'auto',
        width: 'fit-content',
        marginTop: '8px',
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
          fontSize: '0.7rem',
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
  )
}
