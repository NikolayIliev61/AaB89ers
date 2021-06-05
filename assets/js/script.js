// ===================== WordPress CONNECTION ====================

// getting the auth token for private posts using WP admin credentials
function getToken(){
    // fetching for the token by using the jwt-auth extension in WP
    fetch('https://www.buckledown.dk/wp-json/jwt-auth/v1/token',{
        // corecting the default GET to POST method
        method: 'POST',
        // passing the WP admin credentials
        body: JSON.stringify( {
            username: 'api.user',
            password: 'API-key-1234#!'
        }),
        
        headers: {
            'Content-Type': 'application/json'
        }
    })
    // making the response JSON format
    .then(response => response.json())
    // saving the token into the local stage
    .then (response => window.localStorage.setItem('authToken', response.token))
}
// calling the function
getToken()


// fetching all private posts
function getData(){
    // fetch all private posts from the WP server
    fetch('https://www.buckledown.dk/wp-json/wp/v2/posts?status=private', {
        // adding authorization header with the token taken from the local storage
        headers: {
            "Authorization" : `Bearer ${window.localStorage.getItem('authToken')}`
        }
    })
    // make the reponse into JSON format
    .then(response => response.json())
    .then(response => console.log(response))

}

getData()



// ================ BODY ==================
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
