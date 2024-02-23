import { atomWithStorage } from 'jotai/utils'

export const phoneNumberAtom = atomWithStorage<string | null>(
  'phoneNumber',
  null
)
