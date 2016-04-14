window.onload = function() {

  $('.menu .item').tab();
  $('.special.cards .image').dimmer({
    on: 'hover'
  });
  console.log(localStorage.getItem("libro-leccion"));

  console.log(localStorage.getItem("libro-leccion"));

  new DiscipleshipContainer('get');

}
