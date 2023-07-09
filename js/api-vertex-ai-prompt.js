// Function to make the API call
// accessToken is obtained by generating it through the Google cloud shell terminal using:
// A temporary way around this is to generate it there and paste it into the literals.js
// Do this from within Google Cloud console by entering the project, launching cloud shell and typing:
// gcloud auth application-default login
// Tokens expire after 60 mins so it's a security feature to do it this way whilst building a PoC
// Ensure literals.js is above the reference to this file

// Function to make the API call
// accessToken is obtained by generating it through the Google Cloud Shell terminal
function apiGetVertexPromptResponseAsync(prompt, maxTokens) {
  console.log('apiGetVertexPromptResponse(prompt) with prompt: ' + prompt + ' and maxTokens of ' + maxTokens);
  var xhr = new XMLHttpRequest();
  var url = 'https://us-central1-aiplatform.googleapis.com/v1/projects/gen-the-falconi-gems/locations/us-central1/publishers/google/models/text-bison@001:predict'; // Replace with your API endpoint
  var token = accessToken;

  return new Promise(function (resolve, reject) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          var jsonData = response.predictions[0].content;
          console.log('jsonData: ' + jsonData);
          // Resolve the Promise with the response
          resolve(jsonData);
        } else {
          reject(xhr.status);
        }
      }
    };

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.setRequestHeader('Content-Type', 'application/json');

    var requestBody = {
      "instances": [
        {
          "content": prompt
        }
      ],
      "parameters": {
        "temperature": 1,
        "maxOutputTokens": maxTokens,
        "topP": 0.8,
        "topK": 40
      }
    };
    xhr.send(JSON.stringify(requestBody));
  });
}

