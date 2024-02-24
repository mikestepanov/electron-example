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
  console.log('a user connected from electron app')
  socket.emit('confirm', 'Hello from server')

  // on loading conversations page, client requests for users and channels
  socket.on('requestConversationsAndUsers', () => {
    setTimeout(function () {
      socket.emit('recieveConversationsAndUsers', {
        users: mockUsers,
        channels: mockChannels,
      })
      // mocks the server response time for 3 seconds
    }, 500) //TODO
  })

  // on finalizing the onboarding, client sends new user to create
  socket.on('creatingNewUser', (newUser: any) => {
    const newID = new Date().getTime()
    mockUsers[newID] = newUser
    setTimeout(function () {
      socket.emit('newUserCrated', newID)
      // mocks the server response time for 4 seconds
    }, 500) //TODO
  })

  // client can send the message to the server
  // emit back the updated channel
  // for `Vegeta` user chat, the message will be sent from `Vegeta` every second message
  socket.on('sendMessage', (response: any) => {
    const { userID, channelID, content } = response

    const mockChannel = mockChannels[channelID]
    // this is to harcode check based on the requested criteria
    const isMultiUser = mockChannel.isMultiUser
    // flip as if `Vegeta` is sending the message
    const finalizedHarcodedID =
      isMultiUser === false && mockChannel.messages.length % 2 === 0
        ? 'VEGETA_USER_ID'
        : userID
    mockChannel.messages.push({
      id: new Date().getTime().toString(),
      userID: finalizedHarcodedID,
      content,
      timestamp: new Date().toISOString(),
    })
    setTimeout(function () {
      socket.emit('channelUpdate', channelID, mockChannel)
      // mocks the server response time for 2 seconds
    }, 500) //TODO
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3333, () => {
  console.log('server running')
})
