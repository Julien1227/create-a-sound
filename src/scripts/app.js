//Web audio api
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var myBuffer;

var request = new XMLHttpRequest();

//VARIABLES DOCUMENT
var input = document.querySelectorAll('#input');
var p = document.querySelectorAll('#inputP');
var actualColor = document.getElementById('actualColor');
var actualNote = document.getElementById('actualNote');
const clickPlay = document.getElementById('play');
const clickStop = document.getElementById('stop');
const color = document.querySelector('.color');

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

// VARIABLES AUDIO
var lumValue = 50;
var satValue = 50;
var colorValue = 180;

var redValue = 0;
var greenValue = 0;
var blueValue = 0;

var frq = 0;

function declareValues() {
  lumValue = Number(inputs[2].value);
  satValue = Number(inputs[1].value);
  colorValue = Number(inputs[0].value);
};

function setGain() {
  var gainValue = 0.5;
  g.gain.value = gainValue;
  //Si la couleur est lumineuse, alors le son s'estompe également
  if(lumValue >= 50) {
    lumValue = 100 - lumValue;
  }

  gainValue = (satValue/100)*(lumValue/100);
  gainValue = (Math.round(gainValue * 100) / 100)*2;

  //Si couleur invisible -> son 0
  if(lumValue == 0 || lumValue == 100 || satValue == 0) {
    gainValue = 0;
  }

  g.gain.value = gainValue;
  //console.log(gainValue);
}

function setSoundOptions() {
  setFrequency();
  actualNote.innerHTML = frq;
  setGain();
}

function setFrequency() {
  HSLtoRGB(colorValue, satValue, lumValue);
  frq = Math.round((redValue*1 + greenValue*1.8 + blueValue*0.3) * 100) / 100;
  o.frequency.value = frq; //Ici interviens la valeur de ma couleur
}

//source: https://css-tricks.com/converting-color-spaces-in-javascript/
//Convertit ma valeur HSL vers RGB
function HSLtoRGB(h,s,l) {

  // doit être une fraction de 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;


  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;  
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  redValue = Math.round((r + m) * 255);
  greenValue = Math.round((g + m) * 255);
  blueValue = Math.round((b + m) * 255);
}

//Lorsqu'on déplace le slider, récupère la bonne value, la modifie dans le span comme dans la couleur
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('input', (e) => {
    declareValues();
    setSoundOptions();
    
    p[i].innerHTML = inputs[i].value;
    color.style.backgroundColor = "hsl("+colorValue+", "+satValue+"%, "+input[2].value+"%)"
    
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
    
  })
};

var o = context.createOscillator();
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