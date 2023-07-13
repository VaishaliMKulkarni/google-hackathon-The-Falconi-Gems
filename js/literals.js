// If NOT hosted on Google (e.g. App Engine)
// Comment if using a JavaScript prompt to set
// let accessToken = 'ya29.a0AbVbY6NI3LCYQJc3GdDnAFcvzn62I_VECa1T0qWz9PyKLJ0AH0IFF9UCzq2UdcWqF1uHt_K7elylEINOkfJyHJqejC2b0jvnaflDpDvZQFrdHZvQ-rAdWxBtDpzmxCju-MiyV2ORg9NT98SqQIfRB9SxS8IfbVKR6efYsk7LgvL_DnM7kB8V6NqDAOaSVUE9LsIh8wVEzZsqtPcAG4z9CYLEj7rHRtO_d9srL9D2Qlxm3CRd02RC-Zz0Kq91v6aekJVG2l7g4eJSZ9if3C1RKR-xlpBTsLTcYd7ApOPhLJ1iGh88l60x8KV6JPHRJYL2WPi3Ri2WaPebJzyk2gx6Luz3NMiSmLXLqhMg_QPulXLE-OXQZYwZZAcd-aFlBE0QdGLhAgOiBDXx1Ue12ZbLntk1w_QaCgYKAfMSARISFQFWKvPlRAdnefYQ8gwyNtl-UPvs_A0418';            
var accessToken = '';

var API_ENDPOINT="us-central1-aiplatform.googleapis.com";
var PROJECT_ID="967103794570";
var ENDPOINT_ID="1763928912254992384"
var endpoint = 'https://' + API_ENDPOINT + '/v1/projects/' + PROJECT_ID + '/locations/us-central1/endpoints/' + ENDPOINT_ID + ':predict';
//https://us-central1-aiplatform.googleapis.com/v1/projects/gen-the-falconi-gems/locations/us-central1/publishers/google/models/text-bison@001:predict
// For Prompts - further enhanced by user preferences

// Location name only
let forRecommendedDestination = 'I am a traveler looking for exciting new experiential destinations that are not common or major tourist destinations. Show me an experiential travel destination that is the name of a city or region and not a country or landmark. I do not want a description, I only want the location and the country. I do not want any other text but the location and country.';

// Location summary text
let forDestinationSummary = 'I would like a short description that focuses on unique and interesting activities for the location of ';

// Location detail text
let forDestinationDetail = 'I am a traveler looking for exciting new experiential destinations that are not common or major tourist destinations. Show me an experiential travel destination that is the name of a city or region and not a country or landmark. I do not want a description, I only want the location and the country.';

// Location itinerary
let forDestinationItinerary = 'I am looking for a 7 day itinerary for the location of ';

// Ratings
let forDestinationRatings = 'I am looking for ratings, not a description, for the location of ';

// Ratings
let forDestinationReviews = 'I am looking for traveler reviews, not a description, for the location of ';

// Weather
let forDestinationWeather = 'I am looking for a description of the weather throughout the seasons for the location of  ';