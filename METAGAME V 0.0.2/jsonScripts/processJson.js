function process(directory) {
  fetch(directory)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var result = calcularTotal(data);
      processCart(result)
    })
    .catch(function (err) {
    });
} 