window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");



  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }
  

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
  
  // Show lives
   comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
      }
    }
  }

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }

  
   // Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };
  
    head = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    }
    
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
}

   frame1 = function() {
     draw (0, 150, 150, 150);
   };
   
   frame2 = function() {
     draw (10, 0, 10, 600);
   };
  
   frame3 = function() {
     draw (0, 5, 70, 5);
   };
  
   frame4 = function() {
     draw (60, 5, 60, 15);
   };
  
   torso = function() {
     draw (60, 36, 60, 70);
   };
  
   rightArm = function() {
     draw (60, 46, 100, 50);
   };
  
   leftArm = function() {
     draw (60, 46, 20, 50);
   };
  
   rightLeg = function() {
     draw (60, 70, 100, 100);
   };
  
   leftLeg = function() {
     draw (60, 70, 20, 100);
   };
  
  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        } 
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }
  
    
  // Play
  play = function () {
    categories = [
        ["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
        ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
        ["manchester", "milan", "madrid", "amsterdam", "prague"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  }

  // play();
  
  // Hint

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }

document.getElementById('submit').onclick = function() {
    var peer = document.getElementById(global_peerId);
    // .innerHTML = "Hello World";

var message = {};
message.type = "start"
message.category = document.getElementById("category").value;


var word = document.getElementById("word").value;
message.wordlength = word.length  

 SkylinkDemo.sendP2PMessage(message);
}


document.getElementById('yes').onclick = function(){
var message = {};
message.type = "validation"
message.value = "Correct"
SkylinkDemo.sendP2PMessage(message);
}


document.getElementById('no').onclick = function(){
var message = {};
message.type = "validation"
message.value = "Incorrect"
// lives = 9;
// animate();
frame1();

SkylinkDemo.sendP2PMessage(message);
}

var global_peerId;


//skylink stuff
  var SkylinkDemo = new Skylink();
  // SkylinkDemo.setLogLevel(4);

SkylinkDemo.on('incomingStream', function (peerId, stream, isSelf, peerInfo) {
  var peer = document.createElement('div');
  if(!isSelf){
    global_peerId = peerId;
  }  
  peer.id = peerId;
  peer.style.border = 'solid 2px #444';
  peer.style.borderRadius = '15px';
  peer.style.display = 'inline-block';
  peer.style.textAlign = 'center';
  peer.style.fontFamily = 'sans-serif';
  peer.style.marginRight = '15px';
  var peerVoice = document.createElement('video');
  if (window.webrtcDetectedBrowser !== 'IE') {
    peerVoice.autoplay = 'autoplay';
  }
  peerVoice.poster = 'user.png';
  peerVoice.style.height = '150px';
  var peerName = document.createElement('p');
  peerName.style.background = '#eee';
  peerName.style.margin = '0';
  peerName.style.padding = '12px 0';
  peerName.style.borderTop = 'solid 2px #000';
  peerName.innerHTML = (isSelf) ? 'Me' : peerId;
  document.body.appendChild(peer);
  peer.appendChild(peerVoice);
  peer.appendChild(peerName);
  attachMediaStream(peerVoice, stream);
  
  peerVoice.play();
});

SkylinkDemo.on('peerLeft', function (peerId, peerInfo, isSelf) {
  var elm = document.getElementById(peerId);
  if (elm) {
    document.body.removeChild(elm);
  } else {
    console.error('Peer audio element for ' + peerId + ' does not exists');
  }
});

SkylinkDemo.on('incomingMessage', function(message, peerId, peerInfo, isSelf){
  var incomingMessage = message.content;

if (incomingMessage.type === "guess"){
document.getElementById("guess").innerHTML = "The letter " + incomingMessage.guessValue + " was guessed" +
"Is this correct?";
}  




if (incomingMessage.type === "validation"){

}

  console.log(message.content)

});

SkylinkDemo.init(config, function (error, success) {
  if (error) {
    console.error('Init failed', error);
  } else {
    SkylinkDemo.joinRoom({
      audio: true,
      video: false
    });
  }
});



}