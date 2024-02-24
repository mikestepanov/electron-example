import { Box, Typography } from '@mui/material'

// Renders `...` loading animation
export default function SomeoneIsTyping() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography sx={{ marginRight: '20px' }}>Someone is typing</Typography>
      <Box sx={{ marginTop: '8px', marginLeft: '8x' }}>
        <div className="dot-pulse" />
      </Box>
    </Box>
  )
}
