import Head from 'next/head'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '../components/Link'
import Image from 'next/image'
import CentralWrapper from '../components/PhoneWrapper'
import { phoneNumberAtom } from '../lib/jotai'
import { useAtomValue } from 'jotai'
import BasicInput from '../components/BasicInput'
import { useState } from 'react'
import { ROUTES } from '../lib/Routes'

const OTP_LENGTH = 6

export default function NextPage() {
  const phoneNumber = useAtomValue(phoneNumberAtom)
  const [otp, setOtp] = useState('')

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
        <Typography fontWeight="bold" alignSelf="center">
          {`+1 ${phoneNumber}`}
        </Typography>
        <Typography gutterBottom variant="caption">
          We sent you an SMS with the code
        </Typography>
        <BasicInput placeholder="Code" value={otp} onChange={handleOtpChange} />
        {/*TODO - for testing to remove later */}
        <Typography gutterBottom>
          <Link href="/home">Go to the home page</Link>
        </Typography>
        <Button
          variant="contained"
          disabled={otp.length !== OTP_LENGTH}
          color="primary"
          href={ROUTES.NAME_INFO}
        >
          Next
        </Button>
      </CentralWrapper>
    </>
  )
}
