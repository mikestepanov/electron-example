import { alpha, styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { blue } from '@mui/material/colors'
import { Fab } from '@mui/material'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 12,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: '100%',
    padding: '4px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))

export default function ConversationChatInput() {
  return (
    <Box
      component="form"
      noValidate
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0 16px',
        height: 60,
      }}
    >
      <BootstrapInput
        sx={{ width: 'inherit' }}
        id="bootstrap-input"
        placeholder="Message"
      />
      <Box sx={{ width: 40 }}>
        <Fab
          color="secondary"
          size="small"
          sx={{
            background: blue[600],
            width: 36,
            height: 36,
            marginLeft: 4,
          }}
        >
          <ArrowUpwardIcon color="warning" />
        </Fab>
      </Box>
    </Box>
  )
}
