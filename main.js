$(document).ready(function(){
  // ----- DEBUG Layout -----
  // Color backgrounds for layout debugging
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

  // ----- Tab Handling -----
  // Select the corresponding tab if we load the page with a hash in the URL
  selectTab(window.location.hash);

  // Handling tab selection via navigation link
  $('.tab-link').click(function(evt) {
    // Don't do automatic scroll behavior
    evt.preventDefault();

    // But do select the tab and update the location
    var hash = $(this).attr('href');
    if ( history.pushState ) {
      history.pushState(null, null, hash);
    } else {
      location.hash = hash;
    }
    selectTab(hash);

    // If tabs are out of the viewport, scroll to the top, not to the tab - because of floating navbar, looks bad
    // TODO Will need different scroll behavior on mobile
    var activeTab = $(hash);
    if ( !isInViewport(activeTab) ) {
      $(document).scrollTop(0);
    }
  });

  // ----- Modal Window Handling -----
  // Open the modal window when the "Download" button is clicked
  $('#download-resume').click(function(evt) {
    $('.modal, .modal-dimmer').removeClass('displaynone');
    // Exit the modal window with escape key
    $(window).on('keydown.closeModal', function(evt) {
      if ( evt.which == 27 ) { // 27 = ESC
        $('.modal, .modal-dimmer').addClass('displaynone');
        $(window).off('keydown.closeModal'); // thanks to jQuery event namespaces, only this handler will be detached
      }
    });
  });
  // Exit the modal window when clicking outside of it
  $('.modal-dimmer').click(function(evt){
    $('.modal, .modal-dimmer').addClass('displaynone');
    $(window).off('keydown.closeModal');
  });
});

// ----- Tab Handling -----
// Switch tabs on hash change (from navbar or tab click)
function selectTab(hash) {
  hash = hash.slice(1); // Strip hash symbol from beginning
  if ( hash !== "skills" && hash !== "demos" && hash !== "repos" && hash !== "contact" )
    return; // This is not a tab name; do nothing

  var allTabs = $('.tab-content');
  var activeTab = $('#'+hash);
  allTabs.removeClass('tab-active');
  activeTab.addClass('tab-active');
}
$(window).on("hashchange", function(evt) {
  selectTab(window.location.hash);
});


// ----- Navbar Button Handling -----
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
