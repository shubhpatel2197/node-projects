const request = require('request');
const { json } = require('stream/consumers');


const geocode = (address,callback)=>{
    
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2h1YmgyMTk3IiwiYSI6ImNsZnQ5eHM3ZTBkdzczZXE4ODU1dGxvNWsifQ.OoAwYuTAujfQ8B0daYIJew'

    request({url:url,json:true},(error,{body})=>{
       
        if(error){
            callback('Error',undefined);
        }
        else if(body.features.length==0){
            callback('Unable to find loaction',undefined)
        }
        else{
            callback(undefined,{
                 latitude:body.features[0].center[1],
                 longitude:body.features[0].center[0],
                 location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode

