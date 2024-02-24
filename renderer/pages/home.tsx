import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useAtomValue } from 'jotai'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect } from 'react'

import CentralWrapper from 'components/CentralWrapper'
import PhoneInput from 'components/PhoneInput'

import { SocketContext } from 'contexts/socketContext'

import { phoneNumberAtom } from 'lib/jotai'
import { ROUTES } from 'lib/Routes'

// Renders a first page of the sign up flow
// where the user is asked to enter their phone number
export default function HomePage() {
  const socket = useContext(SocketContext)
  const phoneNumber = useAtomValue(phoneNumberAtom)

  // on home page, reset all data at the start
  // for demo purposes
  useEffect(() => {
    localStorage.clear()
    socket?.emit('reset')
  }, [])

  return (
    <>
      <Head>
        <title>Sign Up</title>
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
          sx={{ marginTop: '16px' }}
        >
          What's your Phone Number?
        </Typography>
        <PhoneInput />
        <Button
          variant="contained"
          disabled={phoneNumber == null}
          color="primary"
          href={ROUTES.VERIFY_CODE}
        >
          Next
        </Button>
      </CentralWrapper>
    </>
  )
}
