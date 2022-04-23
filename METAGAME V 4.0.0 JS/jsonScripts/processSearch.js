/**
 * _Search Process_
 * @param {*} searchBox box to seach
 */
 function processSearch(searchBox) {
  document.getElementById('searchText').innerText = ('Ha buscado: ' + searchBox);
  document.getElementById('searchText').style.visibility = 'visible';
}