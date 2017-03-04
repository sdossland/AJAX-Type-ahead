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
      const regex = new RegExp(searchWord, 'gi');
      return location.city.match(regex) || location.state.match(regex);
    })
  }

  //HTML input and output fields
  const searchWords = document.querySelector('.searchWords'),
        matchedList = document.querySelector('.matches');

  //convert numbers to english format
  function numberFormat(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  //displays the data in an unordered list
  function displayMatches() {
    const matches = findMatches(this.value, cities);
    const toDisplay = matches.map(location => {
      const regex = new RegExp(this.value, 'gi'),
            city = location.city.replace(regex, `<span class="highlightSearch">${this.value}</span>`),
            state = location.state.replace(regex, `<span class="highlightSearch">${this.value}</span>`);
      return `
        <li>
            <span class="cityState">${city}, ${state}</span>
            <span class="population">${numberFormat(location.population)}</span>
        </li>
      `;
    });
    matchedList.innerHTML = toDisplay;
  }

  //when user changes the input field, find the matches to display
  searchWords.addEventListener('keyup', displayMatches);

});