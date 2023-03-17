// let loginForm = document.querySelector('.login-form');

// document.querySelector('#close-login-form').onclick = () =>{
//    loginForm.classList.remove('active');
// }

// let menu = document.querySelector('#menu-btn');
// let navbar = document.querySelector('.header .nav');

// menu.onclick = () =>{
//    menu.classList.toggle('fa-times');
//    navbar.classList.toggle('active');
// }

// window.onscroll = () =>{
//    loginForm.classList.remove('active');
//    menu.classList.remove('fa-times');
//    navbar.classList.remove('active');

//    if(window.scrollY > 0){
//       document.querySelector('.header').classList.add('active');
//    }else{
//       document.querySelector('.header').classList.remove('active');
//    }
// }

let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .nav');
let closeBtn = document.querySelector('.nav i');

menu.onclick = () => {
   menu.classList.toggle('fa-times');
   navbar.classList.toggle('active');
}

closeBtn.onclick = () => {
   menu.classList.remove('fa-times');
   navbar.classList.remove('active');
}

window.onscroll = () => {
   menu.classList.remove('fa-times');
   navbar.classList.remove('active');

   if (window.scrollY > 0) {
      document.querySelector('.header').classList.add('active');
   } else {
      document.querySelector('.header').classList.remove('active');
   }
}







// Initialize and add the map
// function myMap() {
//    var mapProp = {
//        center:new google.maps.LatLng(42.3398067,-71.0913604),
//        zoom:6,
//    };
//    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
//    }


function myMap() {
   // Set the coordinates for the center of the map
   var centerCoordinates = {
      lat: 42.3398067,
      lng: -71.0913604
   };

   // Set the map options
   var mapOptions = {
      center: centerCoordinates,
      zoom: 6,
      mapTypeControl: true, // Show the map type control
      fullscreenControl: true, // Show the fullscreen control
      streetViewControl: true, // Show the street view control
      zoomControl: true // Show the zoom control
   };

   // Create the map object and set the options
   var map = new google.maps.Map(
      document.getElementById("googleMap"),
      mapOptions
   );

   // Add a marker to the center of the map
   var marker = new google.maps.Marker({
      position: centerCoordinates,
      map: map,
      title: "Center"
   });
}