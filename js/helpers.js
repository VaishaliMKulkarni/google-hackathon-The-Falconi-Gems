function buildPreferences(pref1, pref2, pref3, pref4, customisation)
{
    return pref1 + pref2 + pref3 + pref4 + '. ' + customisation;
}

function convertToBulletedList(text) {
  text = '' + text;
  const lines = text.split('\n');
  
  if (lines.length <= 1) {
    return lines[0] || '';
  }
  
  const listItems = lines.slice(1).map(line => {
    if (line.trim() === '') {
      return ''; // Skip empty lines
    } else if (line.includes('**')) {
      const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      const cleanLine = boldText.replace(/[-*]/g, ''); // Remove '-' and '*'
      return `<strong>${cleanLine}</strong>`;
    } else if (line.startsWith('**Day')) {
      return `<br>${line}`; // Add <br> before lines starting with '**Day'
    } else if (line.startsWith('Day')) {
      return `<br>${line}`; // Add <br> before lines starting with 'Day'
    } else {
      const cleanLine = line.replace(/[-*]/g, ''); // Remove '-' and '*'
      return `<li>${cleanLine}</li>`;
    }
  });
  
  const html = `<ul>${listItems.join('')}</ul>`;
  return html;
}
    

function removeAsterisksAndNewlines(inputString) {
    // Remove asterisks
    const withoutAsterisks = inputString.replace(/\*/g, '');
  
    // Remove newlines
    const withoutNewlines = withoutAsterisks.replace(/[\r\n]/g, '');

    // Remove duplications in text
    const withoutDuplicationRecommend = withoutNewlines.replace('I recommend', '');
    
    return withoutDuplicationRecommend;
  }
  
  function imageToHTMLImg(imageUrl)
  {
    return '<img src="' + imageUrl + '" style="background-size: cover; background-position: center center; background-repeat: no-repeat; overflow: hidden;" />'
  }

  function returnImages(imagesString, numberOfImages) {  
    imagesString = '' + imagesString;
    console.log('' + imagesString);
    var imagesArray = imagesString.split(","); 
    
    // Check if numberOfImages is greater than the total number of images
    if (numberOfImages > imagesArray.length) {
      numberOfImages = imagesArray.length;
    }

    var selectedImages = [];
  
    for (var i = 0; i < numberOfImages; i++) {
      var randomIndex = Math.floor(Math.random() * imagesArray.length);
      var randomImage = imagesArray[randomIndex];
      selectedImages.push(randomImage);
    }
  
    return selectedImages;
  }
  

  function buildRecommendationSummary()
  {
    preferencesString = buildPreferences(promptPref1, promptPref2, promptPref3, promptPref4, forCustomisation);

          // 1. Get the location name
          apiGetVertexPromptResponseAsync(forRecommendedDestination + preferencesString, 8)
          .then(function (returnedLocation) {
              // Continue with the code that depends on the locationName value
              locationName = removeAsterisksAndNewlines(returnedLocation);   
              console.log("locationName: " + locationName); 

              // 2. Get the location description
              apiGetVertexPromptResponseAsync(forDestinationSummary + locationName, 60)
              .then(function (locationShortDescription) {
                  console.log("locationShortDescription: " + locationShortDescription);

                  // 3. Get a location single image
                  makeImagesAPICallAsync(locationName, 1)
                      .then(function(images) {                          
                          console.log('Images: ', images);
                          // Continue with the code that depends on the images array

                          // Example: Display the images in an HTML element
                          var imagesElement = document.getElementById('locationImage');
                          imagesElement.innerHTML = imageToHTMLImg(images);
                          //images.join(', ');
                          responseLocation.textContent = locationName;
                          responseText.textContent = locationShortDescription + '...';
                          responseHeaderLocation.textContent = 'I recommend ' + locationName;                   
                          $('.question1-screen').addClass('hide');             
                          $('.question2-screen').addClass('hide');             
                          $('.question3-screen').addClass('hide');             
                          $('.question4-screen').addClass('hide');
                          $('.itinerary-screen').addClass('hide');
                          $('.details-screen').addClass('hide');
                          $('.chat-body').removeClass('hide');
                          $('.chat-input').removeClass('hide');
                          $('.chat-header-option').removeClass('hide');            
                          $('.show-agent-top').removeClass('hide');    
                      })
                      .catch(function(error) {
                          console.error('Error occurred:', error);
                          // Handle the error accordingly
                          // My not be any images but still show the U
                          // Update UI
                          responseLocation.textContent = locationName;
                          responseText.textContent = locationShortDescription;
                          responseHeaderLocation.textContent = 'I recommend ' + locationName;                   
                          $('.question1-screen').addClass('hide');             
                          $('.question2-screen').addClass('hide');             
                          $('.question3-screen').addClass('hide');             
                          $('.question4-screen').addClass('hide');
                          $('.itinerary-screen').addClass('hide');
                          $('.details-screen').addClass('hide');
                          $('.chat-body').removeClass('hide');
                          $('.chat-input').removeClass('hide');
                          $('.chat-header-option').removeClass('hide');            
                          $('.show-agent-top').removeClass('hide');   

                          // Example: Display an error message in an HTML element
                          var errorElement = document.getElementById('error');
                          errorElement.textContent = 'An error occurred: ' + error;
                      });                    
                  })                 
                  .catch(function (error) {
                  console.error("Error occurred:", error);
                  // Handle the error accordingly
              });                  
          })
          .catch(function (error) {
              console.error("Error occurred:", error);
              // Handle the error accordingly
          });
  }


  function buildRecommendationDetail()
  {
    // 1. We already have the location name so update the HTML element
    var detailLocationElement = document.getElementById('detailsResponseTitle');
    detailLocationElement.innerHTML = locationName;

    // 2. Get the location description
    apiGetVertexPromptResponseAsync(forDestinationSummary + locationName, 120)
    .then(function (locationDescription) {
      console.log("locationDescription: " + locationDescription);
      var detailLocationDescription = document.getElementById('detailsResponseText');
      let formattedDetailDescription = convertToBulletedList(locationDescription);
      detailLocationDescription.innerHTML = formattedDetailDescription;
    });

    // 3. Get the location images (already done)

    // 4. Get Reviews
    apiGetVertexPromptResponseAsync(forDestinationReviews + locationName, 80)
    .then(function (locationReviews) {
      console.log("locationReviews: " + locationReviews);
      let formattedReviews = convertToBulletedList(locationReviews);
      var detailLocationReviews = document.getElementById('detailsResponseReviews');
      detailLocationReviews.innerHTML = formattedReviews;
    });

    // 5. Get Ratings
    apiGetVertexPromptResponseAsync(forDestinationRatings + locationName, 80)
    .then(function (locationRatings) {
      console.log("locationRatings: " + locationRatings);
      let formattedRatings = convertToBulletedList(locationRatings);
      var detailLocationRatings = document.getElementById('detailsResponseRatings');
      detailLocationRatings.innerHTML = formattedRatings;
    });

    // 5. Get Weather
    apiGetVertexPromptResponseAsync(forDestinationWeather + locationName, 120)
    .then(function (locationWeather) {
      console.log("locationWeather: " + locationWeather);
      var detailLocationWeather = document.getElementById('detailsResponseWeather');
      detailLocationWeather.innerHTML = removeAsterisksAndNewlines(locationWeather);
    });

    
  }

  function generateDetailsCarouselAsync(imageArray) {    
    return new Promise(function(resolve, reject) {
      let carouselOpenUL = '<ul class="slides-container" id="slides-container">';
      let carouselCloseUL = '</ul>';
      var carouselImgs = '';
      imageArray = '' + imageArray;

      let images = imageArray.split(',');

      for (let i = 0; i < images.length; i++) {
        carouselImgs += '<li class="slide" style="background-image: url(' + images[i] + '); background-size: cover; background-position: center center; background-repeat: no-repeat; overflow: hidden;"></li>';
      }
      // Resolve the Promise with the images array
      resolve(carouselOpenUL + carouselImgs + carouselCloseUL);
    });
  }

  function buildItinerary()
  {
    // 1. We already have the location name so update the HTML element
    var itineraryLocationElement = document.getElementById('itineraryResponseLocation');
    itineraryLocationElement.innerHTML = '7-Day Itinerary for ' + locationName;

    // 2. Get the itinerary
    apiGetVertexPromptResponseAsync(forDestinationItinerary + locationName, 500)
    .then(function (itineraryDescription) {
      console.log("itineraryDescription: " + itineraryDescription);
      var itineraryLocationDescription = document.getElementById('itineraryResponseText');
      let formattedItinerary = convertToBulletedList(itineraryDescription);
      itineraryLocationDescription.innerHTML = formattedItinerary;
    });
  }

  function setAccessToken() {
    accessToken = prompt('Please enter Google Access Token:');
  }

