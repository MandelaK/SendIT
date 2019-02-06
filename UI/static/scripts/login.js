const url = 'https://sendit-api-v2-keith.herokuapp.com/api/v2/auth/login';

if (window.localStorage.getItem('email') == null) {
        document.getElementById('logstatus').innerHTML = 'Log In';
        document.getElementById('logstatus').setAttribute('href', 'login.html');
        document.getElementById('logstatusb').innerHTML = 'Sign Up';
        document.getElementById('logstatusb').setAttribute('href', 'register.html');

    }

let login = document.getElementById('login');

if (window.localStorage.getItem('email') || window.localStorage.getItem('token')) {
    redirect: window.location.replace('profile.html');
}
login.onclick = function(e) {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(
            {email: email,
            password: password})
    })
    .then(res => res.json())
    .then(data => {
        let success = data['Success'];
        let error = data['Error'];

        if (success) {
            window.localStorage.setItem('token', data["token"]);
            if (data['admin']) {
                window.localStorage.setItem('is_admin', data['admin']);
                window.localStorage.setItem('email', data['email']);
                redirect: window.location.replace('profile.html');
                console.log(success);
            }
            else {redirect: window.location.replace('profile.html');
            window.localStorage.setItem('email', data['email']);
                console.log(success);
        }}

        else if (error) {
            document.getElementById('error-output').innerHTML = error;
            window.scrollBy(0, -window.innerHeight);
            console.log(error);

            document.getElementById('password').value = '';
        }
    }
    )}
