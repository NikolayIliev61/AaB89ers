const bodyHeader = document.querySelector('#bodyHeader');

bodyHeader.innerHTML = `

<div class="header-wrapper">
<img class="logo" src="assets/media/logo.png">
<ul>
    <li>GET STARTED</li>
    <li>TEAMS</li>
    <li>HISTORY</li>
    <li>CONTACTS</li>
    <li><i class="fab fa-facebook-square fa-lg"></i></li>
    <li><i class="fab fa-instagram-square fa-lg"></i></li>
</ul>

</div>

`;

// var username = "api.user";
var secret = "API-key-1234#!";
console.log(window.localStorage.getItem('authToken'))

function getToken(){
    fetch('https://www.buckledown.dk/wp-json/jwt-auth/v1/token',{
        method: 'POST',
        body: JSON.stringify( {
            username: 'api.user',
            password: 'API-key-1234#!'
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then (response => window.localStorage.setItem('authToken', response.token))
}

getToken()

function getData(){
    fetch('https://www.buckledown.dk/wp-json/wp/v2/posts?status=private', {
        headers: {
            "Authorization" : `Bearer ${window.localStorage.getItem('authToken')}`
        }
    })
    .then(response => response.json())
    .then(response => console.log(response))

}

getData()