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
        let output = document.getElementById('create-output');
        let success = data['Success'];
        let error = data['Error'];

        if (success) {
            output.innerHTML = success + ' You can go back to your profile or make another order';
        }

        else {
            output.innerHTML = error + '! Please try that again';
        }
    })
}
