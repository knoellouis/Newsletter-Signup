const bodyParser = require('body-parser');

const express = require('express');

const request = require('request');

const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html')
});

app.post('/', function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const https = require('https');

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = 'https://us10.api.mailchimp.com/3.0/lists/a9ea1bec08';

    const options = {
        method: 'POST',
        auth: 'keitha1:4596615159a024f6cbedbbe0423a989a-us10'
    }
    
    const request = https.request(url, options, function(response){
        
        if(response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        }   else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on('data', function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData)
    request.end();
});

app.post('/failure', function(req, res){
    res.redirect('/')
});

app.listen(process.env.PORT || 3000, function(){
    
});

// API Key
// 4596615159a024f6cbedbbe0423a989a-us10

// List ID
//a9ea1bec08
