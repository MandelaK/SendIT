const url = 'https://sendit-api-v2-keith.herokuapp.com/api/v2/parcels';

window.onload = function() {
    if (window.localStorage.getItem('email') == null) {
        redirect: window.location.replace('login.html');

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
        else{
        document.getElementById('logstatusb').innerHTML = 'Log Out';
        document.getElementById('logstatusb').setAttribute('href', '#');
        document.getElementById('logstatusb').setAttribute('onclick', 'logout()');
        document.getElementById('prof-status').innerHTML = 'Profile';
        document.getElementById('prof-status').setAttribute('href', 'profile.html');
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }


        })
        .then(res => res.json())
        .then(data => {
            if (data['Error'] == 'You have no parcels made' && !window.localStorage.getItem('is_admin')) {
                let output = `
                    <p>Hello ${window.localStorage.getItem('email')}, it seems you are new here and haven't made any order. Click the link on your navigation bar or <a href='create.html'> click here</a> to make an order.</p>
                `
                let newNote = `
                    <p class='prof-note'> You have placed no orders. Please make one in order to manipulate it.</p>
                `
                document.getElementById('prof-info').innerHTML = output;
                document.getElementById('prof-note').innerHTML = newNote;

            }

            else if (data['Error'] == 'You have no parcels made' && window.localStorage.getItem('is_admin')) {
                let output = `
                    <p>Hello admin, it seems our users have not made any orders on the platform. Check back when there are more orders.. </p>
                    `
                    document.getElementById('prof-info').innerHTML = output;
            }

            else if (data['parcels']) {
                let output = `
                    <table id="prof-table">
                        <tr>
                            <th>Parcel ID</th>
                            <th>Parcel Name</th>
                            <th>Recipient Name</th>
                            <th>Status</th>
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


