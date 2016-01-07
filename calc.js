$(function () {

  var calc = function () {

    var total, num, op, newNum;

    var showNumber = function (n) {
      if (n.toString().length > 9) n = n.toPrecision(9);
      return $('.window').text(n);
    };

    var btnDown = function (e) {
      $(this).addClass('keydown');
    };

    var btnUp = function () {
      $(this).removeClass('keydown');
    };

    var reset = function (e) {
      showNumber(0);
      clearVars();
    };

    var clear = function (e) {
      showNumber(0);
      num = '';
    };

    var percent = function (e) {
      num = (num/100) * total;
      showNumber(num);
    };

    var operator = function (e) {
      calcTotal();
      op = e.target.innerText;
      newNum = true;
    };

    var num = function (e) {
      var clicked = e.target.innerText;

      if (newNum) {
        num = clicked;
        newNum = false;
      } else {
        var numLength = $('.window').text().length;
        if (numLength > 10) return false;
        
        num += clicked;
      }

      showNumber(num);
    };

    var decimal = function () {
      var regex = /\./;
      if (newNum) {
        num = '.';
        newNum = false;
      }
      if (!regex.test(num)) num += '.';
      showNumber(num);
    };

    var equal = function (e) {
      calcTotal();
      showNumber(total);
      newNum = true;
    };

    var calcTotal = function () {
      if (total && num) {
        total = eval(Number(total) + op + Number(num));
      }
      if (!total) { // only 1 number so far
        total = num;
      }
      num = 0;
    }

    var clearVars = function () {
      total = false,
        num = '',
        op = false,
        newNum = true;
    }

    // bind events
    $('#ac').click(reset);
    $('#ce').click(clear);
    $('#percent').click(percent);
    $('.op').click(operator);
    $('.num').click(num);
    $('#decimal').click(decimal);
    $('#equal').click(equal);
    $('td').mousedown(btnDown);
    $('td').on('mouseup mouseout', btnUp);

    clearVars();

  }();

});
