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
    
    // Customise Prompt and regen summary page      
    function processInput() {
      var input = $("#add-prompt");
      var customPrompt = input.val();        
      input.val(''); // Clear the input field
      console.log(customPrompt); // Do something with the text (e.g., process it or display it)
      forCustomisation = customPrompt;
      buildRecommendationSummary();
    }
    // LOGIC
    $(document).ready(function () {

      // Select
      $(".select2_el").select2({
      });
      
      
      $("#submit-prompt").click(function(e) {
        e.preventDefault(); // Prevent the default behavior of the anchor tag
        processInput();
      });
      
      $("#add-prompt").keypress(function(e) {
        if (e.key === "Enter" || e.keyCode === 13) {
          e.preventDefault(); // Prevent form submission or page reload
          processInput();
        }
      });

      $('#btnViewNew').click(function (e) {
        e.preventDefault(); // Prevent the default behavior of the anchor tag
        forCustomisation = ''; // clear any customisations      
        buildRecommendationSummary();
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

      // Show Details
      $('.chat-body button').first().click(function () {
        generateDetailsCarouselAsync(locationImages)
        .then(function(imagesHtml) {
          // Update the slides carousel HTML
          var slidesElement = document.getElementById('detailSlides');     
          slidesElement.innerHTML = imagesHtml;

          // Dynamically include carousel JS at this point to ensure it knows the width of images
          fetch('js/carouselChris.js')
          .then(response => response.text())
          .then(scriptText => {
            const scriptElement = document.createElement('script');
            scriptElement.textContent = scriptText;
            document.head.appendChild(scriptElement);
            
            // Optional: Execute the code after loading the script
            // initializeCarousel();
          })
          .catch(error => {
            console.error('Error loading carousel script:', error);
          });

          $('.chat-body').addClass('hide');   
          console.log('imagesHtml=' + imagesHtml);
          $('.details-screen').removeClass('hide');
        });
        buildRecommendationDetail();
      });

      // Show Itinerary (To Do: Show detail page when Charlie finished)
      $('#btnViewExperiences').click(function() {
        buildItinerary();
        $('.details-screen').addClass('hide');
        $('.itinerary-screen').removeClass('hide');
      });
      $('#btnViewExperiences2').click(function() {
        buildItinerary();
        $('.details-screen').addClass('hide');
        $('.itinerary-screen').removeClass('hide');
      });

      // Reject current selection and show another
      $('.chat-body button').eq(1).click(function () {
        buildRecommendationSummary();
      });

      $('.end-chat').click(function () {
          $('.chat-body').addClass('hide');
          $('.chat-session-end').removeClass('hide');
          $('.chat-header-option').addClass('hide');
      });
  });