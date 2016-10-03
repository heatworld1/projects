$(document).ready(function() {
  var id;
  var began = false;
  $('body').on('click', '#start', function() {
    if (began !== true) {
      began = true;
      id = setInterval(function() {
        var $disp = $('#display'),
        d = $disp.val(),
        sec = $disp.data('sec');
        $disp.data('sec', parseInt(sec) + 1);
        $disp.val(convert(sec + 1));
      }, 1);
    }
  }).on('click', '#reset', function() {
    began = false;
    resetClock(id);
  }).on('click', '#pause', function() {
    began = false;
    pauseClock(id);
  }).on('click', '#snapshot', function() {
    var s = $('#display').val();
    $('body').append('<div class="record">' + s + '</div>');
  });
});

function pauseClock(id) {
  clearInterval(id);
}

function resetClock(id) {
  var $disp = $('#display');
  clearInterval(id);
  $disp.data('sec', 0);
  $disp.val('00:00:00');
  $('.record').remove();
}

function convert(data) {
	var sec_num = parseInt(data, 10),
		hours = Math.floor(sec_num / 3600),
		minutes = Math.floor((sec_num - (hours * 3600)) / 60),
		seconds = sec_num - (hours * 3600) - (minutes * 60);
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
}