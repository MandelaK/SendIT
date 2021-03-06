let parcel_id = window.location.search.split('parcel_id=')[1];
const url = 'https://sendit-api-v2-keith.herokuapp.com/api/v2/parcels/' + parcel_id + '/status';


function changeStatus() {
    let status = document.getElementById('status').value;
    let confirmation = confirm('Are you sure you want to change the status?');
    if (confirmation){
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
            document.getElementById('error-output').innerHTML = '';
            document.getElementById('success-feedback').innerHTML = success + '. You will be redirected to your profile in 5 seconds.';
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

}}
