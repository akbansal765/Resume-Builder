const fullname = document.querySelector('.input_name');
const username = document.querySelector('.input_username');
const password = document.querySelector('.input_password');

const signupBtn = document.querySelector('.signup_btn');

// getting the values of input fields after pressing sign up button

signupBtn.addEventListener('click', function(){

    const _fullname = fullname.value;
    const _username = username.value;
    const _password = password.value;

    const credentials = {
        fullname: _fullname,
        username: _username,
        password: _password
    };

    // getting credentials from local storage
    const user = JSON.parse(localStorage.getItem(`${_username}`));

    // if the same username does not exist then store the result in storage and redirect user to main window
    if(!user || user.username !== _username) {
        localStorage.setItem(`${_username}`, JSON.stringify(credentials));

        // storing full name of the user for the welcome message in main window
        localStorage.setItem('fullName', JSON.stringify(_fullname));

        window.open('../html/main_window.html');


    }
    
    // if user does not exist at the first time then return
    if(!user) return;

    // check if the username already exists on storage, if yes alert the user
    if(user.username === _username) alert('This username is already taken. Please try again!');

});