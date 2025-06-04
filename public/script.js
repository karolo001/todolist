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
class Person {

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

}
class PersonToLogin extends Person {
    constructor(email, password) {
        super(email, password);
    }
    greet() {
        console.log([this.email, this.password])
    }
}
class PersonToRegister extends Person {
    constructor(email, password, name, surename,) {
        super(email, password);
        this.name = name;
        this.surename = surename;
    }
    isPasswordValid() {
        let specialSigns = '!@#$%^&*()_-+=}]{[|":;>.<,?/~`';
        let passwordString = this.password;
        let isThereSpecialSign = false;
        let isThereBigLetters = false;

        if(passwordString.length < 8) 
            return false;
        console.log(1);
        for (let i = 0; i < passwordString.length; i++) {
            if ( passwordString[i] === passwordString[i].toUpperCase() &&
                                    /^[A-Z]$/.test(passwordString[i])
                ) {
                isThereBigLetters = true;
                break;
            }
        }
        console.log(2)
        if(!isThereBigLetters)
            return false;

        for(let i = 0; i < specialSigns.length; i++) {
            if( passwordString.includes(specialSigns[i])) {
                isThereSpecialSign = true;
                break;
            }
        }
        console.log(3)
        if(!isThereSpecialSign)
            return false;

        return true;

    }
    greet() {
        console.log([this.email, this.password, this.name, this.surename]);
    }


}

function LoginRegister() {
    const loginRegisterButton = document.getElementById('loginRegisterButton');
    var email;
    var password;
    

    loginRegisterButton.addEventListener('click', function() {
        if(mode === "Login") {
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const email = emailInput.value;
            const password = passwordInput.value;
            console.log(email);
            fetch('/api/login', {
            method: 'POST', // ← KLUCZOWE
            headers: {
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({ email, password })
            
            })
            .catch(err => {
                console.log("error");
            });

        } else if(mode === "Register") {
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const nameInput = document.getElementById('name');
            const surenameInput = document.getElementById('surename');
            Register(emailInput.value, passwordInput.value, nameInput.value, surenameInput.value);
        } else {
            console.error("blad");
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

function isLoginValid(email, password) {
    return true;
}
function isRegisterValid(email, password, name, surename) {
    return true;
}

function LogIn(email, password) {
    var User = new PersonToLogin(email, password);
    User.greet();
    localStorage.setItem("USER", email);
    window.location.href = "loged.html";


}
function Register(email, password, name, surename) {
    var User = new PersonToRegister(email, password, name, surename);
    User.greet();

}

changeMode();
passwordVisible();
LoginRegister();



