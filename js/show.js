window.onload = function() {
  new DiscipleshipContainer('readonly');
  $('.special.cards .image').dimmer({
    on: 'hover'
  });
}

var setItem = function ( element ) {
  localStorage.setItem("libro-leccion", element.id );
}
