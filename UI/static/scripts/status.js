let parcel_id = window.location.search.split('parcel_id=')[1];
const url = 'https://sendit-api-v2-keith.herokuapp.com/api/v2/parcels/' + parcel_id + '/status';


function changeStatus() {
    let status = document.getElementById('status').value;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
                },
        body: JSON.stringify({
            status: status
        })
        })

    .then(res => res.json())
    .then(data => {
        let success = data['Success'];
        let error = data['Error'];

        if (success) {
            document.getElementById('admin-success').innerHTML = success;
        }

        else {
            document.getElementById('admin-error').innerHTML = error;
        }
    });

}
