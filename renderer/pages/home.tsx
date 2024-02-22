import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PhoneInput from '../components/PhoneInput'
import CentralWrapper from '../components/PhoneWrapper'

export default function HomePage() {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null)

  return (
    <React.Fragment>
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
        />
        <Typography fontWeight="bold" alignSelf="center">
          What's your Phone Number?
        </Typography>
        <PhoneInput onPhoneNumberChange={setPhoneNumber} />
        <Button
          variant="contained"
          disabled={phoneNumber == null}
          color="primary"
          href="/next"
        >
          Next
        </Button>
      </CentralWrapper>
    </React.Fragment>
  )
}
