const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const publicpath=path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')


app.set('view engine','hbs');
app.set('views',viewspath)
hbs.registerPartials(partialspath)
app.use(express.static(publicpath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'shubhu'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name:'shubh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'shubhuuu'
    })
})

app.get('/weather',(req,res)=>{
    res.send('Help age')
})

app.get('/products',(req,res)=>{
    res.send('Help age')
})




app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'shubh2',
        errormsg : "help page not found"
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'shubh',
        errormsg : "page not found"
    })
})

app.listen(3000,()=>{
    console.log('server on 3000')
})

