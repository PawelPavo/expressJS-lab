const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs')


app.use(express.urlencoded({ extended: false }));


//********** REQUIRED START **********
app.use((req, res, next) => {
    console.log(req.url)
    next()
})
//********** REQUIRED END **********


//********** ADVENCED START **********

let dataPath = path.join(__dirname, './contacts/data.json')

app.post('/contact-form', (req, res) => {
    fs.readFile(dataPath, (err, data) => {
        let contacts = JSON.parse(data);
        contacts.push(req.body)
        if (err) console.log(err)
        fs.writeFile(dataPath, JSON.stringify(contacts, null, 2), (err) => {
            if (err) console.log(err)
            res.send('Thank you for submitting your contact form')
        })
    })
})

app.get('/formsubmission', (req, res) => {
    fs.readFile(dataPath, (err, data) => {
        let contacts = JSON.parse(data);
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else{ 
            res.send(contacts)
        }
    })
})

app.use(express.static('public'));

app.listen(3000, () => console.log(`
****************************
        Server Runnig
****************************
`));