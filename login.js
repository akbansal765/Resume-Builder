const username = document.querySelector('.input_username');
const password = document.querySelector('.input_password');

const loginBtn = document.querySelector('.login_btn');

loginBtn.addEventListener('click', function(){

    const _username = username.value;
    const _password = password.value;

    // getting credentials from local storage
    const user = JSON.parse(localStorage.getItem(`${_username}`));

    // if the required user does not exist or typed password is wrong
    if(!user || _password !== user.password) alert('Incorrect username or password, please try agian!');

    if(!user) return;
    
    // if the username and password matched redirect user to main window
    if(_username === user.username && _password === user.password) window.open('/main_window.html');

});
