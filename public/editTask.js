const date = localStorage.getItem("DATE");
const description = localStorage.getItem("DESCRIPTION");
const topic = localStorage.getItem("TOPIC");

const dateContainer = document.getElementById('date');
const descriptionContainer = document.getElementById('description');
const topicContainer = document.getElementById('topic');
let doComeBack = true;

dateContainer.innerText += "  " + date;
descriptionContainer.value += description;
topicContainer.innerHTML += topic;

const comeBack = document.getElementById('comeBack');
comeBack.addEventListener('click', function() {
    if(doComeBack)
        window.location.href = "loged.html";
    else {
        fetch('/api/editTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},      
            body: JSON.stringify({"taskID" : localStorage.getItem("TASKID"), "userID" : localStorage.getItem("DBID"), "newDescription" : newDescription})
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                console.log("zedytowano");
            }
        })
        .then(() => window.location.href = "loged.html");
    }
})
var originalDescription = description;
var newDescription = description;


descriptionContainer.addEventListener('input', function() {
    newDescription = descriptionContainer.value;
    console.log([originalDescription, newDescription]);
    if (newDescription !== originalDescription) {
        comeBack.innerText = "Zapisz i Wroc";
        console.log("zapisywanie");
        doComeBack = false;
    }
})
