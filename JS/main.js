var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');
var pathparts = location.pathname.split('/');
var baseURL = '';
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i];
}
console.log(baseURL);
var username = localStorage.getItem('sessionUsername');
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username;
}
var signUpArray = [];
if (localStorage.getItem('users') == null) {
    signUpArray = [];
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'));
}
function isEmpty() {
    return signupName.value !== "" && signupEmail.value !== "" && signupPassword.value !== "";
}
function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === signupEmail.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}
function signUp() {
    if (!isEmpty()) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All fields are required.</span>';
        return false;
    }
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    };
    if (isEmailExist()) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists.</span>';
        return false;
    } else {
        signUpArray.push(signUp);
        localStorage.setItem('users', JSON.stringify(signUpArray));
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Registration successful.</span>';
        return true;
    }
}
function isLoginEmpty() {
    return signinEmail.value !== "" && signinPassword.value !== "";
}
function login() {
    if (!isLoginEmpty()) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All fields are required.</span>';
        return false;
    }
    var email = signinEmail.value.toLowerCase();
    var password = signinPassword.value;
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === email && signUpArray[i].password === password) {
            localStorage.setItem('sessionUsername', signUpArray[i].name);
            if (baseURL === '/') {
                location.replace('https://' + location.hostname + '/home.html');
            } else {
                location.replace(baseURL + '/home.html');
            }
            return true;
        }
    }
    document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">Incorrect email or password.</span>';
    return false;
}
function logout() {
    localStorage.removeItem('sessionUsername');
    location.replace(baseURL + '/index.html');
}
