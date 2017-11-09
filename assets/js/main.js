  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 1000, 
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false,
    format: 'yyyy-mm-dd'
  });
  $('.fixed-action-btn').openFAB();
  $('.fixed-action-btn').closeFAB();
  $('.fixed-action-btn.toolbar').openToolbar();
  $('.fixed-action-btn.toolbar').closeToolbar();
        