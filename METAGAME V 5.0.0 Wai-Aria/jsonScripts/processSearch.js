/**
 * _Search Process_
 * @param {*} searchBox box to seach
 */
 function processSearch(searchBox) {
  $("#searchBox").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      localStorage.setItem("searchText",searchBox);
      document.getElementById('searchText').innerText = ('Ha buscado: ' + searchBox);
      document.getElementById('searchText').style.visibility = 'visible';
      location.href= "./searchResults.html"
    }
  });
  $("#sideNavSearchBox").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
      localStorage.setItem("searchText",sideNavSearchBox);
      document.getElementById('searchText').innerText = ('Ha buscado: ' + searchBox);
      document.getElementById('searchText').style.visibility = 'visible';
      location.href= "./searchResults.html"
    }
  });
}