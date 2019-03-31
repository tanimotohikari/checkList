'use strict'
$(function() {

  var $btn = $('#js-btn-clear');
  var ids = [];
  var listCount = 0;
  var checkCount = 0;

  // チェックした項目の数をカウントする
  function countChecked() {
    checkCount = $('input:checkbox:checked').length
    $('#js-check-count').html(checkCount);
  }

  function addCheckClass(selector)  {
    var selector = '#' + selector;
    $(selector).parents('.check-list-item').find('label').addClass('is-checked');
  }

  function removeCheckClass(selector)  {
    var selector = '#' + selector;
    $(selector).parents('.check-list-item').find('label').removeClass('is-checked');
  }

  // 全ての項目がチェックされた時　success failed
  function changeStatus() {
    if (listCount === checkCount) {
      $('.heading-icon-status').attr('src', 'images/icon_success.png');
    } else {
      $('.heading-icon-status').attr('src', 'images/icon_warning.png');
    }
  }

  // listの数
  listCount = $('.check-list > li').length;
  $('#js-list-count').html(listCount)

  // チェックボックスをクリックした時
  $('input').on('click', function() {
    var check = $(this).prop('checked');
    var index = $('input').index(this);
    var id = this.id;
    if (check) {
      localStorage.setItem('vwoCheck-' + index, check);
      addCheckClass(id);
      console.log(check);
    } else {
      localStorage.removeItem('vwoCheck-' + index);
      removeCheckClass(id);
      console.log(check);
    }

    countChecked();
    changeStatus();
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
    changeStatus();
  }

  getStorageData();
  countChecked();
  changeStatus();
});
