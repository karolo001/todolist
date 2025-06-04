const addTaskButton = document.getElementById('addTask');

addTaskButton.addEventListener('click', function() {
    const topic = document.getElementById('topicInput').value;
    const date = document.getElementById('dateInput').value;
    const description = document.getElementById('description').value;
    if(topic.length != null && date.length != null && description.length != null && topic.length > 0 && date.length > 0 && description.length > 0) {
        
        fetch('api/addTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
                    
            body: JSON.stringify({
                "id" : localStorage.getItem("DBID"),
                "topic" : topic,
                "date" : date,
                "description" : description
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                console.log("dodano pomyslnie");
            }
        })
        .catch(err => {
            
            console.log("blad");
        })

        

        document.body.innerHTML = ` <div id="taskHasBeenAdded" ><p>dodano taska o temacie: ${topic}</p> </div> `;
        setTimeout(() => {
            window.location.href = "loged.html";
        }, 1000);

    } else {
        alert("UZUPELNIJ WSZYSTKO");
    }
    
})