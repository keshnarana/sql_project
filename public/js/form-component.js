var Script = function() {

  //checkbox and radio btn

  var d = document;
  var safari = (navigator.userAgent.toLowerCase().indexOf('safari') != -1) ? true : false;
  var gebtn = function(parEl, child) {
    return parEl.getElementsByTagName(child);
  };
  onload = function() {


    if (!d.getElementById || !d.createTextNode) return;
    var ls = gebtn(d, 'label');
    for (var i = 0; i < ls.length; i++) {
      var l = ls[i];
      if (l.className.indexOf('label_') == -1) continue;
      var inp = gebtn(l, 'input')[0];
      if (l.className == 'label_check') {
        l.className = (safari && inp.checked == true || inp.checked) ? 'label_check c_on' : 'label_check c_off';
        l.onclick = check_it;
      };
      if (l.className == 'label_radio') {
        l.className = (safari && inp.checked == true || inp.checked) ? 'label_radio r_on' : 'label_radio r_off';
        l.onclick = turn_radio;
      };
    };
  };
  var check_it = function() {
    var inp = gebtn(this, 'input')[0];
    if (this.className == 'label_check c_off' || (!safari && inp.checked)) {
      this.className = 'label_check c_on';
      if (safari) inp.click();
    } else {
      this.className = 'label_check c_off';
      if (safari) inp.click();
    };
  };
  var turn_radio = function() {
    var inp = gebtn(this, 'input')[0];
    if (this.className == 'label_radio r_off' || inp.checked) {
      var ls = gebtn(this.parentNode, 'label');
      for (var i = 0; i < ls.length; i++) {
        var l = ls[i];
        if (l.className.indexOf('label_radio') == -1) continue;
        l.className = 'label_radio r_off';
      };
      this.className = 'label_radio r_on';
      if (safari) inp.click();
    } else {
      this.className = 'label_radio r_off';
      if (safari) inp.click();
    };
  };



  $(function() {

    // Tags Input
    $(".tagsinput").tagsInput();

    // Switch
    $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();

  });





  //date picker

  if (top.location != location) {
    top.location.href = document.location.href;
  }
  $(function() {
    window.prettyPrint && prettyPrint();
    $('#dp1').datepicker({
      format: 'mm-dd-yyyy'
    });
    $('#dp2').datepicker();
    $('#dp3').datepicker();
    $('#dp3').datepicker();
    $('#dpYears').datepicker();
    $('#dpMonths').datepicker();


    var startDate = new Date(2012, 1, 20);
    var endDate = new Date(2012, 1, 25);
    $('#dp4').datepicker()
      .on('changeDate', function(ev) {
        if (ev.date.valueOf() > endDate.valueOf()) {
          $('#alert').show().find('strong').text('The start date can not be greater then the end date');
        } else {
          $('#alert').hide();
          startDate = new Date(ev.date);
          $('#startDate').text($('#dp4').data('date'));
        }
        $('#dp4').datepicker('hide');
      });
    $('#dp5').datepicker()
      .on('changeDate', function(ev) {
        if (ev.date.valueOf() < startDate.valueOf()) {
          $('#alert').show().find('strong').text('The end date can not be less then the start date');
        } else {
          $('#alert').hide();
          endDate = new Date(ev.date);
          $('#endDate').text($('#dp5').data('date'));
        }
        $('#dp5').datepicker('hide');
      });

    // disabling dates
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

    var checkin = $('#dpd1').datepicker({
      onRender: function(date) {
        return date.valueOf() < now.valueOf() ? 'disabled' : '';
      }
    }).on('changeDate', function(ev) {
      if (ev.date.valueOf() > checkout.date.valueOf()) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate() + 1);
        checkout.setValue(newDate);
      }
      checkin.hide();
      $('#dpd2')[0].focus();
    }).data('datepicker');
    var checkout = $('#dpd2').datepicker({
      onRender: function(date) {
        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
      }
    }).on('changeDate', function(ev) {
      checkout.hide();
    }).data('datepicker');
  });





  


}();
