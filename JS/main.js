let signupName = document.getElementById('signupName');
let signupEmail = document.getElementById('signupEmail');
let signupPassword = document.getElementById('signupPassword');
let warningMsg = document.getElementById('exist');
let signUpArray = JSON.parse(localStorage.getItem('users')) || [];

let sessionUser = localStorage.getItem('sessionUsername');
if (sessionUser) {
    document.getElementById('username').innerHTML = `Welcome, ${sessionUser}`;
}

function validateInputs() {
    return signupName.value !== "" && signupEmail.value !== "" && signupPassword.value !== "";
}

function validateEmail(email) {
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,}$/;
    return emailPattern.test(email);
}

function isEmailExist() {
    return signUpArray.some(user => user.email.toLowerCase() === signupEmail.value.toLowerCase());
}

function signUp() {

    if (!validateInputs()) {
        warningMsg.classList.remove('d-none');
        warningMsg.style.color = "#E74C3C";
        warningMsg.style.fontWeight = "bold";
        warningMsg.innerHTML = "Oops! All fields are required. Please fill in the missing information.";
        return false;
    }

    if (!validateEmail(signupEmail.value)) {
        warningMsg.classList.remove('d-none');
        warningMsg.style.color = "#F39C12";
        warningMsg.style.fontWeight = "bold";
        warningMsg.innerHTML = "Oops! The email format is invalid. Please enter a valid email address.";
        return false;
    }

    if (isEmailExist()) {
        warningMsg.classList.remove('d-none');
        warningMsg.style.color = "#E74C3C";
        warningMsg.style.fontWeight = "bold";
        warningMsg.innerHTML = "Sorry, this email is already registered. Try a different one.";
        return false;
    }

    let newUser = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    };

    signUpArray.push(newUser);
    localStorage.setItem('users', JSON.stringify(signUpArray));
    warningMsg.classList.remove('d-none');
    warningMsg.style.color = "#27AE60";
    warningMsg.style.fontWeight = "bold";
    warningMsg.innerHTML = "Congratulations! You've successfully registered.";
    return true;
}

function isLoginValid() {
    return signinEmail.value !== "" && signinPassword.value !== "";
}

function login() {
    if (!isLoginValid()) {
        document.getElementById('incorrect').innerHTML = '<span style="color: #E74C3C; font-weight: bold;">Please fill in both fields.</span>';
        return false;
    }
    let email = signinEmail.value.toLowerCase();
    let password = signinPassword.value;
    let user = signUpArray.find(user => user.email.toLowerCase() === email && user.password === password);
    if (user) {
        localStorage.setItem('sessionUsername', user.name);
        location.href = 'home.html';
        return true;
    } else {
        document.getElementById('incorrect').innerHTML = '<span style="color: #E74C3C; font-weight: bold;">Oops! Incorrect email or password.</span>';
        return false;
    }
}
function logout() {
    localStorage.removeItem('sessionUsername');
    location.replace(baseURL + '/index.html');
}
