const url = 'https://sendit-api-v2-keith.herokuapp.com/api/v2/users/parcels';

if (window.localStorage.getItem('is_admin')) {
    redirect: window.location.replace('profile.html');
}

    if (window.localStorage.getItem('email') == null) {
        redirect: window.location.replace('login.html');
    }

    else {
        document.getElementById('logstatusb').innerHTML = 'Log Out';
        document.getElementById('logstatusb').setAttribute('href', '#');
        document.getElementById('logstatusb').setAttribute('onclick', 'logout()');
        document.getElementById('prof-status').innerHTML = 'Profile';
        document.getElementById('prof-status').setAttribute('href', 'profile.html');
        document.getElementById('create-status').innerHTML = 'Create Order';
        document.getElementById('create-status').setAttribute('href', 'create.html');
    }

let create = document.getElementById('create-parcel');
create.onclick = function(e) {
    e.preventDefault();
    let parcel_name = document.getElementById('parcel_name').value;
    let recipient_name = document.getElementById('recipient_name').value;
    let destination = document.getElementById('destination').value;
    let pickup = document.getElementById('pickup_location').value;
    let weight = document.getElementById('weight').value;

    fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('token'),
            'Content-Type': 'application/json'},
        body: JSON.stringify({
            parcel_name: parcel_name,
            recipient_name: recipient_name,
            pickup_location: pickup,
            destination: destination,
            weight: weight,
        })
    })

    .then(res => res.json())
    .then(data => {
        let success = data['Success'];
        let error = data['Error'];

        if (success) {
            document.getElementById('error-output').innerHTML = '';
            document.getElementById('success-feedback').innerHTML = success + ' You will be redirected to your profile in 5 seconds';
            window.scrollBy(0, -window.innerHeight);
            setTimeout(() => {
                redirect: window.location.replace('profile.html');}, 5000);
        }

        else {
            document.getElementById('success-feedback').innerHTML = '';
            document.getElementById('error-output').innerHTML = error + '! Please try that again';
            window.scrollBy(0, -window.innerHeight);
        }
    })
}
