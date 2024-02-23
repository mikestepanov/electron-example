import { Box, styled } from '@mui/system'
import { inputClasses } from '@mui/base/Input'
import { useState } from 'react'
import { phoneNumberAtom } from '../lib/jotai'
import { useSetAtom } from 'jotai'
import BasicInput from './BasicInput'

const validPhoneRegex = /^(\d{3})\-(\d{3})\-(\d{4})$/
const MAX_PHONE_DIGIT_LENGTH = 10

// Renders a phone number input field,
// when the user types in a valid phone number,
// sends it to the parent component
export default function PhoneInput() {
  const [value, setValue] = useState('')
  const setPhoneNumber = useSetAtom(phoneNumberAtom)

  // parse phone number and add hyphens,
  // if we have valid phone number, send it to parent component
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    // Remove all non-digits
    val = val.replace(/\D/g, '').substring(0, MAX_PHONE_DIGIT_LENGTH)
    // Add the hyphens
    if (val.length > 3) {
      val = val.replace(/(\d{3})/, '$1-')
    }
    if (val.length > 7) {
      val = val.replace(/(\d{3})-(\d{3})/, '$1-$2-')
    }
    setValue(val)
    // if we have valid phone number, we can unblock 'Next' button
    setPhoneNumber(validPhoneRegex.test(val) ? val : null)
  }

  return (
    <Box sx={{ margin: '20px 0' }}>
      <BasicInput
        slots={{
          root: InputRoot,
          input: InputElement,
        }}
        placeholder="Phone Number"
        value={value}
        onChange={handleInputChange}
        startAdornment={<InputAdornment>+1</InputAdornment>}
      />
    </Box>
  )
}

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
}

const InputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  display: flex;
  align-items: center;
  justify-content: center;


  &.${inputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === 'dark' ? blue[600] : blue[200]
    };
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
)

const InputElement = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`
)

const InputAdornment = styled('div')`
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
