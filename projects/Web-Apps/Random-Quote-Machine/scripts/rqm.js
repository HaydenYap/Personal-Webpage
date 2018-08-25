
let quotes = [
    {quote: "If you don't build your dream, someone else will hire you to help them build theirs.",
    author: "Dhirubhai Ambani"},
    {quote: "The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself.",
    author: "Mark Caine"},
    {quote: "People who succeed have momentum. The more they succeed, the more they want to succeed, and the more they find a way to succeed. Similarly, when someone is failing, the tendency is to get on a downward spiral that can even become a self-fulfilling prophecy.",
    author: "Tony Robbins"},
    {quote: "When I dare to be powerful - to use my strength in the service of my vision, then it becomes less and less important whether I am afraid.",
    author: "Audre Lorde"},
    {quote: "Whenever you find yourself on the side of the majority, it is time to pause and reflect.",
    author: "Mark Twain"}
];

$("#new-quote").click(function(){
  // get new quote when clicked
  $("#quote-info").animate({opacity:0},500,function(){
    $("#quote-box").fadeOut();
      getQuote();
  });
  console.log("new quote requested");
});

$("#tweet-quote").click(function(){
  // tweet quote when clicked
  console.log("tweet quote requested")
});

function getQuote(){
  let randomIndex = Math.floor(Math.random() * quotes.length);
  let quoteInfo = quotes[randomIndex];
  $("#quote").text(quoteInfo.quote);
  $("#author-name").text(quoteInfo.author);
  $("#quote-box").fadeIn("slow", function(){
    $("#quote-info").animate({opacity:1},500);
  });

function randomColorValue(){
    return Math.floor(Math.random() * 256).toString(16);
  }

  var red = randomColorValue();
  var green = randomColorValue();
  var blue = randomColorValue();
  while(blue == red && blue == green){
    blue = randomColorValue();
  }
  var color = (("#".concat(red)).concat(green)).concat(blue);
  console.log(color);
  $(".button").animate({color: color},1000);
};

$(document).ready(function(){
  getQuote();
});
