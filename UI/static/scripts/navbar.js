function createNav() {
    if (window.localStorage.getItem('email') == null) {
        document.getElementById('logstatus').innerHTML = 'Log In';
        document.getElementById('logstatus').setAttribute('href', 'login.html');
        document.getElementById('logstatusb').innerHTML = 'Sign Up';
        document.getElementById('logstatusb').setAttribute('href', 'register.html');
    }

    else {
        if(!window.localStorage.getItem('is_admin')){
        document.getElementById('logstatusb').innerHTML = 'Log Out';
        document.getElementById('logstatusb').setAttribute('href', '#');
        document.getElementById('logstatusb').setAttribute('onclick', 'logout()');
        document.getElementById('prof-status').innerHTML = 'Profile';
        document.getElementById('prof-status').setAttribute('href', 'profile.html');
        document.getElementById('create-status').innerHTML = 'Create Order';
        document.getElementById('create-status').setAttribute('href', 'create.html');
    }
        else {
        document.getElementById('logstatusb').innerHTML = 'Log Out';
        document.getElementById('logstatusb').setAttribute('href', '#');
        document.getElementById('logstatusb').setAttribute('onclick', 'logout()');
        document.getElementById('prof-status').innerHTML = 'Profile';
        document.getElementById('prof-status').setAttribute('href', 'profile.html');
        }
}}

createNav();
