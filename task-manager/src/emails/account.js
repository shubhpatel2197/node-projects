const sgmail = require('@sendgrid/mail')

const api = process.env.sendfrid_api_key

sgmail.setApiKey(api)

sgmail.send({
    to: 'shubhpate3@gmail.com',
    from:'shsshsh@gmail.com',
    subject:'this is ',
    Text:'djedjd'
})