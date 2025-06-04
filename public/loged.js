class Task {
    constructor(topic, description, date) {
        this.topic = topic;
        this.description = description;
        this.date = date;
    }
}

var Tasks = [];
var mode = "edit";

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

        deleteTask();
        console.log("usuwam");
    })

    const tasksQuery = document.querySelectorAll('.task');
    const editQuery = document.querySelectorAll('.edit');

    editQuery.forEach(edit => {
        edit.addEventListener('click', function(e) {
            if(mode != "deleting") {
                e.stopPropagation();
                console.log("klikneto edit");
                console.log(this.id);
                localStorage.setItem("MODE", "edit");
            }
        })
    });

    tasksQuery.forEach(task => {
        task.addEventListener('click', function(e) {
            console.log("klikneto zadanie z id ");
            console.log(this.id);
            let id = this.id;
            let lastSign = '';
            for(let i = 4; i < id.length; i++ ) {
                lastSign += id[i];
            }

            localStorage.setItem("MODE", "show");
            localStorage.setItem("DATE", Tasks[Number(lastSign) - 1].date);
            localStorage.setItem("DESCRIPTION", Tasks[Number(lastSign) - 1].description);
            localStorage.setItem("TOPIC", Tasks[Number(lastSign) - 1].topic);

            window.location.href = "showTask.html";

        })
    });


}

function deleteTask() {
    for(let i = 0; i < Tasks.length; i++) {
        const butt = document.getElementById(`edit${i + 1}`);
        butt.style.backgroundImage = "url('recycle-bin.png')";
    }
    mode = "deleting";
    const buttons = document.querySelectorAll('.edit');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if(mode != "edit") {
                e.stopPropagation();
                console.log(this.id);
                console.log(mode);  

                let id = this.id;
                let lastSign = '';
                for(let i = 4; i < id.length; i++ ) {
                    lastSign += id[i];
                }
                console.log(lastSign);
                let toDelete = "task" + lastSign;
                const divToDelete = document.getElementById(toDelete);
                divToDelete.remove();
                Tasks.splice(Number(lastSign) - 1 ,1);
                console.log(Tasks);
                mode = "edit";
                 for(let i = 0; i < Tasks.length; i++) {
                    const butt = document.getElementById(`edit${i + 1}`);
                    butt.style.backgroundImage = "url('edit.png')";
                }

            } 

            
        })

    })


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

    if(topic != null && date != null && description != null && topic.length > 0 && date.length > 0 && description.length > 0) {
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
        tasksContainer.innerHTML += `<div id="task${i + 1}" class="task" > <p id="topicPar${i + 1}" class="topicPar" >${topicToWrite}</p> <p id="datePar${i + 1}" class="datePar" >${dateToWrite}</p> <button id="edit${i + 1}" class="edit" ></button> </div>`

    }

}

document.addEventListener('click', function() {
    

    console.log(mode);
})

writeTasks();
addDelete()