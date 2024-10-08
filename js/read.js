$(document).ready(function() {
  $('.masthead').addClass('bg');
  $('.masthead').removeClass('zoomed');
  $('.ui.button.primary').hover(function(){
    $(this).css('opacity','0.75')
    },function(){
    $(this).css('opacity','1')
  });
  $('.rounded.big.square.icon').hover(function(){
    $(this).addClass('activeicon');
    },function(){
    $(this).removeClass('activeicon');
  });

  if($(window).width() > 600) {
    $('body').visibility({
        offset         : -10,
        observeChanges : false,
        once           : false,
        continuous     : false,
        onTopPassed: function() {
          requestAnimationFrame(function() {
            $('.following.bar').addClass('light fixed')
            .find('.menu').removeClass('inverted');
            $('.following .additional.item').transition('scale in', 750);
          });
        },
        onTopPassedReverse: function() {
          requestAnimationFrame(function() {
            $('.following.bar').removeClass('light fixed')
            .find('.menu').addClass('inverted')
            .find('.additional.item').transition('hide');
          });
        }
    });
  }
  // create sidebar and attach to menu open
  $('.ui.sidebar').sidebar('attach events', '.toc.item');

  $('#studies').click( function(){
    window.location = '../../../studies';
  });
});
