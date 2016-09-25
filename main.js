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