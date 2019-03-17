'use strict'
$(function() {

  $('.row').on('click', function() {
   $('input[type=checkbox]', this).prop('checked', function(i, checked){
      console.log(i);
      return !checked
   })

  // チェックされた時のstyleを付与する
  if($('input[type=checkbox]', this).prop('checked'))
    $(this).addClass('selected');
  else
    $(this).removeClass('selected');
  });

  // listの数
  console.log($('.check-list > li').length);

});
