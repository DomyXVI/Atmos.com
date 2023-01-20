var emailContainer = document.getElementById('email');
var passwordContainer = document.getElementById('password');
var repeatPasswordContainer = document.getElementById('repeatPassword');
var signUpForm = document.getElementById('signUpForm');

signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm(emailContainer.value, passwordContainer.value, repeatPasswordContainer.value);
});

function checkEmail(email) {
    let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(email)) {
        emailContainer.style.border = "1.5px solid red";
        return false;
    } else {
        emailContainer.style.border = "1.5px solid green";
        return true;
    }
}

function checkPassword(password) {
    let pattern = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
    if (!pattern.test(password)) {
        passwordContainer.style.border = "1.5px solid red";
        document.getElementById("pswStatus").style.display = "block";
        return false;
    } else {
        passwordContainer.style.border = "1.5px solid green";
        document.getElementById("pswStatus").style.display = "none";
        return true;
    }
}

function isEqualTo(repeatPassword) {
    if ((repeatPassword === '' || passwordContainer.value === '')) return;
    if (repeatPassword === passwordContainer.value && checkPassword(passwordContainer.value)) {
        repeatPasswordContainer.style.border = "1.5px solid green";
        return true;
    } else {
        repeatPasswordContainer.style.border = "1.5px solid red";

        return false;
    }
}

function isFilled() {
    let flag = true;
    for (let input of document.getElementsByTagName('input')) {
        if (input.value === '') {
            input.style.border = "1.5px solid orange";
            flag = false;
        }
    }
    return flag;
}

function validateForm(email, password, repeatPassword) {

    if (isFilled() && checkEmail(email) && checkPassword(password) && isEqualTo(repeatPassword)) {
        signUpForm.submit();
    } else {
        document.getElementById("pswStatus").style.display = "none";
        console.log("ERR");
        return;
    }
}



/*

let inputs = signUpForm.elements;
console.log(inputs);

for (let i = 0; i < inputs.length - 1; i++) {
    inputs[i].onkeyup = function () {
        checkInputs();
    }
}

function checkInputs() {
    let isValid = true;
    for (let i = 0; i < inputs.length; i++) {

        if (inputs[i].value.trim() === "") {
            console.log(inputs[i].placeholder + "is not valid")
            isValid = false;
            break;
        }
    }
    if (isValid) {
        document.getElementById("signUpButton").classList.remove("button-disabled");
        document.getElementById("signUpButton").style.pointerEvents = "all";
    } else {
        document.getElementById("signUpButton").classList.add("button-disabled");
        document.getElementById("signUpButton").style.pointerEvents = "none";
    }
}*/