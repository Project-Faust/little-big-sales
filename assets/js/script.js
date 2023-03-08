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
      // set search form to empty
      searchResults.innerHTML = '';
      // loop through each object in result of fetch
      data.forEach(function (result) {
        // create HTML elements for each item
        const listDiv = document.createElement('div');
        const listItem = document.createElement('a');
        const listDealLink = document.createElement('a');
        const listImage = document.createElement('img');
        const lineBreak = document.createElement('br')
        // set content of created items
        listDiv.setAttribute('class', 'column')
        listImage.setAttribute('src', result.thumb);
        listDealLink.textContent = 'Click to see the best deal!'
        listItem.href = 'https://www.cheapshark.com/redirect?dealID=' + result.cheapestDealID;
        listItem.textContent = '$' + result.cheapest + ' / ' + 'currency' + ': ' + result.external;
        // append created items to page
        searchResults.appendChild(listDiv);
        listDiv.appendChild(listImage);
        listDiv.appendChild(listItem);
        // searchResults.appendChild(listDealLink);
        searchResults.appendChild(lineBreak);
      });
    })
    // catch and log any errors
    .catch(error => {
      console.error(error);
    });
});
