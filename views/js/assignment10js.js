//calling upon the id of introduction to change the introductory message
var intro = document.querySelector('p#intro'); 
//adding the text to paragraph tag through js to change it from lorem ipsum.
var text1 = "<p>Here at Black Salt we pride ourselves on giving you the best bar experience. Whether you’re here for the food or the well-priced drinks, Black Salt always delivers. Our fun and subtle environment makes this bar ideal for large and small parties or just a night out on the town. Come and meet our knowledgeable staff who will help you choose the drinks you need to make it through the night.</p>"; 
introduction.innerHTML = text1; 

//creating a link to facebook through the fabricon in top left
var firstFabricon = document.getElementById('facebook'); 
var fabriconContent= firstFabricon.innerHTML; 
firstFabricon.innerHTML = '<a href=https://www.facebook.com/' + fabriconContent + '</a>'; 

//creating a link to instagram through the fabricon in top left
var secondFabricon = document.getElementById('instagram'); 
var fabriconContent2= secondFabricon.innerHTML; 
secondFabricon.innerHTML = '<a href=https://www.instagram.com/accounts/login/?hl=en' + fabriconContent2 + '</a>'; 

//create a webpage reply when the submit button has been entered. 
    function myFunction (){ 
        alert(("Thank You for making a reservaton. We will have your table ready by the time you arrive!"));
    }


    //Accordian widget from jquery user interface
    $( function() {
        $( "#accordion" ).accordion();
      } );
     
      