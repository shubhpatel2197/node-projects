const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage} = require('./utils/messages')
const {generatelocationMessage} = require('./utils/messages')
const {adduser,removeuser,getuser,getusersinroom} = require('./utils/users')
const { callbackify } = require('util')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))
const port = process.env.PORT || 3000

io.on('connection',(socket)=>{

    socket.on('join',(options,callback)=>{
        const {error,user} = adduser({id:socket.id, ...options})
        console.log(user)

        if(error){
            return callback(error)
        }

        socket.join(user.room)
        socket.emit('message',generateMessage(user.username,'welcome'))
        socket.broadcast.to(user.room).emit('message',generateMessage(user.username,`${user.username} has joined! `))
        io.to(user.room).emit('roomdata',{
            room:user.room,
            users:getusersinroom(user.room)
        })
        console.log(getusersinroom(user.room))

        callback()
    })

    socket.on('sendmes',(message,callback)=>{
        const user = getuser(socket.id)
        const filter = new Filter()
        
        if(filter.isProfane(message)){
            return callback('profanity is not allowed')
        }
        console.log(generateMessage(user.username,message))
        io.to(user.room).emit('message',generateMessage(user.username,message))
        callback()
    })

    socket.on('sendloc',(coord,callback)=>{
        
        const user = getuser(socket.id)

        io.to(user.room).emit('locationmessage',generatelocationMessage(user.username,`https://google.com/maps?q=${coord.latitude},${coord.longitude}`))
        callback()
    }) 

    socket.on('disconnect',()=>{
        const user = removeuser(socket.id)
        if(user){
         io.to(user.room).emit('message',generateMessage(`${user.username} has Left`))
         io.to(user.room).emit('roomdata',{
            room:user.room,
            users:getusersinroom(user.room)
        })
        }

    })


})



server.listen(port,()=>{
    console.log('running on port '+port)
})
