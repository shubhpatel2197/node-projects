const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.eventNames.port ||3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('running on port '+port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () =>{

    // const task = await Task.findById('647088ec1c305e02795e9dfc')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    
    //console.log(user.mytasks)



}

main()