$(function () {

  $('#nav li').click(function (e) {
    e.stopPropagation();

    if ($(this).hasClass('active')) return;

    var indexTab = $(this).index();

    $(this).addClass('active').siblings().removeClass('active');

    $('form section').eq(indexTab).addClass('show').siblings().removeClass('show');

  });


  $('.next').on('click', function () {
    goPage($(this), 'next', 1);
  });

  $('.back').on('click', function () {
    goPage($(this), 'prev', -1)
  });

  function goPage(elem, action, dir) {

    var indexTab = elem.closest('section').index();
    elem.closest('section')[action]('section').addClass('show').siblings().removeClass('show');
    $('#nav li').eq(indexTab + dir).addClass('active').siblings().removeClass('active');

  }

  var selectDrop = $('.select-drop-options');

  $('.select-arrow').on('click', function () {

    var thisSelect = $(this).closest('.custom-select').find('.select-drop-options');

    if (selectDrop.not(thisSelect).hasClass('show')) {
      selectDrop.filter('.show').removeClass('show');
    }

    thisSelect.toggleClass('show');
    if (thisSelect.hasClass('show') && thisSelect.find('.optList').length) {
      thisSelect.find('.optList').css('display', 'block');
    }

    $(document).on('click', function (e) {
      if (!$(e.target).hasClass('select-arrow')) {
        selectDrop.filter('.show').removeClass('show');
      }
    });
  });


  $('.select-items li').on({
    'click': function (e) {
      e.stopPropagation();
      var input = $(this).closest('.custom-select').find(':text');
      $(this)
      .closest('.select-options')
      .find('.selected')
      .removeClass('selected');

      input.val($(this).text()).removeClass('placeholder');

      if ((input.val()) && (input.hasClass('tick'))) {
        input.closest('li').find('.txt-title').css('background-position', '-11px -63px');
      }

      $(this).addClass('selected');

      selectDrop.removeClass('show');
    }
  });

  $('.select-txt :text').on({
    'keyup': function () {
      if ($(this).val() == '') {
        $(this)
        .closest('.custom-select')
        .find('.selected')
        .removeClass('selected');
      }
    }
  });

  $('.li').on({
    'mouseover': function (e) {
      $(this).addClass('selected').siblings('.li').removeClass('selected');

    },
    'click': function (e) {
      $(this).closest('.custom-select').find(':text').val($(this).find('.label').text());
      $(this).removeClass('selected');
      $(this).closest('.optList').removeClass('filterMode');
      $(this).closest('.select-drop-options').removeClass('show');
      $(this).closest('.custom-select').find(':text').removeClass('placeholder');
    },
    'mouseout': function (e) {
      $(this).removeClass('selected');

    }
  });

  $('.drinks .select-txt :text').on({
    'keyup': function (event) {

      var selectList = $(this).closest('.drinks').find('.optList');
      var selectDrop = selectList.closest('.select-drop-options');
      var keyCode = event.keyCode;
      var isArrows = ((keyCode == 38) || (keyCode == 40));
      var isEnter = (keyCode == 13);
      var isEsc = (keyCode == 27);
      var hideSelect = (isEnter || isEsc);
      var removeSelect = (keyCode == 8 || keyCode > 49);
      var str = $(this).val().toLowerCase();


      if (!$(this).val()) {
        selectDrop.removeClass('show');

      } else {
        selectDrop.addClass('show');
      }

      searchStr(str, selectList.find('.label'), selectList);
      if (isArrows) {
        selectItem(selectList.find('.li:not(.hidden)'), 'selected', keyCode);
      }
      else {
        if (hideSelect) {
          writeData({
            elem: selectList.find('.li:not(.hidden)'),
            input: $(this),
            cls: 'selected',
            keyCode: keyCode,
            select: selectList
          });
        }

        if (removeSelect) {
          selectList.find('.selected').removeClass('selected');
        }
      }
    }
  });

  function writeData(obj) {
    if ((obj.keyCode == 13) && (obj.elem.hasClass(obj.cls))) {
      obj.input.val(obj.elem.filter('.' + obj.cls).children('.' + 'label').text());
    }

    obj.select.find('.' + obj.cls).removeClass(obj.cls);
    obj.select.removeClass('filterMode');
    obj.select.closest('.select-drop-options').removeClass('show');

  }

  function getIndex(elem, cls) {
    for (var i = 0; i < elem.length; i++) {
      if (elem.eq(i).hasClass(cls)) {
        break;
      }
    }
    return i;
  }

  function selectItem(elem, cls, dir) {

    var index = getIndex(elem, cls);
    if (dir == 40) {
      (!elem.hasClass(cls) || elem.last().hasClass(cls))
        ? elem.removeClass(cls).first().addClass(cls)
        : elem.removeClass(cls).eq(index + 1).addClass(cls);

    } else {

      (elem.first().hasClass(cls))
        ? elem.removeClass(cls).last().addClass(cls)
        : elem.removeClass(cls).eq(index - 1).addClass(cls);
    }

  }

  function searchStr(str, elem, select) {
    elem.each(function () {
      var action = (str == '' || $(this).text().toLowerCase().indexOf(str) == -1) ? "addClass" : "removeClass";
      $(this).closest('.li')[action]('hidden');
    });

    var action = (select.find(('.li:not(.hidden)')).length) ? "addClass" : "removeClass";
    select[action]('filterMode');
  }
});