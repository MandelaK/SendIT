function logout() {
    if (window.localStorage.getItem('email' == null)) {
        window.localStorage.clear();
        redirect: window.location.replace('login.html');
    }

    else {
        window.localStorage.clear();
        redirect: window.location.replace('index.html');
    }
}
