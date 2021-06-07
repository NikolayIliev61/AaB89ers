// ===================== VARIABLES ====================
let arrays1 = [];

setTimeout(function(){
    let objects1 = document.getElementsByClassName('rectangle');
    for (let i = 0; i < objects1.length; i++){
        arrays1.push(objects1[i])
    }

    arrays1.forEach(function(el, index){
        el.addEventListener('click', function(){
            arrays1.forEach(el =>{
                el.classList.remove('rectangle-current');
            })
            program.style.left = `-${index*100}%`;
            el.classList.add('rectangle-current');
        })
    })
}, 1000);




// functionality for slider

// listen for click on rectangles
// is this the current one?
    // yes - do nothing
    // no
        // slide the slider
        // remove the properties from old rectangle
        // add the properties to new rectangle

