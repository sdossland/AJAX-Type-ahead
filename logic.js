/**
 * Created by sophia on 3/3/17.
 */
document.addEventListener("DOMContentLoaded", function () {

  //data source
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

  //create empty array to put the data in
  let cities = [];

  //pulls the data
  fetch(endpoint) //fetch returns a promise, therefore call .then
    .then(misc => misc.json()) //call .json() to convert to JSON format, but also returns a promise, therefore call .then again
    .then(data => (cities = data)); //put data into cities array

  //filters the cities array for the search word(s)
  function findMatches(searchWord, cities) {
    return cities.filter(function(location) {
      const regex = new RegExp(searchWord, 'ig');
      return location.city.match(regex) || location.state.match(regex);
    })
  }

  //displays the data in an unordered list
  function displayMatches() {

  }

});