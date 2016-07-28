$(document).ready(function() {
    
    $('#clock-time').text($('#work-time').text());
    breakTime();
    workTime();
    toggleClockButton();
    convert(parseInt($('#work-time').text()));
  
  
});

var $hr              = 0,
    $min             = 0,
    $sec             = 0,
    $breakLength     = 5,
    $workLength      = 25,
    $set             = null,
    $currentLength   = 1,
    $progressBarTime = $currentLength * 60000,
    $currentSession  = 'work';

//this is the function which add or subtract to/from the break time
function breakTime(){
    //subtract from the break time
    $('#minus-break').click(function() {
      var $currentValue = parseInt($('#break-time').text()) - 1;
      if($currentValue >= 1) {
        if($('#clock-button').text() === 'START') {
            $('#break-time').text($currentValue.toString());
            $breakLength--;
        }
        if($currentSession === 'break') {
          if($('#clock-button').text()  === 'START') {
            convert($breakLength);
            $progressBarTime = $breakLength * 60000;
            $('#progress').animate({width: "0"}, 1000);
          }
        }     
      } else {
          if($('#clock-button').text() === 'START') {
            $breakLength = 1;
            $('#break-time').text("1");
          }
          if($currentSession === 'break') {
            if($('#clock-button').text()  === 'START') {
              convert($breakLength);
              $progressBarTime = $breakLength * 60000;
              $('#progress').animate({width: "0"}, 1000);
            }
          } 
      }
    });

    //add to the break time
    $('#plus-break').click(function() {
      var $currentValue = parseInt($('#break-time').text()) + 1;
      if($('#clock-button').text() === 'START') {
        $breakLength++;
        $('#break-time').text($currentValue.toString());
      }
      if($currentSession === 'break') {
        if($('#clock-button').text() === 'START') {
          convert($breakLength);
          $progressBarTime = $breakLength * 60000;
          $('#progress').animate({width: "0"}, 1000);
        }
      } 
    });
};

//this is the function which add or subtract to the work time
function workTime(){
    //subtract from the work time
    $('#minus-work').click(function() {
      var $currentValue = parseInt($('#work-time').text()) - 1;
      if($currentValue >= 1) {
        if($('#clock-button').text() === 'START') {
           $workLength--;
           $('#work-time').text($currentValue.toString());  
        }
        if($currentSession === 'work') {
          if($('#clock-button').text()  === 'START') {
            convert($workLength);
            $progressBarTime = $workLength * 60000;
            $('#progress').animate({width: "0"}, 1000);
          }
        } 
      } else {
          if($('#clock-button').text() === 'START') {
             $workLength = 1;
             $('#work-time').text("1");
          }
          if($currentSession === 'work') {
            if($('#clock-button').text()  === 'START') {
              convert($workLength);
              $progressBarTime = $workLength * 60000;
              $('#progress').animate({width: "0"}, 1000);
            }
          } 
      }
    });
  
    //add to the work time
    $('#plus-work').click(function() {
      var $currentValue = parseInt($('#work-time').text()) + 1;
      if($('#clock-button').text() === 'START') {
         $workLength++;
         $('#work-time').text($currentValue.toString());
      }
      if($currentSession === 'work') {
        if($('#clock-button').text()  === 'START') {
          convert($workLength);
          $progressBarTime = $workLength * 60000;
          $('#progress').animate({width: "0"}, 1000);
        }
      } 
    });
};

/* 
the function for the clock-button which will toggle between start and stop
if the current state is START it will be switched to STOP and the time will stop
from running out, if the current state is STOP it will be switched to START and the time
will start to run out
Toggle between start and stop & countdown function
*/
function toggleClockButton() {
    
    $('#clock-button').click(function() {
        if($('#clock-button').text() === 'START') {
            $('#clock-button').text('STOP');
            $set = setInterval(function() {
              if($currentSession === 'work') {
                  if($currentLength !== $workLength) {
                     $currentLength = $workLength;
                     $progressBarTime = $currentLength * 60000;
                     $('#progress').animate({width: "0"}, 1000);
                  }
              } else {
                    if($currentLength !== $breakLength) {
                      $currentLength = $breakLength;
                      $progressBarTime = $currentLength * 60000;
                      $('#progress').animate({width: "0"}, 1000);
                    }
                }
                $('#progress').animate({width: $('#bar').width()}, $progressBarTime);
                if($hr === 0) {
                    $('#clock-time').text($min + ':' + $sec);
                } else {
                    $('#clock-time').text($hr + ':' + $min + ':' + $sec);
                  }
                if($hr === 0 && $min === 0 && $sec === 0) {
                    $("#progress").stop(true, true);
                    $('#progress').animate({width: "0"}, 1000);
                    session();
                    $('#clock-button').text('START');
                    clearInterval($set);
                    if($currentSession === 'work') {
                        convert($workLength);
                        $currentLength = $workLength;
                    } else {
                         convert($breakLength); 
                         $currentLength = $breakLength;
                      }
                    $progressBarTime = $currentLength * 60000;
                    $('#alarm')[0].play();
                 }
                 if($sec === 0) {
                     $sec = 60;
                     if($min > 0) {
                         $min--;                     
                     }
                  }
                  if($min === 0) {
                      if($hr === 1) {
                        $min = 59;
                        $hr--;
                      }
                      if($hr > 1) {
                        $hr--; 
                      }
                  }
                  $sec--;
                  $progressBarTime -= 1000;
            }, 1000);
        } else {
              $('#clock-button').text('START');
              $('#progress').stop(true);     
              clearInterval($set); 
          }
    });
  
}

//switch between break time and work time function
function session() {
  
    if($currentSession === 'work') {
      $('#current-session').text('BREAK');
      $('#clock-time').text($('#break-time').text());
      $currentSession = 'break';
    } else {
        $('#current-session').text('WORK');
        $('#clock-time').text($('#work-time').text());
        $currentSession = 'work';
      }
  
}

//convert minutes to hr:min:sec function
function convert($time) {

    $time = $time / 60;
    $hr = parseInt($time);
    $time = ($time - parseInt($time)) * 60;
    $min  = parseInt($time);
    $time = (($time - parseInt($time)) * 60).toFixed(2);
    $sec  = parseInt($time);
  
}