import { Box } from '@mui/system'

type Props = {
  children: React.ReactNode
}

// Renders a wrapper for centralizing content
// such as login and verify code pages
export default function CentralWrapper(props: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '300px',
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}
