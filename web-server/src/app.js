const express = require('express')

const app = express() 

app.get('',(req,res)=>{
    res.send('Hii🥹')

})

app.get('/help',(req,res)=>{
    res.send('<h1>Help age</h1>')
})

app.get('/about',(req,res)=>{
    res.send([{
        name:"shubh",
        age:19
    },{
        name:"name"
    }
    ]
    )
})

app.get('/weather',(req,res)=>{
    res.send('Help age')
})

app.listen(3000,()=>{
    console.log('server on 3000')
})

