import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Avatar, Box, Skeleton, Typography } from '@mui/material'
import { Channel } from '../lib/types'
import { useAtomValue } from 'jotai'
import { userIDAtom, usersAtom } from '../lib/jotai'
import { convertToAMPM } from '../utils/conversions'
import { blue, grey } from '@mui/material/colors'

type Props = {
  channel: Channel
  isSelected: boolean
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  isLoading: boolean
}

// Renders a single item in the sidebar
// that shows the last message in the channel
export default function SideBarItem(props: Props) {
  const currenUserID = useAtomValue(userIDAtom)
  const users = useAtomValue(usersAtom)

  const latestMessage =
    props.channel.messages[props.channel.messages.length - 1]
  const messageAuthor = users[latestMessage?.userID]

  let message = latestMessage?.content
  // if the latest message is from the current user, append "You" to the message
  if (latestMessage?.userID === currenUserID) {
    message = 'You: ' + message
    // in multi user channels, append the author's name to the message
  } else if (props.channel.isMultiUser) {
    message = (messageAuthor?.name || '') + ': ' + message
  }

  return (
    <Box
      sx={{
        bgcolor: props.isSelected ? blue[600] : grey[300],
        height: '72px',
      }}
    >
      <ListItemButton selected={props.isSelected} onClick={props.onClick}>
        <ListItemIcon>
          {props.isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Avatar src={props.channel.imageURL} />
          )}
        </ListItemIcon>
        {props.isLoading ? (
          <Box>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="text" width={200} />
          </Box>
        ) : (
          <ListItemText
            primary={props.channel.name}
            primaryTypographyProps={{
              color: props.isSelected ? 'white' : 'black',
            }}
            secondary={message}
            secondaryTypographyProps={{
              color: props.isSelected ? 'white' : 'black',
              noWrap: true,
            }}
          />
        )}
        <Typography
          sx={{
            position: 'absolute',
            right: '10px',
            top: '18px',
            fontSize: '0.8rem',
            color: props.isSelected ? 'white' : 'black',
          }}
        >
          {props.isLoading ? (
            <Skeleton variant="text" width={40} />
          ) : (
            <>{convertToAMPM(latestMessage.timestamp)}</>
          )}
        </Typography>
      </ListItemButton>
    </Box>
  )
}
