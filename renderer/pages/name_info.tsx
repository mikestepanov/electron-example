import { Box, CircularProgress } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import BasicInput from 'components/BasicInput'
import CentralWrapper from 'components/CentralWrapper'

import { SocketContext } from 'contexts/socketContext'

import { lastNameAtom, nameAtom, phoneNumberAtom, userIDAtom } from 'lib/jotai'
import { ROUTES } from 'lib/Routes'

const MIN_NAME_LENGTH = 2

// Renders a page where the user is asked to enter their full name
// this is last step of the sign up flow
export default function NameInfoPage() {
  const [name, setName] = useAtom(nameAtom)
  const [lastName, setLastName] = useAtom(lastNameAtom)
  const phoneNumber = useAtomValue(phoneNumberAtom)
  const setUserID = useSetAtom(userIDAtom)

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  // user can submit the form only if both name and last name are at least 2 characters long
  const canSubmit =
    name.length >= MIN_NAME_LENGTH && lastName.length >= MIN_NAME_LENGTH

  const socket = useContext(SocketContext)

  // when the user is created, the server will emit a 'newUserCrated' event
  // it will be the user id and will act as our 'auth token'
  socket?.on('newUserCrated', (userID: string) => {
    setUserID(userID)
    router.push(ROUTES.CONVERSATIONS)
  })

  // send the current user data to the server to create a new user
  const handleCreateNewUser = () => {
    const newUser = {
      name,
      lastName,
      phoneNumber,
    }
    socket?.emit('creatingNewUser', newUser)
    setIsLoading(true)
  }

  return (
    <>
      <Head>
        <title>Please Add Your Name</title>
      </Head>
      <CentralWrapper>
        <Image
          src="/images/signup.png"
          alt="Logo image"
          width="200px"
          height="150px"
          objectFit="scale-down"
          priority
        />
        <Typography
          fontWeight="bold"
          alignSelf="center"
          sx={{ margin: '16px 0' }}
        >
          What's your Full Name?
        </Typography>
        <BasicInput
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box sx={{ marginTop: '16px' }}>
          <BasicInput
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <Button
          startIcon={
            isLoading ? <CircularProgress size={15} color="inherit" /> : null
          }
          variant="contained"
          color="primary"
          disabled={canSubmit === false}
          onClick={handleCreateNewUser}
          sx={{ marginTop: '16px' }}
        >
          {isLoading ? 'Creating New User...' : 'Next'}
        </Button>
      </CentralWrapper>
    </>
  )
}
