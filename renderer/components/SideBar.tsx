import Box from '@mui/material/Box'
import { grey } from '@mui/material/colors'
import { useAtom } from 'jotai'

import EditSection from 'components/EditSection'
import SideBarItem from 'components/SideBarItem'

import { selectedChannelIDAtom } from 'lib/jotai'
import { Channels } from 'lib/types'

type Props = {
  channels: Channels
  isLoading: boolean
}

// Renders a sidebar for the conversation page
export default function SideBar(props: Props) {
  const [selectedChannelID, setSelectedChannelID] = useAtom(
    selectedChannelIDAtom,
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: 360,
        backgroundColor: grey[400],
        overflowY: 'auto',
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
