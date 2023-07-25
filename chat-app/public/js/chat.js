const socket = io()

const $messageform = document.querySelector('#message-form')
const $messageforminput = document.querySelector('input')
const $messageformbutton = document.querySelector('button')
const $sendLocationButton = document.querySelector('#loc')
const $messages = document.querySelector('#messages')


const messagetemplate = document.querySelector('#message-template').innerHTML
const locationtemplate = document.querySelector('#location-template').innerHTML
const sidebartemplate = document.querySelector('#sidebar-template').innerHTML

const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix: true})

const autoscroll =()=>{
    const $newmessage = $messages.lastElementChild

    const newmessagestyles = getComputedStyle($newmessage)
    const newmessagemargin = parseInt(newmessagestyles.marginBottom)
    const newmessageheight = $newmessage.offsetHeight + newmessagemargin

    const visibleheight = $messages.offsetHeight

    const containerheight = $messages.scrollHeight

    const scrolloffset = $messages.scrollTop + visibleheight

    if(containerheight - newmessageheight <= scrolloffset){
        $messages.scrollTop = $messages.scrollHeight
    }


}

socket.on('message',(message)=>{
    console.log(message)
    const html = Mustache.render(messagetemplate,{
        username:message.username,
        message:message.text,
        createdat: moment(message.createdat).format('h:m a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
})


socket.on('locationmessage',(location)=>{
    console.log(location)
    navigator.geolocation.getCurrentPosition((position)=>{
        const html = Mustache.render(locationtemplate,{
            username:location.username,
            location:location.url,
            createdat: moment(location.createdat).format('h:m a')
        })
        $messages.insertAdjacentHTML('beforeend',html)
     })
     autoscroll()
    
})

socket.on('roomdata',({room,users})=>{
    const html = Mustache.render(sidebartemplate,{
       room,
       users
    })
    document.querySelector('#sidebar').innerHTML = html
})

$messageform.addEventListener('submit',(e)=>{
    e.preventDefault()

    // const message= document.querySelector('input').value
    // or
    const message = e.target.elements.message.value
    //message is name of input


    $messageformbutton.setAttribute('disabled','disabled')
    $messageforminput.value= ''
    $messageforminput.focus()
    

    socket.emit('sendmes',message,(error)=>{
        $messageformbutton.removeAttribute('disabled')

        if(error){
            return console.log(error)
        }
        console.log('delivered')
    }) 
})

$sendLocationButton.addEventListener('click',()=>{

    $sendLocationButton.setAttribute('disabled','disabled');


    navigator.geolocation.getCurrentPosition((position)=>{
        
       socket.emit('sendloc',{
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
       },()=>{
        $sendLocationButton.removeAttribute('disabled')
        console.log('location shared')
       })
    })
})

socket.emit('join',{username,room},(error)=>{

})

