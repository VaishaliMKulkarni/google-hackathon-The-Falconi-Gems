// Function to make the API call
function makeImagesAPICallAsync(locationName, numberOfImages) {
  return new Promise(function(resolve, reject) {
    locationName = encodeURIComponent(locationName);
    var xhr = new XMLHttpRequest();
    var url = 'https://api.pexels.com/v1/search?query=' + locationName;
    console.log('pexels URL: ' + url);
    var token = 'C0aG5DUmkXQjGq0DwowfmpyA5EhSrSeGghZeBZYalwnThD3kAVhW5Fn7';

    xhr.onload = function () {
      if (xhr.status === 200) {
        var jsonData = JSON.parse(xhr.responseText);
        console.log('Pexel Image Fetch: ' + jsonData);
        var images = jsonData.photos.map((photo) => photo.src.medium);

        var randomImages = returnImages(images, numberOfImages);

        // Put 5 images into state for this location (for detail page carousel)
        var carouselImages = returnImages(images, 5);
        locationImages = images;

        // Resolve the Promise with the images array
        resolve(randomImages);
      } else {
        // Reject the Promise with the error message
        reject('Error: ' + xhr.status);
      }
    };

    xhr.onerror = function () {
      // Reject the Promise with the error message
      reject('An error occurred during the API call');
    };

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  });
}

  