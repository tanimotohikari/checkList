'use strict'
  $('.row').on('click', function() {

   // Clicking on the parent row will toggle the child check box
   $('input[type=checkbox]', this).prop('checked', function(i, checked){
      return !checked
   })

  // Add selected class when box is checked
  if($('input[type=checkbox]', this).prop('checked'))
    $(this).addClass('selected');
  else
    $(this).removeClass('selected');
  });
