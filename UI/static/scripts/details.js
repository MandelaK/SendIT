let parcel_id = window.location.search.split('parcel_id=')[1];
const url = 'https://sendit-api-v2-keith.herokuapp.com/api/v2/parcels/' + parcel_id;

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

window.onload = function(e) {
    e.preventDefault();
    if (!window.localStorage.getItem('is_admin')) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
        }
    })

    .then(res => res.json())
    .then(data => {
        let error = data['Error'];

        if (!error) {
        let parcel = data['Parcel'];

        document.getElementById('user-note').innerHTML =
        `Hello ${window.localStorage.getItem('email')}, here are the details regarding your Parcel Order`;
        let output = `
            <table class="order-details">
              <tr>
                <th class="order-h">Parcel ID</th>
                <td>${parcel['parcel_id']}</td>
              </tr>
              <tr>
                <th class="order-h">Parcel Name</th>
                <td>${parcel['parcel_name']}</td>
              </tr>
              <tr>
                <th class="order-h">Created by</th>
                <td>${parcel['sender_email']}</td>
              </tr>
              <tr>
                <th class="order-h">Recipient</th>
                <td>${parcel['recipient_name']}</td>
              </tr>
              <tr>
                <th class="order-h">Pickup Location</th>
                <td>${parcel['pickup_location']}</td>
              </tr>
              <tr>
                <th class="order-h">Current Location</th>
                <td>${parcel['current_location']}</td>
              </tr>
              <tr>
                <th class="order-h">Destination</th>
                <td>${parcel['destination']}</td>
              </tr>
              <tr>
                <th class="order-h">Weight</th>
                <td>${parcel['weight']}</td>
              </tr>
              <tr>
                <th class="order-h">Price</th>
                <td>${parcel['price']}</td>
              </tr>
              <tr>
                <th class="order-h">Status</th>
                <td>${parcel['status']}</td>
              </tr>
            </table>
        `;
        document.getElementById('order-section').innerHTML = output;


}})}
    else {
        redirect: window.location.replace("admin.html?parcel_id=" + parcel_id);
    };}





