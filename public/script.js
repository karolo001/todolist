var mode = "Login";

function passwordVisible() {

    const passwordLabel = document.getElementById('passwordlabel');
    const passwordInput = document.getElementById('password');
    var ifPasswordhasMouse = false;
    const formToLogin = document.getElementById('form');
    const eye = document.getElementById('eye');
    var urlToEye = 'url("eye.png")';

    passwordLabel.addEventListener('mouseenter', function() {
        eye.style.pointerEvents = "auto";
        eye.style.backgroundImage = urlToEye;
        ifPasswordhasMouse = true;
        console.log(ifPasswordhasMouse);
        let width = passwordLabel.offsetHeight;

    });
    passwordLabel.addEventListener('mouseleave', function() {
        eye.style.pointerEvents = "none";
        eye.style.backgroundImage = 'url("")';
        ifPasswordhasMouse = false;
        console.log(ifPasswordhasMouse);

    });
    eye.addEventListener('click', function() {
        console.log("clicked");
        if(urlToEye === 'url("eye.png")'){

            urlToEye = 'url("hidden.png")';
            passwordInput.type = 'text';
            
        }else {
            urlToEye = 'url("eye.png")';
            passwordInput.type = 'password';
        }
        console.log(passwordInput.type);
        eye.style.backgroundImage = urlToEye;
        
    })

}

function LoginRegister() {
    const loginRegisterButton = document.getElementById('loginRegisterButton'); 

    loginRegisterButton.addEventListener('click', function() {
        if(mode === "Login") {
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const email = emailInput.value;
            const password = passwordInput.value;
            
            if(email.length > 0 && password.length > 0 ) {

                fetch('/api/login', {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json'},
                    
                    body: JSON.stringify({ email, password })
                
                })
                .then(res => res.json())
                .then(data => {
                    if(data.success) {
                        console.log("zalgowano");
                        console.log(data);

                        localStorage.setItem("USER", email);
                        localStorage.setItem("DBID", data.ID);
                        window.location.href = "loged.html";        

                    } else {
                        alert("zle dane sprobuj jeszcze raz");

                    }
                })
                

                .catch(err => {
                    console.log("error");
                });
            }
        } else if(mode === "Register") {
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const nameInput = document.getElementById('name');
            const surenameInput = document.getElementById('surename');
            const email = emailInput.value;
            const password = passwordInput.value;
            const name = nameInput.value;
            const surename = surenameInput.value;

            if(email.length > 0 && password.length > 0 && name.length > 0 && surename.length > 0) {

                fetch('/api/register', {

                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},   
                    body: JSON.stringify({ email, password, name, surename })
                })
                .then(res => res.json())
                .then(data => {
                    if(data.successRegister) {
                        alert("pomyslnie zarejestorwano");
                        Register(email, password, name, surename);
                    } else {
                        if(data.messageMail.length > 0) {
                            console.log("zly mail");
                        } else if(data.messagePassword.length > 0) {
                            console.log("zle haslo");
                        }
                    }
                })

                .then(window.location.href = "index.html");
                } else {
                    console.error("blad");
                }
                
            }     
    });

}
function changeMode() {

    const regBut = document.getElementById('changeMode');
    regBut.addEventListener('click', function(e) {

        if(mode === "Login")
            mode = "Register";
        else 
            mode = "Login";
        console.log(mode);
        const form = document.getElementById('form');
        const login = document.getElementById('login');
        login.style.height = mode === "Login" ? "70%" : "82%";
        login.style.marginTop = "5%";
        let coWpisac = mode === "Register" ? "Zarejestruj sie" : "Zaloguj sie";
        let coWpisac1 = mode === "Register" ? "Zaloguj sie" : "Zarejestruj sie";
        let coWpisac2 = mode === "Register" ? "Rejestracja" : "Logowanie";
        
        form.innerHTML = `<h1>${coWpisac2}</h1>`;
        form.innerHTML += '<label> <input type = "email" id="email" placeholder="podaj email" ></label>';
        form.innerHTML += '<label id="passwordlabel" > <input type = "password" id="password" placeholder="podaj haslo" > <button id="eye" ></button></label>';
        if(mode === "Register") {
            form.innerHTML += '<label> <input type="text" id="name" placeholder="Podaj imie"><label>';
            form.innerHTML += '<label> <input type="text" id="surename" placeholder="Podaj nazwisko"><label>';
        }

        form.innerHTML += `<button id="loginRegisterButton" >${coWpisac}!</button>`;
        form.innerHTML += `<button id="changeMode" >${coWpisac1}!</button>`;
        changeMode();
        passwordVisible();
        LoginRegister();
    })
}


changeMode();
passwordVisible();
LoginRegister();



