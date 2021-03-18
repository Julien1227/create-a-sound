//Web audio api
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var myBuffer;

var request = new XMLHttpRequest();


var input = document.querySelectorAll('#input');
var p = document.querySelectorAll('#inputP');
var actualColor = document.getElementById('actualColor');
var actualNote = document.getElementById('actualNote');
const clickPlay = document.getElementById('play');
const clickStop = document.getElementById('stop');

//Récupère les inputs
var inputs = [];
var count = 0;

input.forEach((input) => {
  inputs[count] = input;
  count++;
});

//Récupère les values
var inputsValue = [];
var count = 0;
input.forEach((input) => {
  inputsValue[count] = input.value;
  count++;
});

//Récupère les P
var ps = [];
count = 0;
p.forEach((p) => {
  ps[count] = p;
  count++;
});

var lumValue = 50;
var satValue = 50;
var colorValue = 180;

function declareValues() {
  lumValue = Number(inputs[2].value);
  satValue = Number(inputs[1].value);
  colorValue = Number(inputs[0].value);
  if(colorValue == 0) {
    colorValue = 1;
  }
};

function setGain() {
  var gainValue = 0.5;
  g.gain.value = gainValue;
  //Si la couleur est lumineuse, alors le son s'estompe également
  if(lumValue >= 50) {
    lumValue = 100 - lumValue;
  }

  //Prends la valeur la plus basse et l'utilise pour le gain
  gainValue = (satValue/100)*(lumValue/100);
  gainValue = (Math.round(gainValue * 100) / 100)*2;

  //Si couleur invisible -> son 0
  if(lumValue == 0 || lumValue == 100 || satValue == 0) {
    gainValue = 0;
  }

  g.gain.value = gainValue;
  console.log(gainValue);
}

function setSoundOptions() {
  actualNote.innerHTML = 100 + colorValue;
  o.frequency.value = /*frq*/100 + colorValue;
  setGain();
}

//Lorsqu'on déplace le slider, récupère la bonne value, la modifie dans le span comme dans la couleur
var color = document.querySelector('.color');
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('input', (e) => {
    declareValues();
    
    p[i].innerHTML = inputs[i].value;
    color.style.backgroundColor = "hsl("+colorValue+", "+satValue+"%, "+lumValue+"%)"
    
    //Si il s'agit du slider de couleur
    let target = e.currentTarget;
    if(target.hasAttribute('data-input', 'color') == true) {
      //Détection de la teinte et chargement du bon son
      if(colorValue < 25 ) {
        actualColor.innerHTML = "rouge";
        //frqValue = ;
        
      }else if(colorValue >= 25 && colorValue <= 45 ) {
        actualColor.innerHTML = "orange";
        //frqValue = ;
        
      }else if(colorValue > 45 && colorValue <= 70 ) {
        actualColor.innerHTML = "jaune";
        //frqValue = ;
        
      }else if(colorValue > 70 && colorValue <= 140 ) {
        actualColor.innerHTML = "vert";
        //frqValue = ;
        
      }else if(colorValue > 140 && colorValue <= 185 ) {
        actualColor.innerHTML = "turquoise";
        //frqValue = ;
        
      }else if(colorValue > 185 && colorValue <= 215 ) {
        actualColor.innerHTML = "bleu claire";
        //frqValue = ;
        
      }else if(colorValue > 215 && colorValue <= 250 ) {
        actualColor.innerHTML = "bleu foncé";
        //frqValue = ;
        
      }else if(colorValue > 250 && colorValue <= 300 ) {
        actualColor.innerHTML = "mauve";
        //frqValue = ;
        
      }else if(colorValue > 300 && colorValue <= 335 ) {
        actualColor.innerHTML = "rose";
        //frqValue = ;
        
      }else if(colorValue > 335 && colorValue <= 360 ) {
        actualColor.innerHTML = "rouge";
        //frqValue = ;
      }
    }

    setSoundOptions();
    
  })
};

const waveType = document.getElementById('waveType');

var o = context.createOscillator();
o.type = /*frq*/colorValue; //Ici interviens la valeur de ma couleur
o.start(0);

var g = context.createGain();
g.gain.value = 0;

o.connect(g);
o.type = "triangle";
g.connect(context.destination);

function startNote() {
    setGain();
}

function stopNote() {
    g.gain.value = 0;
}

clickPlay.addEventListener('click', startNote);
clickStop.addEventListener('click', stopNote); 