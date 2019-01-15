const url = 'https://sendit-api-v2-keith.herokuapp.com/api/v2/parcels';

window.onload = function() {
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
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }


        })
        .then(res => res.json())
        .then(data => {
            if (data['parcels']) {
                let output = `
                    <table id="prof-table">
                        <tr>
                            <th>Parcel ID</th>
                            <th>Parcel Name</th>
                            <th>Recipient Name</th>
                            <th>Status</th>
                            <th>Weight</th>
                            <th>Pickup Location</th>
                            <th>Current Location</th>
                            <th>Destination</th>
                        </tr>`;
                        data['parcels'].forEach(res => {
                            output += `
                                <tr>
                                    <td>${res['parcel_id']}</td>
                                    <td><a href='details.html?parcel_id=${res['parcel_id']}'>${res['parcel_name']}</a></td>
                                    <td>${res['recipient_name']}</td>
                                    <td>${res['status']}</td>
                                    <td>${res['weight']}</td>
                                    <td>${res['pickup_location']}</td>
                                    <td>${res['current_location']}</td>
                                    <td>${res['destination']}</td>
                                </tr>
                            `;}
                        );
                        document.getElementById('table-output').innerHTML = output;
                        if (window.localStorage.getItem('is_admin')) {
                            let profile = `
                            <p id="prof-info">Hello, you are currently logged in as an admin. Here are all the orders made by our users so far. </p> `
                            document.getElementById('prof-info').innerHTML = profile;

                        }
                        else { let profile = `
                            <p id="prof-info">Hello, you are currently logged in as ${window.localStorage.getItem('email')}. Here are all you deliveries so far.</P>
                        `
                        document.getElementById('prof-info').innerHTML = profile;

            };
        };
    });
};
};


