let id = window.location.search.split('parcel_id=')[1];
const u = 'https://sendit-api-v2-keith.herokuapp.com/api/v2/parcels/' + id;

window.onload = function(parcel_id) {

    if (!window.localStorage.getItem('is_admin')) {
        redirect: window.location.replace('profile.html');
    }

    else {
        document.getElementById('logstatusb').innerHTML = 'Log Out';
        document.getElementById('logstatusb').setAttribute('href', '#');
        document.getElementById('logstatusb').setAttribute('onclick', 'logout()');
        document.getElementById('prof-status').innerHTML = 'Profile';
        document.getElementById('prof-status').setAttribute('href', 'profile.html');

    fetch(u, {
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

        document.getElementById('admin-note').innerHTML =
        `Hello ${window.localStorage.getItem('email')}, You can use this page to change the status and current location of this specific order`;
        document.getElementById('admin-note').setAttribute('class', 'container');
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
}
