class Task {
    constructor(topic, description, date) {
        this.topic = topic;
        this.description = description;
        this.date = date;
    }
}

let t1 = new Task("gowno", "jem", "2025-20-32");
var Tasks = [t1];

function addDelete() {
    const addButton = document.getElementById('add');
    const deleteButton = document.getElementById('delete');

    //wyglad/////////////////////////////////////////////////
    addButton.addEventListener('mouseenter', function() {
        addButton.classList.add('clicked');
    })

    addButton.addEventListener('mouseleave', function() {
        addButton.classList.remove('clicked');
    })

    deleteButton.addEventListener('mouseenter', function() {
        deleteButton.classList.add('clicked');
    })

    deleteButton.addEventListener('mouseleave', function() {
        deleteButton.classList.remove('clicked');
    })
    ///////////////////////////////////////////////////////////


    addButton.addEventListener('click', function () {
        
        console.log("dodaje");
        window.location.href="addTask.html"

    })
    deleteButton.addEventListener('click', function () {

        console.log("usuwam");
    })
}

function addTask() {


}
function writeTasks() {
    let topic = localStorage.getItem("TOPIC");
    let description = localStorage.getItem("DESCRIPTION");
    let date = localStorage.getItem("DATE")

    console.log([
        "localstrogae: ",
        topic,
        date,
        description
    ])
    if(topic.length > 0 && date.length > 0 && description.length > 0) {
        let t1 = new Task(topic, description, date);
        Tasks.push(t1);
        console.log(Tasks);
    }
    for(let i = 0; i < Tasks.length; i++) {
        console.log([Tasks[i].topic, Tasks[i].description, Tasks[i].date]);
    }
    const tasksContainer = document.getElementById('tasks');
    for(let i = 0; i < Tasks.length; i++) {
        let topicToWrite = Tasks[i].topic;
        let descriptionToWrite = Tasks[i].description;
        let dateToWrite = Tasks[i].date;
        tasksContainer.innerHTML += `<div id="task${i + 1}" class="task" > <p id="topicPar${i + 1}" class="topicPar" >${topicToWrite}</p> <p id="datePar${i + 1}" class="datePar" >${dateToWrite}</p> <button id="edit1" class="edit" ></button> </div>`

    }
    const tasksQuery = document.querySelectorAll('.task');
    const editQuery = document.querySelectorAll('.edit');

    editQuery.forEach(edit => {
        edit.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log("klikneto edit");
            console.log(this.id);
        })
    });

    tasksQuery.forEach(task => {
        task.addEventListener('click', function(e) {
            console.log("klikneto zadanie z id ");
            console.log(this.id);

        })
    });


}

writeTasks();
addDelete()