let p_id = window.location.search.split('parcel_id=')[1];
// const url = 'https://sendit-api-v2-keith.herokuapp.com/api/v2/parcels/' + parcel_id + '/presentLocation';

function changeLocation(parcel_id) {
    let location = document.getElementById('current-loc').value;
    let confirmation = confirm('Are you sure you want to change the current location?');

    if (confirmation){
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
            document.getElementById('error-output').innerHTML = '';
            document.getElementById('success-feedback').innerHTML = success + '. You will be redirected to the profile page in 5 seconds.';
            window.scrollBy(0, -window.innerHeight);
            setTimeout(() => {
                redirect: window.location.replace('profile.html');}, 5000);
        }

        else {
            document.getElementById('success-feedback').innerHTML = '';
            document.getElementById('error-output').innerHTML = error;
            window.scrollBy(0, -window.innerHeight);
        }
    });
    }
}
