import { createContext } from 'react'
import { Socket } from 'socket.io-client'

// in the _app file, we create a socket and pass it to the context provider
export const SocketContext = createContext<Socket | null>(null)
