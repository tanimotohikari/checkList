'use strict'
$(function() {

  var $btn = $('#js-btn-clear');
  var ids = [];

  // チェックした項目の数をカウントする
  function countChecked() {
    var checkCount = $('input:checkbox:checked').length
    $('#js-check-count').html(checkCount);
  }

  // 全ての項目がチェックされた時　success failed

  // listの数
  var listCount = $('.check-list > li').length;
  $('#js-list-count').html(listCount)

  // チェックボックスをクリックした時
  $('input').on('click', function() {
    var check = $(this).prop('checked');
    var index = $('input').index(this);
    if (check) {
      localStorage.setItem('vwoCheck-' + index, check);
    } else {
      localStorage.removeItem('vwoCheck-' + index);
    }

    countChecked();
  });

  // クリアボタンを押した時
  $btn.on('click', clearData);

  function getStorageData() {
    for(var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if(key.match('vwoCheck')) {
        var index = key.split('-');
        ids.push('#checkbox' + index[1]);
        var id = '#checkbox' + index[1];
        var boolean = localStorage.getItem(key);
        $(id).attr('checked', boolean);
      }
    }
  }

  function clearData() {
    localStorage.clear();
    alert('チェックされたデータはクリアされました')
    for (var i = 0; i < ids.length; i++) {
      $(ids[i]).attr('checked', false);
    }
  }

  getStorageData();
  countChecked();
});
