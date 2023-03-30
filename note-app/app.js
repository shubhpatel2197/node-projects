const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

yargs.command({
    command:'add',
    describe:'ADD A NEW NOTE',
    builder:{
        title:{
            describe:'note title',
            demandOption:true,
            type:'string'
        },
        body:{
            description:'note body',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.addnote(argv.title,argv.body)
    }
})

yargs.command({
    command:'remove',
    describe:'remove a note',
    builder:{
        title:{
            describe:'NOTE title',
            demandOption: true,
            type:'string'
        }
    },
    handler(argv){
       
        notes.removenotes(argv.title)
    }
})

yargs.command({
    command:'list',
    describe:'list your notes',
    handler(){
        notes.listnotes()
    }
})

yargs.command({
    command:'read',
    describe:'read a notes',
    builder:{
        title:{
            describe:'note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
      notes.readnotes(argv.title)
    }
})

yargs.parse()