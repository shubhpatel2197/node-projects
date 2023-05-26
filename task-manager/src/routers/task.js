const express= require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/tasks' , auth,async (req,res)=>{
   
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.send(task)
    } catch(e){   
        res.send(e)
    }
})

router.get('/tasks',auth,async (req,res)=>{
    const match = {}
    const sort = {}

    if(req.query.completed){
        if(req.query.completed==='true')
        match.completed = true
        else if(req.query.completed==='false')
        match.completed = false
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1]==='desc'   ? -1 : 1

    }

    try{
        
        // const tasks = await Task.find({owner:req.user._id})
        // res.send(tasks)
        // or
        await req.user.populate({path:'mytasks',
        match ,
        options:{
            limit: parseInt(req.query.limit),
            skip:parseInt(req.query.skip),
            sort
        }
      }).execPopulate()
        res.send(req.user.mytasks)
    }
    catch(e){
        res.send(e)
    }
    
})

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id

    try{
        const task = await Task.findOne({_id,owner:req.user._id})

        if(!task){ 
            res.status(404).send()
        }
        
        res.send(task)

    } catch(e){
        res.status(500).send()
    }
    
})

router.delete('/tasks/:id',auth,async(req,res)=>{
    
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(500).send()
    }
})


router.patch('/tasks/:id',auth,async (req,res)=>{

    const updates = Object.keys(req.body)
    const allowedupdates = ['description','completed']

    

    const isvalideoperation = updates.every((update)=>{
        return allowedupdates.includes(update)
    })
    
    if(!isvalideoperation){
        return res.status(400).send({error:'invalid operation'})
    }
    
    try{
        
        
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
       
        if(!task){
            return res.status(404).send()
        }
        

        updates.forEach((update)=>task[update]= req.body[update])
        await task.save()
        res.send(task)
    }
    catch(e){
        res.status(404).send(e)
    }
})

module.exports = router