const addTaskButton = document.getElementById('addTask');

addTaskButton.addEventListener('click', function() {
    const topic = document.getElementById('topicInput').value;
    const date = document.getElementById('dateInput').value;
    const description = document.getElementById('description').value;
    if(topic.length > 0 && date.length > 0 && description.length > 0) {
        localStorage.setItem("TOPIC", topic);
        localStorage.setItem("DATE", date);
        localStorage.setItem("DESCRIPTION", description);
        document.body.innerHTML = ` <div id="taskHasBeenAdded" ><p>dodano taska o temacie: ${topic}</p> </div> `;
        setTimeout(() => {
            window.location.href = "loged.html";
        }, 1000);

    } else {
        alert("UZUPELNIJ WSZYSTKO");
    }
    
})