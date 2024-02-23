import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Avatar, Box, Skeleton, Typography } from '@mui/material'
import { Channel } from '../lib/types'
import { useAtomValue } from 'jotai'
import { usersAtom } from '../lib/jotai'
import { convertToAMPM } from '../utils/conversions'
import { blue, grey } from '@mui/material/colors'

type Props = {
  channel: Channel
  isSelected: boolean
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  isLoading: boolean
}

export default function SideBarItem(props: Props) {
  const users = useAtomValue(usersAtom)

  const latestMessage =
    props.channel.messages[props.channel.messages.length - 1]
  const messageAuthor = users[latestMessage.userID]

  console.log(latestMessage, props.isSelected)
  return (
    <Box
      sx={{
        bgcolor: props.isSelected ? blue[600] : grey[300],
      }}
    >
      <ListItemButton selected={props.isSelected} onClick={props.onClick}>
        <ListItemIcon>
          {props.isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Avatar src={messageAuthor.imageURL} />
          )}
        </ListItemIcon>
        {props.isLoading ? (
          <Box>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="text" width={200} />
          </Box>
        ) : (
          <ListItemText
            primary={messageAuthor.name + ' ' + messageAuthor.lastName}
            primaryTypographyProps={{
              color: props.isSelected ? 'white' : 'black',
            }}
            secondary={latestMessage.message}
            secondaryTypographyProps={{
              color: props.isSelected ? 'white' : 'black',
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
