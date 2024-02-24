import { Box } from '@mui/system'
import { Channel } from '../lib/types'
import { Avatar, Skeleton, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

type Props = {
  channel: Channel
  isLoading: boolean
}

// Renders the header of conversation chat
export default function ConversationHeader(props: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '10px',
        height: '72px',
        backgroundColor: grey[200],
      }}
    >
      {props.isLoading ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <Avatar src={props.channel.imageURL} />
      )}
      <Box
        sx={{
          marginLeft: '8px',
        }}
      >
        {props.isLoading ? (
          <Skeleton variant="text" width={100} />
        ) : (
          <Typography variant="h6">{props.channel.name}</Typography>
        )}
      </Box>
    </Box>
  )
}
