import Box from '@mui/material/Box'
import { selectedChannelIDAtom } from '../lib/jotai'
import { useAtom } from 'jotai'
import { Channels } from '../lib/types'
import SideBarItem from './SideBarItem'
import EditSection from './EditSection'
import { Skeleton } from '@mui/material'
import { grey } from '@mui/material/colors'

type Props = {
  channels: Channels
  children: React.ReactNode
  isLoading: boolean
}

// Renders a sidebar for the conversation page
export default function SideBar(props: Props) {
  const [selectedChannelID, setSelectedChannelID] = useAtom(
    selectedChannelIDAtom
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '360px',
        backgroundColor: grey[400],
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 360 }}>
        {Object.entries(props.channels).map(([channelID, channel]) => {
          return (
            <SideBarItem
              isLoading={props.isLoading}
              key={channelID}
              channel={channel}
              isSelected={selectedChannelID === channelID}
              onClick={() => setSelectedChannelID(channelID)}
            />
          )
        })}
      </Box>
      <EditSection />
    </Box>
  )
}
