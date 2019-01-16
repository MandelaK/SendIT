function changeDestination() {
    let destination = document.getElementById('new-d').value;
    let parcel_id = window.location.search.split('parcel_id=')[1];
    const url = 'https://sendit-api-v2-keith.herokuapp.com/api/v2/parcels/' + parcel_id + '/destination';
    fetch(url, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('token')
         },
        body: JSON.stringify({
        destination: destination
    })
})

    .then(res => res.json())
    .then(data => {
        console.log(data);
        let success = data['Success'];
        let error = data['Error'];

        if (success) {
            document.getElementById('success-feedback').innerHTML = success;
        }

        else {
            document.getElementById('error-feedback').innerHTML = error;
        }
    });
}
