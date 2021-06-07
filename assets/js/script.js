// ===================== VARIABLES ====================

let program = document.querySelector('#programWrapper');


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
    .then(response => response.forEach(function(el, index){
        if(el.acf.typeOfPost == 'game'){
            console.log(el)
            program.innerHTML += `
            <div class = "game game--${index+1}" style="width:100%; height:100%; position: absolute; left:${index*100}%; top:0;">
                <div class="bg" style = "width:100%; height: 100%; position: absolute; top: 0; left: 0; background-image: url(${el.acf.background_img.url}); background-position: center; background-size: cover; filter: brightness(25%);"></div>
                <div class="first-team" style= "position: absolute; top: 10%; left: 15%;">
                    <img style="justify-self: center" src="${el.acf.home_team_photo.sizes.thumbnail}">
                    <h2 class="text-white team-name">${el.acf.home_team}</h2>
                </div>
                <div class="vs text-white">VS</div>
                <div class="second-team" style= "position: absolute; top: 10%; right: 15%; ">
                    <img  src = "${el.acf.guest_team_photo.sizes.thumbnail}" style="transform: scaleX(-1);">
                    <h2 class="text-white team-name">${el.acf.guest_team_name}</h2>
                </div>
                <div class="time">
                    <h3 class="text-white">${el.acf.date}</h3>
                </div>
                <div class="place text-white" >
                    <h3>${el.acf.place_of_the_game}</h3>
                </div>
            </div>
        `
        }
    }))

}

getData()


