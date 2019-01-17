let p_id = window.location.search.split('parcel_id=')[1];
// const url = 'https://sendit-api-v2-keith.herokuapp.com/api/v2/parcels/' + parcel_id + '/presentLocation';

function changeLocation(parcel_id) {
    let location = document.getElementById('current-loc').value;

    fetch('https://sendit-api-v2-keith.herokuapp.com/api/v2/parcels/' + p_id + '/presentLocation', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
         },
        body: JSON.stringify({
        current_location: location
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
