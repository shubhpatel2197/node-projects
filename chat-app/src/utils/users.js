const users = []

const adduser = ({id,username,room}) =>{

    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if(!username || !room){
        return {
            error: 'Username and Room are required'
        }
    }

    const existing = users.find((user)=>{
        return user.room === room && user.username === username
    })

    if(existing){
        return {
            error:'Username is in use'
        }
    }

    const user = {id,username,room}
    users.push(user)
    return {user}
}

const removeuser = (id)=>{
    const index = users.findIndex((user)=>user.id===id)

    if(index!==-1){
        return users.splice(index,1)[0]
    }
}

const getuser = (id) =>{
    return users.find((user)=>user.id===id)
}

const getusersinroom = (room) =>{
    room = room.trim().toLowerCase()
    return users.filter((user)=>{
        return user.room===room
})
}

const sh ={
    id:'9',
    username:'sjdj',
    room:'ddd'
}
const shh ={
    id:'9dee',
    username:'sjdfdj',
    room:'dd'
}
adduser(sh)
adduser(shh)
console.log(users[0])

console.log(getusersinroom('dd'))


module.exports ={
    adduser,removeuser,getuser,getusersinroom
}
