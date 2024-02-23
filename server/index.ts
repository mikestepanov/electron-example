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
  socket.on('creatingNewUser', (newUser: any) => {
    const newID = Math.floor(Math.random() * 100)
    mockUsers[newID] = newUser
    setTimeout(function () {
      socket.emit('newUserCrated', newID)
      console.log('newUser', newUser)
      // mocks the server response time for 5 seconds
    }, 5000)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3333, () => {
  console.log('server running')
})
