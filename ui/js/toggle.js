(function($){

  function toggleInput(bool, id) {
    if ($(bool).is(':checked')) {
      $(id + ' label').addClass('required');
      $(id).show();
    }
    else {
      $(id).hide();
      $(id +' label').removeClass('required');
    }
  }

  // Hide db location or profile unless it is showing.
  $('#actions input').on('change', function (e){
    toggleInput('input[name="action_import"', '#db_file');
    toggleInput('input[name="action_install"', '#profile');
  });

  // Set up show/hide for git
  $('#git_bool').on('change', function(e) {
    toggleInput('input[name="git_yes"]', '#git');
  });

  // Set the file directory, it is subject to change
  var files = $('#settings_files').val();
  // Set up show/hide for docroot
  $('#docroot_bool').on('change', function(e) {
    toggleInput('#docroot_bool', '#docroot_path');
  });

  // On docroot change update the file location to reflect default
  $('#settings_docroot').on('change', function(e) {
    var docroot = $(this).val();
    var docroot_before = '';
    if (docroot != '') {
      var docroot_before = docroot + '/';
    }
    var files = $('#settings_files').val();
    var settings = $('#settings_settings').val();
    if (files == 'sites/default/files') {
      $('#settings_files').val(docroot_before + files);
    }
    if (settings == 'sites/default/settings.php') {
      $('#settings_settings').val(docroot_before + settings);
    }
  });
})(jQuery)
