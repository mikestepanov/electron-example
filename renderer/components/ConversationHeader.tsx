import { Box } from '@mui/system'
import { Channel } from '../lib/types'
import { Avatar, Skeleton, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { lastNameAtom, nameAtom } from '../lib/jotai'
import { useAtomValue } from 'jotai'

type Props = {
  channel: Channel
  isLoading: boolean
}

// Renders the header of conversation chat
export default function ConversationHeader(props: Props) {
  const firstName = useAtomValue(nameAtom)
  const lastName = useAtomValue(lastNameAtom)
  const userGreeting = 'Hello, ' + firstName + ' ' + lastName

  return (
    <Box
      sx={{
        backgroundColor: grey[200],
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        height: '72px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '10px',
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
            <>
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={200} />
            </>
          ) : (
            <Typography variant="h6">{props.channel.name}</Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginRight: '30px',
        }}
      >
        {props.isLoading ? (
          <>
            <Skeleton variant="text" width={150} />
          </>
        ) : (
          <Typography variant="h6">{userGreeting}</Typography>
        )}
        <Box
          sx={{
            marginLeft: '8px',
          }}
        >
          {props.isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Avatar src="/images/tiger.jpg" />
          )}
        </Box>
      </Box>
    </Box>
  )
}
