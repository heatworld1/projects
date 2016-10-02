$(document).ready(function() {
  var $h = $('#h'),
    $m = $('#m'),
    $s = $('#s');

  if ($h) {
    var hr, k;
    for (k = 0; k < 24; k++) {
      hr += '<option value=' + k + '>' + k + '</option>';
    }
    $h.append(hr);
  }

  if ($m) {
    var min, j;
    for (j = 0; j < 60; j++) {
      min += '<option value=' + j + '>' + j + '</option>';
    }
    $m.append(min);
  }

  if ($s) {
    var sec, i;
    for (i = 0; i < 60; i++) {
      sec += '<option value=' + i + '>' + i + '</option>';
    }
    $s.append(sec);
  }
  
  $('body').on('click', '#start', function() {
    $('#form').hide();
    var h = ($h.val() < 10) ? "0" + $h.val() : $h.val();
    var m = ($m.val()  < 10) ? "0" + $m.val() : $m.val();
    var s = ($s.val()  < 10) ? "0" + $s.val() : $s.val();
    var d = h +':'+ m + ':' + s;
    $('#display').val(d);
    var secs = getSeconds(d);
    $('#display').data('sec',secs);
    
    var inter = setInterval(function() {
      //Remove a second
	  var $display = $('#display'),
		c = false;
      if ($display.val() === '00:00:00') {
        clearInterval(inter);
        c = confirm('Do you want to try again?');
        if (c === true) {
          location.removedByCodePen();
        }
      } else {
		  var sec = $display.data('sec');
		  $display.data('sec', sec - 1);
		  $display.val(convert(sec - 1));
      }
    },1000);
    
  });
});

function getSeconds(s) {
  var hms = s,
	a = hms.split(':'),
	seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 

  return seconds;
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