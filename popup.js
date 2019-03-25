'use strict'
$(function() {

  // listの数
  var listCount = $('.check-list > li').length;
  $('#js-list-count').html(listCount)

  $('input').click(function() {
    // for (var i = 0; i < listCount; i++) {
    //   localStorage.setItem('vwoCheck-' + i, check);
    // }
    var check = $(this).prop('checked');
    var index = $('input').index(this);
    localStorage.setItem('vwoCheck-' + index, check);
  })

  function getStorageData() {
    for(var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if(key.match('vwoCheck')) {
        var index = key.split('-');
        var id = '#checkbox' + index[1];
        console.log(id);
        var boolean = localStorage.getItem(key);
        $(id).attr('checked', boolean);
      }
      // if(key.match(/check/)) {
      //   console.log('hoge');
      // }
    }
  }

  getStorageData();
});
