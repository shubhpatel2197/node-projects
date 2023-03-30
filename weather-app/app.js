const request = require('request');
const { json } = require('stream/consumers');
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')

const address = process.argv[2]

if(!address){
    console.log("providee location")
}
else{
const g = geocode(address,(error,{latitude,longitude,location}={})=>{
    if(error){
    return console.log(error) 
    }
    const f = forecast(latitude,longitude,(error,data2)=>{
        if(error)
        return console.log(error) 
        console.log(location)
        console.log('Data',data2)
    })
})
} 


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

  