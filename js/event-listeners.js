// Get all radio buttons for each screen
var screen1Radios = document.getElementsByName('screen1');
var screen2Radios = document.getElementsByName('screen2');
var screen3Radios = document.getElementsByName('screen3');
var screen4Radios = document.getElementsByName('screen4');

// Add change event listeners to each set of radio buttons
screen1Radios.forEach(function(radio) {
  radio.addEventListener('change', function() {
    promptPref1 = this.value;
    console.log('promptPref1:', promptPref1);
  });
});

screen2Radios.forEach(function(radio) {
  radio.addEventListener('change', function() {
    promptPref2 = this.value;
    console.log('promptPref2:', promptPref2);
  });
});

screen3Radios.forEach(function(radio) {
  radio.addEventListener('change', function() {
    promptPref3 = this.value;
    console.log('promptPref3:', promptPref3);
  });
});

screen4Radios.forEach(function(radio) {
  radio.addEventListener('change', function() {
    promptPref4 = this.value;
    console.log('promptPref4:', promptPref4);
  });
});