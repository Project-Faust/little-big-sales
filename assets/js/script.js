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