const fs= require('fs')
const chalk = require('chalk')
const getnotes = function(){
    return 'yoour notes'
}

const addnote = (title,body) => {
     const notes=loadnotes()

     const duplicatenotes = notes.filter((note)=>notes.title===title)
     

     if(duplicatenotes.length=== 0){
             notes.push({
            title:title,
            body:body
         })
         console.log(chalk.green.inverse("Book Added 😘"));
     }
     else{
        console.log(chalk.red.inverse("Note Title taken"));
     }
 
    savenotes(notes)
}



const savenotes =  (notes)=> {
    const datajson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',datajson)
}
 
const loadnotes = () => {
    try{
        const data= fs.readFileSync('notes.json')
        const datajson=data.toString()
        return JSON.parse(datajson)
    }
    catch(e){
        return []
    }
}

const removenotes = (title)=>{
    const notes=loadnotes()

     const duplicatenotes = notes.filter((note)=>note.title!==title)
     

     if(duplicatenotes.length<notes.length){
        console.log(chalk.green.inverse("Note Removed 😘"));
     }
     else{
        console.log(chalk.red.inverse("No Note Found"));
     }

    savenotes(duplicatenotes)
}


const listnotes = ()=>{
    const notes=loadnotes()

    console.log(chalk.green("      YOUR  NOTES   "))

     notes.forEach((note) => {
        console.log()
        console.log(  chalk.yellow("title: ")+ chalk.red(note.title))
        console.log(  chalk.yellow("Body: ")+ chalk.red(note.body)) 
       
        
    })

}
const readnotes = (title)=>{

    const notes=loadnotes()

    const note = notes.find((note)=>note.title===title)

    if(note){
        
            console.log()
            console.log(  chalk.yellow("title: ")+ chalk.grey.inverse(note.title))
            console.log(  chalk.yellow("Body: ")+ chalk.grey.inverse(note.body)) 
    }
    else{
        console.log(chalk.red.inverse("Note Not Found"))
    }

}

module.exports={
    readnotes:readnotes,
    listnotes:listnotes,
    removenotes:removenotes,
    getnotes: getnotes,
    addnote:addnote
}