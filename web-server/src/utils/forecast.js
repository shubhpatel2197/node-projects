const request = require('request');

const forecast = (x,y,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=9a2c23f02d0e3b0695f722f2d4997bb0&query='+x
    +','+y
  

    request({url:url,json:true},(error,{body})=>{
       
        if(error){
            callback('Error',undefined);
        }
        else{
            callback(undefined,body.current.temperature)
        }
    })
}
module.exports=forecast


