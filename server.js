const express = require('express')
const Socket = require('socket.io')
const app = express()
const server = require("http").createServer(app)
const io= Socket(server,{
    cors:{
        origin:"*",
        methods:["GET", "POST"] 
    }
})

const users = []
io.on("connection", (socket)=>{
    console.log(`connected to ${socket.id}`)
    socket.on("adduser", (username)=>{
        socket.user = username
        users.push(username)
        io.sockets.emit("users", users)
    })

    socket.on("message", (message)=>{
        io.sockets.emit("message-client", {message, user: socket.user})
    })

    socket.on("disconnect", ()=>{
        if(socket.user){
            users.splice(users.indexOf(socket.user), 1)

            io.socket.emit("users", users)
        }
    })
    
})
server.listen(3000, ()=>{
    console.log(`The servei running on port:3000`)
})