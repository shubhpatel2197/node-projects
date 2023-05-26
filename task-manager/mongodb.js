// const mongodb = require('mongodb')
// const {MongoClient,ObjectID } = mongodb


// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databasename = 'task-manager'


// MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{

//     if(error){
//        return console.log("Unable to Connect")
//     }

//     const db =client.db(databasename)
    
//     // db.collection('users').insertOne({
//     //     name:"sgdfh",
//     //     age:"21"
//     // },(error,result)=>{
//     //     if(error){
//     //         return console.log("unable to insert user")
//     //     }
//     //     console.log(result.ops)
//     // })

//     // db.collection('users').insertMany([
//     // {
//     //     GENDER:"malwww",
//     //     nom:"shubhlo"
//     // }
    
//     // ],(error,result)=>{
//     //     if(error){
//     //         return console.log("unable to insert user")
//     //     }
//     //     console.log(result.ops)
//     // })

//     // db.collection('users').findOne({name:"shuh"},(error,user)=>{
//     //     if(error)
//     //     return console.log('Unable to fetch')
//     //     console.log(user)
//     // })

//     // db.collection('users').find({name:"shuh"}).toArray((error,users)=>{
//     //     if(error) 
//     //         return console.log('Unable to fetch')
     
//     //     console.log(users)
//     // }) 
//     // db.collection('users').find({name:"shuh"}).count((error,count)=>{
//     //     if(error)
//     //         return console.log('Unable to fetch')
     
//     //     console.log(count)
//     // })

//     // db.collection('users').updateOne({
//     //  _id: "64281c757218b0349a7dad67"
//     // },
//     // {
//     //     $inc:{
//     //         age: 1
//     //     }

//     // }).then((result)=>{
//     //      console.log(result)
//     // }).catch((error)=>{
//     //     console.log("errrrror")
//     // })
//     // db.collection('users').updateMany({
//     //     name:"shuh"
//     // },
//     // {
//     //     $inc:{
//     //         age: 1
//     //     }

//     // }).then((result)=>{
//     //      console.log(result)
//     // }).catch((error)=>{
//     //     console.log("errrrror")
//     // })

//     db.collection('users').deleteMany({age:"19"})
    



    

// })
