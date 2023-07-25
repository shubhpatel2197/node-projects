const express= require('express')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')
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

const upload = multer({
    // dest:'avatars',
    limits:{
        fileSize: 10000000//10 mb
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpeg|jpg)$/)){
            return cb(new Error('must be photo'))
        }

        cb(undefined,true)
    }
})


router.post('/users/me/avatar',auth,upload.single('avatar'),
async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(404).send({error:error.message})
})

router.delete('/users/me/avatar',auth,async(req,res)=>{
    
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    
})

router.get('/users/:id/avatar',async(req,res)=>{
    
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }
    catch(e){
        res.status(404).send()
    }
})

module.exports = router