const express = require('express');
const path = require('path');
const fs = require('fs');
const { json } = require('body-parser');
const { stringify } = require('querystring');

const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.post('/api/login', (req, res) => {
    var user = req.body;
    const jsonPath = path.join(__dirname, 'users.json');

    try {
        const users = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        let czyTakiIstnieje = false;
        console.log("dane: ");
        console.log(user);
        for(let i = 0; i < users.length; i++) {
            if(users[i]["email"] === user["email"] && users[i]["password"] === user["password"]) {
                czyTakiIstnieje = true;
                res.json({success: true, ID : i})
                break;
            }

        }
        if(!czyTakiIstnieje) {
            res.json({success : false, ID : -1})
        }


    } catch(err) {
        console.log("blad odczytu pliku");
        res.status(500).json({error: "blad oczytu pliku"});
    }

})
function isPasswordValid(password) {
let specialSigns = '!@#$%^&*()_-+=}]{[|":;>.<,?/~`';
        let passwordString = password;
        let isThereSpecialSign = false;
        let isThereBigLetters = false;

        if(passwordString.length < 8) 
            return false;

        for (let i = 0; i < passwordString.length; i++) {
            if ( passwordString[i] === passwordString[i].toUpperCase() &&
                                    /^[A-Z]$/.test(passwordString[i])
                ) {
                isThereBigLetters = true;
                break;
            }
        }

        if(!isThereBigLetters)
            return false;

        for(let i = 0; i < specialSigns.length; i++) {
            if( passwordString.includes(specialSigns[i])) {
                isThereSpecialSign = true;
                break;
            }
        }

        if(!isThereSpecialSign)
            return false;

        return true;
}
app.post('/api/register', (req, res) => {
    var {email, password, name, surename} = req.body;
    const jsonPath = path.join(__dirname, 'users.json');
    
    try {
        var users = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        const validPassword = isPasswordValid(password);
        const validemail = true;

        for(let i = 0; i < users.length; i++) {
            if(email === users[i]["email"]) {
                validemail = false;
                break;
            }
        }

        if(validPassword) {
            let newUser = {name, surename, email, password, "tasks" : []}
            users.push(newUser);
            fs.writeFileSync(jsonPath, JSON.stringify(users, null, 2), 'utf-8');
            res.json({successRegister : true});
        } else if(!validemail) {
            console.log("taki mail juz istnieje")
            res.json({successRegister : false, messageMail : "taki mail istnieje"});
        } else {
            console.log("haslo nie spelnia zalecen");
            res.json({successRegister : false, messagePassword : "haslo nie spelnia zlecen"});
        }

    } catch(err) {
        console.log("blad przyu rejestracji");
        res.json({successRegister : false});
    }

})

app.post('/api/getData', (req, res) => {
    var user = req.body;
    const jsonPath = path.join(__dirname, 'users.json');
    try {
        const users = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        const tasks = users[user["id"]]["tasks"];
        console.log(tasks);
        res.json({success : true, tasks : tasks});

    } catch (err) {
        console.log("bladdd");
        res.status(404).json({error: "blad odczytu"});
    }

})

app.post('/api/addTask', (req, res) => {
    const dataPath = path.join(__dirname, 'users.json');
    const {id, topic, date, description} = req.body;
    const jsonPath = path.join(__dirname, 'users.json');
    var tasks = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    let t1 =  { topic, date, description }
    tasks[id].tasks.push(t1);
    fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2), 'utf8');
})

app.post('/api/deleteTask', (req, res) => {
    const jsonPath = path.join(__dirname, 'users.json');
    const {id, userID} = req.body;
    var dataBase = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    try{
        console.log(req.body);
        console.log(dataBase[userID].tasks[id]);
        dataBase[userID].tasks.splice(id - 1, 1);
        fs.writeFileSync(jsonPath, JSON.stringify(dataBase, null, 2));
        res.json({success : true});
        console.log("usunieto zadnaie");
    } catch(err) {
        console.log("blad");
    }
        
    
})



app.listen(PORT, () => {
    console.log(`serwer dziala na porcie: ${PORT}`);

})
