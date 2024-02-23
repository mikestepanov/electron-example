import Head from 'next/head'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '../components/Link'
import Image from 'next/image'
import CentralWrapper from '../components/CentralWrapper'
import { lastNameAtom, nameAtom, phoneNumberAtom } from '../lib/jotai'
import { useAtom, useAtomValue } from 'jotai'
import BasicInput from '../components/BasicInput'
import { ROUTES } from '../lib/Routes'
import { useContext, useState } from 'react'
import { SocketContext } from '../contexts/socketContext'
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'

const MIN_NAME_LENGTH = 2

// Renders a page where the user is asked to enter their full name
// this is last step of the sign up flow
export default function NameInfoPage() {
  const [name, setName] = useAtom(nameAtom)
  const [lastName, setLastName] = useAtom(lastNameAtom)
  const phoneNumber = useAtomValue(phoneNumberAtom)

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  // user can submit the form only if both name and last name are at least 2 characters long
  const canSubmit =
    name.length >= MIN_NAME_LENGTH && lastName.length >= MIN_NAME_LENGTH

  const socket = useContext(SocketContext)

  // when the user is created, the server will emit a 'newUserCrated' event
  // it will be the user id and will act as our 'auth token'
  socket?.on('newUserCrated', (userID: string) => {
    setIsLoading(false)
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
        <Typography fontWeight="bold" alignSelf="center">
          What's your Full Name?
        </Typography>
        <BasicInput
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <BasicInput
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {/*TODO - for testing to remove later */}
        <Typography gutterBottom>
          <Link href="/home">Go to the home page</Link>
        </Typography>
        <Button
          startIcon={
            isLoading ? <CircularProgress size={15} color="inherit" /> : null
          }
          variant="contained"
          color="primary"
          disabled={canSubmit === false}
          onClick={handleCreateNewUser}
        >
          {isLoading ? 'Creating New User...' : 'Next'}
        </Button>
      </CentralWrapper>
    </>
  )
}
