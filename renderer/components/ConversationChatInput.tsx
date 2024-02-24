import { alpha, styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { blue } from '@mui/material/colors'
import { Fab } from '@mui/material'
import { useState } from 'react'

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

type Props = {
  onTyping: (isTyping: boolean) => void
  onSendMessage: (message: string) => void
  isLoading: boolean
}

// Renders the input fields below list of messages in conversation section
export default function ConversationChatInput(props: Props) {
  const [value, setValue] = useState('')

  const sendMessage = () => {
    props.onSendMessage(value)
    setValue('')
  }

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault()
        if (value !== '') {
          sendMessage()
        }
      }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0 20px 0 50px',
        height: 60,
      }}
    >
      <BootstrapInput
        sx={{ width: 'calc(100% - 120px)' }}
        placeholder="Message"
        value={value}
        onChange={(e) => {
          const val = e.target.value
          props.onTyping(val !== '')
          setValue(val)
        }}
      />
      <Box sx={{ width: 20 }}>
        <Fab
          color="secondary"
          size="small"
          sx={{
            background: blue[600],
            width: 36,
            height: 36,
            marginLeft: '30px',
          }}
          disabled={value === '' || props.isLoading}
          onClick={() => sendMessage()}
        >
          <ArrowUpwardIcon color="warning" />
        </Fab>
      </Box>
    </Box>
  )
}
