import Head from 'next/head'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import CentralWrapper from '../components/CentralWrapper'
import { phoneNumberAtom } from '../lib/jotai'
import { useAtomValue } from 'jotai'
import BasicInput from '../components/BasicInput'
import { useState } from 'react'
import { ROUTES } from '../lib/Routes'

const OTP_LENGTH = 6

// Renders a page where the user is asked to enter the code
// sent to their phone number
// this is the second step of the sign up flow
export default function VerifyCodePage() {
  const phoneNumber = useAtomValue(phoneNumberAtom)
  const [otp, setOtp] = useState('')

  // Restrict the code input to 6 digits
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value.substring(0, OTP_LENGTH))
  }

  return (
    <>
      <Head>
        <title>Please Verify Code</title>
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
          {`+1 ${phoneNumber}`}
        </Typography>
        <Typography gutterBottom variant="caption" sx={{ margin: '16px 0' }}>
          We sent you an SMS with the code
        </Typography>
        <BasicInput placeholder="Code" value={otp} onChange={handleOtpChange} />
        <Button
          variant="contained"
          disabled={otp.length !== OTP_LENGTH}
          color="primary"
          href={ROUTES.NAME_INFO}
          sx={{ marginTop: '16px' }}
        >
          Next
        </Button>
      </CentralWrapper>
    </>
  )
}
