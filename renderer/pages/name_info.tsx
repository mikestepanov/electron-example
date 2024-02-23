import Head from 'next/head'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '../components/Link'
import Image from 'next/image'
import CentralWrapper from '../components/CentralWrapper'
import { lastNameAtom, nameAtom } from '../lib/jotai'
import { useAtom } from 'jotai'
import BasicInput from '../components/BasicInput'
import { ROUTES } from '../lib/Routes'

const MIN_NAME_LENGTH = 2

// Renders a page where the user is asked to enter their full name
// this is last step of the sign up flow
export default function NameInfoPage() {
  const [name, setName] = useAtom(nameAtom)
  const [lastName, setLastName] = useAtom(lastNameAtom)

  // user can submit the form only if both name and last name are at least 2 characters long
  const canSubmit =
    name.length >= MIN_NAME_LENGTH && lastName.length >= MIN_NAME_LENGTH

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
          variant="contained"
          color="primary"
          disabled={canSubmit === false}
          href={ROUTES.CONVERSATIONS}
        >
          Next
        </Button>
      </CentralWrapper>
    </>
  )
}
