const express = require('express');
const path = require('path');
const fs = require('fs');
const { json } = require('body-parser');

const app = express();
const PORT = 8000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

app.post('/api/login', (req, res) => {
    var dane = req.body;
    const jsonPath = path.join(__dirname, 'users.json');

    try {
        const users = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        let czyTakiIstnieje = false;
        console.log("dane: ");
        console.log(dane);
        


    } catch(err) {
        console.log("blad odczytu pliku");
        res.status(500).json({error: "blad oczytu pliku"});
    }

})

app.listen(PORT, () => {
    console.log(`serwer dziala na porcie: ${PORT}`);

})
