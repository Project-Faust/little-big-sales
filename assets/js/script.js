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
        // if (result.steamAppID) {
          const listItem = document.createElement('li');
          const listDealLink = document.createElement('a');
          const listImage = document.createElement('i');
          const lineBreak = document.createElement('br')
          // listImage.src = result.thumb;
          listImage.setAttribute('src', result.thumb);
          listDealLink.textContent = 'Click to see the best deal!'
          listDealLink.href = 'https://www.cheapshark.com/redirect?dealID=' + result.cheapestDealID;
          listItem.textContent = '$' + result.cheapest + ' / ' + 'currency' + ': ' + result.external;
          searchResults.appendChild(listImage);
          searchResults.appendChild(listItem);
          searchResults.appendChild(listDealLink);
          searchResults.appendChild(lineBreak);

        // };
      });
    })
    .catch(error => {
      console.error(error);
    });
});


// fetch('https://www.cheapshark.com/api/1.0/games?title=' + searchForm)
//     .then(response => response.json() {
//     console.log(response);
// })

// var dealSearch = document.getElementById('find-deal-btn');

// var getDealRepo = function () {
//     var dealApi = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15';
//     fetch(dealApi)
//     .then(function (response) {
//       if (response.ok) {
//         console.log(response);
//         response.json().then(function (data) {
//           console.log(data);
//           displayRepos('');
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert('Unable to connect to GitHub');
//     });
// };
var currency = document.getElementById('money');
var moneyValue = currency.value;
var result = currency.options[currency.selectedIndex].text;
var resultFrom;
var resultTo;
var searchValue;

searchResults.addEventListener('change', (event) => {
  resultFrom = `${event.target.value}`;
});
moneyValue.addEventListener('change', (event) => {
  resultTo = `${event.target.value}`;
});

searchResults.addEventListener('input', updateValue);

function updateValue(e) {
  searchValue = e.target.value;
}

var dealConvert = function () {
  var apiUrl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@{apiVersion}/latest//currencies.json';
  fetch(apiUrl)
  .then(currency => {
    return currency.json();
}).then(displayResults);
};

    
    function display(currency) {      
      let toRate = moneyValue;
      finalValue.innerHTML = ((toRate / searchResults) * searchValue).toFixed(2);
      searchResults / toRate;

    };