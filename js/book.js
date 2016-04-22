$(document).ready(function() {
  //$('.special.cards .image').dimmer({on: 'hover'});
  $('#home').click( function(){
    window.location = '../../';
  });
  $('#studies').click( function(){
    window.location = '../';
  });
  //for buttons
  $('.ui.button.primary').css('background-image','url("../../images/backgrounds/'+sessionStorage.getItem("randomColor")+'.jpg")');
  $('.ui.button.primary').css('background-position','0px');

  $('.ui.button.primary').hover(function(){
    $(this).css('opacity','0.75')
    },function(){
    $(this).css('opacity','1')
  });
});
