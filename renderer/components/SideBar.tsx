import { Box } from '@mui/system'

type Props = {
  children: React.ReactNode
}

// Renders a sidebar for the conversation page
export default function SideBar(props: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '360px',
        backgroundColor: 'grey',
      }}
    >
      {props.children}
    </Box>
  )
}
