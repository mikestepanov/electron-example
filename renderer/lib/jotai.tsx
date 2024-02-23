import { atomWithStorage } from 'jotai/utils'

export const phoneNumberAtom = atomWithStorage<string | null>(
  'phoneNumber',
  null
)

export const nameAtom = atomWithStorage<string>('name', '')

export const lastNameAtom = atomWithStorage<string>('lastName', '')

export const userIDAtom = atomWithStorage<string | null>('userID', null)
