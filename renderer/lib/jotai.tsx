import { atomWithStorage } from 'jotai/utils'
import { Users } from './types'

export const phoneNumberAtom = atomWithStorage<string | null>(
  'phoneNumber',
  null
)

export const nameAtom = atomWithStorage<string>('name', '')

export const lastNameAtom = atomWithStorage<string>('lastName', '')

export const userIDAtom = atomWithStorage<string | null>('userID', null)

export const selectedChannelIDAtom = atomWithStorage<string | null>(
  'selectedChannelID',
  '0'
)

export const usersAtom = atomWithStorage<Users>('users', {})
