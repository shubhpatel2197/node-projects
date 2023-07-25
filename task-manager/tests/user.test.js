const request = require('supertest')
const app = require('../src/app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../src/models/user') 


const userOneId = new mongoose.Types.ObjectId()

const userOne  = {
    id:userOneId,
    name:'Mike',
    email:'mile@gmail.com',
    password:'kkkk',
    tokens: [{
        token:jwt.sign({_id:userOneId},'thisis')
    }]
}

beforeEach(async ()=>{
    await User.deleteMany()
    await new User(userOne).save()
})

test('signup',async()=>{
    await request(app).post('/users').send({
        name:"shuu",
        email:"mmm@gmail.com",
        password:"kk34"
    }).expect(200)
})

test('login',async()=>{
    await request(app).post('/users/login').send({
        email:'mile@gmail.com',
        password:'kkkk'
    }).expect(200)
})

test('get user profile',async()=>{

    await request(app)
    .get('/users/me')
    .set('Authorization','Bearer ${userOne.tokens[0].token}')
    .send()
    .expect(200)
})

console.log(userOne.tokens[0].token)