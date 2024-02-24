import { atomWithStorage } from 'jotai/utils'

import { Users } from 'lib/types'

export const phoneNumberAtom = atomWithStorage<string | null>(
  'phoneNumber',
  null,
)

export const nameAtom = atomWithStorage<string>('name', '')

export const lastNameAtom = atomWithStorage<string>('lastName', '')

export const userIDAtom = atomWithStorage<string | null>('userID', null)

export const selectedChannelIDAtom = atomWithStorage<string | null>(
  'selectedChannelID',
  null,
)

export const usersAtom = atomWithStorage<Users>('users', {})
