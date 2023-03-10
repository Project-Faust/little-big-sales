const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
console.log('hello')
searchButton.addEventListener('click', () => {
  console.log('click')
  var searchForm = document.getElementById('search-form').value;

  fetch('https://www.cheapshark.com/api/1.0/games?title=' + searchForm)
    .then(function (response) {
      if (!response.ok) {
        throw response.json;
      };

      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      searchResults.innerHTML = '';
      data.forEach(function (result) {
        var convsersionRateNum = convertCurrency();
        targetCurrency = document.getElementById('money').value.toUpperCase();
        console.log('-----');
        console.log(convsersionRateNum);
        console.log(result.cheapest);
        var finalConvertedPrice = convsersionRateNum * result.cheapest;
        // create items
        const listDiv = document.createElement('div');
        const listItem = document.createElement('a');
        const listImage = document.createElement('img');
        const lineBreak = document.createElement('br')
        // set item content
        listImage.setAttribute('src', result.thumb);
        listItem.href = 'https://www.cheapshark.com/redirect?dealID=' + result.cheapestDealID;
        listItem.textContent = result.cheapest + ' USD / ' + finalConvertedPrice + ' ' + targetCurrency + ': ' + result.external;
        // append items to page
        searchResults.appendChild(listDiv);
        listDiv.appendChild(listImage);
        listDiv.appendChild(lineBreak);
        listDiv.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error(error);
    });
});

function convertCurrency() {
  const fromCurrency = 'usd';
  var toCurrency = document.getElementById('money').value;
  // Make a GET request to the API endpoint to retrieve the latest exchange rates
  fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/" + fromCurrency + "/" + toCurrency + ".json")
    .then(response => response.json())
    .then(function (data) {
      var convsersionRate = data[toCurrency];
      console.log(convsersionRate);
      return convsersionRate;
    })
    .catch(error => {
      console.error("Error retrieving exchange rates:", error);
    });
  // var convertedPrice = result.cheapest * convsersionRate;
  // return convertedPrice;
};