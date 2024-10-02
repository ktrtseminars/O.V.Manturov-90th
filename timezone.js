Date.prototype.addHours= function(value){
    var hours = Number.parseFloat(value)
    this.setHours(this.getHours()+hours);
    return this;
}

function gmtChange(self){
  var value = self.value;
  var time_elements_utc = document.getElementsByClassName('talk-time-utc');
  var time_elements_value = document.getElementsByClassName('talk-time-value');
  var i;
  for (i=0; i < time_elements_utc.length; i++){
    var time_element_utc = time_elements_utc[i];
    var time_element_val = time_elements_value[i];
    var start_datetime = (new Date(time_element_utc.innerHTML)).addHours(value)
    var duration = Number.parseFloat(time_element_utc.getAttribute('duration'));
    var end_datetime = new Date(start_datetime).addHours(duration);
    var date = start_datetime.toDateString();
    var s_hh = start_datetime.getUTCHours().toString().padStart(2,0);
    var s_mm = start_datetime.getUTCMinutes().toString().padStart(2,0);
    var e_hh = end_datetime.getUTCHours().toString().padStart(2,0);
    var e_mm = end_datetime.getUTCMinutes().toString().padStart(2,0);
    time_element_val.innerHTML = `<p>&#128467; ${date}</p><p>&#128337; ${s_hh}:${s_mm} - ${e_hh}:${e_mm}</p>`;
  }
}

function setupTalkTimes(){
  var tz_offcet = (-1)*(new Date()).getTimezoneOffset()/60;
  var tz_selector = document.getElementById('timezone-offset');
  var tz_options = tz_selector.children;
  var i;
  for (i=0; i < tz_options.length; i++){
    var tz_option = tz_options[i];
    if (Number.parseFloat(tz_option.value) == tz_offcet){
      tz_selector.value = tz_option.value;
      break;
    }
  }

  gmtChange(tz_selector);
}
