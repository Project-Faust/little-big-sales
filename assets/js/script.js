const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', () => {
  var searchForm = document.getElementById('search-form').value;
  fetch('https://www.cheapshark.com/api/1.0/games?title=' + searchForm)
    .then(function (response) {
      if (!response.ok) {
        throw response.json;
      };
      return response.json();
    })
    .then(function (data) {
      searchResults.innerHTML = '';
      data.forEach(function (result) {
        convertCurrency()
          .then(function (conversionRateNum) {
            targetCurrency = document.getElementById('money').value.toUpperCase();
            var finalConvertedPrice = (conversionRateNum * result.cheapest).toFixed(2);
            // create items
            const listDiv = document.createElement('div');
            const listItem = document.createElement('a');
            const listImage = document.createElement('img');
            const lineBreak = document.createElement('br');
            // set item content
            listImage.setAttribute('src', result.thumb);
            listItem.href = 'https://www.cheapshark.com/redirect?dealID=' + result.cheapestDealID;
            listItem.textContent = result.cheapest + ' USD / ' + finalConvertedPrice + ' ' + targetCurrency + ': ' + result.external;
            // append items to page
            searchResults.appendChild(listDiv);
            listDiv.appendChild(listImage);
            listDiv.appendChild(lineBreak);
            listDiv.appendChild(listItem);
          })
      });
    })
    .catch(error => {
      console.error(error);
    });
});

function convertCurrency() {
  const fromCurrency = 'usd';
  var conversionRate;
  var toCurrency = document.getElementById('money').value;
  // Make a GET request to the API endpoint to retrieve the latest exchange rates
  return fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/" + fromCurrency + "/" + toCurrency + ".json")
    .then(response => response.json())
    .then(function (data) {
      conversionRate = data[toCurrency];
      return Promise.resolve(conversionRate);
    })
    .catch(error => {
      console.error("Error retrieving exchange rates:", error);
    });
};