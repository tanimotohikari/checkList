'use strict'
$(function() {

  var $btn = $('#js-btn-clear');
  var ids = [];
  var listCount = 0;
  var checkCount = 0;
  var $listItem = $('.content-list li');
  var $vwo = $('#js-vwoList-show');
  var $back = $('#js-back-menu');
  var currentList = '';


  // クリックに関する処理
  // クリアボタン
  $btn.on('click', clearData);
  $back.on('click', backMenu);

  // チェックリストの選択
  $listItem.on('click', showVwoList);

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
    } else {
      localStorage.removeItem('vwoCheck-' + index);
      removeCheckClass(id);
    }

    countChecked();
    changeStatus();
  });

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
    alert('チェックされたデータはクリアされました');
    $('input').prop('checked', false);
    $('label').removeClass('is-checked');
    changeStatus();
  }

  // vwoのチェックリストがスライドイン
  function showVwoList() {
    var id = $(this)[0].id
    var selector = id.split('-');
    selector = selector[1];
    currentList = `#${ selector }`;
    $back.removeClass('is-hide');
    $listItem.fadeOut();
    $(currentList).addClass('is-move-left');
  }

  // チェックリスト選択メニューに戻る
  function backMenu() {
    $back.addClass('is-hide');
    $listItem.fadeIn();
    $(currentList).removeClass('is-move-left');
  }

  getStorageData();
  countChecked();
  changeStatus();
});
