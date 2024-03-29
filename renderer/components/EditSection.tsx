import EditIcon from '@mui/icons-material/Edit'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from '@mui/material'
import { blue } from '@mui/material/colors'
import { Box } from '@mui/system'
import Image from 'next/image'
import { useState } from 'react'

// In the future we could add or edit conversations here
export default function EditSection() {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Expected to add some new conversations?</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              marginBottom: '20px',
            }}
          >
            <DialogContentText textAlign="center">
              Lol no, sorry
            </DialogContentText>
          </Box>
          <Image
            src="/images/meme.jpg"
            alt="Logo image"
            width="400px"
            height="200px"
            objectFit="scale-down"
            priority
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          position: 'fixed',
          bottom: '20px',
          left: '280px',
        }}
      >
        <Fab
          color="secondary"
          aria-label="edit"
          onClick={handleOpen}
          sx={{
            background: blue[600],
          }}
        >
          <EditIcon />
        </Fab>
      </Box>
    </>
  )
}
