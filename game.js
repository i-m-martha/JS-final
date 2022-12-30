// TIMER

(function($) {
  "use strict";
  
  var gTicksLeft = 0;
  
  var digit1 = 0;
  var digit2 = 0;
  var digit3 = 0;
  var digit4 = 0;
  
  var gIntervalToken = null;
  
  var getTicksLeft = function() {
      return gTicksLeft;
  };
  
  var decTicksLeft = function() {
      gTicksLeft--;
  };
  
  var removeAllDigits = function($element) {
      $element.removeClass("digit0 digit1 digit2 digit3 digit4 digit5 digit6 digit7 digit8 digit9");
  };
  
  var setItem = function(itemNumber, digit) {
      var token = "#counter_item" + itemNumber + " :first-child";
      var $element = $(token).next(); // second child
  
      removeAllDigits($element);
      $element.addClass("digit" + digit);
  };
  
  var calculateDigits = function() {
      var minutesLeft = Math.floor(getTicksLeft() / 60);
      var secondsLeft = getTicksLeft() - minutesLeft * 60;
  
      digit1 = Math.floor(minutesLeft / 10);
      digit2 = minutesLeft - digit1 * 10;
  
      digit3 = Math.floor(secondsLeft / 10);
      digit4 = secondsLeft - digit3 * 10;
  
  };
  
  var init = function() {
      calculateDigits();
      setItem(1, digit1);
      setItem(2, digit2);
      setItem(4, digit3);
      setItem(5, digit4);
  };
  
  var switchItem = function(itemNumber, digit, capacity) {
      var nextDigit = (digit === 0) ? capacity : (digit - 1);    
      var token = "#counter_item" + itemNumber + " :first-child";
      var $element = $(token).next(); // second child
  
      removeAllDigits($element);
      $element.addClass("digit" + digit);
      $element.after('<div class="digit digit' + nextDigit + '" style="margin-top: 55px"></div>');
  
      var $newElement = $element.next();
      $element.animate({
          "margin-top": -55
      }, 500, function () { $element.remove(); });
  
      $newElement.animate({
          "margin-top": 0
      }, 500);
  
  };
  
  var counterFinished = function() {
      $('.lose').css({
          display: 'block'
      })
      $('#check').prop('disabled', true).addClass('disabled');
  };
  
  var rollToEnd = function() {
      for (var itemNumber = 1; itemNumber <= 5; itemNumber++) {
  
          var token = "#counter_item" + itemNumber + " :first-child";
          var $element = $(token).next(); // second child
  
          $element.after('<div class="digit digit_cherry" style="margin-top: 55px"></div>');
  
          var $newElement = $element.next();
          $element.animate({
              "margin-top": -55
          }, 500, function () { $element.remove(); });
  
          $newElement.animate({
              "margin-top": 0
          }, 500);
      }
      $.timeout(counterFinished, 1000);
  };
  
  var tick = function()
  {
      calculateDigits();
  
      if(digit4 === 0) {
          if (digit3 === 0) {
              if (digit2 === 0) {
                  switchItem(1, digit1, 5);
              }
              switchItem(2, digit2, 9);
          }
          switchItem(4, digit3, 5);
      }
      switchItem(5, digit4, 9);
  
      decTicksLeft();
  
      if (getTicksLeft() === 0) {
          clearInterval(gIntervalToken);
          gIntervalToken = null;
          $.timeout(rollToEnd, 1000);
      }
  };
  
  window.CounterInit = function(ticksCount) {
      if (ticksCount === null || isNaN(ticksCount)) {
          ticksCount = 10 * 60;
      }
      gTicksLeft = ticksCount;
      init();
      if (gIntervalToken !== null) {
          clearInterval(gIntervalToken);
          gIntervalToken = null;
      }
      
      $.timeout(function() {
          gIntervalToken = $.interval(tick, 1000);
      }, 100);
  };
  
  
  
  })(jQuery);




