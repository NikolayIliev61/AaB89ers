// ===================== VARIABLES ====================

let program = document.querySelector('#programWrapper');
let sliders = document.querySelector('#sliders')
let counterPosts = 0;
const bodyHeader = document.querySelector('#bodyHeader');
const footer = document.querySelector('#footer')

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
            counterPosts ++;
            program.innerHTML += `
            <div class = "game game--${counterPosts}" style="width:100%; height:100%; position: absolute; left:${index*100}%; top:0;">
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
        `;
        if(index == 0){
            sliders.innerHTML += `
            <div class="rectangle rectangle-current"></div>
        `    
        }else{
            sliders.innerHTML += `
            <div class="rectangle"></div>
        `  
        }
        }
    }))
}

getData()

// ================ HEADER ==================


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

footer.innerHTML= `
    <div class="wrapper">
        <div>
            <img class="logo" src="assets/media/logo.png">
        </div>
        <div class="footer-address">
            <h3>Hornevej 2, 9220 Aalborg Øst</h3>
            <h3>60 23 55 29</h3>
            <h3>chairman@89ers.dk</h3>
        </div>
        <div class='footer-some'>
            <ul>
                <li><i class="fab fa-facebook-square fa-lg"></i></li>
                <li><i class="fab fa-instagram-square fa-lg"></i></li>
            </ul>
        </div>
    </div>
    <div class = 'copyrights' >
        <h3>Copyright of mmdi0920/Group2</h3>
        <h3>Member of the Danish American Football Association</h3>
    </div>
`;