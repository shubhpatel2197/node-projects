const generateMessage = (username,text)=>{
    return {
        username,
        text,
        createdat: new Date().getTime()
    }
}

const generatelocationMessage = (username,url)=>{
    return {
        username,
        url,
        createdat: new Date().getTime()
    }
}

module.exports = {generateMessage,generatelocationMessage}