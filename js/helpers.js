function buildPreferences(pref1, pref2, pref3, pref4)
{
    return pref1 + pref2 + pref3 + pref4;
}

function removeAsterisksAndNewlines(inputString) {
    // Remove asterisks
    const withoutAsterisks = inputString.replace(/\*/g, '');
  
    // Remove newlines
    const withoutNewlines = withoutAsterisks.replace(/[\r\n]/g, '');
  
    return withoutNewlines;
  }
  
  function imageToHTMLImg(imageUrl)
  {
    return '<img src="' + imageUrl + '" width="100%" />'
  }

  function returnImages(imagesString, numberOfImages) {  
    imagesString = '' + imagesString;
    console.log('' + imagesString);
    var imagesArray = imagesString.split(","); 
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
    preferencesString = buildPreferences(promptPref1, promptPref2, promptPref3, promptPref4);

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
                          $('.question4-screen').addClass('hide');
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
                          $('.question4-screen').addClass('hide');
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