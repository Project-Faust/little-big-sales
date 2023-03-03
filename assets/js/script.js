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