
function processJson(directory) {
  var result = ''
  fetch(directory)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      result = calcularTotal(data);
      alert('Precio de la compra: '+result)
    })
} 


function checkPassword(pass1, pass2) {
  if (pass1 !== pass2) {
    $('#err-msg').html('Las contraseñas no coinciden')
  }
}