// Second part



  (function ($) {

      if (typeof $.timeout != "undefined") return;
  
      $.extend({
          timeout: function (func, delay) {
              // init
              if (typeof $.timeout.count == "undefined") $.timeout.count = 0;
              if (typeof $.timeout.funcs == "undefined") $.timeout.funcs = new Array();
              // set timeout
              if (typeof func == 'string') return setTimeout(func, delay);
              if (typeof func == 'function') {
                  $.timeout.count++;
                  $.timeout.funcs[$.timeout.count] = func;
                  return setTimeout("$.timeout.funcs['" + $.timeout.count + "']();", delay);
              }
          },
          interval: function (func, delay) {
              // init
              if (typeof $.interval.count == "undefined") $.interval.count = 0;
              if (typeof $.interval.funcs == "undefined") $.interval.funcs = new Array();
              // set interval
              if (typeof func == 'string') return setInterval(func, delay);
              if (typeof func == 'function') {
                  $.interval.count++;
                  $.interval.funcs[$.interval.count] = func;
                  return setInterval("$.interval.funcs['" + $.interval.count + "']();", delay);
              }
          },
          idle: function (func, delay) {
              // init
              if (typeof $.idle.lasttimeout == "undefined") $.idle.lasttimeout = null;
              if (typeof $.idle.lastfunc == "undefined") $.idle.lastfunc = null;
              // set idle timeout
              if ($.idle.timeout) { clearTimeout($.idle.timeout); $.idle.timeout = null; $.idle.lastfunc = null; }
              if (typeof (func) == 'string') {
                  $.idle.timeout = setTimeout(func, delay);
                  return $.idle.timeout;
              }
              if (typeof (func) == 'function') {
                  $.idle.lastfunc = func;
                  $.idle.timeout = setTimeout("$.idle.lastfunc();", delay);
                  return $.idle.timeout;
              }
          },
          clear: function (countdown) {
              clearInterval(countdown);
              clearTimeout(countdown);
          }
  
      });
  
  
  })(jQuery);



// PAZZLE


var rows = 4;
var cols = 4;
$(document).ready(function(){
  var sliceImg = createSlice(true);
  $('#start').html(sliceImg);

  var pieces = $('#start > div');
  var allPieces = shuffle(pieces);
  
  $('#begin').on('click', function(){
    
   
    allPieces.each(function(){
      var leftDist = Math.floor((Math.random() * 200 + 200)) + 'px';
      var topDist = Math.floor((Math.random() * 120 + 300)) + 'px';
      $(this).addClass('imgDraggable').css({
        position: 'absolute',
        left: `${leftDist}`,
        top: `${topDist}`
      })
      $('#start').append($(this));
    });
    
    var sliceImg = createSlice(false);
    $('#finish').html(sliceImg);

    addPuzzleEvents();
    $('#begin').prop('disabled', true).addClass('disabled');


  })



 $('#reset').on('click', function(){
  var sliceImg = createSlice(true);
  $('#start').html(sliceImg);
 })
 
$('#check').on('click', function(){
  $('.question').css({
    display: 'block'
  })
  
});

$('.contin').on('click', function(){
  $('.question').css({
    display: 'none'
  });
  if($('#finish div.pieceDropped').length !== 16){
    $('.lose').css({
      display: 'block'
  });
    return false;
  }
  for(let i = 0; i < 16; i++){
    var puzzlePiece = $(`#finish div.pieceDropped:eq("${i}")`);
    var sequence = parseInt(puzzlePiece.data('sequence'));
    if(i != sequence){
      $('.lose').css({
        display: 'block'
    });
      return false;
    }
    else{
      $('.win').css({
        display: 'block'
    });
      return true;
    }
  }
})

$('.reload').on('click', function(){

 if($('.modal-container').hasClass('lose')){
  $('.lose').css({
    display: 'none'
  });
 }
 
    $('#begin').prop('disabled', true).addClass('disabled');
    $('#check').prop('disabled', true).addClass('disabled');
    $('#start').empty();
    $('#finish').empty();
})

$('.win-close').on('click', function(){
     window.location.reload();
 })


$('.check-close').on('click', function(){
    $('.question').css({
      display: 'none'
    });

});



function createSlice(useImage){
  var sliceArr = [];
  for(let i = 0, top = 0, c = 0; i < rows; i++, top -= 45){
    for(let j = 0, left = 0; j < cols; j++, left -= 107, c++){
      if(useImage){
        sliceArr.push(`<div style="background-position: ${left + 'px'}  ${top + 'px'}" class="img" data-sequence="${c}">`);
      }
      else{
        sliceArr.push(`<div style="background-image: none;" class="img imgDroppable">`);
      }
      sliceArr.push(`</div>`);
    }
  }
  return sliceArr.join('');
}

function shuffle(o){
  for(let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function addPuzzleEvents(){
  $('.imgDraggable').draggable({
    revert: 'invalid',
    start: function(event, ui){
      var $this = $(this);
      if($this.hasClass('pieceDropped')){
        $this.removeClass('pieceDropped');
        ($this.parent().removeClass('piecePresent'));
      }
    }
  });

  $('.imgDroppable').droppable({
    hoverClass: 'ui-state-highlight',
    accept: function(draggable){
      return !$(this).hasClass('piecePresent');
    },
    drop: function(event, ui){
      var draggable = ui.draggable;
      var droppedOn = $(this);
      droppedOn.addClass('piecePresent');
      $(draggable).detach().addClass('pieceDropped').css({
        top: 0,
        left: 0,
        position: 'relative'
      }).appendTo(droppedOn);
    }
  });
}
});
