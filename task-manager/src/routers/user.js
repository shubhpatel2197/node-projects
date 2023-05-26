const express= require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

router.post('/users',async (req,res)=>{
    const user = new User(req.body)

    try{
       
        const token = await user.generateauthtoken()
        
        res.send({user,token})
    } catch(e){
        res.send(e)
    }

})

router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateauthtoken()
       
        res.send({user,token})
    }
    catch(e){
        res.status(404).send()
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    } 
})

router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    } 
})

router.get('/users/me', auth , async (req,res)=>{
    res.send(req.user)
})

router.patch('/users/me',auth,async(req,res)=>{

    const updates = Object.keys(req.body)
    const allowedupdates = ['name','email','password','age']

    const isvalideoperation = updates.every((update)=>{
        return allowedupdates.includes(update)
    })

    if(!isvalideoperation){
        return res.status(400).send({error:'invalid operation'})
    }

    try{
        updates.forEach((update)=>{
            req.user[update] = req.body[update]
        })

        await req.user.save()

        res.send(req.user)
    }
    catch(e){
        res.status(404).send(e)
    }
})

router.delete('/users/me', auth , async(req,res)=>{
    
    try{
        await req.user.remove()

        res.send(req.user)
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router