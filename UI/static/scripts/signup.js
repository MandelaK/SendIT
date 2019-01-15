const url = 'https://sendit-api-v2-keith.herokuapp.com/api/v2/auth/signup';

if (window.localStorage.getItem('email') == null) {
    document.getElementById('logstatus').innerHTML = 'Log In';
    document.getElementById('logstatus').setAttribute('href', 'login.html');
}

function resetForm() {
    document.getElementById('first_name').value = "";
    document.getElementById('last_name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.getElementById('password_repeat').value = "";
    document.getElementById('phone').value = "";
}

if (window.localStorage.getItem('email') || window.localStorage.getItem('token')) {
    redirect: window.location.replace('profile.html');
}

let login = document.getElementById('register');
register.onclick = function(e) {
    e.preventDefault();
    let first_name = document.getElementById('first_name').value;
    let last_name = document.getElementById('last_name').value;
    let email = document.getElementById('emails').value;
    let password = document.getElementById('create_password').value;
    let confirm_password = document.getElementById('password_repeat').value;
    let phone = document.getElementById('phone').value;


    fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(
            {first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            password: password,
            confirm_password: confirm_password})
    })
    .then(res => res.json())
    .then(data => {
        let success = data['Success'];
        let error = data['Error'];

        if (success) {

            document.getElementById('login-success').innerHTML = success;
            setTimeout(() => {
                redirect: window.location.replace('login.html');}, 5000);

            resetForm();
            }

        else if (error) {
            document.getElementById('login-fail').innerHTML = error;
            //resetForm();
        }});
}
