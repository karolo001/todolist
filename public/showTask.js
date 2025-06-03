const date = localStorage.getItem("DATE");
const description = localStorage.getItem("DESCRIPTION");
const topic = localStorage.getItem("TOPIC");

const dateContainer = document.getElementById('date');
const descriptionContainer = document.getElementById('description');
const topicContainer = document.getElementById('topic');

dateContainer.innerText += "  " + date;
descriptionContainer.innerHTML += description;
topicContainer.innerHTML += topic;

const comeBack = document.getElementById('comeBack');
comeBack.addEventListener('click', function() {
    window.location.href = "loged.html";

})