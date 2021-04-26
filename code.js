import * as Cards from './cardArray.js';

const mood = Cards.mood;
const arc = Cards.arc;
const terrain = Cards.terrain;
const obj = Cards.object;

const playingCards = [arc, terrain, obj, mood];

const dealButton = document.getElementById('sendButton');
const startButton = document.getElementById('button');
const timerPosition = document.getElementById('background');
const audio = new Audio("https://cdn.glitch.com/da901263-7822-4876-b51f-aa343c0b85b6%2F316843__lalks__alarm-03-short.wav?v=1589613004284"); 
     
let cards = [];
let counter;
let timerAmount;
let timeInterval;

      
startButton.disabled = true; 

dealButton.addEventListener('click', function(){
    dealCards();
    displayCards();

    
});

startButton.addEventListener('click', function(){
   

        freezeButtons();
        
        startButton.disabled = true; 

        counter = 12;//in game should be 120 - 2 minutes
        timerAmount = 0;
        timeInterval = setInterval(myTimer, 1000);
     
});

function dealCards(){
    //empty the card array so not building up an array
    cards.length = 0;
  
    for(var i = 0; i < playingCards.length; i++){
    
    let cardType = playingCards[i];
 
    let x = Math.floor(Math.random() * (cardType.length -1)) + 1;
    
    cards.push({
      letter: cardType[0].letter,
      name: cardType[0].name,
      item: cardType[x].item,
      timeFrame: cardType[x].timeFrame
    });
    
  }
}

function displayCards(){
    if(cards.length === 0){
        console.log('empty array');
        } else {
             
       var cardElements = document.getElementsByClassName("card-back");
          
       startButton.disabled = false;
   
       for(var i = 0; i < cardElements.length; i++){

             var typeOfCard = cards[i];

             var x = Math.floor(Math.random() * (typeOfCard.length -1)) + 1;

             cardElements[i].getElementsByClassName("card-symbol")[0].innerHTML = typeOfCard.letter;
             cardElements[i].getElementsByTagName("p")[0].innerHTML = typeOfCard.name;

             cardElements[i].getElementsByTagName("h2")[0].innerHTML = typeOfCard.item;
             cardElements[i].getElementsByTagName("p")[1].innerHTML = typeOfCard.timeFrame;
       }
     }
}

function myTimer() {
    counter--;
    timerAmount = timerAmount + 0.835;
    console.log(counter);
    timerGo();
    if(counter <= 0){
      clearInterval(timeInterval);
      console.log('leaving');
      timerReset();
    }
  }

  function timerGo(){
    timerPosition.style.width = timerAmount + "%";
  }

  function timerReset(){
    dealButton.disabled = false;
    console.log(audio)
    audio.play();
    timerPosition.style.width = 0 + "%"
  }
      
  function freezeButtons(){
    startButton.disabled = true; 
        dealButton.disabled = true;
  }
    
      
    //   document.getElementById("deal").addEventListener('click', function(){
    //     socket.emit('deal');
    //   });
    //   //CODE FOR THE TIMER
    //   startButton.addEventListener('click', function(){
    //     socket.emit('start timer');
    //   });
      
    //   socket.on('freeze buttons', function(){
    //     startButton.disabled = true; 
    //     dealButton.disabled = true;
    //   });

    //   socket.on('timer go', function(incriment){
    //     timerPosition.style.width = incriment + "%";
    //   });



    //   socket.on('timer reset', function(){
    //     dealButton.disabled = false;
    //     audio.play();
    //   });