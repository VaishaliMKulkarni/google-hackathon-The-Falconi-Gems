// For PoC we'll just update these values as we go rather than store in memory cache or session state DB like Redis
// For now we'll use these to customise prompts and hold responses in memory (variables)

var promptPref1 = ""; // budget vs luxury
var promptPref2 = ""; // sun and sea vs mountain retreat
var promptPref3 = ""; // culture and history vs modern vibrant city
var promptPref4 = ""; // popular vs undiscovered
var locationName = ""; // will be filled with the location
var locationShortDescription = ""; // will be filled with the short description
var locationLongDescription = ""; // will be filled by the long description
var locationRatings = ""; // will be filled by the ratings string
var locationReviews = ""; // will be filled by the location reviews
var locationItinerary = ""; // will be filled by the location itinerary
var locationImages = ""; // will store the images in an array 