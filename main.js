// Color backgrounds for layout debugging
$(document).ready(function(){
  var colors = [['red', 'darkred'],['palevioletred', 'mediumvioletred'],['lightsalmon', 'coral'],['purple','indigo'],['lightgreen','green'],['paleturquoise','turquoise'],['lightblue','royalblue']];
  var root = $('#page');
  var thisLevel = root.children('.container');
  var depth = 0;
  while ( thisLevel.length > 0 ) {
    thisLevel.each(function(index) {
      $(this).css('background-color', colors[depth][index % 2]);
    });
    thisLevel = thisLevel.children('.container');
    depth++;
  }
});


// Hide navigation buttons except when in view
function isInViewport(elem) {
  // Check if element is (at least partially) visible within viewport
  var navbar = $('#navbar');
  var viewportTop = $(window).scrollTop() + navbar.height();
  var viewportBottom = viewportTop + $(window).height() - navbar.height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}
$(window).scroll(function(evt) {
  if ( isInViewport($('#content')) ) {
    $('#navbar-links').addClass('navbar-hidden');
  } else {
    $('#navbar-links').removeClass('navbar-hidden');
  }
});
