const { Socket } = require('socket.io')

const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const { mockUsers, mockChannels } = require('./mockData')

let users = { ...mockUsers }
let channels = { ...mockChannels }

app.use(
  cors({
    origin: ['http://localhost:8888'],
    credentials: true,
  })
)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8888',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket: typeof Socket) => {
  console.log('a user has made a connection from client')
  socket.emit('confirm', 'Hello from server')

  // on loading conversations page, client requests for users and channels
  socket.on('requestConversationsAndUsers', () => {
    setTimeout(function () {
      socket.emit('recieveConversationsAndUsers', {
        users,
        channels,
      })
      // mocks the server response time for 2 seconds
    }, 2000)
  })

  // on finalizing the onboarding, client sends new user to create
  socket.on('creatingNewUser', (newUser: any) => {
    const newID = new Date().getTime()
    users[newID] = newUser
    setTimeout(function () {
      socket.emit('newUserCrated', newID)
      // mocks the server response time for 2 seconds
    }, 2000)
  })

  // client can send the message to the server
  // emit back the updated channel
  // for `Vegeta` user chat, the message will be sent from `Vegeta` every second message
  socket.on('sendMessage', (response: any) => {
    const { userID, channelID, content } = response

    const channel = channels[channelID]
    // this is to harcode check based on the requested criteria
    const isMultiUser = channel.isMultiUser
    // flip as if `Vegeta` is sending the message
    const finalizedHarcodedID =
      isMultiUser === false && channel.messages.length % 2 === 0
        ? 'VEGETA_USER_ID'
        : userID
    channel.messages.push({
      id: new Date().getTime().toString(),
      userID: finalizedHarcodedID,
      content,
      timestamp: new Date().toISOString(),
    })
    setTimeout(function () {
      socket.emit('channelUpdate', channelID, channel)
      // mocks the server response time for 2 seconds
    }, 2000)
  })

  // client can mark convsersation as in draft to the server
  // emit back the updated channel with draft toggle on or off
  socket.on('isDrafting', (response: any) => {
    const { channelID, isInDraft } = response

    const channel = channels[channelID]
    channel.isInDraft = isInDraft
    setTimeout(function () {
      socket.emit('channelUpdate', channelID, channel)
      // mocks the server response time for 1 second
    }, 1000)
  })

  // for the sake of the demo, we can reset the server data
  socket.on('reset', () => {
    users = { ...mockUsers }
    channels = { ...mockChannels }
  })

  socket.on('disconnect', () => {
    // on disconnect, close all drafts
    Object.keys(channels).forEach((channelID) => {
      const channel = channels[channelID]
      channel.isInDraft = false
    })
    console.log('user disconnected')
  })
})

server.listen(3333, () => {
  console.log('server running')
})
