
// odd= rachet, even= classy
const data = [
  {
  question: "Who is your favourite Spice Girl?",
  answer1: "Scary Spice",
  answer2: "Posh Spice",
  answer3: "Sporty Spice",
  answer4: "Baby Spice"
},
{
question: "Your sugar daddy died and left you a fortune. Where are you going to celebrate?",
answer1: "Las Vegas",
answer2: "Buenos Aires",
answer3: "Bangkok",
answer4: "Rome"
},
{
question: "Drink of choice:",
answer1: "Beer",
answer2: "Sancerre",
answer3: "Cosmo",
answer4: "A swinging Balzac"
},
{
question: "What are you naming you teacup yorkie?",
answer1: "Mercedes",
answer2: "Madeline",
answer3: "Gucci",
answer4: "Cornelius"
},
{
  question: "What kind of panties do you have on?",
  answer1: "What panties?",
  answer2: "Calvin Klines",
  answer3: "Yesterday's",
  answer4: "Agent provocateur"
}
]

let pageNumber = 0;

// $(function() {
//   document.getElementById("submit-btn").onclick = pageNumberNext;
// });

function pageNumberNext(){
  // console.log(pageNumber);
  // console.log(data[pageNumber]);
  document.getElementById("question").innerHTML = data[pageNumber].question;
  document.getElementsByClassName("choice-text")[0].innerHTML = data[pageNumber].answer1;
  document.getElementsByClassName("choice-text")[1].innerHTML = data[pageNumber].answer2;
  document.getElementsByClassName("choice-text")[2].innerHTML = data[pageNumber].answer3;
  document.getElementsByClassName("choice-text")[3].innerHTML = data[pageNumber].answer4;
  pageNumber++;
};

// $("#end-box").hide();

let results = [];

$(".choice-btn").on('click', function(){
  $('.active').removeClass('active')
 $(this).addClass('active')
});

// make end box display results and replace game box

function loadEndPage(){
  // $('#end-box').css('visibility', 'visible');
  // $('#game-box').css('visibility', 'hidden');
  $('#end-box').toggle();
  $('#game-box').toggle();
  $('#game-box').appendTo('#end-box');
  // $('#end-box').css('visibility', 'visible');
  // $('#end-box')appendTo('#game-box');
}


// store all odd indexed numbers in counter
function  countOdd(results){
  let counter = 0;
  for (i = 0; i < results.length; i++) {
      if (results[i] % 2 != 0){
          counter++;
      }
  }
  return counter;
}

// determine if there are 3 or more odd answers Or more than half the questions
function rachetOrNah() {
  counter = countOdd(results);
  if (counter <= 3){
    console.log("You're rachet");
    return "rachet";
  } else {
    console.log("You're classy");
    return "classy";
  }
};

$("#submit-btn").on('click', function(){
  choice = $('.choice-btn.active').data("index");
  results.push(choice)
  $('.active').removeClass('active');
  if (results.length == data.length){
    rachetness = rachetOrNah();
    loadEndPage();
  } else { pageNumberNext();

  }
});



function setPonyArtwork(){
  let settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.discogs.com/database/search",
    "method": "GET",
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
    },
    "data": {
      "key": "KdzXYQaEREDROIRKQvfw",
      "secret": "UJjmRcJPAIBEsbNzwuKhngabOPlAKRSk",
      "artist": "Ginuwine",
      "release_title": "Ginuwine... The Bachelor",
      "year": "1997",
      "format": "cd"
    }
  };

  $.ajax(settings).done(function (response) {
    let album = response.results[0];
    $("#album-cover").attr("src", album.cover_image);
  });
};

// load first question
pageNumberNext();

// set album cover to an image recieved through API
setPonyArtwork();
