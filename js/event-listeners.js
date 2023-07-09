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
    

    // LOGIC
    $(document).ready(function () {

      // Select
      $(".select2_el").select2({
      });
      
      //Toggle fullscreen
      $(".chat-bot-icon").click(function (e) {
          $(this).children('img').toggleClass('hide');
          $(this).children('svg').toggleClass('animate');
          $('.chat-screen').toggleClass('show-chat');
      });
      $('.home-screen button').click(function () {
          $('.home-screen').addClass('hide');
          $('.question1-screen').removeClass('hide');
      });
      $('.question1-screen button').click(function () {
          $('.question1-screen').addClass('hide');
          $('.question2-screen').removeClass('hide');
      });
      $('.question2-screen button').click(function () {
          $('.question2-screen').addClass('hide');
          $('.question3-screen').removeClass('hide');
      });
      $('.question3-screen button').click(function () {
          $('.question3-screen').addClass('hide');
          $('.question4-screen').removeClass('hide');
      });
      $('.question4-screen button').click(function () {          
        buildRecommendationSummary();
      });
      // Show Itinerary (To Do: Show detail page when Charlie finished)
      $('.chat-body button').first().click(function () {
          $('.chat-body').addClass('hide');            
          $('.itinerary-screen').removeClass('hide');
      });

      // Reject current selection and show another
      $('.chat-body button').eq(1).click(function () {
        buildRecommendationSummary();
      });

      $('.end-chat').click(function () {
          $('.chat-body').addClass('hide');
          $('.chat-input').addClass('hide');
          $('.chat-session-end').removeClass('hide');
          $('.chat-header-option').addClass('hide');
      });
  });