const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

searchButton.addEventListener('click', () => {
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
            data.results.forEach(function (result) {
                const listItem = document.createElement('li');
                listItem.textContent = result.title;
                searchResults.appendChild(listItem);
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

var dealSearch = document.getElementById('find-deal-btn');

var getDealRepo = function () {
    var dealApi = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15';
    fetch(dealApi)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos('');
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};